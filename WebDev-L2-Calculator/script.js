let currentInput = "";
let firstNumber = null;
let currentOperator = null;
let shouldResetDisplay = false;

const result = document.getElementById("result");
const expression = document.getElementById("expression");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const decimalButton = document.getElementById("decimal");


// Number buttons
numberButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        let number = button.dataset.number;

        if (shouldResetDisplay) {
            currentInput = "";
            shouldResetDisplay = false;
        }

        currentInput = currentInput + number;

        result.textContent = currentInput;
    });
});


// Decimal button
decimalButton.addEventListener("click", function() {

    if (shouldResetDisplay) {
        currentInput = "";
        shouldResetDisplay = false;
    }

    if (!currentInput.includes(".")) {

        if (currentInput === "") {
            currentInput = "0";
        }

        currentInput = currentInput + ".";

        result.textContent = currentInput;
    }
});


// Operator buttons
operatorButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (currentInput === "") {
            return;
        }

        if (firstNumber !== null && currentOperator !== null) {

            calculate();

        } else {

            firstNumber = parseFloat(currentInput);
        }

        currentOperator = button.dataset.operator;

        expression.textContent =
            firstNumber + " " + getOperatorSymbol(currentOperator);

        shouldResetDisplay = true;
    });
});


// Equals button
equalsButton.addEventListener("click", function() {

    if (
        firstNumber === null ||
        currentOperator === null ||
        currentInput === ""
    ) {
        return;
    }

    calculate();

    currentOperator = null;
    firstNumber = null;
    shouldResetDisplay = true;
});


// Calculate function
function calculate() {

    let secondNumber = parseFloat(currentInput);
    let answer;

    switch (currentOperator) {

        case "+":
            answer = firstNumber + secondNumber;
            break;

        case "-":
            answer = firstNumber - secondNumber;
            break;

        case "*":
            answer = firstNumber * secondNumber;
            break;

        case "/":

            if (secondNumber === 0) {

                result.textContent = "Error";
                expression.textContent = "Cannot divide by zero";

                currentInput = "";
                firstNumber = null;
                currentOperator = null;

                return;
            }

            answer = firstNumber / secondNumber;
            break;
    }

    answer = parseFloat(answer.toFixed(10));

    expression.textContent =
        firstNumber + " " +
        getOperatorSymbol(currentOperator) + " " +
        secondNumber + " =";

    result.textContent = answer;

    currentInput = answer.toString();
}


// Operator symbol
function getOperatorSymbol(operator) {

    switch (operator) {

        case "+":
            return "+";

        case "-":
            return "−";

        case "*":
            return "×";

        case "/":
            return "÷";

        default:
            return "";
    }
}


// Clear button
clearButton.addEventListener("click", function() {

    currentInput = "";
    firstNumber = null;
    currentOperator = null;
    shouldResetDisplay = false;

    result.textContent = "0";
    expression.textContent = "";
});


// Backspace button
backspaceButton.addEventListener("click", function() {

    if (shouldResetDisplay) {
        return;
    }

    currentInput = currentInput.slice(0, -1);

    if (currentInput === "") {
        result.textContent = "0";
    } else {
        result.textContent = currentInput;
    }
});