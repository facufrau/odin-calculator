function add(number1, number2) {
    return number1 + number2;
}

function substract(number1, number2){
    return number1 - number2;
}

function multiply(number1, number2){
    return number1 * number2;
}

function divide(number1, number2){
    if (number2 === 0) {
        return "DIV/0 ERR";
    } else {
        return number1 / number2;
    }
}

function operate(operator, number1, number2) {
    let result;
    if (operator === "+") {
        result = add(number1, number2);
    } else if (operator === "-") {
        result = substract(number1, number2);
    } else if (operator === "*") {
        result = multiply(number1, number2);
    } else if (operator === "/") {
        result = divide(number1, number2);
    } else {
        console.log("TODO")
    }
    return result;
}

function updateData(e, dataObject) {
    const numberPressed = e.target.value;
    if (!dataObject.display) {
        dataObject.display = "" + numberPressed;
    } else if (dataObject.display.length < 10) {
        dataObject.display = dataObject.display + numberPressed;
    }
    updateDisplay(dataObject.display);
}

function updateDisplay(numberToDisplay) {
    const display = document.getElementById("display");
    display.textContent = numberToDisplay;
}

function deleteLastNumber(dataObject) {
    dataObject.display = dataObject.display.slice(0,-1);
    updateDisplay(dataObject.display);
}

function handleOperation(e, dataObject){
    const operator = e.target.value;
    const numbers = dataObject.numbers;
    const operators = dataObject.operators;
    let result;

    numbers.push(Number(dataObject.display));
    console.log(numbers);
    operators.push(operator);
    updateDisplay("");
    dataObject.display = "";

    if (operator === "=") {
        const previousOperator = operators[operators.length - 2];
        result = operate(previousOperator, numbers[numbers.length - 2], numbers[numbers.length - 1]);
        if (String(result).includes(".")){
            result = result.toFixed(3)
        }
        updateDisplay(result);
        dataObject.display = String(result);
    }
  
}

function clearAll(dataObject) {
    dataObject.display = "";
    dataObject.operators = [];
    dataObject.numbers = [];
    updateDisplay("");
}


const numbersButtons = document.querySelectorAll(".number");
const operatorsButtons = document.querySelectorAll(".operator");
const deleteButton = document.getElementById("del");
const dotButton = document.getElementById("dot");
const clearButton = document.getElementById("clear");

const objectValues = {
    "display": "",
    "operators": [],
    "numbers": [],
};

numbersButtons.forEach(button => button.addEventListener("click", (e) => updateData(e, objectValues)));
operatorsButtons.forEach(button => button.addEventListener("click", (e) => handleOperation(e, objectValues)))
deleteButton.addEventListener("click", () => deleteLastNumber(objectValues));
clearButton.addEventListener("click", () => clearAll(objectValues));