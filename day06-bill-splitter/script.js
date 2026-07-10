const totalAmount = document.getElementById("totalAmount");
const peopleCount = document.getElementById("peopleCount");
const result = document.getElementById("result");
const totalCollected = document.getElementById("totalCollected");

function calculateSplit() {
    const total = Number(totalAmount.value);
    const people = Number(peopleCount.value);

    if (total <= 0 || people <= 0) {
        alert("合計金額と人数を正しく入力してください");
        return;
    }

    const amountPerPerson = Math.ceil(total / people);

    result.textContent = "1人あたり：" + amountPerPerson + "円";
    totalCollected.textContent = "合計集金額：" + amountPerPerson * people + "円";
}