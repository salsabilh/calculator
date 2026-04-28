let display = '';
let justCalculated = false;

function updateDisplay() {
  const expression = document.getElementById('expression');
  const result = document.getElementById('result');

  // Show friendly expression (replace * and / with symbols)
  expression.textContent = display
    .replace(/\*/g, '×')
    .replace(/\//g, '÷');

  if (display === '') {
    result.textContent = '0';
  } else {
    try {
      const evaluated = eval(display);
      if (!isNaN(evaluated)) {
        result.textContent = evaluated;
      }
    } catch {
      result.textContent = display.slice(-1);
    }
  }
}

function appendToDisplay(value) {
  const operators = ['+', '-', '*', '/'];

  // If just calculated and user types a number, start fresh
  if (justCalculated && !operators.includes(value)) {
    display = '';
    justCalculated = false;
  } else {
    justCalculated = false;
  }

  // Prevent double operators
  if (operators.includes(value) && operators.includes(display.slice(-1))) {
    display = display.slice(0, -1);
  }

  // Prevent double dots
  if (value === '.') {
    const parts = display.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes('.')) return;
  }

  display += value;
  updateDisplay();
}

function clearAll() {
  display = '';
  justCalculated = false;
  updateDisplay();
}

function deleteLast() {
  display = display.slice(0, -1);
  updateDisplay();
}

function calculate() {
  if (display === '') return;
  try {
    const result = eval(display);
    document.getElementById('expression').textContent = display
      .replace(/\*/g, '×')
      .replace(/\//g, '÷') + ' =';
    document.getElementById('result').textContent = result;
    display = String(result);
    justCalculated = true;
  } catch {
    document.getElementById('result').textContent = 'Error';
    display = '';
  }
}

// KEYBOARD SUPPORT
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') appendToDisplay(e.key);
  else if (e.key === '+') appendToDisplay('+');
  else if (e.key === '-') appendToDisplay('-');
  else if (e.key === '*') appendToDisplay('*');
  else if (e.key === '/') { e.preventDefault(); appendToDisplay('/'); }
  else if (e.key === '.') appendToDisplay('.');
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace') deleteLast();
  else if (e.key === 'Escape') clearAll();
});