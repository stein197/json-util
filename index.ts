import type {Json} from "@stein197/ts-util";

/**
 * Checks if two JSON structures are deeply equal. Compares only JSON values, comparing class instances and other than
 * JSON types leads to undefined behavior.
 * @param a First object to compare.
 * @param b Second object to compare.
 * @returns `true` if both objects are deeply equal.
 */
export function equal(a: Json, b: Json): boolean {
	if (a === b)
		return true;
	if (a != null && b != null && typeof a === "object" && typeof b === "object") {
		const aEntries = Object.entries(a);
		return aEntries.length === Object.entries(b).length && aEntries.every(entry => entry[0] in b && equal(entry[1], b[entry[0] as any]))
	} else {
		return false;
	}
}

/**
 * Checks if passed argument is object and NOT an array.
 * @param arg Object to check.
 * @return `true` if the argument is an object literal.
 */
export const isObject = (arg => typeof arg === "object" && !isArray(arg)) as ((arg: any) => arg is object);

/**
 * Checks if passed argument is an array.
 * @param arg Object to check.
 * @return `true` if the argument is an array.
 */
export const isArray = (arg => Array.isArray(arg)) as ((arg: any) => arg is any[]);

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
