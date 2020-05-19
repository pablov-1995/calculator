const calculator = document.getElementById('calculator');
// shortcut to create divs
const div = () => document.createElement('div');

/* SETTING THE DISPLAY */

function createCalculator() {
  const main = div();
  main.setAttribute('id', 'keys');
  appendKeys(main);

  calculator.appendChild(main);
}

function appendDisplay(elem) {
  const display = document.createElement('div');
  display.setAttribute('id', 'display');
  const textDisplay = document.createElement('a');
  display.appendChild(textDisplay);
  elem.appendChild(display);
}

function appendKeys(elem) {
  
  // Set AC button
  const acButton = createKeyButton('ac-key', 'AC');
  acButton.addEventListener('click', () => {
    displayText.innerHTML = '';
    document.querySelector("div#display").removeChild(document.querySelector("div#display").lastChild);
  });

  // Set delete button
  const deleteButton = createKeyButton('delete', 'DEL');
  deleteButton.addEventListener('click', () => displayText.innerHTML = displayText.innerHTML.slice(0,-1));

  // Set advanced operations
  // const advOps = createAdvOps();

  // Set number pad
  const numPad = createMainGrid();

  // Set simple opeations
  const simOps = createSimOps();

  // Set equal button
  const equal = createKeyButton('equal', '=');
  equal.addEventListener('click', () => {
    const lastOp = document.createElement('a');
    lastOp.setAttribute('style', 'color: rgb(67, 67, 112);; font-size: 20px; position: absolute; top: 70px; right: 60px');
    lastOp.innerHTML = displayText.innerHTML;
    document.querySelector("div#display").appendChild(lastOp);
    displayText.innerHTML = eval(displayText.innerHTML);
  } );

  elem.appendChild(acButton);
  elem.appendChild(deleteButton);
  // elem.appendChild(advOps);
  elem.appendChild(numPad);
  elem.appendChild(simOps);
  elem.appendChild(equal);
  
}

// Disabled for now
/*
function createAdvOps() {
  const advOps = div();
  advOps.setAttribute('id', 'adv-ops');
  const items = [
    {
      id: 'pow',
      text: 'x^n'
    },
    {
      id: 'exp',
      text: 'e^x'
    },
    {
      id: 'log',
      text: 'ln x'
    },
    {
      id: 'rt',
      text: 'root n (x)'
    }
  ]
  
  for (const item of items) {
    const button = createKeyButton(item.id, item.text);
    button.classList.toggle('advOp');
    advOps.appendChild(button);
  }
  return advOps;
}
*/

function createSimOps() {
  const simOps = div();
  simOps.setAttribute('id', 'sim-ops');
  const items = [
    {
      id: 'div',
      text: '/'
    },
    {
      id: 'mult',
      text: '*'
    },
    {
      id: 'sum',
      text: '+'
    },
    {
      id: 'sub',
      text: '-'
    }
  ]
  for (const item of items) {
    const button = createKeyButton(item.id, item.text);
    button.classList.toggle('simOp');
    button.addEventListener('click', assignValue);
    simOps.appendChild(button);
  }
  return simOps;
}

function assignValue() {
  if (displayText.text) displayText.innerHTML = displayText.innerHTML + this.firstChild.text;
  else displayText.innerHTML = this.firstChild.text;
}

function createMainGrid() {
  const numPad = div();
  numPad.setAttribute('id', 'num-pad');
  const items = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.'];
  for (item of items) {
    const num = createKeyButton(item, item);
    num.classList.toggle('num');
    num.addEventListener('click', assignValue);
    if (!item) num.classList.toggle('zero');
    numPad.appendChild(num);
  }
  return numPad;
}

function insertChar(e) {
  console.log(e.key);
  const key = document.querySelector(`.key[data-key="${e.key}"]`);
  key.click();
}

function createKeyButton(id, text) {
  const button = div();
  button.setAttribute('id', id);
  if (text === '=') button.setAttribute('data-key', 'Enter')
  else if (text === 'DEL') button.setAttribute('data-key', 'd')
  else if (text === 'AC') button.setAttribute('data-key', 'r')
  else button.setAttribute('data-key', text);
  button.classList.toggle('key');
  appendTextElem(button, text);
  return button;
}

function appendTextElem(elem, txt) {
  const text = document.createElement('a');
  text.textContent = txt;
  elem.appendChild(text);
}

const header = div();
header.setAttribute('id', 'results');
appendDisplay(header);
calculator.appendChild(header);
var displayText = document.querySelector('div#display').firstChild;

createCalculator();
