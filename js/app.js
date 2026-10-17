/* ===== CONFIGURACIÓN: solo cambia estas dos líneas ===== */
var CONFIG={
  whatsapp:"51902182909",   // tu número con 51 al inicio, sin espacios ni +
  sheetCsv:"https://docs.google.com/spreadsheets/d/e/2PACX-1vSwgSQrSAbqm9nZbIb8mS-a6c9EL3zyKrD5V_x4tUbj7vVMKBNNCdVunQxfD0lfe_oXjKTLdWdL_o1A/pub?gid=1926199547&single=true&output=csv"               // enlace CSV de tu Google Sheet publicado (vacío = productos de ejemplo)
};
/* ======================================================= */
var DEMO=[
{nombre:'Laptop 15.6" Ryzen 5',categoria:"Laptops",especificaciones:"16 GB RAM, SSD 512 GB, Windows 11",precio:"2199",en_oferta:"no",precio_oferta:"",stock:"5",imagen_url:"",activo:"si"},
{nombre:'Laptop 14" Core i5',categoria:"Laptops",especificaciones:"8 GB RAM, SSD 256 GB, Windows 11",precio:"1799",en_oferta:"si",precio_oferta:"1599",stock:"3",imagen_url:"",activo:"si"},
{nombre:"PC de escritorio Ryzen 5",categoria:"Computadoras de mesa",especificaciones:"16 GB RAM, SSD 512 GB, monitor 24\"",precio:"2499",en_oferta:"no",precio_oferta:"",stock:"4",imagen_url:"",activo:"si"},
{nombre:"Disco SSD 480 GB",categoria:"Componentes",especificaciones:'SATA 2.5", ideal para repotenciar',precio:"149",en_oferta:"no",precio_oferta:"",stock:"12",imagen_url:"",activo:"si"},
{nombre:"Memoria RAM 16 GB DDR4",categoria:"Componentes",especificaciones:"Para laptop, 3200 MHz",precio:"189",en_oferta:"si",precio_oferta:"159",stock:"10",imagen_url:"",activo:"si"},
{nombre:"Mouse inalámbrico",categoria:"Accesorios",especificaciones:"Silencioso, 2.4 GHz, pila incluida",precio:"39",en_oferta:"no",precio_oferta:"",stock:"20",imagen_url:"",activo:"si"},
{nombre:"Teclado mecánico",categoria:"Accesorios",especificaciones:"Español, retroiluminado, USB",precio:"129",en_oferta:"no",precio_oferta:"",stock:"0",imagen_url:"",activo:"si"}
];
function norm(t){return String(t||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase()}
function yes(v){return /^(si|true|1|x|verdadero)$/.test(norm(v))}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function num(v){return parseFloat(String(v||"").replace(/[^0-9.]/g,""))||0}
function money(n){return "S/ "+n.toLocaleString("es-PE",{minimumFractionDigits:2,maximumFractionDigits:2})}
function wa(txt){return "https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(txt)}
function parseCSV(t){
  var rows=[],row=[],f="",q=false;
  for(var i=0;i<t.length;i++){var c=t[i];
    if(q){ if(c=='"'){ if(t[i+1]=='"'){f+='"';i++} else q=false } else f+=c }
    else if(c=='"') q=true;
    else if(c==","){row.push(f);f=""}
    else if(c=="\n"){row.push(f);rows.push(row);row=[];f=""}
    else if(c!="\r") f+=c;
  }
  if(f!==""||row.length){row.push(f);rows.push(row)}
  return rows;
}
function toObjs(rows){
  var h=rows[0].map(norm);
  return rows.slice(1).filter(function(r){return r.some(function(c){return c.trim()})}).map(function(r){
    var o={};h.forEach(function(k,i){o[k]=(r[i]||"").trim()});return o});
}
var laptop='<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="12" y="14" width="40" height="28" rx="3"/><path d="M6 48h52l-4 4H10z"/></svg>';
var box='<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="12" y="16" width="40" height="32" rx="4"/><path d="M12 28h40"/></svg>';
var grid=document.getElementById("grid"), filtro="todo", busqueda="";
document.getElementById("waTop").href=wa("Hola, quisiera información sobre sus productos.");

function card(p){
  var c=norm(p.categoria), of=yes(p.en_oferta)&&num(p.precio_oferta)>0, stock=parseInt(p.stock,10);
  var agotado=!isNaN(stock)&&stock<=0;
  var final=of?num(p.precio_oferta):num(p.precio);
  var src=p.imagen_url||(p.sku?"img/productos/"+p.sku+".jpg":"");
  var img=src?'<img loading="lazy" src="'+esc(src)+'" alt="'+esc(p.nombre)+'" onerror="this.remove()">':"";
  var icono=(c==="laptops"||c==="computadoras de mesa")?laptop:box;
  return '<article class="card" data-c="'+esc(c)+'" data-o="'+(of?1:0)+'" data-b="'+esc(norm(p.nombre+" "+(p.especificaciones||"")+" "+p.categoria))+'"><div class="ph">'+icono+img+(of?'<span class="tag">Oferta</span>':'')+'</div><div class="body"><h3>'+esc(p.nombre)+'</h3><p class="spec">'+esc(p.especificaciones||"")+'</p><div class="row"><span class="price">'+(of?'<span class="old">'+money(num(p.precio))+'</span>':'')+money(final)+'</span><span class="stock">'+(agotado?"Agotado":(isNaN(stock)?"":"Disponible"))+'</span></div><a class="buy'+(agotado?" off":"")+'" href="'+wa("Hola, me interesa: "+p.nombre+" ("+money(final)+"). ¿Está disponible?")+'" target="_blank" rel="noopener">'+(agotado?"Agotado":"Pedir por WhatsApp")+'</a></div></article>';
}
function aplicar(){
  var visibles=0;
  document.querySelectorAll(".card").forEach(function(el){
    var okCat=filtro==="todo"||(filtro==="ofertas"?el.dataset.o==="1":el.dataset.c===filtro);
    var ok=okCat&&el.dataset.b.indexOf(busqueda)!==-1;
    el.hidden=!ok; if(ok)visibles++;
  });
  var m=document.getElementById("vacio");
  if(m)m.hidden=visibles>0;
}
function render(lista){
  var act=lista.filter(function(p){return p.nombre&&num(p.precio)>0&&!/^(no|false|0)$/.test(norm(p.activo))});
  grid.innerHTML=act.map(card).join("")+'<p class="msg" id="vacio" hidden>No hay productos que coincidan por ahora.</p>';
  aplicar();
}
document.querySelectorAll(".chips button[data-f]").forEach(function(b){
  b.addEventListener("click",function(){
    document.querySelectorAll(".chips button[data-f]").forEach(function(o){o.setAttribute("aria-pressed",o===b)});
    filtro=b.dataset.f;
    busqueda=""; document.getElementById("buscar").value="";
    aplicar();
  });
});
document.querySelectorAll(".copy").forEach(function(b){
  b.addEventListener("click",function(){
    var done=function(){b.textContent="Copiado";setTimeout(function(){b.textContent="Copiar"},1500)};

    try{navigator.clipboard.writeText(b.dataset.v).then(done,done)}catch(e){done()}
  });
});
document.getElementById("buscar").addEventListener("input",function(e){
  busqueda=norm(e.target.value);
  if(busqueda){
    filtro="todo";
    document.querySelectorAll(".chips button[data-f]").forEach(function(o){o.setAttribute("aria-pressed",o.dataset.f==="todo")});
  }
  aplicar();
});
var menuBtn=document.getElementById("menuBtn"), menuCats=document.getElementById("menuCats");
menuBtn.addEventListener("click",function(){
  var abierto=menuCats.classList.toggle("abierto");
  menuBtn.setAttribute("aria-expanded",abierto);
});
menuCats.addEventListener("click",function(e){
  if(e.target.closest("button")){menuCats.classList.remove("abierto");menuBtn.setAttribute("aria-expanded","false")}
});

var lupaBtn=document.getElementById("lupaBtn"), buscador=document.getElementById("buscador"), 
  inputBuscar=document.getElementById("buscar");
  if(lupaBtn&&buscador){
    lupaBtn.addEventListener("click",function(){
      var abierto=buscador.classList.toggle("abierto");
      buscador.closest(".bar").classList.toggle("buscando",abierto);
      lupaBtn.setAttribute("aria-expanded",abierto);
      if(abierto)inputBuscar.focus();
    });
}

if(!CONFIG.sheetCsv){render(DEMO)}
else{
  document.getElementById("note").hidden=true;
  grid.innerHTML='<p class="msg">Cargando productos…</p>';
  fetch(CONFIG.sheetCsv).then(function(r){return r.text()}).then(function(t){render(toObjs(parseCSV(t)))})
  .catch(function(){grid.innerHTML='<p class="msg">No pudimos cargar los productos. Intenta de nuevo en unos minutos.</p>'});
}
