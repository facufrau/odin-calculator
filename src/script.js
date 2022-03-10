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

function operate(operator, operands) {
    const [number1, number2] = operands;
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
const deleteButton = document.getElementById("del");

numbersButtons.forEach(button => button.addEventListener("click", updateDisplay));
deleteButton.addEventListener("click", deleteLastNumber);


function updateDisplay(e) {
    const value = e.target.value;
    const display = document.getElementById("display");
    display.textContent += value;
}

function deleteLastNumber(e) {
    const display = document.getElementById("display");
    display.textContent = display.textContent.slice(0,-1);
}