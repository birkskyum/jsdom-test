const {JSDOM} = require('jsdom');

function setupDom() {
  const html = `<!DOCTYPE html><html><head></head><body></body></html>`;
  const dom = new JSDOM(html, {pretendToBeVisual: true});
  const {document} = dom.window;

  const container = document.createElement('section');
  container.id = 'toggle-container';
  document.body.appendChild(container);

  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'toggle-button';
  button.textContent = 'Show info';
  container.appendChild(button);

  const paragraph = document.createElement('p');
  paragraph.className = 'toggle-paragraph';
  paragraph.textContent = 'Content';
  container.appendChild(paragraph);

  const style = document.createElement('style');
  style.textContent = `
    #toggle-container .toggle-paragraph { color: black; }
    #toggle-container.is-red .toggle-paragraph { color: red; }
  `;
  document.head.appendChild(style);

  button.addEventListener('click', () => {
    const isRed = container.classList.toggle('is-red');
    button.textContent = isRed ? 'Make Black' : 'Make Red';
  });

  return {dom, container, button};
}

function simulateClick(target) {
  const {MouseEvent} = target.ownerDocument.defaultView;
  const options = {bubbles: true};
  target.dispatchEvent(new MouseEvent('mousedown', options));
  target.dispatchEvent(new MouseEvent('mouseup', options));
  target.dispatchEvent(new MouseEvent('click', options));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function run() {
  const {dom, container, button} = setupDom();
  const {document} = dom.window;

  simulateClick(button);
  assert(document.querySelectorAll('.is-red').length === 1, 'first click should add .is-red');

  simulateClick(button);
  assert(document.querySelectorAll('.is-red').length === 0, 'second click should remove .is-red');

  simulateClick(button);
  assert(document.querySelectorAll('.is-red').length === 1, 'third click should add .is-red again');

  const paragraph = container.querySelector('.toggle-paragraph');
  assert(paragraph !== null, 'paragraph should still be inside container');

  console.log('All assertions passed.');
}

run();
