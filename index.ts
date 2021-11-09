import type {Json, JsonArray, JsonObject} from "@stein197/ts-util";

/**
 * Checks if two JSON structures are deeply equal. Compares only JSON values, comparing class instances and other than
 * JSON types leads to undefined behavior. It also makes partial comparison
 * @param a First object to compare.
 * @param b Second object to compare.
 * @returns `true` if both objects are strictly deeply equal, `-1` if the first object is a partial of the second, `1`
 *          if the second one is a partial of the first one and `false` otherwise.
 */
export function equal(a: Json, b: Json): -1 | 1 | boolean {
	if (a === b)
		return true;
	if (a != null && b != null && typeof a === "object" && typeof b === "object") {
		const aEntries = Object.entries(a);
		const bEntries = Object.entries(b);
		let minorEntries: [string, Json][];
		let majorObject: JsonArray | JsonObject;
		if (aEntries.length < bEntries.length) {
			minorEntries = aEntries;
			majorObject = b;
		} else {
			minorEntries = bEntries;
			majorObject = a;
		}
		const returnValue = aEntries.length === bEntries.length ? true : (aEntries.length < bEntries.length ? -1 : 1);
		const result = minorEntries.map(entry => entry[0] in majorObject ? equal(majorObject[entry[0] as any], entry[1]) : false).reduce((acc, v) => acc === true || acc === v ? v : false, true);
		return aEntries.length === bEntries.length ? result : (result ? returnValue : false);
    } else {
        return false;
    }
}

/**
 * Checks if two JSON structures are deeply and partly equal.
 * @param base Base object to compare with.
 * @param part Partial object of the first one.
 * @returns `true` if the second object is a subset of the second one.
 */
export function partlyEqual(base: Json, part: Json): boolean {
	const result = equal(base, part);
	return result > 0 || result === true;
}

/**
 * Checks if two JSON structures are deeply and strictly equal.
 * @param a First object to compare.
 * @param b Second object to compare.
 * @returns `true` if both objects are strictly deeply equal
 */
export const strictlyEqual: (a: Json, b: Json) => boolean = (a, b) => equal(a, b) === true;

/**
 * Checks if passed argument is an array.
 * @param arg Object to check.
 * @return `true` if the argument is an array.
 */
export const isArray = (arg: any): arg is any[] => Array.isArray(arg);

/**
 * Checks if passed argument is object and NOT an array.
 * @param arg Object to check.
 * @return `true` if the argument is an object literal.
 */
export const isObject = (arg: any): arg is object => typeof arg === "object" && !isArray(arg);

/**
 * Checks if passed argument is empty. Argument considered as empty in following cases: empty string (""), empty object
 * ({}) and empty array ([]).
 * @param arg Object to check.
 * @returns `true` if the argument is empty
 */
export const isEmpty = (arg: Json) => !(typeof arg === "string" || isArray(arg) ? arg : Object.entries(arg as any)).length;

/**
 * Perform deep object clone.
 * @param arg Object to clone.
 * @returns Cloned object.
 */
export const clone: (arg: Json) => Json = arg => JSON.parse(JSON.stringify(arg));
