let timer;
let timeLeft = 60;
let timerRunning = false;

let gameId = Math.random().toString(36).substr(2, 8).toUpperCase();
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("gameIdDisplay").textContent = gameId;
});

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  document.getElementById("sound-start").play();
  timeLeft = 60;
  document.getElementById("countdown").textContent = timeLeft;
  const box = document.getElementById("game-box");
  box.classList.remove("safe");
  box.classList.add("emergency");

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("countdown").textContent = timeLeft;
    if (timeLeft === 10) {
      document.getElementById("sound-countdown").play();
    }
    if (timeLeft <= 0) {
      manualStop();
    }
  }, 1000);
}

function manualStop() {
  clearInterval(timer);
  timerRunning = false;
  document.getElementById("countdown").textContent = "0";

  const box = document.getElementById("game-box");
  box.classList.remove("emergency");
  box.classList.add("safe");

  document.getElementById("alert-message").classList.add("visible");
  document.getElementById("sound-victory").play();
  confetti();
}

function captureScreen() {
  html2canvas(document.body).then(canvas => {
    let link = document.createElement('a');
    link.download = 'bachillerato_' + gameId + '.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

function sendWhatsApp() {
  const inputs = document.querySelectorAll(".input");
  const categories = ["Nombre", "Apellido", "Ciudad o País", "Animal", "Fruta o Verdura", "Objeto", "Color", "Profesión"];
  let message = `🎓 Bachillerato\nID: ${gameId}\n`;
  categories.forEach((cat, i) => {
    message += `${cat}: ${inputs[i].value || "-"}\n`;
  });
  const phone = "+56986532423";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}