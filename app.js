const DB = window.IPPG_DATABASE;
const state = { fiber:false, equipmentIncluded:true, lifecycle:"Current", personaId:null };

const cfg = document.getElementById("configurationSelect");
const life = document.getElementById("lifecycleSelect");
const dataLayer = document.getElementById("dataLayer");

function baseRateCard(family){
  const s=(family||"").toLowerCase();
  if(s.includes("coremax")||s.includes("core max")) return "Core Max";
  if(s.includes("enhancedmax")||s.includes("enhanced max")) return "Enhanced Max";
  if(s.includes("edgemax")||s.includes("edge max")) return "Edge Max";
  if(s.startsWith("core")) return "Core";
  if(s.startsWith("enhanced")) return "Enhanced";
  if(s.startsWith("edge")) return "Edge";
  return null;
}
function money(v){ return v===null||v===undefined||v==="" ? "" : `$${Number(v).toFixed(2).replace(".00","")}`; }

function filtered(){
  return DB.records.filter(r => state.lifecycle==="All" || r.lifecycle===state.lifecycle);
}
function loadConfigurations(){
  const list=filtered();
  cfg.innerHTML="";
  list.forEach(r=>{
    const o=document.createElement("option");
    o.value=r.personaId;
    o.textContent=`${r.name} — ${r.lifecycle}`;
    cfg.appendChild(o);
  });
  if(!list.length){ cfg.innerHTML="<option>No configurations</option>"; return; }
  if(!list.some(r=>r.personaId===state.personaId)) state.personaId=list[0].personaId;
  cfg.value=state.personaId;
  render();
}
function priceParts(v){
  if(v===null || v===undefined || v==="") return {whole:"",cents:""};
  const n=Number(String(v).replace(/[^0-9.]/g,""));
  if(Number.isNaN(n)) return {whole:String(v),cents:""};
  const s=n.toFixed(2).split(".");
  return {whole:s[0],cents:s[1]==="00" ? "" : s[1]};
}
function dealLockup(price, regular){
  const p=priceParts(price);
  return `<div class="price-lockup">
    <div class="price-dollar">$</div>
    <div class="price-whole">${p.whole}</div>
    <div class="price-side">
      <div class="price-cents">${p.cents ? p.cents+"*" : "*"}</div>
      <div class="price-term">/mo. for 24 mos.</div>
      <div class="price-regrate">Reg. rate ${money(regular)}/mo.</div>
    </div>
  </div>
  <div class="price-required">Autopay &amp; Paperless billing required.</div>`;
}
function render(){
  const r=DB.records.find(x=>x.personaId===state.personaId);
  if(!r) return;

  state.equipmentIncluded=r.equipmentIncluded;
  document.getElementById("equipmentToggle").checked=state.equipmentIncluded;
  document.getElementById("equipmentCopy").hidden=!state.equipmentIncluded;
  document.getElementById("fiberWord").textContent=state.fiber ? "Fiber" : "Fiber-Fueled";

  const base=baseRateCard(r.familyGroup);
  const rows=r.speeds.map(p=>{
    let q4=null;
    if(p.speed==="1 Gig" && base) q4=DB.q4.oneGig[base];
    if(p.speed==="2 Gig" && base) q4=DB.q4.twoGig[base];
    return {p,q4};
  });

  // Acquisition/Q4 offer rows first; remaining plan choices follow.
  rows.sort((a,b)=>(b.q4?1:0)-(a.q4?1:0));

  let html=`<div class="plan-stack">`;
  rows.forEach(({p,q4})=>{
    if(q4){
      html+=`<div class="plan-card great-deal">
        <div class="deal-label">Great Deal</div>
        <div class="plan-speed">${p.speed}</div>
        ${dealLockup(q4.price,q4.regular || p.regularRate)}
      </div>`;
    }else{
      html+=`<div class="plan-card">
        <div class="plan-speed">${p.speed}</div>
        <div class="plan-reg">Rack rate: ${money(p.regularRate)}${p.pricing ? " • "+p.pricing : ""}</div>
      </div>`;
    }
  });
  html+="</div>";

  const hasGigPlus=r.speeds.some(p=>p.speed==="1 Gig"||p.speed==="2 Gig");
  if(hasGigPlus) html+=`<img class="promo-preview" src="assets/SPK-_0001_persona-3MFree.png" alt="FREE eero Plus for 3 months">`;
  dataLayer.innerHTML=html;
}

life.addEventListener("change",e=>{state.lifecycle=e.target.value;loadConfigurations();});
cfg.addEventListener("change",e=>{state.personaId=e.target.value;render();});
document.getElementById("fiberToggle").addEventListener("change",e=>{state.fiber=e.target.checked;render();});
document.getElementById("equipmentToggle").addEventListener("change",e=>{
  state.equipmentIncluded=e.target.checked;
  document.getElementById("equipmentCopy").hidden=!state.equipmentIncluded;
});
document.getElementById("printBtn").addEventListener("click",()=>window.print());

loadConfigurations();
