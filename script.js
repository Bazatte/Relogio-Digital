const hh = document.getElementById("hh");
const mm = document.getElementById("mm");
const ss = document.getElementById("ss");

// ===== Passo 9 (parte A): mais elementos =====
const hora = document.getElementById("hora");
const regua = document.getElementById("regua");
const dataEl = document.getElementById("data");
const fuso = document.getElementById("fuso");

const formatoData = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
});

// Mostra o fuso horário uma única vez, ao abrir a página
fuso.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone.replace("_", " ");

// ===== Passo 10 (parte A): elementos do botão 12 h / 24 h =====
const periodo = document.getElementById("periodo");
const botao = document.getElementById("formato");

let formato12 = false; // false = 24 h, true = 12 h

// ===== Passo 7: garante dois dígitos (7 vira "07") =====
function dois(n) {
  return String(n).padStart(2, "0");
}

// ===== Passo 7 + 9 (parte B) + 10 (parte B): lê a hora atual e escreve na tela =====
function atualizar() {
  const agora = new Date();
  let h = agora.getHours();

  if (formato12) {
    periodo.textContent = h < 12 ? "AM" : "PM";
    h = h % 12 || 12; // 0 e 12 viram 12; 13 vira 1; 23 vira 11
  }
  periodo.hidden = !formato12; // mostra AM/PM só no formato 12 h

  hh.textContent = dois(h);
  mm.textContent = dois(agora.getMinutes());
  ss.textContent = dois(agora.getSeconds());

  // Passo 9 (parte B)
  dataEl.textContent = formatoData.format(agora);
  regua.style.transform = `scaleX(${agora.getSeconds() / 60})`;
  hora.dateTime = agora.toTimeString().slice(0, 8);
}

// ===== Passo 10 (parte C): botão 12 h / 24 h (antes da chamada final ciclo()) =====
botao.addEventListener("click", () => {
  formato12 = !formato12; // inverte: true vira false e vice-versa
  botao.textContent = formato12 ? "Formato 12 h" : "Formato 24 h";
  atualizar(); // redesenha na hora, sem esperar o próximo segundo
});

// ===== Passo 8: roda sempre no início de cada segundo =====
function ciclo() {
  atualizar();
  setTimeout(ciclo, 1000 - (Date.now() % 1000));
}

ciclo();