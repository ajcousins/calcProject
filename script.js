var displayMain = document.querySelector(".displayMain");



const buttons = document.querySelectorAll(".button");

var pressHistory = [];

var arrayMain = [0];

var pendingSign = false;
var secondNumber = 0;
var firstNumber = false;
var clearScreen = false;

// variable to last number for double equals.
var last = false;
var result = 0;

// Variable for if decimal is in use.
var isDecimal = false;


// If pending sign is not false, 
function operate (number, sign) {
    console.log("pendingSign:", pendingSign);
    console.log("sign:", sign);

    if ((pendingSign != sign && sign != "equals" && sign != "repeatEq")) {
        firstNumber = number;
        pendingSign = sign;
        //console.log("pendingSign:", pendingSign);

        
      // else if pending sign is TRUE...  
    } else { 
        switch(true) {
            case sign == "plus":
                result = firstNumber + number;
                firstNumber = result;
                return result;

            case sign == "minus":
                result = firstNumber - number;
                firstNumber = result;
                return result;

            case sign == "equals":
                last = number;
                result = equals(firstNumber, number, pendingSign);
                return equals(firstNumber, number, pendingSign);

            case sign == "repeatEq":
                rptResult = equals(result, last, pendingSign);
                result = rptResult;
                return rptResult;
        }
    }
}

function updateDisplay(arrayA) {
    displayMain.textContent = arrayA.join("");
}

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        // record last thing that was pressed
        pressHistory.unshift(button.textContent);

        // Set decimal switch.
        if (arrayMain.includes(".")) {
            isDecimal = true;
            console.log("decimal");
        } else {
            isDecimal = false;
            console.log("wholeNum");
        }
    

        if (!isNaN(button.textContent) && arrayMain.length < 13) {
            if (arrayMain[0] == 0) {
                arrayMain = []
            }
            if (pendingSign != false && clearScreen == true) {
                clearScreen = false;
                arrayMain = []
            }

            arrayMain.push(button.textContent);
        }
        switch (true) {
            case button.textContent == "C":
                arrayMain = [0];
                pendingSign = false;
                secondNumber = 0;
                firstNumber = false;
                clearScreen = true;
                isDecimal = false;
                break;
            case button.textContent == "Del":
                arrayMain.pop();
                if (arrayMain.length == 0) {
                    arrayMain = [0];
                }
                break;

            case button.textContent == ".":
                console.log("decimal");
                if(isDecimal == false) {
                    isDecimal = true;
                    arrayMain.push(button.textContent);
                }
                break;

            case button.textContent == "+":
                pendingSign = "plus";
                // Was this button pressed already? If yes, pass.
                if (pressHistory[0] == pressHistory[1]) {
                    break;
                }
                // Convert arrayMain/ display to number.
                secondNumber = parseFloat(arrayMain.join(""));

                if (pressHistory[1] == "=") {
                    firstNumber = secondNumber;
                    clearScreen = true;
                    break;
                }
                
                // If firstNumber is NOT empty.. Send sign and number in arrayMain to operate.
                if (firstNumber != false) {
                    arrayMain = Array.from(operate(secondNumber, "plus").toString());
                // If firstNumber IS empty, send number and sign. Don't update array.
                } else if (firstNumber == false) {
                    operate(secondNumber, "plus");
                }

                // To ensure screen is cleared when next numbers are entered.
                clearScreen = true;

                break;

            case button.textContent == "-":
                pendingSign = "minus";
                // Was this button pressed already? If yes, pass.
                if (pressHistory[0] == pressHistory[1]) {
                    break;
                }
                // Convert arrayMain/ display to number.
                secondNumber = parseFloat(arrayMain.join(""));

                if (pressHistory[1] == "=") {
                    firstNumber = secondNumber;
                    clearScreen = true;
                    break;
                }
                
                // If firstNumber is NOT empty.. Send sign and number in arrayMain to operate.
                if (firstNumber != false) {
                    arrayMain = Array.from(operate(secondNumber, "minus").toString());
                // If firstNumber IS empty, send number and sign. Don't update array.
                } else if (firstNumber == false) {
                    operate(secondNumber, "minus");
                }

                // To ensure screen is cleared when next numbers are entered.
                clearScreen = true;

                break;
                
            case button.textContent == "=":
                
                if (!(firstNumber != false)) {
                    break;
                }
                // Was this button pressed already? If yes, repeat operation.
                if (pressHistory[0] == pressHistory[1]) {
                    
                    arrayMain = Array.from(operate(0, "repeatEq").toString());
                    //console.log(operate(0, "repeatEq"));
                    //arrayMain = Array.from(operate(0, "repeatEq").toString());
                    break;
                }

                // Convert arrayMain/ display to number.
                secondNumber = parseFloat(arrayMain.join(""));

                // Send sign and number in arrayMain to operate.
                
                    arrayMain = Array.from(operate(secondNumber, "equals").toString());
                

                break;
        }
        updateDisplay(arrayMain);
    })
});

function equals(firstNumber, secondNumber, pendingSign) {
    switch (true) {
        case pendingSign == "plus":
            return firstNumber + secondNumber;
        case pendingSign == "minus":
            return firstNumber - secondNumber;
        case pendingSign == "multiply":
            return firstNumber * secondNumber;
        case pendingSign == "divide":
            return firstNumber / secondNumber;            
    }
}

