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

function updateDisplay(displayValue) {

    var displayString;

    // If decimal was last pressed.. and there isn't already a decimal present..
    if (pressHistory[0] == "." && displayValue % 1 == 0) {
        displayString = displayValue.toString()
    } else {
        displayValue = Math.round(displayValue * 100) / 100;
        displayString = displayValue.toString();
    }

    
    //let displayString = Number.parseFloat(displayValue).toPrecision(13);
    if (displayString.length > 13) {
        displayString = "Too long..."
        error = true;
    }

    if (displayString == "NaN") {
        displayString = "Nope";
        error = true;
    }

    if (displayString == "Infinity") {
        displayString = "¬_¬";
        error = true;
    }

    if (displayString.includes(".")) {
        isDecimal = true;
        console.log("decimal present")
    }

    displayMain.textContent = displayString;
}

// Handles inputs
buttons.forEach(function (button) {
    button.addEventListener("click", function () {

        if (error == true) {
            error = false;
            clearEverything();
        }

        // Record last thing that was pressed. Can be used for upper display.
        if (button.textContent != "C") {
            pressHistory.unshift(button.textContent);
        }
        
        switch (true) {

            // Numbers
            case !(isNaN(button.textContent)):
                
                if (displayMain.textContent.length > 12) {
                    console.log("long");
                    break;
                }

                // If firstNumber is current, add numbers to firstNumber
                if (firstNumIsCurrent) {
                    firstNumber += button.textContent;
                    updateDisplay(firstNumber)
                } else {
                    secondNumber += button.textContent;
                    updateDisplay(secondNumber)
                }
                
                break;
        
            case button.textContent == ".":
                console.log("decimal button");
                if (displayMain.textContent.length > 12) {
                    console.log("long");
                    break;
                }
                // Needs to check if decimal is present in display to work.
                if(isDecimal) {
                    break;
                }
                
                if (firstNumIsCurrent) {
                    if (firstNumber == "") {
                        firstNumber += "0";
                    }

                    console.log("a");
                    firstNumber += ".";
                    updateDisplay(firstNumber)
                } else {
                    if (secondNumber == "") {
                        secondNumber += "0";
                    }
                    secondNumber += ".";
                    updateDisplay(secondNumber)
                }

                console.log("First:", firstNumber);
                console.log("Second:", secondNumber);

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
                        console.log("a")
                        secondNumber = secondNumber.substring(0, secondNumber.length - 1);
                        updateDisplay(secondNumber);
                    } else if (secondNumber.length == 1) {
                        console.log("b")
                        updateDisplay("0");
                        secondNumber = "";
                    } 
                    // else {
                    //     console.log("c")
                    //     firstNumber = firstNumber.substring(0, firstNumber.length - 1);
                    //     updateDisplay(firstNumber);
                    // }
                }
                console.log("First:", firstNumber);
                console.log("Second:", secondNumber);
                break;

            case button.attributes["data-but"].value == "Plus":
            case button.attributes["data-but"].value == "Minus":
            case button.attributes["data-but"].value == "Multiply":
            case button.attributes["data-but"].value == "Divide":
                var operator = button.attributes["data-but"].value;
                // If button is the first to be pressed, make first number "0".
                if (pressHistory.length == 1) {
                    console.log("sign first");
                    firstNumber += 0;
                }

                // If first and second numbers are alrady filled, evaluate numbers.
                if (secondNumber != "") {
                    result = operate(firstNumber, secondNumber, pendingSign);
                    firstNumber = result;
                    secondNumber = "";
                }
                console.log(operator);
                firstNumIsCurrent = false;
                pendingSign = operator;
                isDecimal = false;
                break;

            
                
            case button.textContent == "=":
            
                // Equals is first button
                if (pressHistory.length == 1) {
                    pressHistory = [];
                    console.log("here");
                    break;
                }

                // Last press was a sign
                if (pressHistory[1] == "+") {
                    console.log(pressHistory[1]);
                    pressHistory.shift();
                    console.log("Not allowed")
                    break;
                }

                // No pending sign
                if (!pendingSign) {
                    break;
                }

                // SecondNumber is blank
                if (secondNumber == "") {
                    secondNumber == memSecondNum;
                    // break;
                }

                
                // Equals double press.
                if (pressHistory[1] == "=") {
                    console.log("double equals");
                    result = operate(firstNumber, memSecondNum, pendingSign);
                    firstNumber = result;
                    console.log(result);

                // Equals single press.
                } else {
                    console.log("equals")
                    result = operate(firstNumber, secondNumber, pendingSign);
                    memSecondNum = secondNumber;
                    firstNumber = result.toString();
                    secondNumber = "";
                    firstNumIsCurrent = true;
                    console.log(result.toString());
                }

                break;

            case true:
                console.log("First:", firstNumber);
                console.log("Second:", secondNumber);

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
    console.log("Clear");
    updateDisplay("0");
    pressHistory = [];
    firstNumber = "";
    secondNumber = "";
    pendingSign = false;
    isDecimal = false;
    firstNumIsCurrent = true;
}