let DB;
const $=id=>document.getElementById(id);
const active=(d,s,e)=>d>=s&&d<=e;
const pct=s=>({"300 Mbps":14.25,"500 Mbps":23.75,"600 Mbps":28.5,"1 Gig":47.5,"1.5 Gig":71.25,"2 Gig":95}[s]||50);
const money=v=>Number.isInteger(Number(v))?"$"+Number(v):"$"+Number(v).toFixed(2);
function render(){
 const cfg=DB.configurations.find(x=>x.id===$("configSelect").value), date=$("effectiveDate").value;
 $("rateCardName").textContent=cfg.baseRateCard;
 $("modifierList").textContent=cfg.modifiers.length?cfg.modifiers.join(" · "):"None";
 $("configCode").textContent=cfg.id+" · "+cfg.sourceFamilyGroup;
 let used=[];
 $("plans").innerHTML=cfg.plans.map(p=>{
   const o=DB.offers.find(x=>x.type==="priceOverride"&&x.speed===p.speed&&active(date,x.start,x.end));
   let price=p.rackRate, term="Regular monthly rate";
   if(o){price=(o.exceptions&&o.exceptions[cfg.baseRateCard])||o.price;term=o.term;used.push(o.name)}
   return `<div class="plan"><div class="speed"><strong>${p.speed}</strong><span>${p.uploadSpeed?`Upload ${p.uploadSpeed}`:"Internet"}</span></div>
   <div class="bar"><span style="width:${pct(p.speed)}%"></span>${p.speed==="1 Gig"?'<em>MOST POPULAR</em>':""}</div>
   <div class="price"><strong>${money(price)}</strong><span>${term}</span>${o?`<span>Regularly ${money(p.rackRate)}/mo.</span>`:""}</div></div>`;
 }).join("");
 const e=DB.offers.find(x=>x.id==="Q4-2026-EERO");
 const qualifies=cfg.plans.some(p=>Number(p.downloadMbps)>=1000);
 if(qualifies&&active(date,e.start,e.end)){$("promoBox").hidden=false;$("promoBox").textContent=e.display;used.push(e.name)}
 else $("promoBox").hidden=true;
 $("featureBox").textContent=cfg.modifiers.length?cfg.modifiers.join("  •  "):"Unlimited Data  •  No Contracts";
 $("offerList").textContent=[...new Set(used)].join(" · ")||"No promotional offers active";
 $("legalText").textContent=DB.legal.text;
}
fetch("data/ippg-data.json").then(r=>r.json()).then(d=>{
 DB=d;
 $("configSelect").innerHTML=d.configurations.map(c=>`<option value="${c.id}">${c.label}</option>`).join("");
 $("configSelect").addEventListener("change",render);$("effectiveDate").addEventListener("change",render);
 $("printBtn").addEventListener("click",()=>window.print());render();
}).catch(e=>document.body.innerHTML="<p style='padding:30px'>Could not load IPPG data. Run this project through a local web server.</p>");