//eventListeners and other initialization
document.querySelectorAll(".number").forEach((number) => {
    number.addEventListener('click', Btn_Number);
});

document.querySelectorAll(".operation").forEach((operation) => {
    operation.addEventListener('click', Btn_Operation);
});

document.querySelector("#Clear").addEventListener('click', Btn_Clear);
document.querySelector('#Equals').addEventListener('click', Btn_Equal);

//Calculation functions and variables
const calcScreen = document.querySelector("#calc-screen");
let currValue = null;
let screenValue = "";
let currOperation = null;

function Add(a, b){
    return a + b;
}

function Sub(a, b){
    return a - b;
}

function Multiply(a, b){
    return a * b;
}

function Divide(a, b){
    if (b === 0)
        console.error("Division by 0 is not allowed");
    else
        return a / b;
}

//User presses an operation button =>
//updates currOperation 
//IF currValue != null, then actually carry out operation
//OTHERWISE, currValue is set to inputNumber
function Btn_Operation(){
    let operation = Add;
    if (this.id == "Sub")
        operation = Sub;
    else if (this.id == "Multiply")
        operation = Multiply;
    else if (this.id == "Divide")
        operation = Divide;

    currOperation = operation;

    if (currValue !== null){
        currValue = operation(currValue, Number(screenValue));
    }
    else
        currValue = Number(screenValue);

    Update_Screen();
}

//User presses equal button =>
//Carries out operation using currValue, inputValue, currOperation
function Btn_Equal(){
    console.log("Equal pressed");
    currValue = currOperation(currValue, Number(screenValue));
    screenValue = currValue.toString();
    Update_Screen();
}

//User presses Clear button =>
//Sets currValue = null, currOperation = null, screenValue = 0
function Btn_Clear(){
    currValue = null;
    currOperation = null;
    screenValue = "";
    Update_Screen();   
}

//Button behaviors:
//User presses a button number => updates inputNumber
function Btn_Number(){
    number = Number(this.id);
    screenValue = screenValue + number;
    Update_Screen();
}

function Update_Screen(){
    console.log("ScreenVal:" + screenValue);
    calcScreen.textContent = screenValue;
}