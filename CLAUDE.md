# Invitación de boda digital

## Carpeta base del proyecto

`C:\Users\dev1\Claude\Projects\Invitacion Bodas`

Todos los cambios se escriben aquí. Esta carpeta es la fuente de verdad del proyecto; la versión publicada en Claude (artifact "Nuestra boda") se actualiza a partir de estos archivos.

## Qué es

Invitación web de boda, estática (HTML + CSS + JS, sin build ni dependencias), que se cuenta al hacer scroll:
sobre con sello de lacre que se abre y arranca la música, fotos fijas a pantalla completa que se disuelven entre secciones, paneles semitransparentes, fondos con textura de lino, ramos botánicos que se dibujan solos, confirmación por WhatsApp, pases personalizados por invitado y versión español / inglés.

Se abre con doble clic en `index.html` o con Live Server en VS Code.

## Estructura

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura y orden de las secciones (escenas con foto y secciones con textura) |
| `css/estilos.css` | Paleta, tipografías, texturas, paneles, animaciones |
| `js/config.js` | **Datos de la boda**: nombres, fecha, lugares, nombramientos, itinerario, info, vestimenta, menú, hospedaje, regalos, fotos por momento, WhatsApp, hashtag, invitados con pase, canción |
| `js/textos.js` | Textos fijos en `es` y `en` (objeto `UI`) |
| `js/app.js` | Lógica: sobre, música, render, motor de scroll, entradas, pétalos, visor de fotos, formularios |
| `fotos/` | Por cada foto: `x-movil.webp` (800 px) y `x-pc.webp` (1200 px), generadas desde el original. Los `x.jpg` quedan como respaldo y ya no se cargan |
| `js/fotos-previa.js` | Vistas previas diminutas (24 px, base64) que se muestran difuminadas mientras carga cada foto |
| `musica/cancion.mp3` | "A Thousand Years" (128 kbps, sin silencio final) |
| `LEEME.md` | Guía rápida para editar |
| `Invitacion-Boda.html` | Versión de un solo archivo (fotos y canción incrustadas) generada desde el proyecto; no editar a mano, regenerar tras cada cambio |
| `publicar-github.bat` | Sube el proyecto a GitHub (git init, commit y push a `main`) para publicarlo con GitHub Pages; `.nojekyll` evita que Jekyll procese el sitio y `.gitignore` excluye `Invitacion-Boda.html` |
| `compartir-ngrok.bat` | Levanta `python -m http.server 4321 --bind 127.0.0.1` en esta carpeta y abre un túnel `ngrok http` (puerto 4321; el 8080 está bloqueado en este equipo) para compartir un enlace de muestra |

## Reglas de diseño acordadas

- **Paleta (propuesta de decoración):** espresso `#33251d`, taupe `#8c705c`, sand `#c9b9a3`, soft dune `#ece2d2`, vanilla `#f5efe6`, sage `#8a9886` (solo como acento: hojas y sello).
- **Tipografías:** Corinthia (nombres y títulos), Cinzel (fechas, horas, etiquetas y botones, en mayúsculas espaciadas), EB Garamond (textos). Evitar fuentes "de IA" (Jost, Inter, etc.).
- **Motivo:** arco (marcos de fotos, tarjetas, paneles), ramos de eucalipto y gypsophila seca.
- **Nada plano:** cada sección lleva fondo con textura (lino claro, soft dune o espresso con veta) o una foto fija de fondo. Los paneles sobre fotos son de vidrio (`.glass`, `.glass.light`).
- **Scroll tipo historia:** las escenas (`.scene`) tienen la foto fija (`.stage` sticky) y el contenido pasa encima; la foto se acerca, se difumina y se desvanece al llegar la siguiente sección. Los bloques con `data-fx` aparecen y se desvanecen según su posición. `data-a` son entradas de una sola vez (`up`, `blur`, `write`).
- Respetar `prefers-reduced-motion`.
- La página de referencia (te-invito.com.mx) pide no replicar su diseño: tomar solo ideas generales de funciones y comportamiento, nunca copiar sus ilustraciones, textos ni composición.

## Fotos por momento

| Sección | Foto |
|---|---|
| Portada | `portada.jpg`: abrazo de cuerpo entero |
| Cuenta regresiva | `frase.jpg`: espalda con espalda, tomados de la mano |
| Bienvenida (fotos impresas) | `historia-1/2/3.jpg`: cámara y tripié, nariz con nariz, con su perrito |
| Itinerario e información | `itinerario.jpg`: paso de baile con su perrito |
| Vestimenta | `vestimenta.jpg`: él de traje, ella al fondo |
| Confirmación | `rsvp.jpg`: ella lo lleva de la mano |
| Cierre | `cierre.jpg`: retrato de los dos |

## Pendientes

- Reemplazar todos los datos de ejemplo de `js/config.js` (nombres, fecha, lugares, padres y padrinos, menú, hoteles, cuenta bancaria, número de WhatsApp, hashtag, enlace del álbum, invitados) y quitar la línea "Datos de ejemplo" (`sample` en `textos.js` / `index.html`).

## Fotos y rendimiento

- En `config.js` las fotos se nombran `fotos/x.jpg`; `app.js` las sirve como WebP con `srcset` (`x-movil.webp 800w`, `x-pc.webp 1200w`) y `sizes` según el uso (escena a pantalla completa, foto impresa, visor).
- Las fotos que también son fondo de escena se reutilizan en la galería con la misma versión `-pc` (ya descargada).
- Foto nueva: generar `-movil.webp` (800 px, calidad 70) y `-pc.webp` (1200 px, calidad 72) desde el original, y agregar su vista previa de 24 px a `js/fotos-previa.js`.
- Los fondos de escena cargan desde el inicio con `fetchpriority="low"` (solo la portada con `high`); la canción usa `preload="none"` y se descarga al abrir el sobre.

## Al hacer cambios

- Editar los archivos en su lugar; no reescribirlos desde cero.
- Comprobar sintaxis de JS (`node --check`) y revisar la página en vista de celular (390 px) y escritorio.
- Los ids deben ser únicos (un `id="env"` duplicado con un `<symbol>` ya rompió el sobre una vez; los íconos usan el prefijo `i-`).
