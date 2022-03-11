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
    return number1 / number2;
}

function operate(operator, number1, number2) {
    let result;
    if (operator === "+") {
        result = add(number1, number2);
    } else if (operator === "-") {
        result = substract(number1, number2);
    } else if (operator === "*") {
        result = multiply(number1, number2);
    }  else if (operator === "/") {
        result = divide(number1, number2);
    } else {
        console.log("TODO")
    }
    return result;
}

const numbersButtons = document.querySelectorAll(".number");
const operatorsButtons = document.querySelectorAll(".operator");
const deleteButton = document.getElementById("del");
const dotButton = document.getElementById("dot");
const clearButton = document.getElementById("clear");

const objectValues = {
    "display": undefined,
    "operator": undefined,
    "firstNumber": undefined,
    "secondNumber": undefined,
    "result": undefined,
};

numbersButtons.forEach(button => button.addEventListener("click", (e) => updateData(e, objectValues)));
operatorsButtons.forEach(button => button.addEventListener("click", (e) => handleOperator(e, objectValues)))
deleteButton.addEventListener("click", () => deleteLastNumber(objectValues));


function updateData(e, dataObject) {
    const numberPressed = e.target.value;
    if (!dataObject.display) {
        dataObject.display = "" + numberPressed;
    } else {
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

function isSecondNumber(dataObject){
    return dataObject.firstNumber !== undefined;
}


function handleOperator(e, dataObject){
    const operator = e.target.value;
    const firstNumber = dataObject.firstNumber;
    const secondNumber = dataObject.secondNumber;

    if (operator === "=" && isSecondNumber(dataObject)) {
        dataObject.secondNumber = Number(dataObject.display);
        const result = operate(dataObject.operator, firstNumber, secondNumber)
        dataObject.result = result;
        updateDisplay(result);
    } else { 
        dataObject.operator = operator;
        dataObject.firstNumber = Number(dataObject.display);
        dataObject.display = "";
        updateDisplay(dataObject.display);        
    }

}
