/* Decoración de Halloween: niebla, lápida y arañitas.
   Se carga sola porque en temas/calendario.js dice decoracion:true */
(function(){
  function iniciar(){
    var ruta=TEMA.ruta;

    // Detrás del contenido: niebla
    var fondo=document.createElement("div");
    fondo.className="deco-fondo"; fondo.setAttribute("aria-hidden","true");
    fondo.innerHTML='<div class="deco-niebla n1"></div><div class="deco-niebla n2"></div>';
    document.body.appendChild(fondo);

    // Delante del contenido (sin bloquear clics): lápida
    var frente=document.createElement("div");
    frente.className="deco-frente"; frente.setAttribute("aria-hidden","true");
    frente.innerHTML='<img class="deco-lapida" src="'+ruta+'lapida.png" alt="" style="left:3%">';
    document.body.appendChild(frente);

    // Arañitas que cuelgan del borde de arriba
    var capa=document.createElement("div");
    capa.className="deco-aranas"; capa.setAttribute("aria-hidden","true");
    [8,22,38,55,70,86].forEach(function(izq,i){
      var a=document.createElement("div");
      a.className="deco-arana";
      a.style.cssText="left:"+izq+"%;--h:"+(16+(i*7)%26)+"vh;animation-duration:"+(7+(i%3)*2)+"s;animation-delay:-"+(i*1.7).toFixed(1)+"s";
      a.innerHTML="<span>🕷️</span>";
      capa.appendChild(a);
    });
    document.body.appendChild(capa);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciar);
  else iniciar();
})();
