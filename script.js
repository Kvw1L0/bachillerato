
const inputs = document.querySelectorAll(".input");
const resultBox = document.getElementById("results");
const gameId = generateID();
document.getElementById("gameIdDisplay").textContent = gameId;

let timer;
let timeLeft = 60;
let timerRunning = false;

function generateID() {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
}

function toggleTimer() {
  const btn = document.getElementById("startStopBtn");
  const box = document.getElementById("game-box");
  const alert = document.getElementById("alert-message");

  if (!timerRunning) {
    timeLeft = 60;
    document.getElementById("countdown").textContent = timeLeft;
    btn.textContent = "⏹️ Detener";
    btn.classList.add("stopping");
    box.classList.add("emergency");
    timerRunning = true;
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("countdown").textContent = timeLeft;
      if (timeLeft <= 0) stopTimer();
    }, 1000);
  } else {
    stopTimer();
  }
}

function stopTimer() {
  const btn = document.getElementById("startStopBtn");
  const box = document.getElementById("game-box");
  const alert = document.getElementById("alert-message");

  clearInterval(timer);
  timerRunning = false;
  btn.textContent = "▶️ Iniciar";
  btn.classList.remove("stopping");
  box.classList.remove("emergency");
  box.classList.add("safe");

  alert.classList.add("visible");

  launchConfetti();
}

function downloadAnswers() {
  const data = Array.from(inputs).map(input => input.value);
  const categories = ["Nombre", "Apellido", "Ciudad o País", "Animal", "Fruta o Verdura", "Objeto", "Color", "Profesión"];
  let text = `ID de Juego: ${gameId}\nLetra: Manual\n\n`;
  categories.forEach((cat, i) => {
    text += cat + ": " + (data[i] || "-") + "\n";
  });

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bachillerato_${gameId}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function sendWhatsApp() {
  const data = Array.from(inputs).map(input => input.value);
  const categories = ["Nombre", "Apellido", "Ciudad o País", "Animal", "Fruta o Verdura", "Objeto", "Color", "Profesión"];
  let message = `🎓 Bachillerato\nID: ${gameId}\nLetra: Manual\n`;
  categories.forEach((cat, i) => {
    message += `${cat}: ${data[i] || "-"}\n`;
  });

  const phone = "+56986532423";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function launchConfetti() {
  const myConfetti = confetti.create(document.getElementById('confettiCanvas'), {
    resize: true,
    useWorker: true
  });
  myConfetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 }
  });
}

// sonidos
const soundStart = document.getElementById("sound-start");
const soundCountdown = document.getElementById("sound-countdown");
const soundVictory = document.getElementById("sound-victory");

function toggleTimer() {
  const btn = document.getElementById("startStopBtn");
  const box = document.getElementById("game-box");
  const alert = document.getElementById("alert-message");

  if (!timerRunning) {
    timeLeft = 60;
    document.getElementById("countdown").textContent = timeLeft;
    btn.textContent = "⏹️ Detener";
    btn.classList.add("stopping");
    box.classList.add("emergency");
    timerRunning = true;
    soundStart.play();

    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("countdown").textContent = timeLeft;
      if (timeLeft === 10) {
        soundCountdown.play();
      }
      if (timeLeft <= 0) stopTimer();
    }, 1000);
  } else {
    stopTimer();
  }
}

function stopTimer() {
  const btn = document.getElementById("startStopBtn");
  const box = document.getElementById("game-box");
  const alert = document.getElementById("alert-message");

  clearInterval(timer);
  timerRunning = false;
  btn.textContent = "▶️ Iniciar";
  btn.classList.remove("stopping");
  box.classList.remove("emergency");
  box.classList.add("safe");

  alert.classList.add("visible");

  soundVictory.play();
  launchConfetti();
}

function captureScreen() {
  html2canvas(document.body).then(function(canvas) {
    const link = document.createElement('a');
    link.download = 'bachillerato_' + gameId + '.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

// Detectar iOS o Android
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);
const captureBtn = document.getElementById("captureBtn");

if (isIOS) {
  captureBtn.innerHTML = "1️⃣ Toca y mantén para guardar";
} else if (isAndroid) {
  captureBtn.innerHTML = "📸 Captura tu pantalla";
}
