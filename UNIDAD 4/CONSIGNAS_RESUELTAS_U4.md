# Unidad 4 — Consignas resueltas y evidencia

Fuente: [U4_navegador.html](../U4_navegador.html). Ejecución: **19/10/2026**, entre aproximadamente 08:56 y 09:00 de Argentina. Navegador: Chrome **155.0.8059.84**, sin interfaz gráfica y con perfiles temporales.

Se ejecutaron las tres prácticas técnicas: medición de red, Axe y Lighthouse Desktop/Mobile. **No se instalaron las extensiones en el perfil personal del navegador**: Axe se ejecutó con el motor `axe-core` y Lighthouse con su API de Node. Esto resuelve las comprobaciones y permite conservar los informes, pero el paso literal de instalar y usar los plugins en la interfaz queda para reproducirlo en clase si lo exige la profe.

## 1. DNS, TCP/TLS y solicitud/respuesta

### Consigna

Abrir Network, visitar Wikipedia, observar DNS Lookup, Initial connection y cabeceras; comparar con otra web, por ejemplo GitHub.

### Ejecución

Se cargaron `https://www.wikipedia.org/` y `https://github.com/` en procesos independientes de Chrome con caché HTTP deshabilitada. Se registraron tiempos del protocolo de depuración de Chrome y de Navigation Timing, junto con cabeceras seleccionadas. No se guardaron cookies de sesión ni credenciales.

Es una medición por sitio, desde este equipo y esta conexión. Desactivar caché HTTP no borra necesariamente la caché DNS del sistema ni impide que una navegación reutilice su conexión después de una redirección.

| Dato del documento final | Wikipedia | GitHub |
| --- | ---: | ---: |
| Estado | 200 | 200 |
| Protocolo | HTTP/2 (`h2`) | HTTP/2 (`h2`) |
| DNS Lookup | 74,58 ms | No disponible para la petición final |
| Initial connection, incluyendo TLS | 85,44 ms | No disponible para la petición final |
| TLS, parte de la conexión anterior | 44,31 ms | No disponible para la petición final |
| Envío de solicitud | 0,12 ms | 0,19 ms |
| Espera de respuesta, desde fin del envío hasta primer header | 59,20 ms | 344,16 ms |
| Descarga del cuerpo, Navigation Timing | 32,10 ms | 108,00 ms |
| DOMContentLoaded desde inicio de navegación | 503,00 ms | 1225,70 ms |
| Inicio de load desde inicio de navegación | 506,30 ms | 1229,30 ms |

**Importante:** los datos crudos de GitHub traen `-1` en DNS, conexión y TLS para la solicitud final: significa que esas fases no están disponibles para esa petición, no que hayan ocurrido instantáneamente. Navigation Timing registra una redirección y la URL final fue `https://github.com/?locale=es-419`. La reutilización de conexión tras esa redirección es compatible con lo observado; no capturamos los tiempos de la respuesta intermedia y no podemos calcularlos con estos registros.

TLS está dentro del tiempo de conexión de la tabla: **no sumar 85,44 + 44,31** como si fueran etapas independientes. Los tiempos de DOMContentLoaded y load incluyen la navegación y sus recursos, mientras que los demás corresponden al documento principal. No se deben sumar todas las filas.

### Cabeceras observadas y explicación

En las solicitudes se registraron `Accept`, `User-Agent` y `Cache-Control: no-cache`. Este último corresponde a la medición con caché deshabilitada.

| Respuesta | Wikipedia | GitHub | Qué enseña |
| --- | --- | --- | --- |
| `Content-Type` | `text/html` | `text/html; charset=utf-8` | Ambos documentos se interpretan como HTML. |
| `Cache-Control` | `s-maxage=86400, must-revalidate, max-age=3600` | `max-age=0, private, must-revalidate` | Wikipedia permite frescura en cachés compartidas y del navegador con duraciones distintas; GitHub exige revalidación y restringe almacenamiento compartido. |
| `ETag` | Presente | Presente | Validador para comprobar cambios. |
| `Last-Modified` | Presente | No registrado en la respuesta final | Otro mecanismo de validación. |
| `Strict-Transport-Security` | Presente | Presente | Instruye a usar HTTPS en futuras conexiones dentro del alcance de la política. |
| `Content-Security-Policy` | No registrada en esta respuesta | Presente | GitHub limita fuentes de scripts, imágenes, conexiones y otros recursos. |

**Respuesta a la comparación:** en esta corrida, GitHub tuvo una espera de respuesta del documento final mayor que Wikipedia (344,16 frente a 59,20 ms) y alcanzó DOMContentLoaded más tarde (1225,70 frente a 503,00 ms). Eso describe esta navegación, no prueba que GitHub siempre sea más lento. No es posible comparar los handshakes de ambos sitios con los datos disponibles para las peticiones finales.

Evidencia: [red.json](informes/red.json). Los tiempos de red de esta sección son de una corrida separada de Lighthouse; no tienen por qué coincidir con sus métricas.

### Cómo reproducirlo desde DevTools

1. Abrir Chrome → F12 → **Network** antes de navegar.
2. Activar **Disable cache**, mantener DevTools abierto y anotar la configuración de throttling.
3. Navegar a Wikipedia y seleccionar el recurso de tipo **document**.
4. En **Headers**, mirar método, URL, estado y cabeceras de solicitud/respuesta.
5. En **Timing**, anotar DNS Lookup, Initial connection, SSL, Request sent, Waiting for server response y Content Download.
6. Repetir con GitHub. Si hay redirecciones, mirar cada solicitud por separado. Si faltan DNS o conexión, investigar reutilización en lugar de escribir un cero inventado.
7. Para una comparación más robusta, repetir varias veces en condiciones iguales y separar corridas con caché de corridas sin caché.

## 2. Validación de accesibilidad con Axe

### Consigna y elección de página

La profe propone instalar Axe y analizar alguna página; Claro es un ejemplo. Se intentó `https://tienda.claro.com.ar/`, que devolvió **HTTP 403**, título “ERROR: The request could not be satisfied”. No se tomó esa página de error como si fuera la tienda. Se eligió **Wikipedia**, que devolvió 200 y es válida como otra página de la consigna.

### Resultado real

- Motor: **axe-core 4.14.0**.
- URL: `https://www.wikipedia.org/`.
- Viewport: **1365 × 768**; estado inicial, sin recorrer todos los enlaces o abrir menús.
- Violaciones automáticas detectadas: **0 reglas**.
- Reglas aprobadas: **44**.
- Reglas que necesitan revisión: **1**, `color-contrast`, con **2 elementos**.
- Reglas no aplicables: **46**.

Los dos elementos pendientes son las insignias de **Google Play Store** y **Tienda de aplicaciones de Apple**. El motor no pudo determinar el color de fondo debido a un gradiente. Esto **no confirma un fallo de contraste ni lo descarta**: requiere inspección manual.

**Conclusión para la consigna:** “En el estado inicial de Wikipedia y la vista de escritorio evaluada, Axe no detectó violaciones automáticas. Detectó una regla de contraste incompleta en dos insignias. Para terminar una evaluación de accesibilidad se deben revisar esos contrastes y probar navegación por teclado, nombres accesibles y orden del foco”.

Evidencia: [resultado completo de Axe](informes/axe.json) y [captura de la página analizada](informes/pagina-auditada.png).

### Recomendaciones y reproducción en la interfaz

1. Instalar **axe DevTools** desde el enlace de la clase si se requiere usar el plugin.
2. Abrir la página → DevTools → axe DevTools → iniciar el análisis disponible en la versión instalada.
3. Para cada resultado, anotar regla, elemento, impacto y explicación. Distinguir **violations** de **incomplete / needs review**.
4. Revisar manualmente el contraste real sobre las imágenes/gradientes.
5. Recorrer con Tab y Shift+Tab: foco visible, orden comprensible y controles operables. Comprobar nombres de campos y botones con Accessibility y, si es posible, un lector de pantalla.

Estas pruebas manuales se proponen como continuación: no se presentan como realizadas.

## 3. Lighthouse en Desktop y Mobile

### Ejecución y condiciones

URL: `https://www.wikipedia.org/`. Lighthouse **13.5.0**, con las cuatro categorías solicitadas; motor de accesibilidad incorporado **axe-core 4.14.0**. Se utilizó la API oficial en Chrome sin interfaz gráfica, con simulación de red/CPU.

| Configuración verificada en el JSON | Desktop | Mobile |
| --- | ---: | ---: |
| `formFactor` | `desktop` | `mobile` |
| Viewport emulado | 1350 × 940 | 412 × 823 |
| `screenEmulation.mobile` | false | true |
| DPR | 1 | 1,75 |
| RTT simulado | 40 ms | 150 ms |
| Throughput simulado | 10240 Kbps | 1638,4 Kbps |
| Multiplicador de ralentización de CPU | 1 | 4 |

El informe Desktop final es de las 08:59 de Argentina; el Mobile, de las 08:56. Una primera corrida que se había rotulado Desktop conservó configuración móvil y se descartó. Se reemplazó por el informe Desktop correctamente configurado; la tabla usa únicamente los archivos finales verificados.

### Puntajes de 0 a 100

| Categoría | Desktop | Mobile |
| --- | ---: | ---: |
| Performance | **98** | **96** |
| Accesibilidad | **100** | **95** |
| Buenas prácticas | **100** | **100** |
| SEO | **100** | **100** |

### Métricas seleccionadas

| Métrica | Desktop | Mobile |
| --- | ---: | ---: |
| First Contentful Paint | 0,6 s | 1,0 s |
| Largest Contentful Paint | 0,6 s | 1,4 s |
| Total Blocking Time | 0 ms | 230 ms |
| Cumulative Layout Shift | 0,018 | 0,028 |
| Speed Index | 1,6 s | 1,0 s |

Se conservaron los redondeos visibles de Lighthouse. CLS es un valor sin unidad. Speed Index no mejoró en Desktop en esta corrida aunque otras métricas sí: las condiciones, el contenido visible y los indicadores evalúan aspectos distintos. No todas las métricas deben cambiar en la misma dirección.

### Hallazgos concretos

1. **Accesibilidad en Mobile:** la auditoría `label` marca el campo `input#searchInput`; informa que su etiqueta explícita está oculta. Propuesta: asegurar una etiqueta o nombre accesible válido también con el layout móvil y comprobarlo en el árbol de accesibilidad. No basta con que visualmente se entienda la lupa.
2. **Respuesta inicial en Desktop:** aparece la recomendación “Reduce initial server response time”, con **1210 ms** observados para el documento en esa corrida. Revisar servidor, caché y latencia. Es un dato observado que puede diferir del resultado de LCP modelado por la simulación y de la medición de Network anterior.
3. **Caché:** Lighthouse señala oportunidades de mejorar vida útil de recursos; el ahorro estimado es **19 KiB en Desktop** y **27 KiB en Mobile**. Evaluar políticas adecuadas por recurso, especialmente estáticos versionados.
4. **Imágenes:** estima oportunidades de **10 KiB en Desktop** y **35 KiB en Mobile**. Revisar tamaño entregado y formato según el uso; no reducir calidad a ciegas.
5. **Trabajo de JavaScript:** Mobile presenta TBT de **230 ms**. Analizar las tareas largas en Performance y diferir o reducir trabajo que no sea necesario para la primera interacción.

Son hallazgos y propuestas: no modificamos Wikipedia ni podemos confirmar el efecto de esas correcciones sin implementarlas y medir de nuevo.

**Relación con Axe:** el análisis independiente se hizo en escritorio; Lighthouse móvil evalúa otra presentación y detectó una etiqueta problemática. Tener cero violaciones en una vista y un fallo en otra no es una contradicción. Incluso usando el mismo motor, cambian estado, viewport, selección de reglas y forma de puntuar.

**Conclusión para la consigna:** “Wikipedia obtuvo 98/100 de performance en Desktop y 96/100 en Mobile en estas pruebas. Mobile mostró mayor LCP y TBT, y un problema de etiqueta accesible en el buscador. Buenas prácticas y SEO obtuvieron 100 en ambos perfiles. Los resultados corresponden a corridas de laboratorio y no garantizan accesibilidad total ni el rendimiento para todos los usuarios”.

### Informes para abrir

- [Lighthouse Desktop — informe visual](informes/lighthouse-desktop.html).
- [Lighthouse Mobile — informe visual](informes/lighthouse-mobile.html).
- [Desktop — datos completos](informes/lighthouse-desktop.json).
- [Mobile — datos completos](informes/lighthouse-mobile.json).
- [Resumen conjunto y configuración](informes/resumen.json).

### Cómo reproducirlo desde Chrome

1. Abrir DevTools → **Lighthouse**. Está integrado en Chrome; la clase también enlaza una extensión.
2. Elegir modo de navegación, **Desktop** y las cuatro categorías: Performance, Accessibility, Best Practices, SEO.
3. Ejecutar y exportar el reporte.
4. Repetir con **Mobile**, manteniendo la misma URL y las mismas categorías.
5. Revisar configuración y elementos señalados antes de comparar solo puntajes.

Si la entrega exige específicamente las extensiones y capturas de sus paneles, reproducir estos pasos en la interfaz: los informes existentes provienen de los motores automatizados, no de una instalación de esos plugins en el perfil personal.

## 4. Estado de las consignas

| Consigna | Estado |
| --- | --- |
| Comparar red y cabeceras de dos sitios | Ejecutada con Chrome; DNS/conexión de la solicitud final de GitHub no disponibles, documentado. |
| Ejecutar comprobación Axe | Ejecutada con axe-core sobre Wikipedia; revisión manual de contraste pendiente. |
| Lighthouse Desktop, cuatro categorías | Ejecutada y configuración verificada. |
| Lighthouse Mobile, cuatro categorías | Ejecutada y configuración verificada. |
| Instalar y usar extensiones en el perfil personal | No realizado; se usaron los motores mediante automatización. |

## 5. Documentación de apoyo

- [Chrome: desglose temporal y cabeceras de Network](https://developer.chrome.com/docs/devtools/network/reference/).
- [Lighthouse: API, CLI y uso integrado en DevTools](https://github.com/GoogleChrome/lighthouse).
- [Axe-core: alcance del análisis automático](https://github.com/dequelabs/axe-core).

Para repasar conceptos: [guía U4](GUIA_PARCIALITO_U4.md). Para practicar: [30 preguntas con respuestas razonadas](PRACTICA_PARCIALITO_U4.md).
