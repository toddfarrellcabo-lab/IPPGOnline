let DB;
const $=id=>document.getElementById(id);
function active(date,start,end){return date>=start && date<=end}
function speedRank(s){return {"300 Mbps":.1425,"500 Mbps":.2375,"600 Mbps":.285,"1 Gig":.475,"1.5 Gig":.7125,"2 Gig":.95}[s]||.5}
function money(v){return Number.isInteger(v) ? "$"+v : "$"+Number(v).toFixed(2)}
function render(){
 const cfg=DB.configurations.find(x=>x.id===$("configSelect").value);
 const rc=DB.rateCards.find(x=>x.id===cfg.rateCard);
 const date=$("effectiveDate").value;
 $("rateCardName").textContent=rc.label;
 $("modifierList").textContent=cfg.modifiers.length?cfg.modifiers.join(" · "):"None";
 $("configCode").textContent=cfg.id;
 let plans=rc.plans.filter(p=>!(cfg.maxSpeed==="1 Gig"&&p.speed==="2 Gig"));
 let used=[];
 $("plans").innerHTML=plans.map((p,i)=>{
   let offer=DB.offers.find(o=>o.speed===p.speed&&active(date,o.start,o.end));
   let price=p.rackRate, term="Regular monthly rate";
   if(offer){price=(offer.exceptions&&offer.exceptions[rc.id])||offer.price;term=offer.term;used.push(offer.name)}
   return `<div class="plan"><div class="speed"><strong>${p.speed}</strong><span>Internet</span></div>
   <div class="bar"><span style="width:${speedRank(p.speed)*100}%"></span>${p.speed==="1 Gig"?'<em>MOST POPULAR</em>':""}</div>
   <div class="price"><strong>${money(price)}</strong><span>${term}</span>${offer?`<span>Regularly ${money(p.rackRate)}/mo.</span>`:""}</div></div>`;
 }).join("");
 const eero=DB.offers.find(o=>o.id==="Q4-2026-EERO");
 const qualifies=plans.some(p=>["1 Gig","1.5 Gig","2 Gig"].includes(p.speed));
 if(qualifies&&active(date,eero.start,eero.end)){
   $("promoBox").hidden=false;$("promoBox").textContent=eero.display;used.push(eero.name);
 }else $("promoBox").hidden=true;
 $("featureBox").textContent=cfg.modifiers.length?cfg.modifiers.join("  •  "):"Unlimited Data  •  No Contracts";
 $("offerList").textContent=[...new Set(used)].join(" · ")||"No promotional offers active";
}
fetch("data/ippg-data.json").then(r=>r.json()).then(d=>{
 DB=d;
 $("configSelect").innerHTML=d.configurations.map(c=>`<option value="${c.id}">${c.label}</option>`).join("");
 $("configSelect").addEventListener("change",render);
 $("effectiveDate").addEventListener("change",render);
 $("printBtn").addEventListener("click",()=>window.print());
 render();
}).catch(e=>document.body.innerHTML="<p style='padding:30px'>Could not load IPPG data. Run this project through a local web server.</p>");