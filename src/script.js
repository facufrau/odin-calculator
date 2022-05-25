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
    if (!calculatorData.display || 
        (calculatorData.display[0] === "0" && !calculatorData.display.includes(".")))
        {
        calculatorData.display = "" + number;
    } else if (calculatorData.display.length < 10) {
        calculatorData.display = calculatorData.display + number;
    }
   display.textContent = calculatorData.display;

}

function clearDisplay(calculatorData) {
    calculatorData.display = "0";
    display.textContent = calculatorData.display;
}

function clearAll(calculatorData){
    for (let data in calculatorData) {
        data === "display" ? calculatorData[data] = 0 : calculatorData[data] = null;
    };
    clearDisplay(calculatorData);
}

function roundResult(result) {
    resultString = String(result);
    if (resultString.length >= 10) {
        if (resultString.includes(".")){
            return parseFloat(result.toFixed(9 - resultString.indexOf(".") + 1));
        } else {
            return Number(resultString.substring(0, 10));
        }
    } 
    return result;
}

function removeLastValue(calculatorData){
    calculatorData.display = calculatorData.display.slice(0,-1);
    display.textContent = calculatorData.display;
}

function addDecimalPoint(calculatorData) {
    let newDisplay = calculatorData.display;
    if (!calculatorData.display.includes(".")){
        newDisplay += ".";
        calculatorData.display = newDisplay;
    }
    display.textContent = calculatorData.display;
}


function disableCalculator() {
    buttons.forEach(button => {
        if (button.id === "clear") {
            button.classList.add("highlighted");
        }  
        else {
            button.setAttribute("disabled", "");
            }
    })
}

function enableCalculator() {
    buttons.forEach(button => {
        if (button.id === "clear") {
            button.classList.remove("highlighted");
        }  
        else {
            button.removeAttribute("disabled");
            }
    })
}

const calculatorData = {
    "display": "",
    "operator": null,
    "firstNumber": null,
    "secondNumber": null,
};

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const buttonDelete = document.getElementById("del");

buttons.forEach (button => button.addEventListener("click", (e) => buttonClick(e, calculatorData)))

function buttonClick(e, calculatorData) {
    let targetName = e.target.name;
    let result;
    const display = document.getElementById("display");

    if (targetName === "number") {
        if (buttonDelete.hasAttribute("disabled")) {
            buttonDelete.removeAttribute("disabled");
        }
        let number = e.target.value;
        updateDisplay(number, calculatorData);
        } 
    else if (targetName === "operator") {
        let operator = e.target.value;
        if (operator === "=" && calculatorData.firstNumber === null) {
            return;
            }
        else if (calculatorData.firstNumber === null) {
            calculatorData.firstNumber = Number(calculatorData.display);
            calculatorData.operator = operator;
            clearDisplay(calculatorData);
            }
        else if (calculatorData.operator === "=") {
            calculatorData.operator = operator;
        }
        else {
            buttonDelete.setAttribute("disabled", "");
            calculatorData.secondNumber = Number(calculatorData.display);
            result = operate(calculatorData.operator, calculatorData.firstNumber, calculatorData.secondNumber);
            let rounded = roundResult(result); 
            if (rounded === "DIV/0 ERR") {
                disableCalculator();
            }
            display.textContent = rounded;
            calculatorData.firstNumber = rounded;
            calculatorData.operator = operator;
            calculatorData.display = "";
            }
        } 
    else if (targetName === "clear") {
        if (e.target.classList.contains("highlighted")){
            enableCalculator();
        }
        clearAll(calculatorData);
        } 
    else if (targetName === "dot") {
        addDecimalPoint(calculatorData);
        } 
    else if (targetName === "del") {
        removeLastValue(calculatorData)
        }
}
