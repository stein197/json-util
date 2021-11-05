import * as mocha from "mocha";
import * as assert from "assert";
import * as jsonUtil from ".";
import {Json} from "@stein197/ts-util";

const ae = assert.equal;
const one = 1;
const two = 2;

const a = "a";
const b = "b";
const emptyString = "";

const emptyArray: Json = []; const emptyArrayCopy: Json = [];
const oneEntryArray = [1]; const oneEntryArrayCopy = [1];
const twoEntryArray = [1, 2]; /* const twoEntryArrayCopy = [1, 2]; */
const diffArray = [1, 3]; /* const diffArrayCopy = [1, 3]; */
const complexArray = [1, [3, {e: 5, f: 6}]]; const complexArrayCopy = [1, [3, {e: 5, f: 6}]];
const diffComplexArray = [1, [3, [5]]]; /* const diffComplexArrayCopy = [1, [3, [5]]]; */
const partComplexArray = [1, [3, {}]]; /* const partComplexArrayCopy = [1, [3, {}]]; */

const emptyObject: Json = {}; const emptyObjectCopy: Json = {};
const oneEntryObject = {a: 1}; const oneEntryObjectCopy = {a: 1};
const twoEntryObject = {a: 1, b: 2}; /* const twoEntryObjectCopy = {a: 1, b: 2}; */
const diffObject = {a: 1, c: 3}; /* const diffObjectCopy = {a: 1, c: 3}; */
const complexObject = {a: 1, b: {c: [1, 2, 3]}}; const complexObjectCopy = {a: 1, b: {c: [1, 2, 3]}};
const diffComplexObject = {a: 1, b: {c: [1, 3]}}; /* const diffComplexObjectCopy = {a: 1, b: {c: [1, 3]}}; */
const partComplexObject = {b: {c: []}}; /* const partComplexObjectCopy = {b: {c: []}}; */

mocha.describe("equal()", () => {
	const e = jsonUtil.equal;

	mocha.describe("Nulls", () => {
		mocha.it("equal(null, null) == true", () => ae(e(null, null), true));
	});

	mocha.describe("Booleans", () => {
		mocha.it("Equal booleans == true", () => ae(e(true, true), true));
		mocha.it("Unequal booleans == false", () => ae(e(true, false), false));
	});

	mocha.describe("Numbers", () => {
		mocha.it("Equal numbers == true", () => ae(e(one, one), true));
		mocha.it("Unequal numbers == false", () => ae(e(one, two), false));
	});

	mocha.describe("Strings", () => {
		mocha.it("Equal strings == true", () => ae(e(a, a), true));
		mocha.it("Empty strings == true", () => ae(e(emptyString, emptyString), true));
		mocha.it("Unequal strings == false", () => ae(e(a, b), false));
		mocha.it("String with empty one == false", () => ae(e(a, emptyString), false));
	});

	mocha.describe("Arrays", () => {
		mocha.it("Empty arrays == true", () => ae(e(emptyArray, emptyArrayCopy), true));
		mocha.it("Equal arrays == true", () => ae(e(oneEntryArray, oneEntryArrayCopy), true));
		mocha.it("Part with full array == -1", () => ae(e(oneEntryArray, twoEntryArray), -1));
		mocha.it("Full with part array == 1", () => ae(e(twoEntryArray, oneEntryArray), 1));
		mocha.it("Unequal arrays == false", () => ae(e(twoEntryArray, diffArray), false));
		mocha.it("Equal complex arrays == true", () => ae(e(complexArray, complexArrayCopy), true));
		mocha.it("Unequal complex arrays == false", () => ae(e(complexArray, diffComplexArray), false));
		mocha.it("Part with full complex array == -1", () => ae(e(partComplexArray, complexArray), -1));
		mocha.it("Full with part complex array == 1", () => ae(e(complexArray, partComplexArray), 1));
	});

	mocha.describe("Objects", () => {
		mocha.it("Empty objects == true", () => ae(e(emptyObject, emptyObjectCopy), true));
		mocha.it("Equal objects == true", () => ae(e(oneEntryObject, oneEntryObjectCopy), true));
		mocha.it("Part with full object == -1", () => ae(e(oneEntryObject, twoEntryObject), -1));
		mocha.it("Full with part object == 1", () => ae(e(twoEntryObject, oneEntryObject), 1));
		mocha.it("Unequal objects == false", () => ae(e(twoEntryObject, diffObject), false));
		mocha.it("Equal complex objects == true", () => ae(e(complexObject, complexObjectCopy), true));
		mocha.it("Unequal complex objects == false", () => ae(e(complexObject, diffComplexObject), false));
		mocha.it("Part with full complex object == -1", () => ae(e(partComplexObject, complexObject), -1));
		mocha.it("Full with part complex object == 1", () => ae(e(complexObject, partComplexObject), 1));
	});

	mocha.describe("Mixed types with the same values", () => {
		mocha.it("equal(1, \"1\") == false", () => ae(e(1, "1"), false));
		mocha.it("equal(\"\", null) == false", () => ae(e("", null), false));
		mocha.it("equal([1], [\"1\"]) == false", () => ae(e([1], ["1"]), false));
		mocha.it("equal([], null) == false", () => ae(e([], null), false));
		mocha.it("equal({}, null) == false", () => ae(e({}, null), false));
	});
});

mocha.describe("partlyEqual()", () => {
	const pe = jsonUtil.partlyEqual;

	mocha.describe("Arrays", () => {
		mocha.it("Empty arrays == true", () => ae(pe(emptyArray, emptyArrayCopy), true));
		mocha.it("Equal arrays == true", () => ae(pe(oneEntryArray, oneEntryArrayCopy), true));
		mocha.it("Part with full array == false", () => ae(pe(oneEntryArray, twoEntryArray), false));
		mocha.it("Full with part array == true", () => ae(pe(twoEntryArray, oneEntryArray), true));
		mocha.it("Unequal arrays == false", () => ae(pe(twoEntryArray, diffArray), false));
		mocha.it("Equal complex arrays == true", () => ae(pe(complexArray, complexArrayCopy), true));
		mocha.it("Unequal complex arrays == false", () => ae(pe(complexArray, diffComplexArray), false));
		mocha.it("Part with full complex array == false", () => ae(pe(partComplexArray, complexArray), false));
		mocha.it("Full with part complex array == true", () => ae(pe(complexArray, partComplexArray), true));
	});

	mocha.describe("Objects", () => {
		mocha.it("Empty objects == true", () => ae(pe(emptyObject, emptyObjectCopy), true));
		mocha.it("Equal objects == true", () => ae(pe(oneEntryObject, oneEntryObjectCopy), true));
		mocha.it("Part with full object == false", () => ae(pe(oneEntryObject, twoEntryObject), false));
		mocha.it("Full with part object == true", () => ae(pe(twoEntryObject, oneEntryObject), true));
		mocha.it("Unequal objects == false", () => ae(pe(twoEntryObject, diffObject), false));
		mocha.it("Equal complex objects == true", () => ae(pe(complexObject, complexObjectCopy), true));
		mocha.it("Unequal complex objects == false", () => ae(pe(complexObject, diffComplexObject), false));
		mocha.it("Part with full complex object == false", () => ae(pe(partComplexObject, complexObject), false));
		mocha.it("Full with part complex object == true", () => ae(pe(complexObject, partComplexObject), true));
	});
});

mocha.describe("strictlyEqual()", () => {
	const se = jsonUtil.strictlyEqual;
	
	mocha.describe("Arrays", () => {
		mocha.it("Empty arrays == true", () => ae(se(emptyArray, emptyArrayCopy), true));
		mocha.it("Equal arrays == true", () => ae(se(oneEntryArray, oneEntryArrayCopy), true));
		mocha.it("Part with full array == false", () => ae(se(oneEntryArray, twoEntryArray), false));
		mocha.it("Full with part array == false", () => ae(se(twoEntryArray, oneEntryArray), false));
		mocha.it("Unequal arrays == false", () => ae(se(twoEntryArray, diffArray), false));
		mocha.it("Equal complex arrays == true", () => ae(se(complexArray, complexArrayCopy), true));
		mocha.it("Unequal complex arrays == false", () => ae(se(complexArray, diffComplexArray), false));
		mocha.it("Part with full complex array == false", () => ae(se(partComplexArray, complexArray), false));
		mocha.it("Full with part complex array == false", () => ae(se(complexArray, partComplexArray), false));
	});

	mocha.describe("Objects", () => {
		mocha.it("Empty objects == true", () => ae(se(emptyObject, emptyObjectCopy), true));
		mocha.it("Equal objects == true", () => ae(se(oneEntryObject, oneEntryObjectCopy), true));
		mocha.it("Part with full object == false", () => ae(se(oneEntryObject, twoEntryObject), false));
		mocha.it("Full with part object == false", () => ae(se(twoEntryObject, oneEntryObject), false));
		mocha.it("Unequal objects == false", () => ae(se(twoEntryObject, diffObject), false));
		mocha.it("Equal complex objects == true", () => ae(se(complexObject, complexObjectCopy), true));
		mocha.it("Unequal complex objects == false", () => ae(se(complexObject, diffComplexObject), false));
		mocha.it("Part with full complex object == false", () => ae(se(partComplexObject, complexObject), false));
		mocha.it("Full with part complex object == false", () => ae(se(complexObject, partComplexObject), false));
	});
});

mocha.describe("isArray()", () => {
	const ia = jsonUtil.isArray;

	mocha.it("Empty array == true", () => ae(ia(emptyArray), true));
	mocha.it("Empty object == false", () => ae(ia(emptyObject), false));
});

mocha.describe("isObject()", () => {
	const io = jsonUtil.isObject;

	mocha.it("Empty array == false", () => ae(io(emptyArray), false));
	mocha.it("Empty object == true", () => ae(io(emptyObject), true));
});

mocha.describe("isEmpty()", () => {
	const ie = jsonUtil.isEmpty;

	mocha.it("Empty string == true", () => ae(ie(emptyString), true));
	mocha.it("Empty array == true", () => ae(ie(emptyArray), true));
	mocha.it("Empty object == true", () => ae(ie(emptyObject), true));
	mocha.it("Not empty string == false", () => ae(ie(" "), false));
	mocha.it("Not empty array == false", () => ae(ie(oneEntryArray), false));
	mocha.it("Not empty object == false", () => ae(ie(oneEntryObject), false));
});

mocha.describe("clone()", () => {
	const c = jsonUtil.clone;

	mocha.describe("Primitives", () => {
		mocha.it("clone(null) === null", () => ae(c(null), null));
		mocha.it("clone(true) === true", () => ae(c(true), true));
		mocha.it("clone(1) === 1", () => ae(c(1), 1));
		mocha.it("clone(\"a\") === \"a\"", () => ae(c("a"), "a"));
	});

	mocha.describe("Arrays", () => {
		mocha.it("Returns equal object", () => assert.deepStrictEqual(c(complexArray), complexArrayCopy));
		mocha.it("Returns different reference", () => ae(c(complexArray) !== complexArray, true));
	});

	mocha.describe("Objects", () => {
		mocha.it("Returns equal object", () => assert.deepStrictEqual(c(complexObject), complexObjectCopy));
		mocha.it("Returns different reference", () => ae(c(complexObject) !== complexObject, true));
	});
});
