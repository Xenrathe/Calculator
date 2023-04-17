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
let screenText = "";
let currInput = "";
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
    if (b === 0){
        alert("Division by 0 is not allowed");
        return a;
    }
    else
        return a / b;
}

//User presses an operation button =>
//updates currOperation 
//depending on state, updates screenText
//depending on state, carries out operation
function Btn_Operation(){
    
    let operation = Add;
    if (this.id == "Sub")
        operation = Sub;
    else if (this.id == "Multiply")
        operation = Multiply;
    else if (this.id == "Divide")
        operation = Divide;

    let inputValue = null;
    if (currInput != '')
        inputValue = Number(currInput);

    if (currValue == null){
        if (currInput == '')
            return;
        
        currOperation = operation;
        screenText += " " + this.textContent + " ";
        Update_Screen();
        currValue = inputValue;
        currInput = '';
        return;
    }

    if (currInput == ''){
        if (currOperation != null)
            screenText = screenText.slice(0, screenText.length - 3) + ' ' + this.textContent + ' ';
        else 
            screenText += ' ' + this.textContent + ' ';

        Update_Screen();
        currOperation = operation;
        return;
    }

    Btn_Equal();
    currOperation = operation;
    screenText += " " + this.textContent + " ";
    Update_Screen();
}

//User presses equal button =>
//ALSO CALLED if a user presses a 'second' operator in a chain
//Carries out operation using currValue, inputValue, currOperation
function Btn_Equal(){
    currValue = currOperation(currValue, Number(currInput));
    currInput = "";
    currOperation = null;
    screenText = currValue.toString();
    Update_Screen();
}

//User presses Clear button =>
//Sets currValue = null, currOperation = null, screenValue = 0
function Btn_Clear(){
    currValue = null;
    currOperation = null;
    currInput = "";
    screenText = "";

    Update_Screen();   
}

//Button behaviors:
//User presses a button number => updates inputNumber
function Btn_Number(){
    number = Number(this.id);
    currInput = currInput + this.id;
    screenText = screenText + this.id;
    Update_Screen();
}

function Update_Screen(){
    calcScreen.textContent = screenText;
}