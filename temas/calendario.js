/* =====================================================================
   CALENDARIO DE TEMAS  (este es el único archivo que editas cada mes)

   Cada línea es un tema: una carpeta dentro de /temas con su banner y sus colores.
   La página elige sola el tema según la fecha de hoy.
   Cuando termina el último tema, la página vuelve a los colores base.

   Campos:
     carpeta  -> nombre de la carpeta del tema (dentro de /temas)
     desde    -> primer día, formato AAAA-MM-DD
     hasta    -> último día (incluido), formato AAAA-MM-DD
     banner   -> archivo del banner, dentro de la carpeta del tema
     alt      -> descripción corta del banner (para accesibilidad)
     frase    -> texto del globito de Zeta ("" para no mostrar globito)
     mascota  -> (opcional) otra imagen de Zeta, dentro de la carpeta del tema
     decoracion -> true si el tema tiene decoracion.js (arañas, nieve, etc.)

   PARA PROBAR UN TEMA ANTES DE SU FECHA: abre la página agregando
   ?tema=NOMBRE_DE_LA_CARPETA al final de la dirección. Ejemplo:
   index.html?tema=2026-10-halloween
   ===================================================================== */
var TEMAS=[
  {
    carpeta:"2026-10-halloween",
    desde:"2026-10-01",
    hasta:"2026-11-01",
    banner:"banner.webp",
    alt:"Halloween Tech Fest: ofertas que dan miedo",
    frase:"¿Dudas? ¡Te ayudo! 🧟",
    decoracion:true
  }

  // EJEMPLO para el próximo mes: borra las // del inicio de cada línea,
  // pon una coma después de la llave } del tema anterior y ajusta los datos.
  //
  // {
  //   carpeta:"2026-11-noviembre",
  //   desde:"2026-11-02",
  //   hasta:"2026-11-30",
  //   banner:"banner.webp",
  //   alt:"Ofertas de noviembre",
  //   frase:"¿Dudas? ¡Te ayudo!"
  // }
];
