Steps to reproduce:

1. Install the current failing release:
   `npm install jsdom@27`
2. Run the script with that version:
   `node test.js`
   Expected output: the process throws `Error: second click should remove .is-red`.
3. Downgrade to the previous release:
   `npm install jsdom@26`
4. Run the script again:
   `node test.js`
   Expected output: `All assertions passed.`

The reproduction script uses only jsdom APIs. It creates a button that toggles a class on its container; on jsdom 27 the class stops toggling off, while jsdom 26 behaves correctly.
