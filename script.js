var displayMain = document.querySelector(".displayMain");
const buttons = document.querySelectorAll(".button");

var pressHistory = [];
var firstNumber = "";
var secondNumber = "";
var pendingSign = false;
var isDecimal = false;
var firstNumIsCurrent = true;

var result;
var memSecondNum = "";

function updateDisplay(displayValue) {
    displayMain.textContent = displayValue;
}

// Handles inputs
buttons.forEach(function (button) {
    button.addEventListener("click", function () {

        // Record last thing that was pressed. Can be used for upper display.
        if (button.textContent != "C") {
            pressHistory.unshift(button.textContent);
        }
        
        switch (true) {
            // Numbers
            case !(isNaN(button.textContent)):
                // If firstNumber is current, add numbers to firstNumber
                if (firstNumIsCurrent) {
                    firstNumber += button.textContent;
                    updateDisplay(firstNumber)
                } else {
                    secondNumber += button.textContent;
                    updateDisplay(secondNumber)
                }
                console.log("First:", firstNumber);
                console.log("Second:", secondNumber);
                break;
        
            case button.textContent == ".":
                console.log("decimal");
                // Needs to check if decimal is present in display to work.
                // if(!isDecimal) {
                //     isDecimal = true;
                    if (firstNumIsCurrent) {
                        firstNumber += ".";
                    } else {
                        secondNumber += ".";
                    }
                break;
        
        
            case button.textContent == "C":
                console.log("Clear");
                updateDisplay("0");
                pressHistory = [];
                firstNumber = "";
                secondNumber = "";
                pendingSign = false;
                isDecimal = false;
                firstNumIsCurrent = true;
                break;

            case button.textContent == "Del":
                console.log("Delete");
                arrayMain.pop();
                if (arrayMain.length == 0) {
                    arrayMain = [0];
                }
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
                break;

            
                
            case button.textContent == "=":
            
                // Equals is first button
                if (pressHistory.length == 1) {
                    pressHistory = [];
                    console.log("here");
                    break;
                }

                // No pending sign
                if (!pendingSign) {
                    break;
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
                    firstNumber = result;
                    secondNumber = "";
                    console.log(result);
                }

                break;
        }
        //updateDisplay(arrayMain);
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
