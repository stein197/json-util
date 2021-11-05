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
The noticeable thing is `equal()` function that compares objects strictly and partially at the same time (without overhead). In addition to booleans, it also returns `-1` and `1` if one object is super-/sub-set of another one respectively. The following example shows this difference:
```js
jsonUtil.equal({}, {}); // true
jsonUtil.equal({a: 1}, {}); // 1, because the first object is a superset of the second one
jsonUtil.equal({}, {a: 1}); // -1, because the first object is a subset of the second one
jsonUtil.equal({a: 1, b: {c: 3}}, {a: 1}); // 1, it could include nested objects
jsonUtil.equal({a: 1, b: {c: 3}}, {b: {c: null}}); // false, fails here
```
If you mind a function that does "a lot", then use two distinct functions:
```js
jsonUtil.strictlyEqual({a: 1}, {a: 1}); // true
jsonUtil.strictlyEqual({a: 1}, {}); // false
jsonUtil.partlyEqual({a: 1}, {a: 1}); // true
jsonUtil.partlyEqual({a: 1}, {}); // true, the second object is a subset of the first one
jsonUtil.partlyEqual({}, {a: 1}); // false, the first object is not a superset of the second one
```

## NPM scripts
- `clean` cleans working directory from compiled files
- `compile` compiles source code
- `test` runs unit tests
- `build` builds the entire project (including tests). Outputs `index.js` for Node.js environment and `jsonUtils.min.js` for browser.
