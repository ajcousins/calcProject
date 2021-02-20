var displayMain = document.querySelector(".displayMain");



const buttons = document.querySelectorAll(".button");

var arrayMain = [0];
var valueA = 0;
var operation = false;
var blank = false;

var pendingSign = false;
var a;
var b;

function updateDisplay(arrayA) {
    displayMain.textContent = arrayA.join("");
}

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (!isNaN(button.textContent) && arrayMain.length < 13) {
            if (arrayMain[0] == 0) {
                arrayMain = []
            }
            if (operation != false && blank == false) {
                blank = true;
                arrayMain = []
            }
            
            arrayMain.push(button.textContent);
        }
        switch (true) {
            case button.textContent == "C":
                arrayMain = [0];
                valueA = 0;
                operation = false;
                blank = false;
                break;
            case button.textContent == "Del":
                arrayMain.pop();
                if (arrayMain.length == 0) {
                    arrayMain = [0];
                }
                break;
            case button.textContent == "+":

                a = parseInt(arrayMain.join(""));
                console.log(a);
                pendingSign = "plus";
                console.log("pendingSign:", pendingSign);
                operate("plus", a, b);
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


function operate (sign, a, b) {

}


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
