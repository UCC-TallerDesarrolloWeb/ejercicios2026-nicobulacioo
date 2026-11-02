# Node, ESLint, Prettier y JSDoc

Prácticas de `U5_node.html`. Las herramientas se instalan en este proyecto, sin modificar instalaciones globales.

```powershell
npm install
npm test
npm run lint
npm run format:check
npm run docs
```

- `package.json`: nombre, descripción, versión, autor, tipo de módulo y scripts.
- `package-lock.json`: versiones instaladas, generado por npm.
- `eslint.config.js`: configuración plana, entorno Node, reglas recomendadas, igualdad estricta e integración de Prettier.
- `.prettierrc.json`: comillas simples, punto y coma y coma final.
- `ejemplo-doc.js`: las funciones calcularArea y crearUsuario del ejemplo de clase, implementadas y documentadas.
- `ejemplo-doc.test.js`: ejemplos válidos e inválidos.
- `out/index.html`: documentación generada al ejecutar `npm run docs`; la salida se ignora porque es reproducible.

`npm run format` aplica el formato. El .gitignore de la raíz excluye node_modules. No se cambia la política de ejecución de PowerShell ni las preferencias personales de VSCode.

ESLint 9 se conserva por compatibilidad con los plugins de React/import empleados en estas prácticas. Consultar el informe final de verificación para el resultado real de npm audit; no aplicar downgrades sugeridos por --force sin revisar compatibilidad.
