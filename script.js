const calculator = {
  displayText: '0',
  num1: null,
  num2: null,
  operator: null,
  clearFlag: false,

  setup() {
    const numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach(button => {
      button.addEventListener('click', (event) => this.updateDisplay(event.target.innerText))
    })

    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => {
      button.addEventListener('click', (event) => this.changeOperator(event.target.innerText))
    })

    const equalsButton = document.querySelector('#equals');
      equalsButton.addEventListener('click', (event) => {
        this.operate();
    });

    const clearButton = document.querySelector('#clear');
      clearButton.addEventListener('click', (event) => this.clear());
  },

  updateDisplay(buttonNumber) {
/*
    if (this.clearFlag) {
      this.displayText = '';
      this.clearFlag = false;
    }

    if (clear) {
          this.displayText = buttonNumber;
    }
*/
    if (this.displayText === '0' || this.clearFlag) {
      this.displayText = buttonNumber;
      this.clearFlag = false;
    }
    else {
      this.displayText = this.displayText + buttonNumber;
    }

    const display = document.querySelector('#screen');
    display.textContent = this.displayText;
  },
  
  // works
  clear () {
    this.clearFlag = true;
    this.updateDisplay('0');
    this.num1 = null;
    this.num2 = null;
    this.operator = null;
  },

  changeOperator(newOperator) {
    if (this.operator === null) {
      this.num1 = +this.displayText;
    }
    else {
      let ans = this.operate();
      console.log(ans);
    }
    this.operator = newOperator;
    this.clearFlag = true;
  },

  operate() {
    if (this.num1 === null || this.operator === null) return;

    this.num2 = +this.displayText;
    let ans = null;

    if (this.operator === '+') ans = add(this.num1, this.num2)
    else if (this.operator === '-') ans = substract(this.num1, this.num2);
    else if (this.operator === '*') ans = multiply(this.num1, this.num2);
    else if (this.operator === '/') ans = divide(this.num1, this.num2);
    else return;

    this.clearFlag = true;
    this.num2 = null;
    this.num1 = ans;
    this.operator = null;

    this.clearFlag = true;
    this.updateDisplay(ans);
    this.clearFlag = true;  
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function substract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 !== 0) return Math.round(num1 / num2 * 1000) / 1000;
  else return "Can't divide by 0"
}

calculator.setup()