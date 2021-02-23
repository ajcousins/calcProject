var displayMain = document.querySelector(".displayMain");
const buttons = document.querySelectorAll(".button");

var pressHistory = [];
var firstNumber = "";
var secondNumber = "";
var pendingSign = false;
var isDecimal = false;
var firstNumIsCurrent = true;
var error = false;

var result;
var memSecondNum = "";

var characterLimit = 13;

function updateDisplay(displayValue) {

    // If decimal was last pressed.. and there isn't already a decimal present..
    if (pressHistory[0] == "." && displayValue % 1 == 0) {
        displayString = displayValue.toString()
    } else {
        displayValue = Math.round(displayValue * 10000000000) / 10000000000;
        displayString = displayValue.toString();
    }
    
    if (displayString.includes(".")) {
        isDecimal = true;
    }

    // Error messages.
    if (displayString == "NaN") {
        displayString = "Nope";
        error = true;
    } else if (displayString == "Infinity") {
        displayString = "Computer says no";
        displayMain.style.fontSize="35px";
        displayMain.style.marginTop="17px";
        error = true;
        
    } else if (displayString.length > characterLimit) {
        displayString = "Too long..."
        error = true;
    }

    displayMain.textContent = displayString;
}

// Handles inputs
buttons.forEach(function (button) {
    button.addEventListener("click", function () {

        if (error == true) {
            error = false;
            clearEverything();
            displayMain.style.fontSize=null;
            displayMain.style.marginTop=null;
        }

        // Record last thing that was pressed.
        if (button.textContent != "C") {
            pressHistory.unshift(button.textContent);
        }
        
        check1:
        switch (true) {
            // Numbers
            case !(isNaN(button.textContent)):
                if (firstNumIsCurrent) {
                    if (firstNumber.length < characterLimit) {
                        firstNumber += button.textContent;
                        updateDisplay(firstNumber);
                    }
                } else if (secondNumber.length < characterLimit) {
                    secondNumber += button.textContent;
                    updateDisplay(secondNumber)
                }
                break;

            case button.textContent == ".":
                if (displayMain.textContent.length > 12) {
                    break;
                }

                // Prevents more than one decimal.
                if(isDecimal) {
                    break;
                }
                
                if (firstNumIsCurrent) {
                    if (firstNumber == "") {
                        firstNumber += "0";
                    }
                    firstNumber += ".";
                    updateDisplay(firstNumber)
                } else {
                    if (secondNumber == "") {
                        secondNumber += "0";
                    }
                    secondNumber += ".";
                    updateDisplay(secondNumber)
                }
                break;
        
            case button.textContent == "C":
                clearEverything();
                break;

            case button.textContent == "Del":
                if (firstNumIsCurrent) {
                    if (firstNumber.length > 1) {
                        firstNumber = firstNumber.substring(0, firstNumber.length - 1);
                        updateDisplay(firstNumber);
                    } else if (firstNumber.length == 1) {
                        updateDisplay("0");
                        firstNumber = "";
                        pressHistory = [];
                    }
                } else {
                    // After equals button pressed.. firstNumber is being edited.
                    if (secondNumber.length > 1) {
                        secondNumber = secondNumber.substring(0, secondNumber.length - 1);
                        updateDisplay(secondNumber);
                    } else if (secondNumber.length == 1) {
                        updateDisplay("0");
                        secondNumber = "";
                    } 
                }
                break;

            case button.attributes["data-but"].value == "Plus":
            case button.attributes["data-but"].value == "Minus":
            case button.attributes["data-but"].value == "Multiply":
            case button.attributes["data-but"].value == "Divide":
                console.log("operator");
                var operator = button.attributes["data-but"].value;
                // If button is the first to be pressed, make first number "0".
                if (pressHistory.length == 1) {
                    firstNumber += 0;
                }

                // If first and second numbers are alrady filled, evaluate numbers.
                if (secondNumber != "") {
                    result = operate(firstNumber, secondNumber, pendingSign);
                    firstNumber = result;
                    secondNumber = "";
                }
                firstNumIsCurrent = false;
                pendingSign = operator;
                isDecimal = false;
                break;

            case button.textContent == "=":
            
                // Equals is first button to be pressed.
                if (pressHistory.length == 1) {
                    pressHistory = [];
                    break;
                }

                // Last press was a sign.
                switch (true) {
                    case pressHistory[1] == "+":
                    case pressHistory[1] == "-":
                    case pressHistory[1] == "x":
                    case pressHistory[1] == "÷":
                        pressHistory.shift();
                        break check1;
                }
                
                // No pending sign
                if (!pendingSign) {
                    break;
                }

                // SecondNumber is blank
                if (secondNumber == "") {
                    console.log("here");
                    secondNumber == memSecondNum;
                }

                // Equals double press.
                if (pressHistory[1] == "=") {
                    result = operate(firstNumber, memSecondNum, pendingSign);
                    firstNumber = result;

                // Equals single press.
                } else {
                    result = operate(firstNumber, secondNumber, pendingSign);
                    memSecondNum = secondNumber;
                    firstNumber = result.toString();
                    secondNumber = "";
                    firstNumIsCurrent = true;
                }
        }
    })
});

function operate(firstNumber, secondNumber, pendingSign) {
    var result;
    switch (true) {
        case pendingSign == "Plus":
            result = parseFloat(firstNumber) + parseFloat(secondNumber)
            break;
        case pendingSign == "Minus":
            result = parseFloat(firstNumber) - parseFloat(secondNumber);
            break;
        case pendingSign == "Multiply":
            result = parseFloat(firstNumber) * parseFloat(secondNumber);
            break;
        case pendingSign == "Divide":
            result = parseFloat(firstNumber) / parseFloat(secondNumber);  
            break;
    }
    updateDisplay(result);
    return result;
}

function clearEverything () {
    updateDisplay("0");
    pressHistory = [];
    firstNumber = "";
    secondNumber = "";
    pendingSign = false;
    isDecimal = false;
    firstNumIsCurrent = true;
}