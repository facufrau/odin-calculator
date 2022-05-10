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

function clearAll(dataObject) {
    dataObject.display = "";
    dataObject.firstOperator = null;
    dataObject.secondOperator = null;
    dataObject.firstNumber = null;
    dataObject.secondNumber = null;
    updateDisplay("");
}

function addDecimalPoint(dataObject) {
    let newDisplay = dataObject.display;
    if (!dataObject.display.includes(".")){
        newDisplay += ".";
        dataObject.display = newDisplay;
    }
    updateDisplay(newDisplay);
}

function handleOperation(e, dataObject){
    const operator = e.target.value;
    let result;

    if (!dataObject.firstOperator) {
        dataObject.firstOperator = operator;
        dataObject.firstNumber = Number(dataObject.display);
        updateDisplay("");
        dataObject.display = "";
    }

    else {
        dataObject.secondNumber = Number(dataObject.display);
        dataObject.secondOperator = operator;
        result = operate(dataObject.firstOperator, dataObject.firstNumber, dataObject.secondNumber)
        updateDisplay(result);
        dataObject.firstOperator = operator;
        dataObject.firstNumber = result;
    }
    
    
    /*
       
    
    numbers.push(Number(dataObject.display));
    console.log(numbers);
    operators.push(operator);
    updateDisplay("");
    dataObject.display = "";

    if (operator === "=" || operators.length > 1) {
        const previousOperator = operators[operators.length - 2];
        result = operate(previousOperator, numbers[numbers.length - 2], numbers[numbers.length - 1]);
        if (String(result).includes(".")){
            result = result.toFixed(3)
        }
        updateDisplay(result);
        dataObject.display = String(result);
    }
  */
}




const numbersButtons = document.querySelectorAll(".number");
const operatorsButtons = document.querySelectorAll(".operator");
const deleteButton = document.getElementById("del");
const dotButton = document.getElementById("dot");
const clearButton = document.getElementById("clear");

const objectValues = {
    "display": "",
    "firstOperator": null,
    "secondOperator": null,
    "firstNumber": null,
    "secondNumber": null,
};

numbersButtons.forEach(button => button.addEventListener("click", (e) => updateData(e, objectValues)));
operatorsButtons.forEach(button => button.addEventListener("click", (e) => handleOperation(e, objectValues)))
deleteButton.addEventListener("click", () => deleteLastNumber(objectValues));
clearButton.addEventListener("click", () => clearAll(objectValues));
dotButton.addEventListener("click", () => addDecimalPoint(objectValues));