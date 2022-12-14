// JavaScript
// CALCULATOR

const DISPLAY = document.querySelector('#display');

const BUTTONS = Array.from(document.querySelectorAll('.buttons'));

const NUMBERS = BUTTONS.filter(btn => /[0-9]/.test(btn.textContent));

const CLEAR = document.querySelector('.clear');

const DELETE = document.querySelector('.delete');

const EQUAL = document.querySelector('.equal');

const POINT = document.querySelector('.point');

const ERROR = document.querySelector('#message');

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

const divide = (x, y) => {
  if (y == 0) {
    displayError('Division by 0 is undefined');
    return 0
  } else {
    return x / y
  }
};

const operate = (operator, x, y) => operator(x, y);

const OPERATORS = [
  { name: '+', div: document.querySelector('.add'), func: add },
  { name: '-', div: document.querySelector('.subtract'), func: subtract },
  { name: '*', div: document.querySelector('.multiply'), func: multiply },
  { name: '/', div: document.querySelector('.divide'), func: divide }
];

let OPERATOR_clicked = null;

NUMBERS.forEach(num => {
  num.addEventListener('click', () => type(num.textContent))
});

function type(num) {
  if (ERROR.textContent) { clearDisplay(); }
  
  if (POINT_clicked) {
    DISPLAY_cleared = false;
    POINT_clicked = false;
  }

  if (DISPLAY_cleared) {
    DISPLAY.textContent = '';
    if (num !== '0') {
      DISPLAY_cleared = false;
      CLEAR.textContent = 'C';
    }
  }

  if (x || x == 0) {
    DISPLAY.textContent = '';
    x = null;
  }
  
  if (DISPLAY.textContent == '0' && num == '0') {
    DISPLAY.textContent = 0;
  } else {
    DISPLAY.textContent += num;
  }
}

POINT.addEventListener('click', addDecimals);

function addDecimals() {
  if (ERROR.textContent) { clearDisplay(); }
  
  if (x || x == 0) {
    DISPLAY.textContent = '0';
    x = null;
  }

  if (!(/\./.test(DISPLAY.textContent))) {
    DISPLAY.textContent += '.';
    POINT_clicked = true;
    CLEAR.textContent = 'C';
  }
}

OPERATORS.forEach(operator => {
  operator['div'].addEventListener('click', () => { saveValues(operator); });
})

function saveValues(operator) {
  if (OPERATOR_clicked) { OPERATOR_clicked.classList.remove('clicked'); }
    
  if (ERROR.textContent) {
    clearDisplay();
    CLEAR.textContent = 'C';
  }
  
  if (EQUAL_clicked) {
    x = null;
    displayValue = [];
    operation = [];
    EQUAL_clicked = false;
  }

  if (x == null) {
    displayValue.push(Number(DISPLAY.textContent));
    operation.push(operator['func']);
    x = displayValue[0];
  } else {
    operation[0] = operator['func'];
  }
  
  operator['div'].classList.add('clicked');
  OPERATOR_clicked = document.querySelector('.clicked');

  if (displayValue.length == 2) {
    y = displayValue[1];
    getResult();
  }
}

EQUAL.addEventListener('click', calculate);

function calculate() {
  if (displayValue.length == 1 && x == null) {
    OPERATOR_clicked.classList.remove('clicked');
    EQUAL_clicked = true;
    x = displayValue[0];
    y = Number(DISPLAY.textContent);
    getResult();
  }
}

function getResult() {
  result = operate(operation[0], x, y);
  result = Math.round(result * 100) / 100;
  DISPLAY.textContent = result;
  displayValue = [result];
  if (operation.length == 2) { operation.splice(0,1); }
}

CLEAR.addEventListener('click', clearDisplay);

function clearDisplay() {
  if (OPERATOR_clicked) {
    OPERATOR_clicked.classList.remove('clicked');
    OPERATOR_clicked = null;
  }
  if (ERROR) { displayError(''); }
  CLEAR.textContent = 'AC';
  DISPLAY.textContent = '0';
  DISPLAY_cleared = true;
  EQUAL_clicked = false;
  POINT_clicked = false;
  x = null;
  y = null;
  displayValue = [];
  operation = [];
}

DELETE.addEventListener('click', undo);

function undo() {
  if (DISPLAY.textContent !== '0' && !x) {
    if (DISPLAY.textContent.endsWith(".")) { POINT_clicked = false; }
    DISPLAY.textContent = DISPLAY.textContent.substring(0, DISPLAY.textContent.length - 1);
    if (DISPLAY.textContent == '') {
      DISPLAY.textContent = 0;
      DISPLAY_cleared = true;
    }
  }
}

function displayError(message) {
  ERROR.textContent = message;
  if (message) {
    ERROR.classList.add('error');
  } else { 
    ERROR.classList.remove('error');
  }
}

window.addEventListener('keydown', (e) => {
  if (/[0-9]/.test(e.key)) { type(e.key); }
  if (/\./.test(e.key)) { addDecimals(); }
  if (/[\*\-\+\/]/.test(e.key)) {
    let operator = OPERATORS.filter(operator => operator['name'] == e.key);
    saveValues(operator[0]);
  }
  if (/Enter|=/.test(e.key)) { calculate(); }
  if (/Backspace/.test(e.key)) { undo(); }
  if (/Escape|Delete/.test(e.key)) { clearDisplay(); }
})