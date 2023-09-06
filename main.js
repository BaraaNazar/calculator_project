//Selecting display area
const display = document.querySelector('.displayArea');
//Selecting buttons
const buttons = document.querySelectorAll('.btn-dark');
const plusButton = document.querySelector('.plusBtn');
const minusButton = document.querySelector('.minusBtn');
const equalsButton = document.querySelector('.equalsBtn');
const multiplyButton = document.querySelector('.multiplyBtn');
const dividerButton = document.querySelector('.dividerBtn');
const clearButton = document.querySelector('.clearBtn');
const undoButton = document.querySelector('.minusPlusBtn');
const remainderButton = document.querySelector('.remainderBtn');

//Initial values
let currentCalculation = '';
let currentResult = 0;
let sign = '';
let newOperation = true;
let decimalEntered = false;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonValue = button.innerHTML;

    if (currentCalculation.length < 10) {
      // Check if not exceeding 10 digits
      if (buttonValue === '.') {
        if (!decimalEntered) {
          currentCalculation += buttonValue;
          decimalEntered = true;
        }
      } else {
        if (currentCalculation === '0' && buttonValue === '0') {
          // Prevent adding more zeros at the beginning 'thanks for Viktor project'
          return;
        }

        if (currentCalculation === '0') {
          // Remove the leading zero if it's followed by a non-zero digit
          currentCalculation = '';
        }

        currentCalculation += buttonValue;
      }

      display.innerHTML = currentCalculation;
    }
  });
});

//addition
plusButton.addEventListener('click', () => {
  operate();
  sign = '+';
  newOperation = true;
  decimalEntered = false;
});

//Substraction
minusButton.addEventListener('click', () => {
  operate();
  sign = '-';
  newOperation = true;
});

//Multiplication
multiplyButton.addEventListener('click', () => {
  operate();
  sign = '*';
  newOperation = true;
});

//Division
dividerButton.addEventListener('click', () => {
  operate();
  sign = '/';
  newOperation = true;
});

remainderButton.addEventListener('click', () => {
  operate();
  sign = '%';
  newOperation = true;
});

equalsButton.addEventListener('click', () => {
  operate();
  sign = '';
  newOperation = true;
});

clearButton.addEventListener('click', () => {
  currentCalculation = '';
  currentResult = 0;
  sign = '';
  newOperation = true;
  decimalEntered = false; // Reset the flag
  display.innerHTML = '0';
});

undoButton.addEventListener('click', () => {
  if (currentCalculation.length > 0) {
    if (currentCalculation[currentCalculation.length - 1] === '.') {
      decimalEntered = false;
    }
    currentCalculation = currentCalculation.slice(0, -1);
    display.innerHTML = currentCalculation;
  }
});

//This function must take num1,num2 and operation!!!!!
function operate() {
  if (currentCalculation !== '') {
    const currentValue = parseFloat(currentCalculation);
    if (sign === '+') {
      currentResult += currentValue;
    } else if (sign === '-') {
      currentResult -= currentValue;
    } else if (sign === '*') {
      currentResult *= currentValue;
    } else if (sign === '%') {
      currentResult = (currentValue / 100) * currentResult;
      currentResult = parseFloat(currentResult.toFixed(2));
    } else if (sign === '/') {
      if (currentValue === 0) {
        display.innerHTML = 'error';
        return;
      }
      currentResult /= currentValue;
      currentResult = parseFloat(currentResult.toFixed(2));
    } else {
      currentResult = currentValue;
    }

    // Truncate result to 10 digits
    currentResult = parseFloat(currentResult.toFixed(10));

    display.innerHTML = currentResult;
    currentCalculation = '';
    decimalEntered = false;
  }
}

// Add keyboard link to the calculator
document.addEventListener('keydown', (event) => {
  const key = event.key;

  // Check if the pressed key is a number or operator key
  if (
    !isNaN(key) ||
    key === '+' ||
    key === '-' ||
    key === '*' ||
    key === '/' ||
    key === '%' ||
    key === '=' ||
    key === 'Enter' ||
    key === '.'
  ) {
    // Simulate a click on the corresponding button
    const button = document.querySelector(`.keyboard[data-key="${key}"]`);
    if (button) {
      button.click();
    }
  } else if (key === 'Backspace') {
    // Simulate a click on the undo button
    undoButton.click();
  } else if (key === 'Escape') {
    // Simulate a click on the clear button
    clearButton.click();
  }
});
