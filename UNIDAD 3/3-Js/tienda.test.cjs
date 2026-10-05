const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const crearEntorno = () => {
    const datos = new Map();
    const campos = new Map();
    const alertas = [];
    const campo = id => {
        if (!campos.has(id)) campos.set(id, {
            value: "", textContent: "", innerHTML: "", checked: false,
            focus() {}, showModal() { this.open = true; }, close() { this.open = false; }
        });
        return campos.get(id);
    };
    const contexto = vm.createContext({
        document: {getElementById: campo},
        localStorage: {
            getItem: key => datos.get(key) || null,
            setItem: (key, value) => datos.set(key, value),
            removeItem: key => datos.delete(key)
        },
        alert: text => alertas.push(text)
    });
    vm.runInContext(fs.readFileSync(path.join(__dirname, "tienda.js"), "utf8"), contexto);
    return {datos, campo, contexto, alertas, ejecutar: code => vm.runInContext(code, contexto)};
};

const filtros = {texto:"", minimo:0, maximo:Infinity, marca:"Todas", categorias:[], orden:"precio-asc"};
test("filtra por palabra, precio, marca y categoría", () => {
    const e = crearEntorno();
    e.contexto.filtros = {...filtros, texto:"dobok", marca:"Daedo", categorias:["Dobok"], minimo:100000, maximo:120000};
    assert.equal(e.ejecutar("seleccionarProductos(filtros).length"), 1);
    assert.equal(e.ejecutar("seleccionarProductos(filtros)[0].id"), 2);
    e.contexto.filtros = {...filtros, categorias:["Protectores"]};
    assert.equal(e.ejecutar("seleccionarProductos(filtros).length"), 3);
});
test("ordenar no modifica el catálogo ni sus identificadores", () => {
    const e = crearEntorno();
    const inicial = e.ejecutar("JSON.stringify(productos)");
    for (const orden of ["precio-asc","precio-desc","nombre-asc","nombre-desc"]) {
        e.contexto.filtros = {...filtros, orden};
        const lista = JSON.parse(e.ejecutar("JSON.stringify(seleccionarProductos(filtros))"));
        if (orden === "precio-asc") assert.equal(lista[0].precio, 15000);
        if (orden === "precio-desc") assert.equal(lista[0].precio, 115000);
        if (orden === "nombre-asc") assert.equal(lista[0].nombre, "Cabezal Sparring");
        if (orden === "nombre-desc") assert.equal(lista[0].nombre, "Protectores Pie");
    }
    assert.equal(e.ejecutar("JSON.stringify(productos)"), inicial);
});
test("después de filtrar el detalle y el carrito corresponden al producto visible", () => {
    const e = crearEntorno();
    e.contexto.filtros = {...filtros, marca:"Daedo"};
    e.ejecutar("cargarProductos(seleccionarProductos(filtros))");
    assert.match(e.campo("contenedor-productos").innerHTML, /mostrarDetalle\(2\)/);
    e.ejecutar("mostrarDetalle(2)");
    assert.equal(e.campo("titulo-producto").textContent, "Dobok Dan");
    assert.equal(e.campo("detalle-producto").open, true);
    e.campo("cantidad-2").value = "2";
    e.ejecutar("agregarAlCarrito(2)");
    assert.equal(JSON.parse(e.datos.get("carrito"))[0].id, 2);
    e.ejecutar("cerrarDetalle()");
    assert.equal(e.campo("detalle-producto").open, false);
});
test("acumula cantidades, calcula el total y cuenta unidades", () => {
    const e = crearEntorno();
    e.campo("cantidad-1").value = "2";
    e.ejecutar("agregarAlCarrito(1); agregarAlCarrito(1)");
    assert.equal(e.ejecutar("leerCarrito()[0].cantidad"), 4);
    assert.equal(e.ejecutar("calcularTotal(leerCarrito())"), 140000);
    assert.equal(e.campo("cant-prod").textContent, 4);
});
test("rechaza cantidades inválidas y más de 99 acumuladas", () => {
    const e = crearEntorno();
    for (const valor of ["","abc","0","-1","1.5","100"]) {
        e.campo("cantidad-1").value = valor;
        e.ejecutar("agregarAlCarrito(1)");
        assert.equal(e.datos.has("carrito"), false);
        assert.equal(e.campo("cantidad-1").value, "");
    }
    e.campo("cantidad-1").value = "99"; e.ejecutar("agregarAlCarrito(1)");
    e.campo("cantidad-1").value = "1"; e.ejecutar("agregarAlCarrito(1)");
    assert.equal(e.ejecutar("leerCarrito()[0].cantidad"), 99);
});
test("tolera datos dañados y descarta productos desconocidos", () => {
    const e = crearEntorno();
    for (const dato of ["{","null","{}", "[null]", '[{"id":99,"cantidad":1}]']) {
        e.datos.set("carrito", dato);
        assert.equal(e.ejecutar("leerCarrito().length"), 0);
    }
});
test("cambiar, eliminar y vaciar actualizan importes y almacenamiento", () => {
    const e = crearEntorno();
    e.datos.set("carrito", JSON.stringify([{id:1,cantidad:2},{id:2,cantidad:1}]));
    e.ejecutar("mostrarCarrito()");
    const controles = e.campo("mostrar-carrito").innerHTML;
    e.campo("unidades-1").value = "3"; e.ejecutar("cambiarCantidad(1)");
    assert.equal(e.campo("total-carrito").textContent, e.ejecutar("formatearPrecio(220000)"));
    assert.equal(e.campo("mostrar-carrito").innerHTML, controles);
    e.ejecutar("eliminarProducto(1)");
    assert.equal(e.ejecutar("leerCarrito().length"), 1);
    e.ejecutar("vaciarCarrito()");
    assert.equal(e.datos.has("carrito"), false);
    assert.equal(e.campo("cant-prod").textContent, 0);
});
test("precios argentinos y aviso de búsqueda sin resultados", () => {
    const e = crearEntorno();
    assert.match(e.ejecutar("formatearPrecio(3123.45)"), /3\.123,45/);
    e.campo("search").value = "inexistente";
    e.campo("marca").value = "Todas"; e.campo("order").value = "precio-asc";
    e.ejecutar("filtrarProductos()");
    assert.match(e.campo("mensaje-tienda").textContent, /No hay/);
    assert.equal(e.campo("contenedor-productos").innerHTML, "");
});
test("rechaza rango invertido sin reemplazar el catálogo", () => {
    const e = crearEntorno();
    e.campo("precio-min").value = "200"; e.campo("precio-max").value = "100";
    e.campo("contenedor-productos").innerHTML = "catálogo anterior";
    e.ejecutar("filtrarProductos()");
    assert.equal(e.alertas.length, 1);
    assert.equal(e.campo("contenedor-productos").innerHTML, "catálogo anterior");
});
test("almacenamiento bloqueado no muestra éxito", () => {
    const e = crearEntorno();
    e.contexto.localStorage.setItem = () => {throw Error("bloqueado");};
    e.campo("cantidad-1").value = "1"; e.ejecutar("agregarAlCarrito(1)");
    assert.equal(e.datos.has("carrito"), false);
    assert.equal(e.alertas.length, 1);
    assert.doesNotMatch(e.campo("mensaje-tienda").textContent, /agregado/);
});
