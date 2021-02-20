var displayMain = document.querySelector(".displayMain");



const buttons = document.querySelectorAll(".button");


// buttons.forEach(function (button) {
//     button.addEventListener("hover", console.log(button));
// })

// const n1 = buttons[12];
// const n2 = buttons[13];
// const n3 = buttons[14];
// const n4 = buttons[8];
// const n5 = buttons[9];
// const n6 = buttons[10];
// const n7 = buttons[4];
// const n8 = buttons[5];
// const n9 = buttons[6];
// const n0 = buttons[16];

// const clear = buttons[0];
// const del = buttons[1];
// const divide = buttons[2];
// const multiply = buttons[3];
// const minus = buttons[7];
// const plus = buttons[11];
// const equals = buttons[15];
// const decimal = buttons[17];

var arrayA = [0];

function updateDisplay(arrayA) {
    displayMain.textContent = arrayA.join("");
}

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (!isNaN(button.textContent) && arrayA.length < 13) {
            if (arrayA[0] == 0) {
                arrayA = []
            }
            arrayA.push(button.textContent);
            console.log(arrayA);
        }
        switch (true) {
            case button.textContent == "C":
                arrayA = [0];
                break;
            case button.textContent == "Del":
                arrayA.pop();
                break;
        }
        updateDisplay(arrayA);
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
