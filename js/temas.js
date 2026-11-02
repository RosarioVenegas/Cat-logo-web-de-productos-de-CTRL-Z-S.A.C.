/* =====================================================================
   ELIGE EL TEMA DEL MES  (no necesitas tocar este archivo)
   Lee temas/calendario.js, busca el tema que corresponde a la fecha de hoy
   y carga su tema.css. Deja el resultado en la variable TEMA.
   ===================================================================== */
(function(){
  function dos(n){return (n<10?"0":"")+n}
  var d=new Date();
  var hoy=d.getFullYear()+"-"+dos(d.getMonth()+1)+"-"+dos(d.getDate());

  var pedido=null;
  try{pedido=new URLSearchParams(location.search).get("tema")}catch(e){}

  var elegido=null;
  (window.TEMAS||[]).forEach(function(t){
    if(pedido ? t.carpeta===pedido : (hoy>=t.desde && hoy<=t.hasta)) elegido=t;
  });

  var t=elegido||{};
  var ruta=elegido ? "temas/"+t.carpeta+"/" : "";
  window.TEMA={
    carpeta:t.carpeta||"",
    ruta:ruta,
    banner:t.banner||"",
    alt:t.alt||"",
    frase:(t.frase!==undefined)?t.frase:"¿Dudas? ¡Te ayudo!",
    mascota:t.mascota ? ruta+t.mascota : "img/mascota/zeta-presentacion.png",
    decoracion:!!t.decoracion
  };

  if(elegido){
    var l=document.createElement("link");
    l.rel="stylesheet"; l.href=ruta+"tema.css";
    document.head.appendChild(l);
    if(t.decoracion){
      var s=document.createElement("script");
      s.src=ruta+"decoracion.js";
      document.head.appendChild(s);
    }
  }
})();
