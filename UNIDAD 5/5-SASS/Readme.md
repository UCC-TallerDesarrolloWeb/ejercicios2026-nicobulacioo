## Unidad 5: Frameworks y Preprocesadores CSS

## Entrega y ejecución
- [Sass básico](index.html): variables en _variables.scss, anidación en _componentes.scss y mixin de fondo/texto en _mixins.scss.
- [Diseño de interiores](interiores/index.html): header, nav, section y footer, SCSS modular y ajustes en _mobile.scss.

Desde esta carpeta:
```powershell
npm install
npm run build
npm run watch
```

El build genera styles.css y interiores/css/styles.css. Los CSS compilados se incluyen para abrir las páginas sin instalar herramientas. Se usa @use; el módulo mobile exporta un mixin que se incluye después de desktop para respetar la cascada.

## Consignas originales

### Ejercicio: Sass básico

1. Crea un archivo styles.scss
2. Ejecuta sass --watch styles.scss styles.css en la consola del proyecto para transpilar el scss a css
3. Crea una variable para almacenar colores y usalo en algún elemento
4. Agrega estilos por (descendientes) anidación
5. Crea un nuevo archivo de sass para que los estilos anidados estén separados. Crea otro archivo para las variables.
6. Crea un mixin que reciba un color para el fondo y un color para las letras. Reutilizalo en diferentes elementos html.

### Ejercicio: Diseño de Interiores

1. Creamos un index.html con su header, nav, section, footer
2. Creamos una carpeta scss con el archivo styles.scss dentro
3. Ejecutamos sass --watch scss/styles.scss css/styles.css
4. Agregamos los estilos para desktop
5. Creamos un archivo _mobile.scss y agregamos los estilos mobile
