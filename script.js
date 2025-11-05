// simple client-side gate + localStorage saving
const PASSWORD = 'Borboleta2026'; // <-- senha para compartilhar com convidados

function $(id){return document.getElementById(id);}

function showApp(){
  $('gate').style.display = 'none';
  $('app').style.display = 'block';
}

function showGate(){
  $('gate').style.display = 'block';
  $('app').style.display = 'none';
}

function checkAccess(){
  const p = localStorage.getItem('planner_pass');
  if(p === PASSWORD) showApp();
}
function tryPass(){
  const v = $('pass').value || '';
  if(v === PASSWORD){ localStorage.setItem('planner_pass', v); showApp(); alert('Acesso permitido.'); }
  else alert('Senha incorreta.');
}
function logout(){
  localStorage.removeItem('planner_pass');
  showGate();
  alert('Você saiu do planner.');
}

// saving helpers
function saveField(key, value){
  try{ localStorage.setItem(key, value); } catch(e){ console.warn('Não foi possível salvar:', e); }
}
function loadField(key){
  return localStorage.getItem(key) || '';
}
function bindAutosave(){
  // inputs and textareas marked with data-save attribute
  const els = document.querySelectorAll('[data-save]');
  els.forEach(el=>{
    const key = el.getAttribute('data-save');
    // load
    const v = loadField(key);
    if(v) el.value = v;
    // save on input/blur
    el.addEventListener('input', ()=> saveField(key, el.value) );
    el.addEventListener('blur', ()=> saveField(key, el.value) );
  });
}

// initializations
window.addEventListener('load', ()=>{
  checkAccess();
  $('enterBtn').addEventListener('click', tryPass);
  $('pass').addEventListener('keyup', (e)=> { if(e.key === 'Enter') tryPass(); });
  $('logout').addEventListener('click', logout);
  bindAutosave();
});
