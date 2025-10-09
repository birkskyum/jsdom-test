const {JSDOM} = require('jsdom');

function setupDom() {
  const html = `<!DOCTYPE html><html><head></head><body></body></html>`;
  const dom = new JSDOM(html, {pretendToBeVisual: true});
  const {document} = dom.window;

  const scroller = document.createElement('div');
  scroller.id = 'scroll-target';
  scroller.style.height = '100px';
  scroller.style.overflow = 'auto';
  scroller.style.position = 'relative';
  document.body.appendChild(scroller);

  const content = document.createElement('div');
  content.style.height = '200px';
  scroller.appendChild(content);

  const style = document.createElement('style');
  style.textContent = `
    #scroll-target { color: black; }
    #scroll-target.is-scrolled { color: red; }
  `;
  document.head.appendChild(style);

  scroller.addEventListener('scroll', () => {
    if (scroller.scrollTop === 0) {
      scroller.classList.add('is-scrolled');
      dom.window.setTimeout(() => {
        scroller.classList.remove('is-scrolled');
      }, 1000);
    }
  });

  return {dom, scroller};
}

function simulateScroll(target) {
  const {Event} = target.ownerDocument.defaultView;
  target.scrollTop = 0;
  target.dispatchEvent(new Event('scroll', {bubbles: true}));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const {dom, scroller} = setupDom();
  const {document} = dom.window;

  simulateScroll(scroller);
  assert(
    document.querySelectorAll('.is-scrolled').length === 1,
    'scroll event at top should add .is-scrolled'
  );

  await new Promise(resolve => dom.window.setTimeout(resolve, 1100));

  assert(
    document.querySelectorAll('.is-scrolled').length === 0,
    '.is-scrolled should be removed after 1 second'
  );

  console.log('All assertions passed.');
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
