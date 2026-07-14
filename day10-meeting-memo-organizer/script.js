const customerNameInput = document.getElementById("customerName");
const productNameInput = document.getElementById("productName");
const salesPhaseInput = document.getElementById("salesPhase");
const meetingMemoInput = document.getElementById("meetingMemo");
const detailLevelInput = document.getElementById("detailLevel");
const promptResult = document.getElementById("promptResult");

function generatePrompt() {
    const customerName = customerNameInput.value.trim();
    const productName = productNameInput.value.trim();
    const salesPhase = salesPhaseInput.value;
    const meetingMemo = meetingMemoInput.value.trim();
    const detailLevel = detailLevelInput.value;
    const organizePoints = getSelectedOrganizePoints();

    if (customerName === "" || productName === "" || meetingMemo === "") {
        alert("会社名・相手名、商材、商談メモを入力してください");
        return;
    }

    const promptText =
        "あなたは法人営業に強い営業マネージャーです。\n\n" +
        "以下の商談メモを、営業活動で使いやすい形に整理してください。\n\n" +

        "【会社名・相手名】\n" +
        customerName + "\n\n" +

        "【商材】\n" +
        productName + "\n\n" +

        "【商談フェーズ】\n" +
        salesPhase + "\n\n" +

        "【商談メモ】\n" +
        meetingMemo + "\n\n" +

        "【整理したい観点】\n" +
        organizePoints + "\n\n" +

        "【出力の詳しさ】\n" +
        detailLevel + "\n\n" +

        "【出力条件】\n" +
        "・営業担当が次に何をすべきか分かるように整理してください\n" +
        "・顧客の発言と推測を分けてください\n" +
        "・不明点は「追加確認が必要」として整理してください\n" +
        "・次回商談で確認すべき質問を作成してください\n" +
        "・失注リスクがあれば明記してください\n" +
        "・社内共有しやすい箇条書きで出力してください\n\n" +

        "【出力形式】\n" +
        "1. 商談概要\n" +
        "2. 顧客課題\n" +
        "3. 顧客ニーズ\n" +
        "4. 懸念点・ネック\n" +
        "5. 決裁者・関係者\n" +
        "6. 予算感・導入時期\n" +
        "7. 次回アクション\n" +
        "8. 次回確認すべき質問\n" +
        "9. 失注リスク\n" +
        "10. お礼メール案";

    promptResult.value = promptText;
}

function getSelectedOrganizePoints() {
    const checkedPoints = document.querySelectorAll('input[name="organizePoint"]:checked');

    if (checkedPoints.length === 0) {
        return "商談概要、顧客課題、次回アクション";
    }

    const points = Array.from(checkedPoints).map(function (item) {
        return item.value;
    });

    return points.join("、");
}

function copyPrompt() {
    if (promptResult.value === "") {
        alert("先にプロンプトを作成してください");
        return;
    }

    navigator.clipboard.writeText(promptResult.value);
    alert("プロンプトをコピーしました");
}

function resetForm() {
    customerNameInput.value = "";
    productNameInput.value = "";
    meetingMemoInput.value = "";
    promptResult.value = "";

    salesPhaseInput.selectedIndex = 0;
    detailLevelInput.selectedIndex = 0;

    document.querySelectorAll('input[name="organizePoint"]').forEach(function (checkbox) {
        checkbox.checked = false;
    });
}