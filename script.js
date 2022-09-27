// JavaScript
// CALCULATOR

const DISPLAY = document.querySelector('#display');

const BUTTONS = Array.from(document.querySelectorAll('.buttons > *'));

const NUMBERS = BUTTONS.filter(btn => {
  isNum = /[0-9]/;
  return isNum.test(btn.textContent)
});

const add = (x, y) => x + y;

const subtract = (x, y) => x - y;

const multiply = (x, y) => x * y;

const divide = (x, y) => x / y;

const operate = (operator, x, y) => operator(x, y);

const type = (button) => {
  DISPLAY.textContent += button.textContent;
};

NUMBERS.forEach(num => {
  num.addEventListener('click', () => type(num))
});