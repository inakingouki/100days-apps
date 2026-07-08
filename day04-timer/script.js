const timer = document.getElementById("timer");

let timeLeft = 1 * 60;
let timerId = null;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const formattedSeconds = String(seconds).padStart(2, "0");

    timer.textContent = minutes + ":" + formattedSeconds;
}

function startTimer() {
    if (timerId !== null) {
        return;
    }

   timerId = setInterval(function() {
    if (timeLeft <= 0) {
        clearInterval(timerId);
        timerId = null;
        alert("時間です！");
        return;
    }

    timeLeft = timeLeft - 1;
    updateDisplay();
}, 1000);
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 1 * 60;
    updateDisplay();
}