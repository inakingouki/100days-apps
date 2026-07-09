const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");
const charCountNoSpace = document.getElementById("charCountNoSpace");

textInput.addEventListener("input", function() {
    const text = textInput.value;

    charCount.textContent = text.length;

    const textNoSpace = text.replace(/\s/g, "");
    charCountNoSpace.textContent = textNoSpace.length;

    remainingCount.textContent = 280 - text.length;
});