# Ejercicios U1–U6 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Completar y verificar las prácticas disponibles hasta Unidad 6.
**Architecture:** Archivos separados de Bootstrap y SASS y proyecto React de gimnasio; mantener las soluciones previas y documentar la correspondencia entre consigna y archivo.
**Tech Stack:** HTML, CSS, JavaScript, Bootstrap, Dart Sass, Node, ESLint, Prettier, JSDoc, React, Vite, React Router.
**Spec:** docs/superpowers/specs/2026-11-02-ejercicios-u1-u6-design.md

## Global Constraints
No modificar Unidad 7. No sobrescribir cambios ajenos. Fechas reales de commits. No inventar evidencia de actividades manuales o personales. Seguir README y ejemplos de las clases.

## Review Focus
- Anchos pequeños: no desbordar formularios/columnas.
- Login incorrecto: no concede sesión ni redirige.
- Logout: oculta inscripción y elimina estado de sesión.
- Navegación directa: conserva layout y muestra página desconocida.
- Imágenes: public se referencia por URL y assets mediante import.

### Task 1: Auditoría y correcciones HTML/CSS
**Files:** UNIDAD 2/1-HTML/*.html, UNIDAD 2/2-CSS/ej_columnas.html, ej_columnas_inline.html, ej_leyes.html; docs/ESTADO_U1_U6.md.
- [x] Revisar ejercicios contra clases y detectar defectos; evidencia en docs/ESTADO_U1_U6.md.
- [x] Corregir límites de edad, viewport/idioma, listas y box-sizing; conservar versión inline. Etiquetar ocho operandos y rechazar entradas vacías antes de convertirlas a Number.
- [x] Verificar HTML, pruebas JS y prototipado.
- [x] Commit de correcciones y registro de alcance.

### Task 1b: Práctica Git U1
**Files:** UNIDAD 1/PRACTICA_GIT.md y registro de resultados de una práctica en repositorio temporal independiente.
- [x] Ensayar add/reset/stash/apply/checkout/reset soft/amend y ramas sin operar sobre la historia del alumno.
- [x] Registrar comandos y resultados reales; distinguir práctica local de acciones personales/grupales externas.
- [x] Conservar las reglas Classroom existentes y documentar la configuración requerida por la clase como pendiente de decisión del dueño del repositorio.

### Task 2: Bootstrap
**Files:** UNIDAD 5/4-Bootstrap/{index,ej_instagram,ej_vuelos,ej_timeline,ej_perfil,ej_youtube}.html, estilos.css, interacciones.js.
- [x] Crear cada ejercicio con clases Bootstrap y navegación entre prácticas.
- [x] Implementar selección de vuelo con confirmación local y sin envío de datos.
- [x] Validar HTML, columnas md y flujo del formulario en navegador.
- [x] Commit por ejercicio.

### Task 3: SASS
**Files:** UNIDAD 5/5-SASS/{package.json,package-lock.json,styles.scss,_variables.scss,_componentes.scss,index.html,styles.css,interiores/**}.
- [x] Crear práctica básica: variable, anidación separada, mixin con 2 parámetros reutilizado.
- [x] Crear interiores con estructura semántica y módulo mobile.
- [x] Compilar con Dart Sass y comprobar layouts a 390 y 1280 píxeles.
- [x] Commit por ejercicio.

### Task 4: Node y herramientas
**Files:** UNIDAD 5/6-Node/{package.json,package-lock.json,eslint.config.js,.prettierrc.json,ejemplo-doc.js,Readme.md}.
- [x] Instalar/configurar ESLint, Prettier, globals y JSDoc localmente.
- [x] Crear funciones documentadas y verificar comportamiento con entradas válidas e inválidas.
- [x] Ejecutar lint, format y docs; ignorar dependencias y salidas de build.
- [x] Commit con resultados.

### Task 5: React incremental
**Files:** UNIDAD 6/6-React/{package.json,package-lock.json,index.html,vite.config.js,eslint.config.js,src/**,public/home/**}.
- [x] Inicializar Vite React JavaScript, instalar dependencias y guardar lock.
- [x] Login básico: formulario controlado y admin/admin, mantener CSS básico como etapa y adaptar a SASS.
- [x] Rutas y redirección tras login; layout Header/Main/Outlet/Footer; sesión elevada a App.
- [x] Organizar components/pages/styles y alias @.
- [x] Agregar 2 imágenes public y 2 assets, 4 cards con alt.
- [x] Extraer Card con title/subtitle/children y datos de actividades.
- [x] Verificar login incorrecto/correcto, rutas, logout y visibilidad de inscripción; lint y build.
- [x] Commit por ejercicio.

### Task 6: Integración y entrega
**Files:** Readme.md, README de cada práctica, docs/ESTADO_U1_U6.md.
- [x] Actualizar checklist solamente con evidencia.
- [x] Revisar diff, archivos ignorados y límites de alcance.
- [x] Ejecutar verificaciones finales y publicar ramas por unidad con commits reales; conservar rama de planificación y separar revisión U2/U3, herramientas/Bootstrap/SASS U5 y React U6. Preparar PR por unidad y registrar merge/revisión con su estado real.
- [x] Informar enlaces y pendientes que requieren al alumno.

