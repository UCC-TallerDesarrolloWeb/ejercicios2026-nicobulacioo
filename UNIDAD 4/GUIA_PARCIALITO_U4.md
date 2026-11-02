# Unidad 4 — Funcionamiento del navegador

Material principal: [clase de la profe](../U4_navegador.html), revisada completa el 19/10/2026. Esta guía conserva su temario y distingue las precisiones técnicas de las explicaciones simplificadas de las filminas. Las preguntas son de práctica: no conocemos las preguntas reales ni el formato del parcialito.

## 1. El recorrido que tenés que poder explicar

**URL → DNS → conexión TCP/TLS → solicitud HTTP → respuesta → DOM y CSSOM → Render Tree → Layout → Paint → Compositing → interacción.**

| Etapa | Qué sucede | Pregunta que responde |
| --- | --- | --- |
| URL y DNS | Se interpreta la dirección y se resuelve el dominio a una IP. | ¿Dónde está el servidor? |
| TCP/TLS | Se establece la conexión y, con HTTPS, se negocia el canal cifrado y se verifica el certificado. | ¿Cómo nos conectamos de forma segura? |
| Solicitud HTTP | El cliente pide un recurso; envía método, URL, cabeceras y, si corresponde, cuerpo. | ¿Qué necesito? |
| Respuesta HTTP | El servidor devuelve estado, cabeceras y normalmente un cuerpo. | ¿Qué me devolvieron? |
| DOM | Se parsea el HTML para construir la estructura del documento en memoria. | ¿Qué elementos hay y cómo se relacionan? |
| CSSOM | Se procesan las reglas CSS. | ¿Qué estilos corresponden? |
| Render Tree | Se combinan estructura y estilos para representar el contenido que se renderiza. | ¿Qué se muestra y cómo? |
| Layout o Reflow | Se calculan tamaños y posiciones. | ¿Dónde va cada elemento y cuánto mide? |
| Paint o pintado | Se generan las operaciones de dibujo: texto, fondos, bordes, imágenes. | ¿Qué aspecto tiene? |
| Compositing | Se combinan las capas para producir la imagen final. | ¿Cómo se ensamblan las capas? |
| Interacción | JS, eventos y nuevas solicitudes pueden actualizar la página. | ¿Qué cambia cuando el usuario actúa? |

**Respuesta modelo de parcial:** “Al ingresar una URL, el navegador resuelve el dominio mediante DNS y establece una conexión, protegida con TLS si usa HTTPS. Envía una solicitud HTTP y recibe la respuesta. A partir del HTML y CSS construye DOM y CSSOM, genera el árbol de renderizado, calcula posiciones y tamaños, pinta y compone las capas. Después, las interacciones y JavaScript pueden provocar nuevas actualizaciones”.

Precisiones para comprender el modelo:

- Los recursos adicionales normalmente se obtienen mediante **otras solicitudes**; no vienen necesariamente todos dentro de la respuesta del HTML.
- Se puede empezar a parsear mientras llegan los datos. No hay que imaginar diez etapas totalmente aisladas que siempre esperan la descarga de toda la página.
- La clase presenta TCP/TLS como recorrido base. HTTP/3 usa QUIC sobre UDP: no invalida el modelo didáctico, pero evita afirmar que todo HTTP usa TCP.
- DNS y conexiones pueden reutilizarse. No siempre se observa una nueva resolución o un nuevo handshake por cada archivo.
- Un elemento con `display: none` permanece en el DOM, pero no genera una caja en el árbol de renderizado. Con `visibility: hidden`, conserva el espacio de layout.
- TTFB significa **Time to First Byte**. En Network, la espera de respuesta incluye latencia y trabajo del servidor; no equivale a “tiempo de CPU del servidor”.

## 2. Eventos: cuándo ejecutar el código

| Evento o API | Cuándo / para qué | Ejemplo |
| --- | --- | --- |
| `DOMContentLoaded` | HTML parseado y scripts diferidos ejecutados. No espera, en general, imágenes. | Preparar botones que ya existen en el DOM. |
| `load` | Finalizó la carga del documento y los recursos que retrasan este evento. | Trabajar con una imagen de carga normal ya cargada. |
| `beforeunload` | Antes de salir; puede solicitar una advertencia si hay cambios sin guardar. | Formulario editado sin guardar. |
| `unload` | Evento de salida mencionado en la clase; no es confiable para tareas imprescindibles. | No depender de él para guardar datos. |
| `visibilitychange` | Cambia la visibilidad del documento. | Pausar una animación cuando la pestaña queda oculta. |
| `resize` | Cambia el tamaño de la ventana. | Recalcular un gráfico. |
| `scroll` | Se desplaza el documento o un contenedor. | Actualizar un indicador de lectura. |
| `requestAnimationFrame` | API que agenda un callback para una próxima actualización visual. | Animar de manera coordinada con el refresco. |

```js
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM listo');
});

window.addEventListener('load', () => {
  console.log('Carga inicial terminada');
});

document.addEventListener('visibilitychange', () => {
  console.log(document.hidden ? 'Pestaña oculta' : 'Pestaña visible');
});
```

**Ojo con la frase de la filmina “sin esperar imágenes o estilos”:** `DOMContentLoaded` no espera directamente las hojas CSS, pero los scripts con `defer` pueden esperar estilos y deben ejecutarse antes del evento. Por eso CSS puede retrasarlo indirectamente. `load` tampoco significa que ya se descargó todo recurso futuro: imágenes lazy, un `fetch` posterior o contenido agregado después pueden quedar fuera.

`beforeunload` no garantiza una advertencia en cualquier situación: el navegador la restringe y controla su texto. `requestAnimationFrame` es una API de programación de callbacks, no un evento global como `scroll`.

## 3. JavaScript bloqueante, async y defer

Para **scripts clásicos externos**, que es el caso que explica la clase:

| Forma | Descarga | Ejecución | Orden entre scripts de esa forma |
| --- | --- | --- | --- |
| `<script src="a.js"></script>` | El parser se detiene al encontrarlo, hasta obtenerlo y ejecutarlo. | Antes de continuar el parseo. | Orden del documento. |
| `<script async src="a.js"></script>` | En paralelo con el parseo. | Cuando queda disponible; su ejecución puede interrumpir el parseo. | No garantiza el orden del documento. |
| `<script defer src="a.js"></script>` | En paralelo con el parseo. | Después del parseo y antes de `DOMContentLoaded`. | Conserva el orden del documento. |

**Caso típico:** `app.js` usa funciones de `biblioteca.js` y busca botones del HTML. Conviene cargar ambos con `defer`, primero la biblioteca y después la aplicación. `async` sirve para un script independiente, sin depender de ese orden.

No confundir “descargar sin bloquear” con “ejecutar sin consumir el hilo principal”. `defer` en un script clásico inline no tiene el efecto de diferirlo. Los módulos tienen reglas propias; no hacen falta para resolver la comparación básica de la clase.

## 4. Reflow, Repaint y Compositing

| Cambio | Trabajo que puede requerir | Explicación |
| --- | --- | --- |
| Cambiar `width`, `height` o márgenes | Layout y, según el cambio, paint/composición. | Cambia la geometría y puede afectar otros elementos. |
| Cambiar `color` o `background-color` | Paint y composición, sin necesitar layout por ese cambio. | Cambia el aspecto, no el tamaño ni la posición. |
| Animar `transform` u `opacity` | Puede resolverse en composición si se cumplen las condiciones. | Permite evitar recalcular geometría y repintar en muchos casos. |

La profe destaca que **reflow es costoso**, repaint suele ser menos costoso y composición puede ser más eficiente. El costo real depende del área afectada, las capas y el contenido: no todo reflow recalcula siempre toda la página ni todo `transform` garantiza trabajo exclusivo de GPU.

`will-change` avisa qué propiedad probablemente cambiará. Se usa con criterio: crear demasiadas capas consume memoria. Para animar un desplazamiento suele convenir `transform: translateX(...)` frente a modificar `left` en cada frame. El panel **Performance** permite comprobar qué ocurrió realmente.

## 5. Optimización, caché, CDN y ruta crítica

**Ruta crítica de renderizado / CRP:** trabajo y recursos necesarios para mostrar inicialmente el contenido. La clase propone CSS crítico inline, scripts con `async`/`defer`, menos CSS/JS innecesario y carga diferida de contenido fuera de pantalla.

- **CSS crítico:** estilos del contenido visible inicial dentro de `<style>`. El resto del CSS debe cargarse de forma planificada; copiar unos estilos inline sin cambiar las demás cargas no elimina automáticamente los bloqueos.
- **CSS externo:** las hojas aplicables suelen bloquear el renderizado inicial. No significa que siempre detengan la construcción del DOM.
- **Lazy loading:** posponer contenido que todavía no hace falta. Ejemplo estable: `<img src="foto.jpg" alt="Descripción útil" loading="lazy" width="800" height="600">`.
- No diferir la imagen principal visible si eso perjudica su aparición. Para video, comprobar soporte de `loading` en el navegador objetivo; también existen `preload="none"`, `poster` y carga controlada por JS. La disponibilidad de lazy loading nativo en multimedia depende del navegador y la versión.

| Concepto / cabecera | Para qué sirve | Confusión que evitar |
| --- | --- | --- |
| Caché del navegador | Reutilizar respuestas guardadas en memoria o disco. | No toda visita descarga todo de nuevo. |
| `Cache-Control: max-age=3600` | Permite considerar fresca la respuesta durante 3600 segundos. | No es una promesa de conservarla siempre en disco. |
| `Cache-Control: no-cache` | Exige validar antes de reutilizar. | No significa “prohibido almacenar”. |
| `Cache-Control: no-store` | Indica que no debe almacenarse. | Es diferente de `no-cache`. |
| `ETag` | Validador de una versión del recurso. | No es una duración de caché. |
| `Last-Modified` | Fecha informada de última modificación. | Permite validación condicional, no define sola la frescura. |
| `304 Not Modified` | Respuesta de validación: reutilizar el cuerpo guardado. | No es una redirección a otra página aunque sea 3xx. |
| CDN | Servidores distribuidos que acercan contenido al usuario. | Es infraestructura de red, distinta de la caché local. |

Ejemplo: el navegador guarda un CSS con ETag. Cuando debe validarlo manda `If-None-Match`. Si no cambió, el servidor puede devolver `304`, ahorrando retransmitir el cuerpo.

## 6. Qué panel de DevTools elegir

| Panel | Usarlo para… |
| --- | --- |
| Elements | Ver y probar cambios en DOM y CSS; inspeccionar estilos calculados. |
| Console | Ejecutar JS, leer logs y errores. |
| Sources | Depurar JS con breakpoints y revisar variables/pila de llamadas. |
| Network | Ver solicitudes, estados, cabeceras, recursos, caché y tiempos. |
| Performance | Analizar carga, tareas, interacciones, frames y trabajo de renderizado. |
| Application | Inspeccionar localStorage, IndexedDB, service workers y almacenamiento/cachés. |
| Security | Revisar certificados, conexión segura y problemas de contenido mixto. |
| Lighthouse | Auditar performance, accesibilidad, buenas prácticas y SEO. |
| Memory | Investigar uso de memoria y posibles fugas. |
| Accessibility | Revisar información de accesibilidad, roles y nombres accesibles. |

Cambiar algo desde Elements normalmente es temporal: no modifica por sí solo el archivo fuente del proyecto. La vista puede variar según la versión del navegador.

## 7. Accesibilidad y auditorías

**A11y** abrevia accessibility: quedan once letras entre la “a” y la “y”. El objetivo es que personas con distintas capacidades puedan usar el sitio.

- Usar HTML semántico, navegación con teclado y foco visible.
- Dar nombre accesible a controles. Un `<label>` asociado ayuda a identificar un campo.
- Usar `alt` con sentido: describir una imagen informativa y `alt=""` para una puramente decorativa.
- Mantener contraste y textos legibles.
- Usar ARIA cuando haga falta; no reemplazar innecesariamente controles HTML nativos.

La clase dice que el lector convierte el DOM en voz. Más precisamente, las tecnologías asistivas usan información de accesibilidad que el navegador deriva de estructura, semántica, estados y atributos.

**Axe** detecta problemas automáticos y situaciones que necesitan revisión. **Lighthouse** evalúa cuatro categorías solicitadas en la práctica. Accesibilidad 100 o cero violaciones de Axe no garantizan accesibilidad total: quedan pruebas manuales como teclado, orden de foco, sentido del texto alternativo y comprensión del contenido.

Para interpretar performance de Lighthouse:

- **FCP:** cuándo aparece el primer contenido.
- **LCP:** cuándo se muestra el elemento de contenido más grande considerado en el viewport.
- **TBT:** tiempo de bloqueo por tareas largas durante el intervalo que evalúa la prueba.
- **CLS:** desplazamientos inesperados de layout; no se mide en segundos.
- **Speed Index:** qué tan rápido se completa visualmente el contenido.

Son aclaraciones para leer los informes, no un temario adicional confirmado para el parcial. Desktop y Mobile usan condiciones diferentes de viewport, CPU y red; no alcanza con achicar la ventana. Una medición de laboratorio no equivale a la experiencia de todos los usuarios.

## 8. Seguridad de la clase

**Origen = esquema + host + puerto.** `https://ejemplo.com` y `http://ejemplo.com` no tienen el mismo origen. Un subdominio distinto también cambia el origen.

| Mecanismo | Qué hace | Ejemplo |
| --- | --- | --- |
| SOP | Restringe el acceso entre orígenes, especialmente la lectura de datos mediante scripts. | Un sitio no puede leer libremente la respuesta privada de otro. |
| CORS | Cabeceras y reglas que permiten al servidor autorizar determinadas lecturas desde otros orígenes. | Una API admite el origen de tu frontend. |
| CSP | Política que limita fuentes y formas de cargar/ejecutar recursos. Ayuda a reducir XSS. | Restringir de dónde se admiten scripts. |
| Mixed content | Una página HTTPS intenta cargar recursos HTTP. | Un script HTTP dentro de una página HTTPS. |

**Pregunta clásica:** “¿Arreglo CORS agregando `Access-Control-Allow-Origin` al fetch?”. No: es una cabecera de **respuesta del servidor**. `mode: 'no-cors'` tampoco habilita leer libremente la respuesta: produce una respuesta opaca en los casos permitidos.

SOP no significa que absolutamente toda carga entre sitios esté prohibida: por ejemplo, se pueden incrustar muchos recursos externos. CORS tampoco sustituye autenticación ni autorización. El navegador puede bloquear o actualizar algunos recursos mixtos según su tipo y reglas.

## 9. Cómo practicar juntos

Para continuar en este chat: pedir “tomame U4 de a una y corregime al final”. Usar primero el vocabulario y el alcance de esta clase; las precisiones técnicas deben aclarar, sin reemplazar la respuesta esperada por un tema avanzado.

Orden sugerido:

1. Explicar el recorrido URL → pantalla sin mirar.
2. Diferenciar DOM/CSSOM/Render Tree y Layout/Paint/Compositing.
3. Resolver casos de eventos y `async`/`defer`.
4. Elegir paneles de DevTools según un problema.
5. Explicar caché, CRP, accesibilidad y seguridad.
6. Hacer el [simulacro](PRACTICA_PARCIALITO_U4.md) sin consultar las respuestas.

Esta guía deja el contexto guardado en el repositorio para retomarlo. En un chat nuevo, indicar que lea este archivo y `../U4_navegador.html`.

## 10. Fuentes y evidencia

La fuente del programa es el HTML de la profe. Las aclaraciones se contrastaron con documentación oficial:

- [Chrome DevTools: Network y sus tiempos](https://developer.chrome.com/docs/devtools/network/reference/).
- [MDN: DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event).
- [MDN: script, async y defer](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script).
- [MDN: lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading) y [video](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video).
- [Lighthouse: ejecución e informes](https://github.com/GoogleChrome/lighthouse).
- [Axe-core: motor de accesibilidad](https://github.com/dequelabs/axe-core).

Las prácticas ejecutadas y sus límites están en [CONSIGNAS_RESUELTAS_U4.md](CONSIGNAS_RESUELTAS_U4.md).
