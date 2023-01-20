// select all the buttons
const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');
const backspace = document.querySelector('#backspace');

//add event listener to all the buttons
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let buttonValue = e.target.innerHTML;
        if (display.value=== '0'){
            display.value='';
        }
        if (buttonValue === 'x<sup>x</sup> ') {
            buttonValue = '^';
        }
        if (buttonValue === '&Sqrt;') {
            buttonValue = '';
        }
        if (buttonValue === 'ac') {
            display.value = '';
        }else if (buttonValue === '=') {
            // This will handle the evaluation of the expression
            display.value = handleExpression(display.value);
        } else if (buttonValue === '|&gt;') {
            display.value = display.value.slice(0, -1);
        } else if (buttonValue === '+/-') {
            if (display.value[0] !== '-'){
                display.value = '-' + display.value
            }
            else{
                display.value = display.value.slice(1); 
            }
        }else {
            display.value += buttonValue;
            console.log(display.value);
        }
    });
});

// function that will handle the evaluation of the expression
function handleExpression(expression) {
    // This variable will store the numbers and operators of the expression
    let numbers = [];
    // This variable will store the result of the expression
    let result = 0;
    // This variable will store the current number
    let currentNumber = '';
    // This variable will store the last operator
    let lastOperator = '';

    

    // Loop through the expression
    for (let i = 0; i < expression.length; i++) {
        // Check if the current character is a number
        if (!isNaN(expression[i]) || expression[i] == '.') {
            currentNumber += expression[i];
        }else {
            // If the current character is an operator
            if (currentNumber !== '') {
                numbers.push(Number(currentNumber));
                currentNumber = '';
            }
            // Check if the current operator is a minus sign
            if (expression[i] === '-') {
                // Check if the last operator is a minus sign as well
                if (lastOperator === '-') {
                    // If the last operator is a minus sign, change it to a plus sign
                    lastOperator = '+';
                } else {
                    lastOperator = expression[i];
                }
            } else {
                lastOperator = expression[i];
            }
            numbers.push(lastOperator);
        }
    }
    // Check if there is a number left after the loop
    if (currentNumber !== '') {
        numbers.push(Number(currentNumber));
    }
    // Check if the first number is negative
    if (numbers[0] === '-') {
        numbers[1] = -numbers[1];
        numbers.shift();
    }
    // Loop through the numbers array
    console.log(numbers)
    for (let i = 0; i < numbers.length-1; i++) {
        // Check if the current element is an operator
        if (isNaN(numbers[i])) {
            // Check which operator it is
            switch (numbers[i]) {
                case '+':
                    result += numbers[i + 1];
                    break;
                case '-':
                    result -= numbers[i + 1];
                    break;
                case 'x':
                    result *= numbers[i + 1];
                    break;
                case '/':
                    result /= numbers[i + 1];
                    break;
                case '^':
                    result = Math.pow(result, numbers[i + 1]);
                    break;
            }
        } else {
            // If the current element is a number, set it as the result
            result = numbers[i];
        }
    }
    for (let i = 0; i < numbers.length; i++) {
        if (isNaN(numbers[i])) {
            // Check which operator it is
            switch (numbers[i]) {
                case '%':
                    result = numbers[i - 1]/100;
                    break;
                case '&Sqrt;':
                    result = Math.sqrt(numbers[i-1]);
                    break;
                case '(':
                    result *= numbers[i + 1];
                    break;
            }
        }
    }
    return Math.round(result * 10000)/10000;
}


// const display = document.querySelector("#display");
// const buttons = document.querySelectorAll("button");

// buttons.forEach((item) => {
//     item.addEventListener("click", (e) => {
//         // Get the value of the clicked button
//         let value = item.innerHTML;
//         if (value === "&times;") {
//             value = "*";
//         }
//         if (item.id == "clear") {
//             display.value = "";
//         }else if (item.id == "backspace") {
//             let string = display.value.toString();
//             display.value = string.substr(0, string.length - 1);
//         }else if (display.value != "" && item.id == "equals") {
//             display.value = eval(display.value);
//           } else if (display.value == "" && item.id == "equals") {
//             display.value = "NULL";
//             setTimeout(() => (display.value = ""), 2000);
//           } else {
//             display.value += value;
//             console.log(display.value)
//           }
//     });
// });

// Get the clear button
// const clearButton = document.querySelector("#clear");

// // Add click event listener to clear button
// clear.addEventListener("click", () => {
//     // Clear the input field
//     display.value = "";
// });

// const backspaceButton = document.querySelector("#backspace");

// // Add click event listener to backspace button
// backspaceButton.addEventListener("click", () => {
//     // Remove the last character from the input field
//     display.value = display.value.slice(0, -1);

// });
// Add click event listeners to all number buttons
// numberButtons.forEach((button) => {
//     button.addEventListener("click", (e) => {
//         // Get the value of the clicked button
//         const value = e.target.innerHTML;
//         // Add the value to the textbox
//         display.value += value;
//     });
// });