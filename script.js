const hh = document.getElementById("hh");
const mm = document.getElementById("mm");
const ss = document.getElementById("ss");
const hora = document.getElementById("hora");
const regua = document.getElementById("regua");
const dataEl = document.getElementById("data");
const fuso = document.getElementById("fuso");
const periodo = document.getElementById("periodo");
const botao = document.getElementById("formato");

let formato12 = false;

const formatoData = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
});

fuso.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone.replace("_", " ");

function dois(n) {
  return String(n).padStart(2, "0");
}

function atualizar() {
  const agora = new Date();
  let h = agora.getHours();

  if (formato12) {
    periodo.textContent = h < 12 ? "AM" : "PM";
    h = h % 12 || 12;
  }
  periodo.hidden = !formato12;
  hh.textContent = dois(h);
  mm.textContent = dois(agora.getMinutes());
  ss.textContent = dois(agora.getSeconds());
  dataEl.textContent = formatoData.format(agora);
  regua.style.transform = `scaleX(${agora.getSeconds() / 60})`;
  hora.dateTime = agora.toTimeString().slice(0, 8);
}

function ciclo() {
  atualizar();
  setTimeout(ciclo, 1000 - (Date.now() % 1000));
}

botao.addEventListener("click", () => {
  formato12 = !formato12;
  botao.textContent = formato12 ? "Formato 12 h" : "Formato 24 h";
  atualizar();
});

ciclo();
