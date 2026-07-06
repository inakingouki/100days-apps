const display = document.getElementById("display");

function appendValue(value) {
    if (display.textContent === "0") {
        display.textContent = value;
    } else {
        display.textContent = display.textContent + value;
    }
}

function clearDisplay() {
    display.textContent = "0";
}

function calculate() {
    display.textContent = eval(display.textContent);
}