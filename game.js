/* =========================================================
   CHECKPOINT 7 – Game System Logic (With Start & Story Screen)
   ========================================================= */

let totalMistakes = 0;
let spawnTimer;
let currentNPC = null;
let npcQueue = [];            
let stats = { admitted: 0, correct: 0, mistakes: 0 };
let interrogateIndex = 0;
const NEXT_NPC_DELAY = 400;   

const $ = (id) => document.getElementById(id);
const el = {
  npcImage: $("npc-image"), npcName: $("npc-name"),
  dlgBox: $("dialogue-box"), dlgSpeaker: $("dialogue-speaker"), dlgText: $("dialogue-text"),
  docId: $("doc-id"), docHealth: $("doc-health"),
  rulesText: $("rules-text"), rulesDate: $("rules-date"),
  radioMsg: $("radio-msg"), radioLed: $("radio-led"),
  statAdmitted: $("stat-admitted"),
  btnApprove: $("btn-approve"), btnReject: $("btn-reject"),
  btnInterrogate: $("btn-interrogate"), sleepDoor: $("sleep-door"),
  zoneCenter: $("zone-center")
};

// เนื้อเรื่องภาษาอังกฤษ
const storyParagraphs = [
  "Let's imagine our protagonist is Charles, a villager living on the outskirts of City C, as the child of a local farmer. He lives at home with his parents—just the three of them: Charles, his father, and his mother.",
  "One morning, right as he was about to help out with the farm work, Charles fell ill with a high fever, became completely incapacitated, and passed out.",
  "When he finally woke up, he heard sirens blaring outside his house. Authorities barged in and took him away for medical screening. Finding him completely healthy, they instead assigned him a new duty: screening people entering the quarantine center.",
  "Background of the Regions:\n- City B is the upper-class district (lowest infection risk).\n- City A is the middle-class district (moderate infection risk).\n- City C is the slum/outskirt district with the highest infection rate.",
  "Source of Infection:\nMassive swarms of unknown insects escaped from a bizarre scientific experiment in City C, acting as vectors for an unidentified pathogen. Transmission occurs through contact or bites: being touched shows no immediate symptoms but carries a high risk, while being bitten triggers the first stage of infection instantly.",
  "Stages of Infection:\n- Early Stage: Excessive drooling, bloodshot eyes, and pustules breaking out across the body.\n- Final Stage: Complete mutation... Good luck with your duty."
];

let currentStoryIndex = 0;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQueue() {
  let allNPCs = shuffle(npcDatabase.slice());
  npcQueue = allNPCs.slice(0, 8);
}

function setButtonsEnabled(on) {
  [el.btnApprove, el.btnReject, el.btnInterrogate].forEach((b) => (b.disabled = !on));
}

function setRadio(text, active = false) {
  el.radioMsg.textContent = text;
  el.radioLed.classList.toggle("on", active);
}

function updateStats() {
  // ไม่ต้องใช้แล้วเพราะลบหน้าจอแสดงผลออก
}

function spawnNPC() {
  if (npcQueue.length === 0) {
    clearWindow();
    $("game").style.background = `url('Picture/Background.JPG') center/cover no-repeat`;
    
    // 👇 เพิ่มคำสั่งซ่อนกระดาษเอกสารและปุ่มกดตรงนี้ 👇
    [el.docId, el.docHealth].forEach((d) => d.classList.add("is-hidden"));
    const actionsDiv = document.getElementById("actions");
    if (actionsDiv) actionsDiv.style.display = "none";
    // --------------------------------------------------

    setRadio("All 8 visitors have been checked. Please press 'Finalize Inspection' for the final report.", true);
    return null;
  }

  let baseNPC = npcQueue.pop();
  interrogateIndex = 0;

  let randomVariantIndex = Math.floor(Math.random() * baseNPC.variants.length);
  let selectedVariant = baseNPC.variants[randomVariantIndex];

  currentNPC = {
    ...baseNPC,
    isInfected: selectedVariant.isInfected,
    imageUrl: selectedVariant.imageUrl,
    healthReport: selectedVariant.healthReport,
    dialogue: selectedVariant.dialogue 
  };

  $("game").style.background = `url('${currentNPC.imageUrl}') center/cover no-repeat`;
  
  let visitorNumber = 8 - npcQueue.length;
  el.npcName.textContent = "Visitor #" + visitorNumber + " / 8";

  loadDocuments(currentNPC);
  el.dlgBox.classList.remove("is-visible");
  setButtonsEnabled(true);
  setRadio("Someone is at the window...", true);
  return currentNPC;
}

function loadDocuments(npc) {
  const idc = npc.idCardData, hr = npc.healthReport;
  $("id-name").textContent = idc.name;
  $("id-dob").textContent = idc.dob;
  $("id-sector").textContent = idc.sector;
  $("id-expiry").textContent = idc.expiry;
  
  const photoToUse = npc.idPhotoUrl ? npc.idPhotoUrl : ph("333", npc.name.split(" ")[0]);
  $("id-photo").style.setProperty("--id-photo", `url("${photoToUse}")`);
  
  $("hf-temp").textContent = hr.temp;
  $("hf-symptoms").textContent = hr.symptoms;
  $("hf-date").textContent = hr.date;
  $("hf-notes").textContent = hr.notes;
  [el.docId, el.docHealth].forEach((d) => d.classList.remove("is-empty", "is-hidden"));
}

function clearWindow() {
  currentNPC = null;
  closeInspection();
  $("game").style.background = `url('Picture/Background_2.JPG') center/cover no-repeat`;

  el.npcName.textContent = "";
  el.dlgBox.classList.remove("is-visible");
  ["id-name", "id-dob", "id-sector", "id-expiry", "hf-temp", "hf-symptoms", "hf-date", "hf-notes"]
    .forEach((id) => ($(id).textContent = ""));
  $("id-photo").style.removeProperty("--id-photo");
  [el.docId, el.docHealth].forEach((d) => d.classList.add("is-empty"));
  setButtonsEnabled(false);
}

const inspectStyle = document.createElement("style");
inspectStyle.textContent = `
#inspect-panel{position:absolute;left:3%;right:3%;top:2%;height:50%;z-index:40;display:none;gap:1.4em;overflow:auto;
  padding:1.2em 1.6em;color:#241c14;font-size:1.05em;line-height:1.5;
  background:linear-gradient(#d3c49a,#b8a87b);border:.3em solid #1c140e;box-shadow:0 .6em 2em #000}
#inspect-panel.is-open{display:flex}
#inspect-panel section{flex:1;min-width:0}
#inspect-panel h3{font-family:var(--stencil,Impact);border-bottom:2px solid #241c14;margin-bottom:.4em}
#inspect-panel dt{opacity:.65;font-size:.85em}
#inspect-panel dd{font-weight:bold;margin:0 0 .4em}
#inspect-close{position:absolute;top:.3em;right:.6em;background:none;border:0;font-size:1.6em;cursor:pointer;color:#5e0f0c}
.doc[role=button]{cursor:pointer}`;
document.head.appendChild(inspectStyle);

const panel = document.createElement("div");
panel.id = "inspect-panel";
panel.setAttribute("role", "dialog");
panel.setAttribute("aria-label", "Document inspection");
el.zoneCenter.appendChild(panel);

function inspectDocument() {
  if (!currentNPC) return;
  const i = currentNPC.idCardData, h = currentNPC.healthReport;
  panel.innerHTML = `
    <button id="inspect-close" type="button" aria-label="Close">&times;</button>
    <section><h3>IDENTITY CARD</h3><dl>
      <dt>Name</dt><dd>${i.name}</dd><dt>Date of birth</dt><dd>${i.dob}</dd>
      <dt>Sector</dt><dd>${i.sector}</dd><dt>Expires</dt><dd>${i.expiry}</dd></dl></section>
    <section><h3>HEALTH REPORT</h3><dl>
      <dt>Temperature</dt><dd>${h.temp}</dd><dt>Symptoms</dt><dd>${h.symptoms}</dd>
      <dt>Last check</dt><dd>${h.date}</dd><dt>Notes</dt><dd>${h.notes}</dd></dl></section>`;
  panel.classList.add("is-open");
  $("inspect-close").addEventListener("click", closeInspection);
}

function closeInspection() {
  panel.classList.remove("is-open");
}

function makeDecision(approved) {
  if (!currentNPC) return;
  closeInspection();

  const correct = approved !== currentNPC.isInfected;
  if (approved) stats.admitted++;
  if (correct) stats.correct++; else { stats.mistakes++; totalMistakes++; }

  setButtonsEnabled(false);
  clearWindow();
  spawnTimer = setTimeout(spawnNPC, NEXT_NPC_DELAY);
}

function interrogate() {
  if (!currentNPC) return;
  const lines = currentNPC.dialogue;
  if(!lines || lines.length === 0) return;
  
  el.dlgSpeaker.textContent = currentNPC.name + ":";
  el.dlgText.textContent = lines[interrogateIndex % lines.length];
  el.dlgBox.classList.add("is-visible");
  interrogateIndex++;
}

function endDay() {
  if (document.querySelector(".game-alert")) return;
  
  if(npcQueue.length > 0 || currentNPC !== null) {
     gameAlert("The shift is not over yet. Please check all 8 visitors.", false, () => {});
     return;
  }

  let titleText = "";
  let isHappy = false;
  let endingImage = "";

  if (stats.mistakes === 0) {
      isHappy = true;
      endingImage = "Picture/Happy END.jpg"; 
      titleText = "SHELTER SECURED - SUCCESS!";
  } else {
      isHappy = false;
      endingImage = "Picture/Bad END.jpg"; 
      titleText = "CONTAINMENT BREACHED - GAME OVER";
  }

  const endingHtml = `
    <img src="${endingImage}" alt="${titleText}" style="width: 100%; max-width: 600px; height: auto; border-radius: 8px; margin-bottom: 15px; border: 2px solid ${isHappy ? '#2f6b3a' : '#a1201a'}; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
    <br>
  `;

  gameAlert(endingHtml, isHappy, () => {
    totalMistakes = 0;
    stats = { admitted: 0, correct: 0, mistakes: 0 };
    initGame();
  }, "PLAY AGAIN");
}

function gameAlert(msg, ok, cb, label = "OK") {
  const o = document.createElement("div");
  o.className = "game-alert";
  o.innerHTML = `<div class="ga-box ${ok ? "ok" : "bad"}"><p>${msg}</p><button type="button">${label}</button></div>`;
  document.body.appendChild(o);
  const b = o.querySelector("button");
  b.focus();
  b.addEventListener("click", () => { o.remove(); cb(); });
}

function showRules() {
  const r = dailyRules[1];
  el.rulesDate.textContent = ""; 
  el.rulesText.innerHTML = r.html;
  el.rulesText.scrollTop = 0;
}

// ควบคุมปุ่ม Start และหน้าจอเนื้อเรื่อง
const startScreen = document.getElementById("start-screen");
const storyScreen = document.getElementById("story-screen");
const storyTextEl = document.getElementById("story-text");
const btnStart = document.getElementById("btn-start");
const btnNextStory = document.getElementById("btn-next-story");

if (btnStart) {
  btnStart.addEventListener("click", () => {
    if (startScreen) startScreen.style.display = "none";
    if (storyScreen) storyScreen.style.display = "flex";
    showStoryParagraph();
  });
}

function showStoryParagraph() {
  if (currentStoryIndex < storyParagraphs.length) {
    if (storyTextEl) storyTextEl.textContent = storyParagraphs[currentStoryIndex];
  } else {
    if (storyScreen) storyScreen.style.display = "none";
    const gameMain = document.getElementById("game");
    if (gameMain) {
      gameMain.style.background = "url('Picture/Background_2.JPG') center/cover no-repeat";
    }
    initGame();
  }
}

if (btnNextStory) {
  btnNextStory.addEventListener("click", () => {
    currentStoryIndex++;
    showStoryParagraph();
  });
}

[el.docId, el.docHealth].forEach((d) => {
  d.setAttribute("role", "button");
  d.tabIndex = 0;
  d.addEventListener("click", inspectDocument);
  d.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inspectDocument(); } });
});

el.btnApprove.addEventListener("click", () => makeDecision(true));
el.btnReject.addEventListener("click", () => makeDecision(false));
el.btnInterrogate.addEventListener("click", interrogate);
el.sleepDoor.addEventListener("click", endDay);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeInspection(); });

function initGame() {
  showRules();
  const actionsDiv = document.getElementById("actions");
  if (actionsDiv) actionsDiv.style.display = "flex";
  buildQueue();
  clearWindow();
  spawnNPC();
}