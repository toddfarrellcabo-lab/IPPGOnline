const B={
fiberFueled:"./assets/Fiber-Fueled-Backdrop.jpg",
fiberFueledEquip:"./assets/Fiber-Fueled_EquipmentInc-Backdrop.jpg",
fiberInternet:"./assets/Fiber_Internet-Backdrop.jpg",
fiberInternetEquip:"./assets/Fiber_Internet_EquipmentInc-Backdrop.jpg",
fiberFueledSym:"./assets/Fiber-Fueled-SYM-Backdrop.jpg",
fiberFueledEquipSym:"./assets/Fiber-Fueled_EquipmentInc-SYM-Backdrop.jpg",
fiberInternetSym:"./assets/Fiber_Internet-SYM-Backdrop.jpg",
fiberInternetEquipSym:"./assets/Fiber_Internet_EquipmentInc-SYM-Backdrop.jpg"
};let R=[],C=null,O={backdrop:"auto",layout:"auto",eero:null,mobile:null,sym:null,plans:{},design:{speedSize:30,scheduleSize:11,priceSize:44,rowGap:6,planY:210,promoY:500}};const $=x=>document.getElementById(x),E=v=>String(v??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function isFiberInternet(r){
  return r.headlineMode==="Fiber" || r.fiber===true || /fiber[ _-]?internet/i.test([r.personaName,r.filename,r.modifiers].join(" "));
}
function hasSymMarker(r){
  const text=[r.personaID,r.personaName,r.filename,r.modifiers,r.baseRateCard].filter(Boolean).join(" ");
  return /(?:symspds|sym\s*speed|symmetrical|(?:^|[-_\s])sym(?:$|[-_\s]))/i.test(text);
}
function symDefault(r){
  return isFiberInternet(r) || hasSymMarker(r) || r.symSpeed===true;
}
function symActive(r){return O.sym===null ? symDefault(r) : !!O.sym}
function backKey(r){
  const fiber=isFiberInternet(r), equip=!!r.equipmentIncluded, sym=symActive(r);
  if(fiber) return equip ? (sym?"fiberInternetEquipSym":"fiberInternetEquip") : (sym?"fiberInternetSym":"fiberInternet");
  return equip ? (sym?"fiberFueledEquipSym":"fiberFueledEquip") : (sym?"fiberFueledSym":"fiberFueled");
}
function eeroDefault(r){
  if(r.promos && typeof r.promos.eero==="boolean") return r.promos.eero;
  return r.lifecycle==="Scheduled" && (r.plans||[]).some(p=>/1\s*Gig|2\s*Gig|5\s*Gig/i.test(p.speed||""));
}
function mobileDefault(r){return !!(r.promos && r.promos.mobile)}
function vp(r){return(r.plans||[]).filter((p,i)=>O.plans[i]!==false)}
function ph(p,i){
  const price=[p.dollars,p.cents].filter(v=>v!==undefined&&v!==null&&v!=="").join(".");
  const priceText=price ? `$${price}/mo.` : "";
  const schedule=p.pricingSummary||p.schedule||"";
  const reg=p.rack ? `Reg. Rate ${p.rack}` : "";
  const billing=p.billing||"Autopay & Paperless billing required.";
  return `<div class="plan data-row">
    <div class="cell speed-cell">${p.speed||""}</div>
    <div class="cell promo-cell"><strong>${priceText}</strong>${schedule?`<span>${schedule}</span>`:""}</div>
    <div class="cell reg-cell">${reg}</div>
    <div class="cell billing-cell">${billing}</div>
  </div>`;
}
function render(r){C=r;let autoKey=backKey(r),bk=O.backdrop==="auto"?autoKey:O.backdrop;
if(!B[bk]){bk=autoKey;O.backdrop="auto";}
$("backdrop").src=B[bk];
$("backdrop").onerror=()=>{ if(bk!==autoKey && B[autoKey]){$("backdrop").src=B[autoKey];O.backdrop="auto";$("backdropMode").value="auto";} };
$("backdropMode").value=O.backdrop;let p=vp(r),n=O.layout==="auto"?Math.max(2,Math.min(4,p.length)):+O.layout;$("plans").className="plans layout"+n;$("plans").innerHTML=p.slice(0,n).map(ph).join("");$("eero").style.display=(O.eero===null?eeroDefault(r):O.eero)?"block":"none";$("mobile").style.display=(O.mobile===null?mobileDefault(r):O.mobile)?"block":"none";
$("mobile").onerror=()=>{$("mobile").style.display="none"};$("legal").textContent=r.legal||"";
let d=O.design||{};let sh=document.querySelector(".sheet");
sh.style.setProperty("--speed-size",(d.speedSize||30)+"px");
sh.style.setProperty("--schedule-size",(d.scheduleSize||11)+"px");
sh.style.setProperty("--price-size",(d.priceSize||44)+"px");
sh.style.setProperty("--row-gap",(d.rowGap??6)+"px");
sh.style.setProperty("--frame-y",(d.planY||210)+"px");
sh.style.setProperty("--promo-y",(d.promoY||525)+"px");$("filename").value=r.filename||r.personaID||"IPPG";$("ptoggles").innerHTML=(r.plans||[]).map((x,i)=>`<label><input data-p="${i}" type="checkbox" ${O.plans[i]===false?"":"checked"}> ${E(x.speed)}</label>`).join("");$("ptoggles").querySelectorAll("input").forEach(x=>x.onchange=()=>{O.plans[+x.dataset.p]=x.checked;render(C)});$("teero").checked=O.eero===null?eeroDefault(r):O.eero;$("tmobile").checked=O.mobile===null?mobileDefault(r):O.mobile;$("tsym").checked=symActive(r);db()}
function db(){let q=$("search").value.toLowerCase(),l=$("life").value,p=$("pricing").value,a=R.map((r,i)=>({r,i})).filter(x=>{let r=x.r,h=[r.personaID,r.personaName,r.baseRateCard,r.pricingSet,r.modifiers].join(" ").toLowerCase();return(!q||h.includes(q))&&(!l||r.lifecycle===l)&&(!p||r.pricingSet===p)});$("count").textContent=`${a.length} of ${R.length} personas`;$("rows").innerHTML=a.map(x=>`<button class="card ${C===x.r?"active":""}" data-i="${x.i}"><div class="title">${E(x.r.personaID)} · ${E(x.r.personaName)}</div><div class="meta">${E(x.r.baseRateCard)} · ${E(x.r.pricingSet)}${x.r.modifiers?" · "+E(x.r.modifiers):""}</div><span class="tag">${E(x.r.lifecycle)}</span>${x.r.equipmentIncluded?'<span class="tag">Equipment Included</span>':""}${x.r.symSpeed?'<span class="tag">Sym Speed</span>':""}${x.r.fiber?'<span class="tag">Fiber</span>':""}</button>`).join("");$("rows").querySelectorAll(".card").forEach(b=>b.onclick=()=>{$("guide").value=b.dataset.i;O.plans={};O.backdrop="auto";O.sym=null;O.eero=null;O.mobile=null;render(R[+b.dataset.i])})}
function download(name,text,type){let a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
async function load(){let j=await(await fetch("./data/ippg-data.json")).json();R=j.guides||[];$("source").textContent=`${j.source?.file||"Personaville"} · ${R.length} personas`;$("guide").innerHTML=R.map((r,i)=>`<option value="${i}">${E(r.personaID)} — ${E(r.personaName)}</option>`).join("");$("guide").onchange=()=>{O.plans={};O.backdrop="auto";O.sym=null;O.eero=null;O.mobile=null;render(R[+$("guide").value])};let s=[...new Set(R.map(r=>r.pricingSet).filter(Boolean))].sort();$("pricing").innerHTML='<option value="">All pricing sets</option>'+s.map(x=>`<option>${E(x)}</option>`).join("");["search","life","pricing"].forEach(id=>$(id).addEventListener(id==="search"?"input":"change",db));$("backdropMode").onchange=e=>{O.backdrop=e.target.value;render(C)};$("layout").onchange=e=>{O.layout=e.target.value;render(C)};$("teero").onchange=e=>{O.eero=e.target.checked;render(C)};$("tmobile").onchange=e=>{O.mobile=e.target.checked;render(C)};$("reset").onclick=()=>{O={backdrop:"auto",layout:"auto",eero:null,mobile:null,sym:null,plans:{},design:{speedSize:30,scheduleSize:11,priceSize:44,rowGap:6,planY:210,promoY:500}};$("backdropMode").value="auto";$("layout").value="auto";render(C)};$("exportPdf").onclick=()=>{document.title=($("filename").value||"IPPG").replace(/[\\/:*?"<>|]/g,"-");window.print()};$("exportJson").onclick=()=>download(($("filename").value||"IPPG")+".json",JSON.stringify({record:C,overrides:O,backdrop:O.backdrop==="auto"?backKey(C):O.backdrop,visiblePlans:vp(C).map(x=>x.speed)},null,2),"application/json");$("tsym").checked=symActive(C);
$("tsym").onchange=e=>{O.sym=e.target.checked;render(C)};
const sliders={speedSize:"speedSize",scheduleSize:"scheduleSize",priceSize:"priceSize",rowGap:"rowGap",planY:"planY",promoY:"promoY"};
Object.entries(sliders).forEach(([id,key])=>{$(id).oninput=e=>{O.design[key]=+e.target.value;$(id+"Out").value=e.target.value;render(C)}});
$("savePreset").onclick=()=>{let n=O.layout==="auto"?Math.max(2,Math.min(4,vp(C).length)):O.layout;localStorage.setItem("ippg-layout-"+n,JSON.stringify(O.design));alert("Saved "+n+"-speed layout preset.")};
$("clearPreset").onclick=()=>{["2","3","4"].forEach(n=>localStorage.removeItem("ippg-layout-"+n));alert("Saved layout presets cleared.")};
render(R[0])}load();
// v8 explicit layout apply: slider positions are drafts until Update Preview.
if(document.getElementById("applyLayout")){
  document.getElementById("applyLayout").onclick=()=>{
    const map={speedSize:"speedSize",scheduleSize:"scheduleSize",priceSize:"priceSize",rowGap:"rowGap",planY:"planY",promoY:"promoY"};
    Object.entries(map).forEach(([id,key])=>{const el=document.getElementById(id);if(el)O.design[key]=+el.value});
    document.querySelector(".builder")?.classList.remove("builder-dirty");
    render(C);
  };
}
