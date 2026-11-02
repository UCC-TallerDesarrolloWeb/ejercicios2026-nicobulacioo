# Revisión de clases y ejercicios U1–U6
Fecha: 2 de noviembre de 2026. Estado: prácticas de código implementadas y verificadas; actividades manuales y personales separadas. Unidad 7 excluida.

## Fuentes revisadas
15 clases locales:
- U1: U1_herramientas.html, U1_git.html, U1_git_avanzado.html.
- U2: U2_CSS.html, U2_CSS_avanzado.html, U2_HTML_avanzado.html, U2_interfazUsuario.html, U2_prototipado.html.
- U3: U3_javaScript1.html, U3_javaScript2.html, U3_javaScript3.html.
- Raíz: U4_navegador.html, U5_node.html, U5_preprocesadoresCSS.html.
- U6: U6_frameworks.html.
Se contrastaron README de ejercicios, soluciones HTML/CSS/JS y evidencia U4. No hay una clase introductoria de HTML separada entre los archivos actuales; sus consignas están en el README.
Se revisaron texto, código y consignas. No se presentan como vistos los videos externos enlazados. Una segunda revisión confirmó las omisiones y comprobó también el desborde de multimedia.

## Enfoque de la profe que debe conservarse
| Unidad | Métodos y criterios |
| --- | --- |
| 1 | Conventional Commits, commit por ejercicio, rama por unidad, PR y merge; presentación con Markdown y .gitignore. |
| 2 HTML | Semántica header/nav/main/footer; h1/h3/h6/h5 según ejercicio de noticia; listas ol/ul, tabla con thead/tbody/caption/colspan/rowspan, formularios label/for, fieldset/legend, multimedia. |
| 2 CSS | Etapa inline y copia incrustada; selectores tag/ID/clase/descendientes/pseudoclases; modelo de cajas, float + clear y column-count, grid/grid-areas, variables CSS y transitions, media queries 601/600. |
| 2 interfaz/prototipado | Visibilidad, consistencia, retroalimentación, recuperabilidad y mensajes claros; distinguir sketch en papel, wireframe, wireflow y prototipo navegable. |
| 3 | onchange/onload; conversión a Number; funciones flecha, variables antes de asignar UI; Math.PI y redondeo; DOM, innerHTML, dialog; JSON + localStorage; filter/sort/splice; Intl.NumberFormat. |
| 4 | Network/Headers/Timing; DOM/CSSOM/Render Tree/layout/paint/compositing; defer/async, accesibilidad, Axe y Lighthouse por dispositivo. |
| 5 Node | package.json con scripts y dependencias; package-lock versionado; node_modules ignorado; ESLint, Prettier, JSDoc. |
| 5 CSS | Rejilla/utilidades/componentes Bootstrap; Sass compilado a CSS, variables, anidación moderada, mixins, módulos @use, estilos desktop/mobile separados. |
| 6 | Vite + React JavaScript; login controlado, rutas con react-router-dom, layout y Outlet, estado compartido de sesión, components/pages/styles y alias, imports de assets y URL public, Card con props y children, datos separados. |

No copiar erratas literales de las filminas: por ejemplo toFix debe ser toFixed y innerHtml debe ser innerHTML; mantener el método de resolución con sintaxis ejecutable.

## Diagnóstico inicial de prácticas y pendientes (antes de implementar)
| Unidad | Encontrado | Trabajo pendiente |
| --- | --- | --- |
| 1 | Presentación myreadme.md, .gitignore y repositorio GitHub con PR anterior mergeado. | Laboratorio de comandos Git en repositorio de práctica; inventariar explícitamente instalaciones personales, Jira y configuración GitHub. No modificar protecciones Classroom automáticamente. |
| 2 | Noticias, receta, tablas, formulario, multimedia, CV, backgrounds, columnas, galería, catálogo y prototipo. | Corregir defectos debajo y conservar copia de estilos inline pedida por la clase. Sketch en papel y fotos siguen siendo manuales; prototipo local es etapa previa del restaurante. |
| 3 | Ejercicios básicos, conversor, ángulos, mostrar/ocultar, operaciones, documentación, catálogo y carrito. | Etiquetas accesibles y viewport en ejercicios básicos; no interpretar input vacío como cero. Verificar que el color del bloque mostrar/ocultar corresponda a la consigna celeste. |
| 4 | Reportes Network, Axe y Lighthouse existentes del 19/10/2026. | Conservar fecha/condiciones reales; las extensiones personales y pruebas manuales de contraste/teclado no están acreditadas. |
| 5 Bootstrap | Solo README. | Instagram, vuelos, timeline, perfil y YouTube. Faltan las referencias visuales mencionadas por las cuatro últimas consignas; consulta al usuario pendiente. |
| 5 SASS | Solo README. | Sass básico e interiores, fuentes SCSS + CSS compilado. |
| 5 Node | Clase disponible; no proyecto de práctica/configuración. | package.json, lock, lint, formatter, funciones y documentación JSDoc reproducible. |
| 6 | Clase y README; sin app React. | Los siete ejercicios del gimnasio: instalación, login, rutas, Outlet, estructura/alias, imágenes y children. |

## Defectos comprobados
1. UNIDAD 2/2-CSS/ej_columnas.html:44: width 50% más padding sin border-box hace que las dos columnas float se apilen incluso en escritorio. A viewport 1280 cada columna ocupa 650 px dentro de padre de 1264; sus posiciones verticales son distintas.
2. UNIDAD 2/1-HTML/ej_formulario.html: faltan viewport y estilos fluidos; a viewport 390 desborda. edad usa maxlength en type=number: el navegador no limita su valor; se requieren min/max/step.
3. UNIDAD 2/1-HTML/ej_animales.html: video e iframe con width 560 deben conservar proporción y adaptarse al ancho móvil.
4. UNIDAD 2/1-HTML/index.html: falta idioma, charset y viewport.
5. UNIDAD 2/2-CSS/ej_leyes.html: declara inglés para contenido español y contiene lista ol dentro de p.
6. UNIDAD 2/2-CSS/ej_cv.html: user-scalable=no impide ampliar; conviene permitir zoom conservando el ejercicio de viewport.
7. UNIDAD 3/3-Js/operacionesMatematicas.html: ocho inputs sin nombre accesible.
8. UNIDAD 3/3-Js/misFunciones.js:7: Number('') y Number('   ') producen cero. La consigna pide operar luego de ingresar ambos valores; probar y corregir vacío antes de convertir.
9. UNIDAD 3/3-Js/miEstilo.css:28: el bloque a mostrar/ocultar es naranja aunque la consigna indica celeste.
10. El formulario básico usa envío GET predeterminado con campos de contraseña: la práctica debe impedir el envío real y mostrar una confirmación local.
11. El favicon del CV es JPG, pero declara MIME ICO; ajustar el tipo a image/jpeg.

## Evidencia obtenida en esta revisión
- Node v24.22.1 disponible.
- Suite existente: 23 pruebas JavaScript, 23 aprobadas, 0 fallidas.
- Prototipado: 12 entregables y 5 secciones verificadas.
- Chrome headless: comprobación de columnas y formulario a 390 y 1280 píxeles; campos de operaciones sin etiquetas.
- Navegador Chrome instalado utilizable sin descargar otro navegador.
- npm no está en PATH; pnpm sí está disponible. La implementación debe generar package-lock auténtico usando npm local, sin instalar globalmente ni cambiar políticas de PowerShell.
- GitHub conectado. Rama inicial unidad2; se creó codex/puesta-al-dia-u1-u6 para planificar. Los cambios locales previos permanecen sin incluir en commits.
- Repositorio tiene protecciones Classroom existentes; no se reemplazan.
- Al cerrar la auditoría inicial todavía no se habían hecho commits ni push; el registro final se agrega al completar la entrega.

## Verificación prevista y ejecutada durante la implementación
Reproducir y corregir fallos reales; validar HTML, recompilar SASS, generar JSDoc, ejecutar lint/format y build React; comprobar login inválido/válido, rutas directas, logout, inscripción y las cuatro imágenes. Actualizar checklist solo después de obtener evidencia.

## Acciones que requieren participación del alumno
- Sketch a mano y fotografías reales.
- Participación y asignación grupal de Jira.
- Cuentas, licencias y configuración de autenticación personal.
- Instalación de extensiones en el perfil personal si se exige literalmente.
- Aprobación de PR por otra persona si la política lo exige.
- La prueba con usuarios del restaurante está propuesta: no se acredita observación de personas sin ejecutarla.


## Resultado de la implementación

- U1: práctica de Git ejecutada con verificaciones en repositorio temporal independiente.
- U2: correcciones de HTML, formulario y multimedia fluidos, columnas float corregidas y versión inline conservada.
- U3: vacío ya no equivale a cero, etiquetas accesibles y viewport; documentación JSDoc regenerada.
- U4: se conservan informes originales del 19/10/2026 y sus límites; no se cambian resultados históricos.
- U5: cinco ejercicios Bootstrap, dos prácticas SASS y proyecto Node con ESLint/Prettier/JSDoc y validación HTML.
- U6: aplicación gimnasio creada con Vite, login admin/admin, rutas/Outlet, sesión, inscripción, cuatro imágenes, Card/children y datos separados.
- U7: excluida, sin modificaciones.

### Comprobaciones finales
| Comprobación | Resultado |
| --- | --- |
| JavaScript: conversiones, estructura y tienda | 24 aprobadas |
| Node: funciones documentadas | 2 aprobadas |
| Chrome: app React, Bootstrap, SASS y correcciones previas | 10 aprobadas |
| Prototipado existente | 12 entregables y 5 secciones |
| HTML de las 8 páginas nuevas Bootstrap/SASS | Sin errores con html-validate |
| Compilación de las 2 entradas SASS | Correcta |
| Build React | Correcto |
| ESLint y Prettier de Node/React | Sin errores |
| JSDoc Node y U3 | Generado correctamente |
| npm audit runtime React | 0 vulnerabilidades |

### Decisiones y límites reales
1. El usuario autorizó continuar en las carpetas actuales; se conservaron duplicados Lenovo y se usaron ramas por unidad, sin reescribir historia ni alterar fechas.
2. La plantilla oficial de Vite se creó en UNIDAD 6/6-React/gimnasio para conservar el README original de consignas.
3. Al faltar capturas Bootstrap, se compararon alternativas y se eligieron maquetas representativas. El usuario autorizó esta decisión; no se afirma fidelidad a referencias ausentes. Ver UNIDAD 5/4-Bootstrap/INTERPRETACION_CONSIGNAS.md.
4. Se usaron ilustraciones SVG locales y actividades de ejemplo, porque no hay un conjunto de datos adjunto en la consigna React.
5. Se conserva el CSS tradicional equivalente del login como referencia y la aplicación final usa SASS. No se inventa una cronología de trabajo previa.
6. ESLint 9 se mantiene por compatibilidad con plugins de React/import. npm audit completo informa 8 avisos moderados en herramientas de Node y 9 en herramientas de React, relacionados con dependencias de desarrollo; el audit de producción React no informa vulnerabilidades. No se aplicaron los downgrades incompatibles propuestos por --force. Esta limitación queda registrada.
7. Se corrigió en la revisión independiente un enlace de video: la tarjeta HTML ahora lleva al ejercicio de accesibilidad de la clase, y una prueba reproduce y verifica la corrección. No quedaron otros hallazgos importantes en esa revisión.

Las tareas manuales y personales enumeradas arriba siguen requiriendo participación del alumno; no se marcaron como realizadas.
