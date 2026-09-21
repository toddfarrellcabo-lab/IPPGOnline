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
function render(){
  const r=DB.records.find(x=>x.personaId===state.personaId);
  if(!r) return;
  state.equipmentIncluded=r.equipmentIncluded;
  document.getElementById("equipmentToggle").checked=state.equipmentIncluded;
  document.getElementById("equipmentCopy").hidden=!state.equipmentIncluded;
  document.getElementById("fiberWord").textContent=state.fiber ? "Fiber" : "Fiber-Fueled";

  const base=baseRateCard(r.familyGroup);
  let html=`<div class="config-meta">${r.familyGroup} • ${r.pricingSet} • ${r.lifecycle}${r.symmetrical?" • Symmetrical":""}</div><div class="plan-stack">`;
  r.speeds.forEach(p=>{
    let q4=null;
    if(p.speed==="1 Gig" && base) q4=DB.q4.oneGig[base];
    if(p.speed==="2 Gig" && base) q4=DB.q4.twoGig[base];
    const displayPrice=q4 ? q4.price : p.pricing;
    html+=`<div class="plan-card"><div class="plan-top"><div class="plan-speed">${p.speed}</div><div class="plan-price">${q4?displayPrice:""}</div></div>
      <div class="plan-reg">Rack rate: ${money(p.regularRate)}${!q4 && p.pricing ? " • "+p.pricing : ""}</div>
      ${q4?`<div class="plan-q4">Q4 Acquisition: ${q4.price} for 24 months</div>`:""}</div>`;
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
