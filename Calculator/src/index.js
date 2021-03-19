// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const button = document.querySelectorAll("button");
const inputNumber = document.querySelector("input");

let currentValue = "";
let currentEquation = "";

function calculateNumber() {
  inputNumber.value = eval(currentEquation);
  currentValue = "";
}

function reset() {
  inputNumber.value = 0;
  currentValue = "";
  currentEquation = "";
}

function operation(oper) {
  currentEquation += oper;
  currentValue = "";
}

function displayNumber(num) {
  currentValue += num;
  currentEquation += num;
  inputNumber.value = currentValue;
  const equalValueArr = currentEquation.split("*");
  if (
    equalValueArr.every((val) => val === equalValueArr[0]) &&
    equalValueArr.length > 1
  ) {
    calculateNumber();
  }
}

function init() {
  button.forEach((btn) => {
    btn.addEventListener("click", () => {
      switch (btn.className) {
        case "operator":
          const oper = btn.innerText;
          operation(oper);
          break;
        case "reset":
          reset();
          break;
        case "equals":
          calculateNumber();
          break;
        default:
          const num = btn.innerText;
          displayNumber(num);
      }
    });
  });
}
init();
