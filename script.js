// JavaScript
// CALCULATOR

const DISPLAY = document.querySelector('#display');

const BUTTONS = Array.from(document.querySelectorAll('.buttons > *'));

const NUMBERS = BUTTONS.filter(btn => /[0-9]/.test(btn.textContent));

const CLEAR = document.querySelector('.clear');

let displayCleared = true;

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

CLEAR.addEventListener('click', () => clearDisplay());

NUMBERS.forEach(num => {
  num.addEventListener('click', () => type(num))
});

function type(num) {
  if (displayCleared) {
    DISPLAY.textContent = '';
    displayCleared = false;
  }

  if (x) {
    x = null
    DISPLAY.textContent = '';
  }

  DISPLAY.textContent += num.textContent;
}

OPERATORS.forEach(operator => {
  operator['div'].addEventListener('click', () => {
    displayValue.push(Number(DISPLAY.textContent));
    operation.push(operator['func']);
    if (!x) { x = displayValue[0] }
    if (displayValue.length == 2) {
      y = displayValue[1];
      getResult();
    }
  });
})

function getResult() {
  result = operate(operation[0], x, y);
  DISPLAY.textContent = result;
  displayValue = [result];
  operation.splice(0,1);
}

function clearDisplay() {
  DISPLAY.textContent = '0';
  displayCleared = true;
  x = null;
  y = null;
  displayValue = [];
  operation = [];
}