const distanceInput = document.getElementById("distance");
const minutesInput = document.getElementById("minutes");

const paceResult = document.getElementById("paceResult");
const speedResult = document.getElementById("speedResult");
const adviceResult = document.getElementById("adviceResult");
const lapList = document.getElementById("lapList");

function calculatePace() {
    const distance = Number(distanceInput.value);
    const minutes = Number(minutesInput.value);

    if (distance <= 0 || minutes <= 0) {
        alert("距離と時間を正しく入力してください");
        return;
    }

    const pace = minutes / distance;
    const paceMinutes = Math.floor(pace);
    const paceSeconds = Math.round((pace - paceMinutes) * 60);

    const speed = distance / (minutes / 60);

    paceResult.textContent = "ペース：" + paceMinutes + "分" + String(paceSeconds).padStart(2, "0") + "秒 / km";
    speedResult.textContent = "時速：" + speed.toFixed(1) + "km/h";

    if (pace <= 5) {
        adviceResult.textContent = "アドバイス：かなり速いペースです！";
    } else if (pace <= 6) {
        adviceResult.textContent = "アドバイス：10km60分切りを狙える良いペースです。";
    } else if (pace <= 7) {
        adviceResult.textContent = "アドバイス：無理なく走りやすいペースです。";
    } else {
        adviceResult.textContent = "アドバイス：まずは継続重視でOKです。";
    }
    lapList.innerHTML = "";

    for (let i = 1; i <= distance; i++) {
        const totalSeconds = Math.round((minutes / distance) * i * 60);

        const lapMinutes = Math.floor(totalSeconds / 60);
        const lapSeconds = totalSeconds % 60;

        const li = document.createElement("li");
        li.textContent = i + "km：" + lapMinutes + "分" + String(lapSeconds).padStart(2, "0") + "秒";

        lapList.appendChild(li);
    }
}