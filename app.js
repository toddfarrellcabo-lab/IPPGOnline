const ASSETS={dog:"./assets/Spark_612x450.png",logo:"./assets/Sparklight(R)-purple-cmyk_AWFY.png",qr:"./assets/Sparklight_QR_60x60.jpg",eeroPromo:"./assets/SPK-_0001_persona-3MFree.png"};
let records=[],current=null,source={};

function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function planHTML(p,i){
  const promo=!!p.promo;
  const cents=p.cents?`<sup class="ippg-cents">${esc(p.cents)}</sup>`:"";
  return `<section class="ippg-plan ${promo?"ippg-promo promo":"ippg-standard standard"}">
    ${promo?`<div class="ippg-ribbon">${esc(p.badge||"Great Deal")}</div>`:""}
    <h2 class="ippg-speed">${esc(p.speed)}</h2>
    <p class="ippg-description">${esc(p.description||p.pricingSummary||"")}</p>
    <div class="ippg-price"><span class="ippg-currency">$</span><span class="ippg-dollars">${esc(p.dollars)}</span>${cents}<span class="ippg-suffix">/mo${promo?"*":"."}</span></div>
    ${promo&&p.term?`<div class="ippg-term">${esc(p.term)}</div>`:""}
    <div class="ippg-support">Reg. rate ${esc(p.rack||"")}<span class="ippg-billing">${esc(p.billing||"")}</span></div>
  </section>`;
}
function setAsset(key,src){document.querySelectorAll(`[data-asset="${key}"]`).forEach(el=>{el.src=src||"";});}
function render(d){
  current=d;
  const fiber=d.headlineMode==="Fiber"?"Fiber":"Fiber-Fueled";
  document.getElementById("headline").innerHTML=`Choose Your<br><span>${fiber} Speed.</span>`;
  document.getElementById("reasons").innerHTML=(d.equipmentIncluded?`<span class="equipment">EQUIPMENT INCLUDED. </span>`:"")+"UNLIMITED DATA. NO CONTRACTS. WI-FI POWERED BY EERO.";
  document.getElementById("plans").innerHTML=(d.plans||[]).map(planHTML).join("");
  document.getElementById("legal").textContent=d.legal||"";
  Object.entries(ASSETS).forEach(([k,v])=>setAsset(k,v));
  document.getElementById("eeroPromo").style.display=d.promos?.eero?"block":"none";
  document.getElementById("mobilePromo").style.display=d.promos?.mobile===false?"none":"flex";
  renderDB();
}
function fillGuideSelect(){
  const s=document.getElementById("guideSelect");
  s.innerHTML=records.map((r,i)=>`<option value="${i}">${esc(r.personaID)} — ${esc(r.personaName)}</option>`).join("");
  s.onchange=()=>render(records[+s.value]);
}
function renderDB(){
  const host=document.getElementById("dbRows"); if(!host)return;
  const q=(document.getElementById("dbSearch").value||"").toLowerCase();
  const life=document.getElementById("dbLifecycle").value;
  const pricing=document.getElementById("dbPricing").value;
  const found=records.map((r,i)=>({r,i})).filter(({r})=>{
    const hay=[r.personaID,r.personaName,r.baseRateCard,r.pricingSet,r.modifiers,(r.plans||[]).map(p=>p.speed).join(" ")].join(" ").toLowerCase();
    return (!q||hay.includes(q))&&(!life||r.lifecycle===life)&&(!pricing||r.pricingSet===pricing);
  });
  document.getElementById("dbCount").textContent=`${found.length} of ${records.length} personas`;
  host.innerHTML=found.map(({r,i})=>`<button type="button" class="ippg-db-card ${current===r?"active":""}" data-i="${i}">
    <div class="ippg-db-title">${esc(r.personaID)} · ${esc(r.personaName)}</div>
    <div class="ippg-db-meta">${esc(r.baseRateCard)} · ${esc(r.pricingSet)}${r.modifiers?` · ${esc(r.modifiers)}`:""}</div>
    <div class="ippg-db-tags"><span class="ippg-db-tag life">${esc(r.lifecycle)}</span>${r.equipmentIncluded?'<span class="ippg-db-tag">Equipment Included</span>':""}${r.symSpeed?'<span class="ippg-db-tag">Sym Speed</span>':""}${r.fiber?'<span class="ippg-db-tag">Fiber</span>':""}</div>
  </button>`).join("");
  host.querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;document.getElementById("guideSelect").value=i;render(records[i]);});
}
async function load(){
  const r=await fetch("./data/ippg-data.json",{cache:"no-store"});
  const j=await r.json(); records=j.guides||[]; source=j.source||{};
  fillGuideSelect();
  const sets=[...new Set(records.map(r=>r.pricingSet).filter(Boolean))].sort();
  document.getElementById("dbPricing").innerHTML='<option value="">All pricing sets</option>'+sets.map(x=>`<option>${esc(x)}</option>`).join("");
  document.getElementById("dbSource").textContent=`${source.file||"Personaville"} · ${records.length} personas`;
  ["dbSearch","dbLifecycle","dbPricing"].forEach(id=>document.getElementById(id).addEventListener(id==="dbSearch"?"input":"change",renderDB));
  document.getElementById("databaseBtn").onclick=()=>{document.getElementById("databasePanel").hidden=false;renderDB();};
  document.getElementById("dbClose").onclick=()=>document.getElementById("databasePanel").hidden=true;
  render(records[0]);
}
document.getElementById("printBtn").onclick=()=>{const old=document.title;document.title=(current?.filename||"IPPG").replace(/[\\/:*?"<>|]/g,"-");window.print();setTimeout(()=>document.title=old,500);};
load().catch(e=>{document.body.insertAdjacentHTML("afterbegin",`<div style="padding:10px;background:#fee;color:#900">Database load error: ${esc(e.message)}. Run this folder through a local/static web server rather than opening index.html directly.</div>`);});
