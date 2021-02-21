var displayMain = document.querySelector(".displayMain");



const buttons = document.querySelectorAll(".button");

var pressHistory = [];

var arrayMain = [0];

var pendingSign = false;
var a = 0;
var bank = false;
var clearScreen = false;

// variable to last number for double equals.
var last = false;
var result = 0;

// If pending sign is not false, 
function operate (number, sign) {
    console.log("pendingSign:", pendingSign);
    console.log("sign:", sign);

    if ((pendingSign != sign && sign != "equals" && sign != "repeatEq")) {
        bank = number;
        pendingSign = sign;
        //console.log("pendingSign:", pendingSign);

        
      // else if pending sign is TRUE...  
    } else { 
        switch(true) {
            case sign == "plus":
                result = bank + number;
                bank = result;
                return result;

            case sign == "minus":
                result = bank - number;
                bank = result;
                return result;

            case sign == "equals":
                last = number;
                result = equals(bank, number, pendingSign);
                return equals(bank, number, pendingSign);

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
                a = 0;
                bank = false;
                clearScreen = true;
                break;
            case button.textContent == "Del":
                arrayMain.pop();
                if (arrayMain.length == 0) {
                    arrayMain = [0];
                }
                break;

            case button.textContent == "+":
                pendingSign = "plus";
                // Was this button pressed already? If yes, pass.
                if (pressHistory[0] == pressHistory[1]) {
                    break;
                }
                // Convert arrayMain/ display to number.
                a = parseFloat(arrayMain.join(""));

                if (pressHistory[1] == "=") {
                    bank = a;
                    clearScreen = true;
                    break;
                }
                
                // If bank is NOT empty.. Send sign and number in arrayMain to operate.
                if (bank != false) {
                    arrayMain = Array.from(operate(a, "plus").toString());
                // If bank IS empty, send number and sign. Don't update array.
                } else if (bank == false) {
                    operate(a, "plus");
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
                a = parseFloat(arrayMain.join(""));

                if (pressHistory[1] == "=") {
                    bank = a;
                    clearScreen = true;
                    break;
                }
                
                // If bank is NOT empty.. Send sign and number in arrayMain to operate.
                if (bank != false) {
                    arrayMain = Array.from(operate(a, "minus").toString());
                // If bank IS empty, send number and sign. Don't update array.
                } else if (bank == false) {
                    operate(a, "minus");
                }

                // To ensure screen is cleared when next numbers are entered.
                clearScreen = true;

                break;
                
            case button.textContent == "=":
                
                if (!(bank != false)) {
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
                a = parseFloat(arrayMain.join(""));

                // Send sign and number in arrayMain to operate.
                
                    arrayMain = Array.from(operate(a, "equals").toString());
                

                break;
        }
        // console.log("arrayMain:", arrayMain);
        // console.log("valueA:", valueA);
        // console.log("blank:", blank);
        updateDisplay(arrayMain);
    })
});

function equals(bank, number, pendingSign) {
    switch (true) {
        case pendingSign == "plus":
            return bank + number;
        case pendingSign == "minus":
            return bank - number;
        case pendingSign == "multiply":
            return bank * number;
        case pendingSign == "divide":
            return bank / number;            
    }
}

