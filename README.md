# Tiny library that provides utility functions to work with JSON structures
This tiny package provides common functions to work with JSON structures

## Installation
For node:
```
npm i @stein197/equals
```
then
```ts
import * as jsonUtil from "@stein197/json-util";
```
For browser:
```html
<script src="jsonUtil.min.js"></script>
```
The global scope will contain `jsonUtil` variable containing all functions inside.

## Usage
The next example shows all available functions. More detailed description for the API rests in corresponding docblocks.
```js
// Comparing objects
jsonUtil.equal({a: 1}, {a: 1}); // true
// Type checking
jsonUtil.isArray([]); // true
jsonUtil.isObject({}); // true
jsonUtil.isObject([]); // false
// Content checking
jsonUtil.isEmpty({}); // true
jsonUtil.isEmpty([]); // true
jsonUtil.isEmpty(""); // true
// Deep cloning
jsonUtil.clone([1, 2, 3]); // [1, 2, 3]
jsonUtil.clone({}) == {}; // false
```

## NPM scripts
- `clean` cleans working directory from compiled files
- `compile` compiles source code
- `test` runs unit tests
- `build` builds the entire project (including tests). Outputs `index.js` for Node.js environment and `jsonUtils.min.js` for browser.
