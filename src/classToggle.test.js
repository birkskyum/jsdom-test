import {describe, it, expect, beforeEach} from 'vitest';

import {
  setupToggle,
  BUTTON_ID,
  CONTAINER_ID,
  RED_CLASS,
  PARAGRAPH_CLASS,
} from './classToggle.js';


function click(target) {
    const options = {bubbles: true};
    target.dispatchEvent(new MouseEvent('mousedown', options));
    target.dispatchEvent(new MouseEvent('mouseup', options));
    target.dispatchEvent(new MouseEvent('click', options));
}


describe('toggle reproduction', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
  });

  it('keeps the paragraph as a child while toggling container class', () => {
    const container = setupToggle(document.body);
    const button = document.getElementById(BUTTON_ID);

    expect(container.id).toBe(CONTAINER_ID);
    expect(button).not.toBeNull();
    expect(container.children.length).toBe(2);

    button.click();

    expect(window.document.querySelectorAll(`.${RED_CLASS}`)).toHaveLength(1);
    
    button.click();
    expect(window.document.querySelectorAll(`.${RED_CLASS}`)).toHaveLength(0);
    
    button.click();
    expect(window.document.querySelectorAll(`.${RED_CLASS}`)).toHaveLength(1);
    

    const paragraph = container.querySelector(`.${PARAGRAPH_CLASS}`);
    expect(paragraph).not.toBeNull();
  });
});
