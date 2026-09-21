const IPPG = {
  fiber: false,
  equipmentIncluded: true
};

const page = document.getElementById("ippgPage");
const scaler = document.getElementById("previewScaler");

function renderVariables(){
  document.getElementById("fiberWord").textContent =
    IPPG.fiber ? "Fiber" : "Fiber-Fueled";
  document.getElementById("equipmentCopy").hidden = !IPPG.equipmentIncluded;
}

function fitPreview(){
  if (window.matchMedia("print").matches) return;
  const available = Math.max(320, Math.min(window.innerWidth - 56, 1000));
  const scale = available / 2550;
  page.style.transform = `scale(${scale})`;
  scaler.style.width = `${2550 * scale}px`;
  scaler.style.height = `${3300 * scale}px`;
}

document.getElementById("fiberToggle").addEventListener("change", e=>{
  IPPG.fiber = e.target.checked; renderVariables();
});
document.getElementById("equipmentToggle").addEventListener("change", e=>{
  IPPG.equipmentIncluded = e.target.checked; renderVariables();
});
document.getElementById("printBtn").addEventListener("click", ()=>window.print());
window.addEventListener("resize", fitPreview);

renderVariables();
fitPreview();
