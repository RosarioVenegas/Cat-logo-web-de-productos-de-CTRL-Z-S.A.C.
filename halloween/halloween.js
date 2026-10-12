/* Tema Halloween "Zeta zombie": se apaga solo desde el 2 de noviembre de 2026 */
(function(){
  if(new Date()>=new Date(2026,10,2)) return;
  var l=document.createElement("link");
  l.rel="stylesheet"; l.href="halloween/halloween.css";
  document.head.appendChild(l);
  document.body.classList.add("hw");

  // Fondo: niebla verde, lápidas con chistes de tecnología y Zeta
  var fondo=document.createElement("div");
  fondo.className="hw-fondo"; fondo.setAttribute("aria-hidden","true");
  fondo.innerHTML=
    '<div class="hw-mist hw-m1"></div><div class="hw-mist hw-m2"></div>'+
    '<div class="hw-tomb" style="left:3%">R.I.P.<br>lentitud</div>'+
    '<div class="hw-tomb" style="left:calc(3% + 110px);height:96px;width:80px;opacity:.9">R.I.P.<br>pantallazo azul</div>'+
    '<div class="hw-say">¡Revivimos tu PC! 🧟</div>'+
    '<img class="hw-zeta" src="img/zeta.png" alt="">';
  document.body.appendChild(fondo);

  // Arañitas que bajan por su hilo y vuelven a subir
  var capa=document.createElement("div");
  capa.className="hw-aranas"; capa.setAttribute("aria-hidden","true");
  [8,22,38,55,70,86].forEach(function(izq,i){
    var a=document.createElement("div");
    a.className="hw-sp";
    a.style.cssText="left:"+izq+"%;--h:"+(16+(i*7)%26)+"vh;animation-duration:"+(7+(i%3)*2)+"s;animation-delay:-"+(i*1.7).toFixed(1)+"s";
    a.innerHTML="<span>🕷️</span>";
    capa.appendChild(a);
  });
  document.body.appendChild(capa);
})();
