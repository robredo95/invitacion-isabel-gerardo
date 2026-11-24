# Invitación de boda

Invitación web que se va contando al hacer scroll: sobre con sello, música, fotos fijas que se desvanecen, confirmación por WhatsApp, pases personalizados y versión en inglés.

## Cómo verla

Abre `index.html` con doble clic en Chrome, Edge o Safari.

Si editas con VS Code, instala la extensión **Live Server**, haz clic derecho sobre `index.html` y elige **Open with Live Server**. La página se recarga sola cada vez que guardas.

## Qué archivo editar

| Quieres cambiar… | Archivo |
|---|---|
| Nombres, fecha, lugares, padrinos, itinerario, menú, hoteles, regalos, WhatsApp, invitados | `js/config.js` |
| Fotos (reemplaza el archivo manteniendo el nombre, o cambia la ruta en `config.js`) | `fotos/` |
| Canción | `musica/cancion.mp3` |
| Títulos y textos fijos en español e inglés | `js/textos.js` |
| Colores, tipografías, tamaños y animaciones | `css/estilos.css` |
| Orden y estructura de las secciones | `index.html` |
| Comportamiento (sobre, scroll, música, formularios) | `js/app.js` |

## Pases personalizados

En `js/config.js`, dentro de `invitados`, cada invitado tiene un id:

```js
"familia-lopez": { nombre: "Familia López Martínez", pases: 4, mesa: 7 }
```

Su enlace es la dirección de la invitación terminada en `#familia-lopez`.

## Colores (paleta de decoración)

Espresso `#33251d` · Taupe `#8c705c` · Sand `#c9b9a3` · Soft dune `#ece2d2` · Vanilla `#f5efe6` · Sage `#8a9886`

## Tipografías (Google Fonts)

Corinthia (nombres y títulos) · Cinzel (fechas, horas, botones) · EB Garamond (textos)
