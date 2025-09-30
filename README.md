The reproduction script uses only jsdom APIs. It creates a button that toggles a class on its container; on jsdom 27 the class stops toggling off, while jsdom 26 behaves correctly.


Steps to reproduce:

1. `npm install jsdom@26`
2. `node test.js` - passes
3. `npm install jsdom@27`
4. `node test.js` - fails

