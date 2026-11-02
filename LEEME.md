# CTRL+Z · Catálogo web

## Estructura

```
ctrlz-tienda/
├── index.html              Estructura de la página (textos, entrega, pagos)
├── LEEME.md                Esta guía
├── css/
│   └── styles.css          Diseño base. Todos los colores son VARIABLES al inicio del archivo
├── js/
│   ├── app.js              Productos, filtros, buscador, botón de WhatsApp (arriba: CONFIG)
│   └── temas.js            Elige el tema del mes según la fecha (no se toca)
├── temas/                  ← AQUÍ se cambia de mes
│   ├── calendario.js       Lista de temas con sus fechas (el ÚNICO archivo que editas cada mes)
│   ├── _plantilla/         Copia esta carpeta para crear un tema nuevo
│   └── 2026-10-halloween/  Tema de octubre: tema.css, decoracion.js, banner y lápida
└── img/
    ├── logo-blanco.png     Logo (blanco: la cabecera siempre debe ser oscura)
    ├── mascota/            Zeta en distintas poses
    ├── iconos/             Íconos de entrega y pago
    └── productos/          Fotos de productos (nombre = SKU, .jpg, cuadradas)
```

## Cambiar de mes (5 pasos)

1. **Copia la carpeta** `temas/_plantilla` y ponle el nombre del mes, por ejemplo `temas/2026-11-noviembre`.
2. **Guarda el banner** dentro de esa carpeta (por ejemplo `banner.webp`).
   Si pesa más de 500 KB, pásalo por https://squoosh.app (formato WebP) antes de subirlo.
3. **Cambia los colores** en `temas/2026-11-noviembre/tema.css`: quita los símbolos de comentario
   de las líneas que quieras cambiar y escribe tus colores. Lo que no toques queda como en la base.
4. **Agrega el tema** en `temas/calendario.js`: copia el ejemplo del final, cambia carpeta, fechas, banner y frase.
5. **Pruébalo antes de su fecha** abriendo `index.html?tema=2026-11-noviembre`.

El tema se activa y se apaga solo según las fechas. Si ningún tema coincide con el día de hoy,
la página usa los colores base y no muestra banner.

## Qué colores puede cambiar un tema

| Variable | Qué pinta |
|---|---|
| `--header-bg` | Fondo de la cabecera y del menú en celular (debe ser oscuro: el logo es blanco) |
| `--header-accent` | Categoría activa y color al pasar el mouse |
| `--header-muted` | Texto de ayuda del buscador |
| `--page-ink` | Textos sueltos sobre el fondo y pie de página |
| `--accent` | Botón "Pedir por WhatsApp", números de pasos, íconos |
| `--accent-soft` | Fondo suave detrás de los íconos |
| `--card-body` | Parte de abajo de cada tarjeta de producto |
| `--price` | Color del precio |
| `--tag-bg` | Etiqueta "Oferta" |

Para un fondo de página especial (degradado, estrellitas, etc.) usa el bloque `body{...}` de la plantilla.

## Decoraciones opcionales (arañas, nieve, confeti...)

Si el tema lleva animaciones, crea un `decoracion.js` dentro de su carpeta (mira el de Halloween como ejemplo)
y pon `decoracion:true` en `calendario.js`. Los estilos de esa decoración van en el `tema.css` del mismo tema.

## Datos que se cambian rara vez

- **Número de WhatsApp y enlace de Google Sheets:** las dos líneas de `CONFIG` al inicio de `js/app.js`.
- **Zeta (botón flotante de WhatsApp):** la imagen por defecto es `img/mascota/zeta-presentacion.png`.
  Un tema puede cambiarla con el campo `mascota` y cambiar el globito con `frase` en `calendario.js`.
- **Textos de entrega y pago:** en `index.html`.

## Cosas que NO se deben borrar

- `<a id="waTop" ...>` del `index.html` (app.js lo necesita para cargar los productos de Google Sheets).
- Los `id` `buscar`, `buscador`, `lupaBtn`, `menuBtn`, `menuCats`, `grid` y `note`.

## Probar en tu computadora

Abre la carpeta en VS Code y usa Live Server (clic derecho en `index.html` → Open with Live Server).
