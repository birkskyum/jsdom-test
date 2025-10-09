const {JSDOM} = require('jsdom');

function setupDom() {
  const html = `<!DOCTYPE html><html><head></head><body></body></html>`;
  const dom = new JSDOM(html, {pretendToBeVisual: true});
  const {document} = dom.window;

  const container = document.createElement('div');
  container.id = 'flash-container';
  document.body.appendChild(container);

  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'flash-button';
  button.textContent = 'Click me';
  container.appendChild(button);

  const style = document.createElement('style');
  style.textContent = `
    #flash-container { color: black; }
    #flash-container.has-flash { color: red; }
  `;
  document.head.appendChild(style);

  button.addEventListener('click', () => {
    container.classList.add('has-flash');
    dom.window.setTimeout(() => {
      container.classList.remove('has-flash');
    }, 1000);
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

async function run() {
  const {dom, container, button} = setupDom();
  const {document} = dom.window;

  simulateClick(button);

  assert(
    document.querySelectorAll('.has-flash').length === 1,
    'click should add .has-flash'
  );

  await new Promise(resolve => dom.window.setTimeout(resolve, 1100));

  assert(
    document.querySelectorAll('.has-flash').length === 0,
    '.has-flash should be removed after 1 second'
  );

  assert(
    container.className === '',
    'container should not retain extra classes'
  );

  console.log('All assertions passed.');
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
