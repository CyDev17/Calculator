// script.js

const result = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let lastInput = "";
let operatorPressed = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (button.classList.contains("number")) {
            handleNumber(value);
        } else if (button.classList.contains("operator")) {
            handleOperator(value);
        } else if (button.classList.contains("equals")) {
            calculate();
        } else if (value === "C") {
            clearAll();
        } else if (value === "CE") {
            clearEntry();
        }
    });
});

function handleNumber(num) {
    if (operatorPressed) {
        currentInput = "";
        operatorPressed = false;
    }
    if (num === "." && currentInput.includes(".")) return;
    currentInput += num;
    result.value = currentInput;
}

function handleOperator(op) {
    if (currentInput === "") return;
    if (lastInput !== "") {
        calculate();
    }
    lastInput = currentInput;
    currentInput = "";
    operatorPressed = true;
    result.value = op;
    result.dataset.operator = op;
}

function calculate() {
    if (!lastInput || !currentInput || !result.dataset.operator) return;

    const num1 = parseFloat(lastInput);
    const num2 = parseFloat(currentInput);
    let res = 0;

    switch (result.dataset.operator) {
        case "+":
            res = num1 + num2;
            break;
        case "-":
            res = num1 - num2;
            break;
        case "×":
            res = num1 * num2;
            break;
        case "÷":
            res = num2 !== 0 ? num1 / num2 : "Error";
            break;
        case "%":
            res = num1 % num2;
            break;
        default:
            return;
    }

    result.value = res;
    currentInput = res.toString();
    lastInput = "";
    operatorPressed = false;
    delete result.dataset.operator;
}

function clearAll() {
    currentInput = "";
    lastInput = "";
    result.value = "";
    delete result.dataset.operator;
}

function clearEntry() {
    currentInput = "";
    result.value = "";
}
