// Los resultados se muestran localmente; no hay consultas a aerolíneas ni cuentas.
const vuelos = document.getElementById("buscador-vuelos");
if (vuelos) {
  const salida = document.getElementById("salida");
  const regreso = document.getElementById("regreso");
  const hoy = new Date();
  const fechaLocal = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, "0"),
    String(hoy.getDate()).padStart(2, "0"),
  ].join("-");
  salida.min = fechaLocal;
  regreso.min = fechaLocal;
  salida.addEventListener("change", () => {
    regreso.min = salida.value || fechaLocal;
  });
  vuelos.addEventListener("change", () => {
    const soloIda = vuelos.elements.viaje.value === "ida";
    regreso.disabled = soloIda;
    regreso.required = !soloIda;
    document.getElementById("resultados-vuelos").hidden = true;
    document.getElementById("seleccion-vuelo").textContent = "";
  });
  vuelos.addEventListener("submit", (event) => {
    event.preventDefault();
    const origen = document.getElementById("origen").value;
    const destino = document.getElementById("destino").value;
    const error = document.getElementById("error-vuelos");
    error.textContent = "";
    if (origen === destino) {
      error.textContent = "Elegí un destino diferente al origen.";
      return;
    }
    if (!regreso.disabled && regreso.value < salida.value) {
      error.textContent = "El regreso debe ser igual o posterior a la salida.";
      return;
    }
    document.getElementById("resumen-vuelo").textContent =
      origen +
      " a " +
      destino +
      " · " +
      salida.value +
      " · " +
      document.getElementById("pasajeros").value +
      " pasajero(s)";
    document.getElementById("resultados-vuelos").hidden = false;
    document.getElementById("seleccion-vuelo").textContent = "";
  });
  document.querySelectorAll("[data-vuelo]").forEach((button) =>
    button.addEventListener("click", () => {
      document.getElementById("seleccion-vuelo").textContent =
        "Seleccionaste la opción " +
        button.dataset.vuelo +
        ". La selección es de práctica.";
    }),
  );
}
const buscador = document.getElementById("buscar-videos");
if (buscador) {
  let tema = "Todos";
  const filtrar = () => {
    const texto = document
      .getElementById("busqueda-video")
      .value.toLocaleLowerCase("es")
      .trim();
    let cantidad = 0;
    document.querySelectorAll("[data-video]").forEach((video) => {
      const visible =
        video.dataset.titulo.toLocaleLowerCase("es").includes(texto) &&
        (tema === "Todos" || video.dataset.categoria === tema);
      video.hidden = !visible;
      if (visible) cantidad++;
    });
    document.getElementById("resultado-videos").textContent = cantidad
      ? cantidad + " videos encontrados."
      : "No hay videos con esos filtros.";
  };
  buscador.addEventListener("submit", (event) => {
    event.preventDefault();
    filtrar();
  });
  document.getElementById("busqueda-video").addEventListener("input", filtrar);
  document.querySelectorAll("[data-tema]").forEach((button) =>
    button.addEventListener("click", () => {
      tema = button.dataset.tema;
      document.querySelectorAll("[data-tema]").forEach((item) => {
        const activo = item === button;
        item.setAttribute("aria-pressed", activo);
        item.classList.toggle("btn-secondary", activo);
        item.classList.toggle("btn-outline-secondary", !activo);
      });
      filtrar();
    }),
  );
  filtrar();
}
