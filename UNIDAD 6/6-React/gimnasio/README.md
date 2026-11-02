# Pulso Gym: ejercicios de React con Vite

Aplicación independiente para las siete prácticas de la Unidad 6. Se creó con la plantilla oficial React + JavaScript de create-vite.

```powershell
npm install
npm run dev
```

Abrir http://localhost:5173. Para compilar: `npm run build`; para revisar código: `npm run lint`. La app de desarrollo admite navegación directa a /login y /actividades.

| Consigna                | Implementación                                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Instalación usando Vite | package.json, package-lock.json, index.html y vite.config.js                                                                   |
| Login básico            | src/pages/Login.jsx, formulario controlado con useState; admin/admin, mensajes exactos Login OK y Login Incorrecto por consola |
| CSS y adaptación a Sass | src/styles/login-basico.css conserva el equivalente en CSS tradicional; estilos finales modularizados en SCSS                  |
| Redirección             | useNavigate lleva a /actividades después de validar                                                                            |
| Outlet                  | components/Layout.jsx mantiene Header y Footer; main renderiza Outlet                                                          |
| Sesión                  | estado en App compartido por Header y Actividades; inscripción solo con sesión y botón Logout                                  |
| Estructura              | components, pages y styles dentro de src; alias @ apunta a src                                                                 |
| Imágenes                | public/home contiene yoga.svg y funcional.svg; assets/home contiene spinning.svg y musculacion.svg                             |
| Children                | Card recibe titulo, subtitulo, imagen, alt y children                                                                          |
| Datos separados         | src/data/actividades.js contiene las cuatro actividades                                                                        |

Las ilustraciones SVG son locales. Los archivos de public se referencian mediante URL; los de assets se importan y Vite les asigna un nombre durante el build.

Se conserva /Home además de /. Una ruta inexistente muestra una página para volver al inicio. Las inscripciones son locales y se reinician al cerrar sesión o recargar; no hay backend, pagos ni API de Unidad 7. El login es la simulación didáctica solicitada, sin guardar contraseñas.

## Verificación

```powershell
npm test
npm run lint
npm run format:check
npm run build
```

Las pruebas usan Chrome instalado en el equipo, mediante Playwright. Comprueban login incorrecto/correcto, redirección, inscripción, Logout, imágenes, rutas y vista móvil. La suite también revisa las prácticas estáticas anteriores desde un servidor temporal de archivos.

El proyecto usa ESLint y Prettier según la clase de Node. Se conserva ESLint 9 por compatibilidad con eslint-plugin-react; el informe de entrega registra el resultado real de npm audit.

La consigna de actividades no adjunta una lista de datos concreta; se usan Yoga, Spinning, Funcional y Musculación como información de ejemplo. El formato y los componentes siguen lo pedido en clase.
