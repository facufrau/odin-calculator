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

function updateDisplay(number, calculatorData) {
    const display = document.getElementById("display");
    if (!calculatorData.display || calculatorData.display[0] === "0") {
        calculatorData.display = "" + number;
    } else if (calculatorData.display.length < 10) {
        calculatorData.display = calculatorData.display + number;
    }
   display.textContent = calculatorData.display;

}

function clearDisplay(calculatorData) {
    const display = document.getElementById("display");
    calculatorData.display = "0";
    display.textContent = calculatorData.display;
}

function clearAll(calculatorData){
    for (let data in calculatorData) {
        data === "display" ? calculatorData[data] = 0 : calculatorData[data] = null;
    };
    clearDisplay(calculatorData);
}

const calculatorData = {
    "display": "",
    "operator": null,
    "firstNumber": null,
    "secondNumber": null,
};

const buttons = document.querySelectorAll("button");
buttons.forEach (button => button.addEventListener("click", (e) => buttonClick(e, calculatorData)))

function buttonClick(e, calculatorData) {
    let targetName = e.target.name;
    let result;
    const display = document.getElementById("display");

    if (targetName === "number") {
        let number = e.target.value;
        updateDisplay(number, calculatorData);
        } 
    else if (targetName === "operator") {
        let operator = e.target.value;
        if (calculatorData.firstNumber === null) {
            calculatorData.firstNumber = Number(calculatorData.display);
            calculatorData.operator = operator;
            clearDisplay(calculatorData);
            }
        else {
            calculatorData.secondNumber = Number(calculatorData.display);
            result = operate(calculatorData.operator, calculatorData.firstNumber, calculatorData.secondNumber);
            display.textContent = result;
            calculatorData.firstNumber = result;
            calculatorData.operator = operator;
            calculatorData.display = "";
            }
        } 
    else if (targetName === "clear") {
        clearAll(calculatorData);
        } 
    else if (targetName === "dot") {
        console.log("dot");
        } 
    else if (targetName === "del") {
        console.log("del");
        }
}

