const numberButtons = document.querySelectorAll('[data-number]');
const dataOperationButton = document.querySelectorAll('[data-operation]');

const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const dataClear = document.querySelector('[data-all-clear]');
const previewOperandTextElement = document.querySelector('[data-preview-operand]');
const mainOperandTextElement = document.querySelector('[data-main-operand]');

class Calculator {
	constructor(previewOperand, mainOperand) {
		this.previewOperand = previewOperand
		this.mainOperand = mainOperand
		this.clear()
	}

	clear() {
		this.previewOperand = ''
		this.mainOperand = ''
		this.operation = ''
	}


	delete() {
		this.mainOperand = this.mainOperand.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === '.' && this.mainOperand.includes('.')) return
		this.mainOperand = this.mainOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.mainOperand === '') return
		if (this.previewOperand !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previewOperand = this.mainOperand;
		this.mainOperand = '';
	}

	compute() {
		let computation;
		const prev = parseFloat(this.previewOperand);
		const main = parseFloat(this.mainOperand);
		if (isNaN(prev) || isNaN(main)) return
		switch (this.operation) {
			case '+':
				computation = prev + main
				break;
			case '-':
				computation = prev - main
				break;
			case '*':
				computation = prev * main
				break;
			case '/':
				computation = prev / main
				break;
			default:
				return;
		}
		this.mainOperand = computation;
		this.operation = '';
		this.previewOperand = '';
	}

	getNumberDisplay(number) {
		const stringNumber = number.toString()
		const integerDigit = parseFloat(stringNumber.split('.')[0])
		const decimalDigit = stringNumber.split('.')[1]
		let integerDisplay;
		if (isNaN(integerDigit)) {
			integerDisplay = ''
		} else {
			integerDisplay = integerDigit.toLocaleString('en', {
				maximumFractionDigits: 0
			})
		}
		if (decimalDigit != null) {
			return `${integerDisplay}.${decimalDigit}`
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		mainOperandTextElement.innerHTML = this.getNumberDisplay(this.mainOperand);
		previewOperandTextElement.innerHTML = `${this.getNumberDisplay(this.previewOperand)} ${this.operation}`;
	}
}




const calculator = new Calculator(previewOperandTextElement, mainOperandTextElement)

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerHTML);
		calculator.updateDisplay();
	})
});

dataOperationButton.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerHTML);
		calculator.updateDisplay();
	})
});


equalsButton.addEventListener('click', () => {
	calculator.compute();
	calculator.updateDisplay();
});

dataClear.addEventListener('click', () => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
	calculator.delete();
	calculator.updateDisplay();
});
