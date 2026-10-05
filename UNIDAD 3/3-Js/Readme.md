# Unidad 3: JavaScript y ES6+

## Estado de las clases

- [x] `U3_javaScript1.html` guardada y ejercicios independientes completos.
- [x] `U3_javaScript2.html` guardada y ejercicios independientes completos.
- [x] `U3_javaScript3.html` guardada y analizada.
- [x] Pruebas automaticas para conversiones, angulos, operaciones y estructura HTML.

Se completaron los ejercicios de catálogo y carrito con los productos del material de clase. Son una práctica independiente: no reemplazan la página del restaurante ni copian el proyecto de otro compañero.

- [Catálogo](productos.html): tarjetas dinámicas, detalle con diálogo, búsqueda, precios, marca, categorías y ordenamiento.
- [Carrito](carrito.html): persistencia, cantidades, eliminación, vaciado, contador y total.
- `tienda.js`: funciones flecha documentadas; `productos.css`: estilos responsive compartidos.
- `misFunciones.js`: documentación de todas las funciones de los ejercicios anteriores.
- [Documentación generada por JSDoc](docs/index.html).

### Decisiones y límites

Se usan los contenidos de las tres clases: DOM, eventos, arrays, `filter`, `sort`, `splice`, JSON, `localStorage` e `Intl.NumberFormat`. Cada producto conserva un identificador propio para que ordenar o filtrar no cambie qué artículo se agrega. El carrito guarda solamente identificador y cantidad; los precios se toman del catálogo.

Las cantidades deben ser enteras de 1 a 99, también al acumular el mismo producto. La página no procesa pagos reales. Las imágenes se enlazan desde los materiales oficiales de la cátedra.

Se usan `showModal()` y `close()` para abrir/cerrar el diálogo HTML nativo (Escape también lo cierra), y `try/catch` para tolerar almacenamiento corrupto o bloqueado. Estos recursos complementan los ejemplos de clase. Las pruebas de Node son herramientas de verificación, no dependencias de la página.

### Verificación

Desde la raíz del repositorio:

```powershell
node --test "UNIDAD 3/3-Js/misFunciones.test.js" "UNIDAD 3/3-Js/estructura.test.js" "UNIDAD 3/3-Js/tienda.test.cjs"
```

La documentación se genera con JSDoc, como pide la consigna:

```powershell
npm exec --yes --package=jsdoc -- jsdoc "UNIDAD 3/3-Js/misFunciones.js" "UNIDAD 3/3-Js/tienda.js" -d "UNIDAD 3/3-Js/docs"
```

En esta computadora se generó con el equivalente `pnpm --config.node-linker=hoisted --yes dlx jsdoc`, porque npm no está en el PATH.

Para probar `localStorage`, abrir estas páginas desde un servidor local, no mediante `file://`. Revisar agregar, recargar, cambiar cantidades, eliminar y vaciar; verificar que el detalle corresponda al producto después de ordenar y filtrar.

## Js (parte I)
### Ejercicio: Hola Mundo!

Mostrar un “alert()” con el texto “Hola Mundo!” que se ejecute en el onload del body.

### Ejercicio: Conversor de Unidades

Escribir funciones JavaScript para que, al escribir un número en cualquiera de los inputs, la unidad sea convertida.

- Emplear OnChange en los campos
- Los campos deben contener un nombre o id
- La función debe enviar el valor y el nombre del campo cambiado


### Ejercicio: Documentación

Documentar las funciones del “Conversor de Unidades” adecuadamente, indicando que hacen las funciones, el nombre del método, que parámetros se le envía y que valor retorna.

Ejecutar el comando de jsdoc ```jsdoc misFunciones.js``` para generar la documentación.

### Ejercicio: Grados a Radianes

Empleando la pagina grados_radianes haga una conversion de grados a radianes.

- Emplear OnChange en los campos
- Los campos deben contener un id
- Se debe emplear Math.PI

## Js (parte II)
### Ejercicio: Refactorización

Refactorice el código de manera tal que:

- Emplee función flecha en lugar de function
- Al principio se creen las variables necesarias
- Operar todos los valores empleando las variables
- Al final hacer la asignación de valores a los campos en la UI


### Ejercicio: Mostrar/Ocultar div

Escribir una función JavaScript para mostrar u ocultar el div celeste.

- Emplear OnChange en los radio button
- Los campos deben contener un nombre u ID
- Se debe cambiar el estilo de display


### Ejercicio: Mostrar/Ocultar Dialog

- En productos.html coloque un botón de "Ver detalle de Producto"
- Al presionar el botón se debe visualizar un dialog.
- El dialog debe tener un botón para cerrar.


### Ejercicio: Operaciones Matemáticas

Escribir funciones JavaScript para resolver las operaciones matemáticas una vez que el usuario ingresa un valor numérico en ambos inputs.

- Se debe castear de tipo String a tipo Number
- Los resultados deben contener el atributo disabled

### Ejercicio: Conversor de Unidades II

Modificar las funciones para que el resultado de la conversión sólo posea 2 decimales.

- Emplear Math.Round ó miVar.toFix(2) antes de asignar el resultado
- Reemplace ',' por '.' para evitar errores

### Ejercicio: Operaciones Matemáticas II

Modificar el HTML para quitar los inputs de los resultados. Emplear span, p o div, y en JavaScript, emplear innerHTML.

- Emplear innerHTML para asignarle valores a los divs.


### Ejercicio: Renderizado Dinámico

1. Cree una "Base de Datos" de los productos que desea vender definiendo los elementos.
2. Escriba una función Js que se llame cuando la página se carga. Esta función debe crear una tarjeta <div> por cada elemento. Esta tarjeta deberá mostrar la información del producto: nombre, precio y la imagen. (innerHTML)


### Ejercicio: Renderizado Dinámico del Dialog

Modificar las funciones desarrolladas previamente para que el contenido del dialog varíe dinámicamente acorde al producto que seleccionó el usuario.

### Ejercicio: Carrito de Compras con localstorage

- Agregar un botón "Agregar al carrito" en cada tarjeta de producto que permita agregar el producto a un array. (guardar este array en un localstorage)
- Agregar una página carrito.html que tenga el mismo header, nav, footer y variar el main para visualizar un listado de productos.

## Js (parte III)

### Ejercicio: Vaciar Carrito y Eliminar Producto

- Crear un botón para "Vaciar el Carrito" (usar localstorage.removeItem)
- Agregar en cada producto un botón para "Eliminar el producto" (usar array.splice)

### Ejercicio: Filter

1. Empleando de base el ejercicio anterior agregue en el html:
- Un input de tipo texto que permita realizar búsqueda de palabras.
- Dos inputs de tipo number que permita filtrar en un rango de precios
- Un <select> con <option> para filtrar por marca.
- Un <checkbox> para filtrar por categoría de Producto.

2. Emplea filter y permite al usuario:
- Filtrar por palabra
- Filtrar por rango de precio
- Filtrar por marca
- Filtrar por categoría de productos

### Ejercicio: Formatear Precio

1. Agregar una función que permita visualizar el precio de la siguiente manera: $3.123,45

Este formato debe ser usado tanto en el catálogo como en el carrito.

Emplear Intl.NumberFormat

2. Agregar un contador de productos al lado del botón de carrito de compras

### Ejercicio: Total y Cantidad de Productos

1. Mostrar el total a pagar en carrito de compras.
2. Agregar la "Cantidad" de cada producto (en caso de que el usuario agregue varias veces el mismo producto).

### Ejercicio: Ordenar el catálogo

1. En el HTML agrega un <select> con <option> para permitir al usuario ordenar el catálogo por precio (de menor a mayor y de mayor a menos) u ordenar por nombre de producto (A-Z ó Z-A)
2. Crea una función javaScript que permita realizar el orden indicado por el usuario.
