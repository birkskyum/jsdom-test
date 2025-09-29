export const BUTTON_ID = 'toggle-button';
export const CONTAINER_ID = 'toggle-container';
export const RED_CLASS = 'is-red';
export const PARAGRAPH_CLASS = 'toggle-paragraph';

export function createMarkup(root = document.body) {
  const doc = root.ownerDocument ?? document;

  const container = doc.createElement('section');
  container.id = CONTAINER_ID;

  const button = doc.createElement('button');
  button.type = 'button';
  button.id = BUTTON_ID;
  button.textContent = 'Show info';
  container.appendChild(button);

  const paragraph = doc.createElement('p');
  paragraph.className = PARAGRAPH_CLASS;
  paragraph.textContent = 'Content';
  container.appendChild(paragraph);

  const style = doc.createElement('style');
  style.textContent = `
    #${CONTAINER_ID} .${PARAGRAPH_CLASS} {
      color: black;
    }

    #${CONTAINER_ID}.${RED_CLASS} .${PARAGRAPH_CLASS} {
      color: red;
    }
  `;

  const head = doc.head ?? root;
  head.appendChild(style);
  root.appendChild(container);

  return {container, button, paragraph, style};
}

export function wireToggle(element, button) {
  button.addEventListener('click', () => {
    const isRed = element.classList.toggle(RED_CLASS);
    button.textContent = isRed ? 'Make Black' : 'Make Red';
  });
}

export function setupToggle(root = document.body) {
  const {container, button} = createMarkup(root);
  wireToggle(container, button);
  return container;
}
