const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const targetWeightInput = document.getElementById("targetWeight");

const bmiResult = document.getElementById("bmiResult");
const judgeResult = document.getElementById("judgeResult");
const standardWeightResult = document.getElementById("standardWeightResult");
const differenceResult = document.getElementById("differenceResult");
const targetDifferenceResult = document.getElementById("targetDifferenceResult");
const adviceResult = document.getElementById("adviceResult");
const weightHistory = document.getElementById("weightHistory");

let histories = JSON.parse(localStorage.getItem("weightHistories")) || [];

loadSavedInputs();
renderHistory();

function calculateBmi() {
    const heightCm = Number(heightInput.value);
    const weightKg = Number(weightInput.value);
    const targetWeightKg = Number(targetWeightInput.value);

    if (heightCm <= 0 || weightKg <= 0) {
        alert("身長と体重を正しく入力してください");
        return;
    }

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const roundedBmi = bmi.toFixed(1);

    const standardWeight = 22 * heightM * heightM;
    const difference = weightKg - standardWeight;

    bmiResult.textContent = "BMI：" + roundedBmi;
    standardWeightResult.textContent = "標準体重：" + standardWeight.toFixed(1) + "kg";
    differenceResult.textContent = "標準体重との差：" + formatDifference(difference) + "kg";

    showJudge(bmi);
    showAdvice(bmi, difference);

    if (targetWeightKg > 0) {
        const targetDifference = weightKg - targetWeightKg;
        targetDifferenceResult.textContent = "目標体重との差：" + formatDifference(targetDifference) + "kg";
    } else {
        targetDifferenceResult.textContent = "目標体重との差：-";
    }

    saveInputs(heightCm, weightKg, targetWeightKg);
    addHistory(weightKg, roundedBmi);
}

function showJudge(bmi) {
    if (bmi < 18.5) {
        judgeResult.textContent = "判定：低体重";
        judgeResult.className = "badge blue";
    } else if (bmi < 25) {
        judgeResult.textContent = "判定：普通体重";
        judgeResult.className = "badge green";
    } else if (bmi < 30) {
        judgeResult.textContent = "判定：肥満 1度";
        judgeResult.className = "badge orange";
    } else {
        judgeResult.textContent = "判定：肥満 2度以上";
        judgeResult.className = "badge red";
    }
}

function showAdvice(bmi, difference) {
    if (bmi < 18.5) {
        adviceResult.textContent = "アドバイス：体重を落とすより、栄養と筋力を意識しましょう。";
    } else if (bmi < 25) {
        adviceResult.textContent = "アドバイス：普通体重の範囲内です。運動習慣を続けましょう。";
    } else if (bmi < 30) {
        adviceResult.textContent = "アドバイス：標準体重より" + difference.toFixed(1) + "kg重めです。無理なく少しずつ調整しましょう。";
    } else {
        adviceResult.textContent = "アドバイス：健康管理のため、生活習慣の見直しや専門家への相談も検討しましょう。";
    }
}

function formatDifference(value) {
    if (value > 0) {
        return "+" + value.toFixed(1);
    }

    return value.toFixed(1);
}

function saveInputs(height, weight, targetWeight) {
    localStorage.setItem("height", height);
    localStorage.setItem("weight", weight);

    if (targetWeight > 0) {
        localStorage.setItem("targetWeight", targetWeight);
    }
}

function loadSavedInputs() {
    const savedHeight = localStorage.getItem("height");
    const savedWeight = localStorage.getItem("weight");
    const savedTargetWeight = localStorage.getItem("targetWeight");

    if (savedHeight) {
        heightInput.value = savedHeight;
    }

    if (savedWeight) {
        weightInput.value = savedWeight;
    }

    if (savedTargetWeight) {
        targetWeightInput.value = savedTargetWeight;
    }
}

function addHistory(weight, bmi) {
    const today = new Date();
    const dateText = today.getFullYear() + "/" + 
                     (today.getMonth() + 1) + "/" + 
                     today.getDate();

    const history = {
        date: dateText,
        weight: weight,
        bmi: bmi
    };

    histories.unshift(history);
    histories = histories.slice(0, 5);

    localStorage.setItem("weightHistories", JSON.stringify(histories));

    renderHistory();
}

function renderHistory() {
    weightHistory.innerHTML = "";

    histories.forEach(function(history) {
        const li = document.createElement("li");
        li.textContent = history.date + "：" + history.weight + "kg / BMI " + history.bmi;
        weightHistory.appendChild(li);
    });
}

function clearHistory() {
    histories = [];
    localStorage.removeItem("weightHistories");
    renderHistory();
}

function resetForm() {
    heightInput.value = "";
    weightInput.value = "";
    targetWeightInput.value = "";

    bmiResult.textContent = "BMI：-";
    judgeResult.textContent = "判定：-";
    judgeResult.className = "badge";
    standardWeightResult.textContent = "標準体重：-";
    differenceResult.textContent = "標準体重との差：-";
    targetDifferenceResult.textContent = "目標体重との差：-";
    adviceResult.textContent = "アドバイス：-";

    localStorage.removeItem("height");
    localStorage.removeItem("weight");
    localStorage.removeItem("targetWeight");
}