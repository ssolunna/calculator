// JavaScript
// CALCULATOR

const DISPLAY = document.querySelector('#display');

const BUTTONS = Array.from(document.querySelectorAll('.buttons > *'));

const NUMBERS = BUTTONS.filter(btn => /[0-9]/.test(btn.textContent));

const CLEAR = document.querySelector('.clear');

let x = null;

let y = null;

let operation = null;

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

const type = (button) => {
  DISPLAY.textContent += button.textContent;
};

NUMBERS.forEach(num => {
  num.addEventListener('click', () => type(num))
});

CLEAR.addEventListener('click', () => DISPLAY.textContent = '');

OPERATORS.forEach(operator => {
  operator['div'].addEventListener('click', () => {
    x = Number(DISPLAY.textContent);
    operation = operator['func'];
  });
})