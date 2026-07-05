const player = document.getElementById("player");
const cpu = document.getElementById("cpu");
const result = document.getElementById("result");

function play(hand) {
    player.textContent = "あなた：" + hand;
    const hands = ["グー", "チョキ", "パー"];
const cpuHand = hands[Math.floor(Math.random() * 3)];

cpu.textContent = "CPU：" + cpuHand;

console.log(cpuHand);

if (hand === cpuHand) {
    result.textContent = "あいこ！";
} else if (
    (hand === "グー" && cpuHand === "チョキ") ||
    (hand === "チョキ" && cpuHand === "パー") ||
    (hand === "パー" && cpuHand === "グー")
) {
    result.textContent = "勝ち！";
} else {
    result.textContent = "負け！";
}

}

