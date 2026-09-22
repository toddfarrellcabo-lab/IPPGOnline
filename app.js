const DEFAULT = {
  filename:"IPPG-Example",
  headlineMode:"Fiber-Fueled",
  equipmentIncluded:false,
  assets:{
    dog:"./assets/Spark_612x450.png",
    logo:"./assets/Sparklight(R)-purple-cmyk_AWFY.png",
    qr:"./assets/Sparklight_QR_60x60.jpg",
    eeroPromo:"./assets/SPK-_0001_persona-3MFree.png",
  },
  plans:[
    {speed:"1 Gig",badge:"Most Popular Deal",description:"Powerful, dependable internet for a home that does it all.",promo:true,dollars:"50",term:"for 24 months",rack:"$95/mo.",billing:"Autopay & Paperless billing required."},
    {speed:"2 Gig",badge:"Even Better",description:"Exceptional speed and bandwidth for the highest-demand needs.",promo:true,dollars:"65",term:"for 24 months",rack:"$120/mo.",billing:"Autopay & Paperless billing required."},
    {speed:"300 Mbps",description:"Simple, dependable internet for everyday connection.",promo:false,dollars:"39",cents:"95",rack:"$65/mo.",billing:"Autopay & Paperless billing required."},
    {speed:"600 Mbps",description:"Enhanced performance for busy homes and growing connection needs.",promo:false,dollars:"59",cents:"95",rack:"$80/mo.",billing:"Autopay & Paperless billing required."}
  ],
  promos:{eero:true,mobile:true},
  legal:"[APPROVED LEGAL / DISCLAIMER AREA — DATA DRIVEN]"
};

let records=[DEFAULT], current=DEFAULT;

function planHTML(p){
  if(p.promo){
    return `<section class="ippg-plan ippg-promo promo">
      <div class="ippg-ribbon">${p.badge||"Great Deal"}</div>
      <h2 class="ippg-speed">${p.speed}</h2>
      <p class="ippg-description">${p.description||""}</p>
      <div class="ippg-price"><span class="ippg-currency">$</span><span class="ippg-dollars">${p.dollars}</span><span class="ippg-suffix">/mo<span class="ippg-asterisk">*</span></span></div>
      <div class="ippg-term">${p.term||""}</div>
      <div class="ippg-support">Reg. rate ${p.rack||""}<span class="ippg-billing">${p.billing||""}</span></div>
    </section>`;
  }
  return `<section class="ippg-plan ippg-standard standard">
    <h2 class="ippg-speed">${p.speed}</h2>
    <p class="ippg-description">${p.description||""}</p>
    <div class="ippg-price"><span class="ippg-currency">$</span><span class="ippg-dollars">${p.dollars}</span>${p.cents?`<sup class="ippg-cents">${p.cents}</sup>`:""}<span class="ippg-suffix">/mo.</span></div>
    <div class="ippg-support">Reg. rate ${p.rack||""}<span class="ippg-billing">${p.billing||""}</span></div>
  </section>`;
}

function setAsset(key, src){
  document.querySelectorAll(`[data-asset="${key}"]`).forEach(el=>{
    el.classList.remove("missing");
    el.onerror=()=>el.classList.add("missing");
    el.src=src||"";
  });
}
function render(d){
  current=d;
  const fiber=(d.headlineMode||"Fiber-Fueled")==="Fiber"?"Fiber":"Fiber-Fueled";
  document.getElementById("headline").innerHTML=`Choose Your<br><span>${fiber} Speed.</span>`;
  document.getElementById("reasons").innerHTML=(d.equipmentIncluded?`<span class="equipment">EQUIPMENT INCLUDED. </span>`:"")+"UNLIMITED DATA. NO CONTRACTS. WI-FI POWERED BY EERO.";
  document.getElementById("plans").innerHTML=(d.plans||[]).map(planHTML).join("");
  document.getElementById("legal").textContent=d.legal||"";
  const a={...DEFAULT.assets,...(d.assets||{})};
  Object.entries(a).forEach(([k,v])=>setAsset(k,v));
  document.getElementById("eeroPromo").style.display=d.promos?.eero===false?"none":"block";
  document.getElementById("mobilePromo").style.display=d.promos?.mobile===false?"none":"flex";
}
async function load(){
  try{
    const r=await fetch("./data/ippg-data.json",{cache:"no-store"});
    if(r.ok){
      const j=await r.json();
      records=Array.isArray(j)?j:(j.guides||j.records||[j]);
    }
  }catch(e){ console.info("Using embedded sample data."); }
  const sel=document.getElementById("guideSelect");
  sel.innerHTML=records.map((r,i)=>`<option value="${i}">${r.filename||r.name||`Guide ${i+1}`}</option>`).join("");
  sel.onchange=()=>render(records[+sel.value]);
  render(records[0]||DEFAULT);
}
document.getElementById("printBtn").onclick=()=>{
  const old=document.title;
  document.title=(current.filename||"IPPG").replace(/[\\/:*?"<>|]/g,"-");
  window.print();
  setTimeout(()=>document.title=old,500);
};
load();