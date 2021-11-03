import * as mocha from "mocha";
import * as assert from "assert";
import * as jsonUtil from ".";

mocha.describe("equal()", () => {
	mocha.describe("Nulls", () => {
		mocha.it("equal(null, null) == true", () => assert.equal(jsonUtil.equal(null, null), true));
	});
	mocha.describe("Booleans", () => {
		mocha.it("equal(true, true) == true", () => assert.equal(jsonUtil.equal(true, true), true));
		mocha.it("equal(true, false) == false", () => assert.equal(jsonUtil.equal(true, false), false));
	});
	mocha.describe("Numbers", () => {
		mocha.it("equal(1, 1) == true", () => assert.equal(jsonUtil.equal(1, 1), true));
		mocha.it("equal(1, 2) == false", () => assert.equal(jsonUtil.equal(1, 2), false));
	});
	mocha.describe("Strings", () => {
		mocha.it("equal(\"a\", \"a\") == true", () => assert.equal(jsonUtil.equal("a", "a"), true));
		mocha.it("equal(\"a\", \"b\") == false", () => assert.equal(jsonUtil.equal("a", "b"), false));
	});
	mocha.describe("Arrays", () => {
		mocha.it("equal([], []) == true", () => assert.equal(jsonUtil.equal([], []), true));
		mocha.it("equal([1], [1]) == true", () => assert.equal(jsonUtil.equal([1], [1]), true));
		mocha.it("equal([1], [1, 2]) == false", () => assert.equal(jsonUtil.equal([1], [1, 2]), false));
	});
	mocha.describe("Objects", () => {
		mocha.it("equal({}, {}) == true", () => assert.equal(jsonUtil.equal({}, {}), true));
		mocha.it("equal({}, {a: 1}) == false", () => assert.equal(jsonUtil.equal({}, {a: 1}), false));
		mocha.it("equal({a: 1}, {a: 2}) == false", () => assert.equal(jsonUtil.equal({a: 1}, {a: 2}), false));
	});
	mocha.describe("Mixed", () => {
		mocha.it("equal(1, \"1\") == false", () => assert.equal(jsonUtil.equal(1, "1"), false));
		mocha.it("equal(\"\", null) == false", () => assert.equal(jsonUtil.equal("", null), false));
		mocha.it("equal([1], [\"1\"]) == false", () => assert.equal(jsonUtil.equal([1], ["1"]), false));
		mocha.it("equal([], null) == false", () => assert.equal(jsonUtil.equal([], null), false));
		mocha.it("equal({}, null) == false", () => assert.equal(jsonUtil.equal({}, null), false));
	});
	mocha.describe("Complex (nested)", () => {
		mocha.it("Comparing same objects", () => assert.equal(jsonUtil.equal({
			a: 1,
			b: {
				c: 2,
				d: [
					1, 2, 3
				]
			}
		}, {
			a: 1,
			b: {
				c: 2,
				d: [
					1, 2, 3
				]
			}
		}), true));
		mocha.it("Comparing different objects", () => assert.equal(jsonUtil.equal({
			a: 1,
			b: {
				c: 2,
				d: [
					1, 2, 3
				]
			}
		}, {
			a: 1,
			b: {
				c: 2,
				d: [
					1, 2
				]
			}
		}), false));
		mocha.it("Comparing same arrays", () => assert.equal(jsonUtil.equal([
			1, 2, {
				a: 1
			}
		], [
			1, 2, {
				a: 1
			}
		]), true));
		mocha.it("Comparing different arrays", () => assert.equal(jsonUtil.equal([
			1, 2, {
				a: 1
			}
		], [
			1, 2, {
				b: 2
			}
		]), false));
	});
});

mocha.describe("isObject()", () => {
	mocha.it("isObject({}) == true", () => assert.equal(jsonUtil.isObject({}), true));
	mocha.it("isObject([]) == false", () => assert.equal(jsonUtil.isObject([]), false));
});

mocha.describe("isArray()", () => {
	mocha.it("isArray([]) == true", () => assert.equal(jsonUtil.isArray([]), true));
	mocha.it("isArray({}) == false", () => assert.equal(jsonUtil.isArray({}), false));
});

mocha.describe("isEmpty()", () => {
	mocha.it("isEmpty({}) == true", () => assert.equal(jsonUtil.isEmpty({}), true));
	mocha.it("isEmpty([]) == true", () => assert.equal(jsonUtil.isEmpty([]), true));
	mocha.it("isEmpty(\"\") == true", () => assert.equal(jsonUtil.isEmpty(""), true));
	mocha.it("isEmpty({a: 1}) == false", () => assert.equal(jsonUtil.isEmpty({a: 1}), false));
	mocha.it("isEmpty([1]) == false", () => assert.equal(jsonUtil.isEmpty([1]), false));
	mocha.it("isEmpty(\" \") == false", () => assert.equal(jsonUtil.isEmpty(" "), false));
});

mocha.describe("clone()", () => {
	mocha.describe("Cloning primitives", () => {
		mocha.it("clone(null) === null", () => assert.equal(jsonUtil.clone(null), null));
		mocha.it("clone(true) === true", () => assert.equal(jsonUtil.clone(true), true));
		mocha.it("clone(1) === 1", () => assert.equal(jsonUtil.clone(1), 1));
		mocha.it("clone(\"a\") === \"a\"", () => assert.equal(jsonUtil.clone("a"), "a"));
	});
	mocha.describe("Cloning objects", () => {
		mocha.it("Returns equal object", () => assert.deepStrictEqual(jsonUtil.clone({a: 1, b: {c: 3}}), {a: 1, b: {c: 3}}));
		mocha.it("Returns different reference", () => {
			const o = {
				a: 1,
				b: {
					c: 3
				}
			};
			assert.equal(jsonUtil.clone(o) === o, false);
		});
	});
	mocha.describe("Cloning arrays", () => {
		mocha.it("Returns equal array", () => assert.deepStrictEqual(jsonUtil.clone([1, 2, {c: 3}]), [1, 2, {c: 3}]));
		mocha.it("Returns different reference", () => {
			const o = [1, 2, {c: 3}];
			assert.equal(jsonUtil.clone(o) === o, false);
		});
	});
});
