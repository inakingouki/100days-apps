const emailPurposeInput = document.getElementById("emailPurpose");
const customerNameInput = document.getElementById("customerName");
const productNameInput = document.getElementById("productName");
const salesPhaseInput = document.getElementById("salesPhase");
const customerIssueInput = document.getElementById("customerIssue");
const customerReplyInput = document.getElementById("customerReply");
const temperatureInput = document.getElementById("temperature");
const nextProposalInput = document.getElementById("nextProposal");
const nextActionInput = document.getElementById("nextAction");
const senderRoleInput = document.getElementById("senderRole");
const toneInput = document.getElementById("tone");
const lengthInput = document.getElementById("length");
const promptResult = document.getElementById("promptResult");

function generatePrompt() {
    const emailPurpose = emailPurposeInput.value;
    const customerName = customerNameInput.value.trim();
    const productName = productNameInput.value.trim();
    const salesPhase = salesPhaseInput.value;
    const customerIssue = customerIssueInput.value.trim();
    const customerReply = customerReplyInput.value.trim();
    const concern = getSelectedConcerns();
    const temperature = temperatureInput.value;
    const nextProposal = nextProposalInput.value.trim();
    const nextAction = nextActionInput.value;
    const senderRole = senderRoleInput.value;
    const tone = toneInput.value;
    const length = lengthInput.value;

    if (customerName === "" || productName === "" || customerIssue === "") {
        alert("相手の名前・会社名、商材、相手の課題は入力してください");
        return;
    }

    const promptText =
        "あなたは法人営業に強いプロの営業担当です。\n\n" +
        "以下の情報をもとに、営業成果につながる「" + emailPurpose + "」を作成してください。\n\n" +

        "【メールの目的】\n" +
        emailPurpose + "\n\n" +

        "【相手の名前・会社名】\n" +
        customerName + "\n\n" +

        "【商材】\n" +
        productName + "\n\n" +

        "【商談フェーズ】\n" +
        salesPhase + "\n\n" +

        "【相手の課題】\n" +
        customerIssue + "\n\n" +

        "【先方からの返信・商談メモ】\n" +
        valueOrDefault(customerReply) + "\n\n" +

        "【懸念点・ネック】\n" +
        concern + "\n\n" +

        "【相手の温度感】\n" +
        temperature + "\n\n" +

        "【次回提案内容】\n" +
        valueOrDefault(nextProposal) + "\n\n" +

        "【相手に取ってほしい行動】\n" +
        nextAction + "\n\n" +

        "【送信者の立場】\n" +
        senderRole + "\n\n" +

        "【トーン】\n" +
        tone + "\n\n" +

        "【文量】\n" +
        length + "\n\n" +

        "【作成条件】\n" +
        "・件名を3パターン作成してください\n" +
        "・本文はそのまま送れる自然なビジネスメールにしてください\n" +
        "・相手の課題に寄り添ってください\n" +
        "・押し売り感を出さないでください\n" +
        "・相手の温度感に合わせた強さにしてください\n" +
        "・懸念点がある場合は自然に触れてください\n" +
        "・次回アクションを明確にしてください\n" +
        "・相手が社内共有しやすい表現にしてください\n" +
        "・先方からの返信や商談メモがある場合は、その文脈を必ず踏まえてください\n" +
        "・長すぎず、読みやすい構成にしてください\n\n" +

        "【出力形式】\n" +
        "1. 件名案3つ\n" +
        "2. メール本文\n" +
        "3. このメールの狙い\n" +
        "4. さらに返信率を上げる改善ポイント";

    promptResult.value = promptText;
}

function getSelectedConcerns() {
    const checkedConcerns = document.querySelectorAll('input[name="concern"]:checked');

    if (checkedConcerns.length === 0) {
        return "特になし";
    }

    const concerns = Array.from(checkedConcerns).map(function (item) {
        return item.value;
    });

    return concerns.join("、");
}

function valueOrDefault(value) {
    if (value === "") {
        return "特になし";
    }

    return value;
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
    customerIssueInput.value = "";
    customerReplyInput.value = "";
    nextProposalInput.value = "";
    promptResult.value = "";

    emailPurposeInput.selectedIndex = 0;
    salesPhaseInput.selectedIndex = 0;
    temperatureInput.selectedIndex = 0;
    nextActionInput.selectedIndex = 0;
    senderRoleInput.selectedIndex = 0;
    toneInput.selectedIndex = 0;
    lengthInput.selectedIndex = 0;

    document.querySelectorAll('input[name="concern"]').forEach(function (checkbox) {
        checkbox.checked = false;
    });
}