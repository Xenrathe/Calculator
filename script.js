//eventListeners and other initialization
document.querySelectorAll(".number").forEach((number) => {
    number.addEventListener('click', Btn_Number);
});

document.querySelectorAll(".operation").forEach((operation) => {
    operation.addEventListener('click', Btn_Operation);
});

document.querySelector("#Clear").addEventListener('click', Btn_Clear);
document.querySelector('#Equals').addEventListener('click', Btn_Equal);
window.addEventListener('keydown', keyPress);

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
function Btn_Operation(input){
    
    let operation = Add;
    let operationString = "+";
    
    if (typeof(input) == "object"){
        input = this.id;
    }
    
    if (input == "Sub"){
        operationString = "-";
        operation = Sub;
    }
    else if (input == "Multiply"){
        operationString = "x";
        operation = Multiply;
    }
    else if (input == "Divide"){
        operationString = "÷";
        operation = Divide;
    }

    this.classList.toggle("buttonActive");
    setTimeout(() => {
        this.classList.toggle("buttonActive");
      }, 100);

    let inputValue = null;
    if (currInput != '')
        inputValue = Number(currInput);

    if (currValue == null){
        if (currInput == '')
            return;
        
        currOperation = operation;
        screenText += " " + operationString + " ";
        Update_Screen();
        currValue = inputValue;
        currInput = '';
        return;
    }

    if (currInput == ''){
        if (currOperation != null)
            screenText = screenText.slice(0, screenText.length - 3) + ' ' + this.textContent + ' ';
        else 
            screenText += ' ' + operationString + ' ';

        Update_Screen();
        currOperation = operation;
        return;
    }

    Btn_Equal();
    currOperation = operation;
    screenText += " " + operationString + " ";
    Update_Screen();
}

//User presses equal button =>
//ALSO CALLED if a user presses a 'second' operator in a chain
//Carries out operation using currValue, inputValue, currOperation
function Btn_Equal(){
    if (currOperation == null)
        return;
    
    currValue = currOperation(currValue, Number(currInput));
    currInput = "";
    currOperation = null;
    screenText = +parseFloat(currValue).toFixed(3).toString();

    document.querySelector('#Equals').classList.toggle("buttonActive");
    setTimeout(() => {
        document.querySelector('#Equals').classList.toggle("buttonActive");
      }, 100);

    Update_Screen();
}

//User presses Clear button =>
//Sets currValue = null, currOperation = null, screenValue = 0
function Btn_Clear(){
    currValue = null;
    currOperation = null;
    currInput = "";
    screenText = "";

    this.classList.toggle("buttonActive");
    setTimeout(() => {
        this.classList.toggle("buttonActive");
      }, 100);

    Update_Screen();   
}

//Button behaviors:
//User presses a button number => updates inputNumber
function Btn_Number(numInput){
    let stringNum = '';

    //Note: Currently this if is pointless, as Btn_Number ONLY called by object
    if (typeof(numInput) == "object"){
        stringNum = this.id;
    }
    else{
        stringNum = numInput.toString();
    }

    this.classList.toggle("buttonActive");
    setTimeout(() => {
        this.classList.toggle("buttonActive");
      }, 100);

    //Do not allow multiple periods
    if (stringNum == "." && currInput.includes("."))
      return;

    currInput = currInput + stringNum;
    screenText = screenText + stringNum;
    Update_Screen();
}

function Backspace(){
    if (screenText.length == 0)
        return;
        
    //The presence of a space means there's currently an operator
    if (screenText.charAt(screenText.length-1) == ' '){
        screenText = screenText.slice(0, screenText.length - 3);
        currOperation = null;
    }
    else{
        if (currInput == '')
            return;

        currInput = currInput.slice(0, currInput.length - 1);
        screenText = screenText.slice(0, screenText.length - 1);
    }

    Update_Screen();
}

function Update_Screen(){
    calcScreen.textContent = screenText;
}

function keyPress(e){
    //keycode for 0 = 48... 9=57
    if (e.keyCode > 47 && e.keyCode < 58){
        if (!e.shiftKey)
            document.getElementById((e.keyCode - 48).toString()).click();
            //Btn_Number(e.keyCode - 48);
        else if (e.keyCode == 56)
            document.getElementById("Multiply").click();
    }
    //keycode for += = 187
    else if (e.keyCode == 187){
        if (e.shiftKey)
            document.getElementById("Add").click();
        else
            document.getElementById("Equals").click();
    }
    //keycode for / = 191
    else if (e.keyCode == 191){
        document.getElementById("Divide").click();
    }
    //keycode for x = 88
    //keycode for * = 56
    else if (e.keyCode == 88){
        document.getElementById("Multiply").click();
    }
    //keycode for - = 189
    else if (e.keyCode == 189){
        document.getElementById("Sub").click();
    }
    //keycode for backspace = 8
    else if (e.keyCode == 8){
        Backspace();
    }
    //keycode for ESC = 27
    else if (e.keyCode == 27){
        document.getElementById("Clear").click();
    }
    //keycode for . = 190
    else if (e.keyCode == 190){
        document.getElementById(".").click();
    }
}