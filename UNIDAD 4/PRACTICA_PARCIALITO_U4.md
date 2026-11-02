# Práctica de Unidad 4

Simulacro elaborado a partir de `U4_navegador.html`. No es un examen oficial. Hacelo sin consultar la guía y justificá las respuestas: acertar una opción por memoria no prueba que puedas resolver un caso parecido.

## Parte A — Opción múltiple

**1. ¿Para qué se usa DNS en el recorrido de la clase?**

A. Para cifrar el HTML. B. Para resolver un dominio a una IP. C. Para construir el DOM. D. Para calcular el layout.

**2. ¿Qué agrega TLS a una conexión HTTPS?**

A. Estilos. B. Compresión de imágenes obligatoria. C. Un canal cifrado y verificación del certificado. D. Una copia del DOM.

**3. ¿Cuál es el orden conceptual correcto?**

A. Paint → DOM → DNS. B. Layout → Render Tree → CSSOM. C. DOM/CSSOM → Render Tree → Layout → Paint → Compositing. D. DNS → Paint → HTML.

**4. Un elemento con `display: none`…**

A. Se borra del HTML fuente. B. Permanece en el DOM y no genera una caja para el renderizado. C. Ocupa siempre el mismo espacio. D. Provoca un error HTTP.

**5. Querés conectar eventos a botones cuando se completó el parseo sin esperar las imágenes de carga normal. ¿Qué evento elegís?**

A. `scroll`. B. `unload`. C. `DOMContentLoaded`. D. `resize`.

**6. Dos scripts clásicos externos dependen uno del otro y del DOM completo. ¿Qué opción es más apropiada?**

A. Ambos `async`, en cualquier orden. B. Ambos `defer`, en el orden de dependencia. C. Agregar `loading="lazy"` a los scripts. D. Usar CORS.

**7. Un script clásico externo con `async`…**

A. Siempre se ejecuta después de `DOMContentLoaded`. B. Nunca interrumpe el parseo al ejecutarse. C. Se descarga en paralelo y se ejecuta cuando está disponible, sin garantizar el orden documental. D. Solo funciona sin conexión.

**8. ¿Qué cambio requiere recalcular geometría?**

A. Cambiar el ancho de una caja. B. Cambiar solo el color de texto. C. Consultar una cabecera HTTP. D. Escribir en Console sin modificar la página.

**9. ¿Qué propiedades suelen convenir para animaciones que puedan aprovechar composición?**

A. `width` y `margin`. B. `transform` y `opacity`. C. `font-size` y `height`. D. `display` y `padding`.

**10. ¿Qué panel muestra cabeceras, estados HTTP y tiempos de solicitudes?**

A. Elements. B. Application. C. Network. D. Memory.

**11. Para pausar JavaScript en una línea e inspeccionar variables usás…**

A. Sources y un breakpoint. B. Security. C. Un CDN. D. `Cache-Control`.

**12. ¿Qué diferencia a `no-cache` de `no-store`?**

A. Son idénticos. B. `no-cache` pide validación antes de reutilizar; `no-store` impide almacenar. C. `no-store` obliga a usar CDN. D. `no-cache` es una propiedad CSS.

**13. ¿Qué hace una CDN?**

A. Guarda todo exclusivamente en tu disco. B. Reemplaza TLS. C. Distribuye contenido mediante servidores en distintas regiones. D. Convierte CSS a DOM.

**14. ¿Cuál es una buena candidata para `loading="lazy"`?**

A. Una imagen muy por debajo de la primera pantalla. B. Todo script externo. C. El HTML principal. D. Siempre la imagen principal visible.

**15. Axe no detecta violaciones en una página. ¿Qué concluís?**

A. Toda persona puede usarla sin dificultades. B. Ya no hace falta probar teclado. C. No detectó violaciones automáticas en el estado y alcance analizados; falta revisión manual. D. No usa CSS.

**16. ¿Qué cuatro categorías pide ejecutar la clase en Lighthouse?**

A. DNS, TCP, TLS y HTTP. B. Performance, accesibilidad, buenas prácticas y SEO. C. DOM, CSSOM, paint y compositing. D. Git, CSS, HTML y JS.

**17. ¿Qué permite CORS?**

A. Que cualquier cliente lea cualquier dato privado. B. Autorizar de forma controlada ciertas lecturas desde otros orígenes mediante reglas del servidor y navegador. C. Cifrar imágenes. D. Eliminar la necesidad de autenticación.

**18. Una página HTTPS intenta ejecutar un script HTTP. Es un caso de…**

A. Lazy loading. B. Mixed content. C. CSS crítico. D. `DOMContentLoaded`.

## Parte B — Verdadero o falso con justificación

19. “Cada imagen necesita obligatoriamente una resolución DNS y un handshake nuevos”.

20. “Cambiar el color de un texto necesita siempre un reflow”.

21. “`requestAnimationFrame` permite coordinar actualizaciones visuales con el refresco del navegador”.

22. “Si Lighthouse da 100 en accesibilidad, ya se comprobó toda la accesibilidad”.

23. “CSP y CORS resuelven exactamente el mismo problema”.

24. “`load` garantiza que no habrá nuevas solicitudes de red más tarde”.

## Parte C — Casos para explicar

25. Entrás a una web y la primera respuesta tarda mucho. ¿Dónde investigás? Diferenciá DNS, conexión, espera de respuesta y descarga.

26. Un banner cambia `width` continuamente y la página se traba. Relacioná el problema con layout, una alternativa de animación y el panel que usarías para comprobarlo.

27. Un formulario tiene campos sin etiquetas y botones que son solo iconos sin nombre accesible. Indicá dos mejoras y cómo comprobarías el resultado.

28. Tu frontend en `http://localhost:3000` no puede leer un `fetch` de una API de otro origen. ¿Qué revisarías? ¿Por qué `mode: 'no-cors'` no es la solución para leer su JSON?

29. Lighthouse Desktop tiene mejor performance que Mobile. Explicá dos motivos posibles y por qué una sola corrida no permite asegurar cuál es la experiencia de todos los usuarios.

30. Explicá de corrido qué ocurre desde que escribís una URL hasta que ves e interactuás con la página. Incluí los diez pasos de la clase.

---

## Respuestas razonadas — consultar después de intentar

1. **B.** DNS asocia el dominio con una dirección de red; no pinta ni cifra.
2. **C.** TLS protege la comunicación. El certificado permite verificar la identidad que presenta el servidor.
3. **C.** Primero estructura y estilos; después geometría, dibujo y combinación de capas.
4. **B.** DOM y árbol de renderizado no son lo mismo. `visibility: hidden` sí conserva el espacio.
5. **C.** Es apropiado para trabajar con el DOM ya parseado. También espera los scripts diferidos.
6. **B.** `defer` conserva el orden de scripts clásicos externos y los ejecuta después del parseo.
7. **C.** La descarga es paralela, pero la ejecución puede interrumpir el parser. No garantiza dependencias.
8. **A.** Un ancho distinto cambia geometría y puede afectar a otros elementos.
9. **B.** Pueden evitar layout y paint durante la animación en condiciones adecuadas; se verifica en Performance.
10. **C.** Network muestra tráfico HTTP, cabeceras y desglose temporal.
11. **A.** Sources permite detener e inspeccionar la ejecución.
12. **B.** Validar no es lo mismo que prohibir almacenamiento.
13. **C.** Acerca recursos desde una red distribuida; no sustituye la caché del navegador.
14. **A.** Posponer lo que queda fuera de pantalla libera recursos para el contenido inicial.
15. **C.** El resultado automático solo cubre lo evaluado. Puede haber revisiones incompletas y problemas manuales.
16. **B.** SEO significa optimización para buscadores; “CEO” en el README es una errata.
17. **B.** El servidor puede autorizar al navegador a exponer respuestas a determinados orígenes.
18. **B.** Se mezcla un contexto HTTPS con un recurso inseguro HTTP.
19. **Falso.** Se pueden reutilizar DNS, conexiones y recursos en caché.
20. **Falso.** Un cambio solo visual normalmente requiere repaint, sin recalcular geometría por ese cambio.
21. **Verdadero.** Agenda un callback para una próxima actualización visual. No garantiza por sí solo una tasa fija de FPS.
22. **Falso.** Quedan comprobaciones manuales y estados que la auditoría puede no recorrer.
23. **Falso.** CORS regula compartir respuestas entre orígenes; CSP limita fuentes y ejecución de recursos y ayuda frente a XSS.
24. **Falso.** Después puede haber fetch, navegación, carga diferida o contenido dinámico.
25. **Network → documento principal → Timing y Headers.** DNS resuelve el dominio; conexión establece transporte y TLS; espera de respuesta incluye red y trabajo del servidor; descarga transfiere el cuerpo. No sumes TLS dos veces si está incluido dentro de Initial connection. Comprobá también caché, redirecciones y conexiones reutilizadas.
26. **El ancho puede disparar layouts repetidos.** Si el efecto buscado es desplazar visualmente, probar `transform`. Si realmente cambia la distribución del contenido, el layout puede ser necesario. Grabar la interacción en Performance y revisar layout/paint/tareas.
27. **Asociar `<label>` a cada campo y dar nombre accesible a los botones**, preferentemente con texto visible o, si corresponde, `aria-label`. Ejecutar Axe y probar teclado, foco y lectura de los controles. No usar un placeholder como único reemplazo de etiqueta.
28. **Revisar Console, Network y configuración CORS de la API**, incluido preflight si existe. El servidor debe autorizar el origen correspondiente. `no-cors` no permite acceder al cuerpo JSON de una respuesta opaca.
29. **Mobile puede simular CPU y red más lentas y mostrar otro layout/contenido.** Hay variaciones por servidor, caché y momento de prueba. Comparar configuración y varias corridas antes de generalizar; los datos reales de usuarios son otra fuente de evidencia.
30. **URL y DNS; TCP/TLS; solicitud HTTP; respuesta; DOM/CSSOM; Render Tree; layout; paint; compositing; interacción.** Justificar qué aporta cada paso, no limitarse a recitar los nombres. Se acepta aclarar que hay superposición y reutilización.

## Criterio de autocorrección

En opción múltiple: un acierto requiere poder justificar por qué las demás opciones no corresponden. En verdadero/falso: responder sin justificar es incompleto. En los casos: mencionar el concepto, aplicarlo al problema y proponer cómo verificarlo.

Si fallás eventos o scripts, repasá secciones 2–3 de la guía; renderizado, 1 y 4; red y caché, 1 y 5; paneles, 6; auditorías, 7; seguridad, 8.
