// JavaScript
// CALCULATOR

const DISPLAY = document.querySelector('#display');

const BUTTONS = Array.from(document.querySelectorAll('.buttons > *'));

const NUMBERS = BUTTONS.filter(btn => /[0-9]/.test(btn.textContent));

const CLEAR = document.querySelector('.clear');

const EQUAL = document.querySelector('.equal');

const POINT = document.querySelector('.point');

let DISPLAY_cleared = true;

let EQUAL_clicked = false;

let POINT_clicked = false;

let displayValue = [];

let x = null;

let y = null;

let operation = [];

let result = null;

const add = (x, y) => x + y;

const subtract = (x, y) => x - y;

const multiply = (x, y) => x * y;

const divide = (x, y) => x / y;

const operate = (operator, x, y) => operator(x, y);

const OPERATORS = [
  { div: document.querySelector('.add'), func: add },
  { div: document.querySelector('.subtract'), func: subtract },
  { div: document.querySelector('.multiply'), func: multiply },
  { div: document.querySelector('.divide'), func: divide }
];

NUMBERS.forEach(num => {
  num.addEventListener('click', () => type(num))
});

POINT.addEventListener('click', addDecimals);

function addDecimals() {
  if (x || x == 0) {
    DISPLAY.textContent = '0';
    x = null;
  }

  // Check if there is already a point in the display
  if (!(/\./.test(DISPLAY.textContent))) {
    DISPLAY.textContent += '.';
    POINT_clicked = true;
  }
}

function type(num) {
  if (POINT_clicked) {
    DISPLAY_cleared = false;
    POINT_clicked = false;
  }

  if (DISPLAY_cleared) {
    DISPLAY.textContent = '';
    if (num.textContent !== '0') { DISPLAY_cleared = false; }
  }

  if (x || x == 0) {
    DISPLAY.textContent = '';
    x = null;
  }
  
  if (DISPLAY.textContent == '0' && num.textContent == '0') {
    DISPLAY.textContent = 0;
  } else {
    DISPLAY.textContent += num.textContent;
  }
}

OPERATORS.forEach(operator => {
  operator['div'].addEventListener('click', () => {
    if (EQUAL_clicked) {
      x = null;
      displayValue = [];
      operation = [];
      EQUAL_clicked = false;
    }
    
    if (x || x == 0) { operation[0] = operator['func'] }

    if (x == null) {
      displayValue.push(Number(DISPLAY.textContent));
      operation.push(operator['func']);
      x = displayValue[0];
    }

    if (displayValue.length == 2) {
      y = displayValue[1];
      getResult();
    }
  });
})

EQUAL.addEventListener('click', () => {
  if (displayValue.length == 1 && x == null) {
    EQUAL_clicked = true;
    x = displayValue[0];
    y = Number(DISPLAY.textContent);
    getResult();
  }
});

function getResult() {
  result = operate(operation[0], x, y);
  result = Math.round(result * 100) / 100;
  DISPLAY.textContent = result;
  displayValue = [result];
  if (operation.length == 2) { operation.splice(0,1); }
}

CLEAR.addEventListener('click', clearDisplay);

function clearDisplay() {
  DISPLAY.textContent = '0';
  DISPLAY_cleared = true;
  EQUAL_clicked = false;
  POINT_clicked = false;
  x = null;
  y = null;
  displayValue = [];
  operation = [];
}