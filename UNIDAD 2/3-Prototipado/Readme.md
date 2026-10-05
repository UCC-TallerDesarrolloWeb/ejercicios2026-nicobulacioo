# Prototipado - Pagina web de restaurante

## Alcance: etapa previa de diseño

Estos archivos conservan una propuesta inicial de cuatro páginas (Inicio, Conocenos, Menú y Pedido), con datos para entrega a domicilio. No son la especificación vigente ni los entregables finales del proyecto grupal.

La versión final tiene cinco páginas (Inicio, Menú, Nosotros, Ubicación y Pedido) y pedidos por mesa, con apellido, mesa y método de pago. Consultar el [repositorio grupal](https://github.com/Agus269/Proyecto2026-Rodr-guezRichard-Bulacio) y el [sitio publicado](https://agus269.github.io/Proyecto2026-Rodr-guezRichard-Bulacio/primera-entrega/).

Los SVG de `Sketch/` son bocetos digitales de esta etapa, **no dibujos hechos a mano**. Las fotos y el sketch requerido para la entrega final quedan a cargo de Agus; no se da ese requisito por cumplido mediante estos SVG.

## Archivos

- `index.html`: presentacion completa de los entregables.
- `Proyecto-restaurante.md`: descripcion funcional y decisiones aprobadas.
- `Evaluacion-interfaz.md`: aplicacion de principios de diseño, mensajes y usabilidad.
- `diagrama-organizacion.svg`: arquitectura de informacion.
- `Sketch/`: bocetos digitales históricos para computadora y celular.
- `Wireframes/`: wireframes desktop/mobile y wireflow del pedido.
- `prototipo.html`: prototipo navegable de fidelidad media.
- `verify.js`: comprobacion automatica de archivos y requisitos.

## Consignas cubiertas

| Consigna | Entregable |
| --- | --- |
| Diagrama de organizacion | `diagrama-organizacion.svg` |
| Bocetos digitales (no acreditan sketch manual) | `Sketch/sketch-desktop.svg` y `Sketch/sketch-mobile.svg` |
| Wireframe de escritorio | `Wireframes/wireframe-desktop.svg` |
| Wireframe para celular | `Wireframes/wireframe-mobile.svg` |
| Wireflow | `Wireframes/wireflow.svg` |
| Prototipo navegable | `prototipo.html` |
| Evaluacion de interfaz | Seccion Evaluacion de `index.html` |

## Decisiones de interfaz

- Navegacion principal: Inicio, Conocenos, Menu y Pedido.
- La ubicacion no aparece como categoria independiente.
- CONOCENOS alterna imagen y texto en escritorio; en celular apila imagen y texto.
- El mapa se ubica al final de CONOCENOS y abre Google Maps.
- El pie de pagina conserva solamente un contacto breve.
- Pedido incluye productos, datos del cliente, metodo de pago y confirmacion.

## Verificacion

```powershell
node "UNIDAD 2\3-Prototipado\verify.js"
```
