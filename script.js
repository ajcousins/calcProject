var displayMain = document.querySelector(".displayMain");



const buttons = document.querySelectorAll(".button");

var arrayMain = [0];

var pendingSign = false;
var a = 0;
var bank = false;
var clearScreen = false;

// If pending sign is not false, 
function operate (number, sign) {
    if (pendingSign == false) {
        bank = number;
        pendingSign = sign;
      // else if pending sign is TRUE...  
    } else { 
        switch(true) {
            case sign == "plus":
                return bank + number;
        }
    }
}

function updateDisplay(arrayA) {
    displayMain.textContent = arrayA.join("");
}

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
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


                
                // Send sign and number in arrayMain to operate.
                a = parseInt(arrayMain.join(""));
                
                console.log(a, "plus");
                clearScreen = true;
                
                if (bank != false) {
                
                    arrayMain = Array.from(operate(a, "plus").toString());
                } else if (bank == false) {
                    operate(a, "plus");
                }
                

                break;

            case button.textContent == "=":
                console.log("equals");
                break;
        }
        // console.log("arrayMain:", arrayMain);
        // console.log("valueA:", valueA);
        // console.log("blank:", blank);
        updateDisplay(arrayMain);
    })
});





function addFunc (a, b) {
    return a + b;
}
function subtractFunc (a, b) {
    return a - b;
}
function multiplyFunc (a, b) {
    return a * b;
}
function divideFunc (a, b) {
    return a / b;
}
