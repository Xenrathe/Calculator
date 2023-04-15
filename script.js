//Calculation functions and variables

let currValue = null;
let screenValue = 0;
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


//Button behaviors:
//User presses a button number => updates inputNumber
//
//User presses Clear button =>
//Sets currValue = null, currOperation = null, screenValue = 0

//User presses an operation button =>
//updates currOperation 
//IF currValue != null, then actually carry out operation
//OTHERWISE, currValue is set to inputNumber
function Btn_Operation(operation){
    currOperation = operation;
    if (currValue !== null){
        currValue = operation(currValue, screenValue);
    }
    else
        currValue = screenValue;

    //HTML: Set screen text to new value
}

//User presses equal button =>
//Carries out operation using currValue, inputValue, currOperation
function Btn_Equal(){
    
}

//Called when user presses '='
function Operate(operation, a, b){
    currValue = operation(a, b);
}