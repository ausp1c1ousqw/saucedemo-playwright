import { assertWithLog } from "../framework/gui";

export function expectSortedAsc(actual, message = "Comparing actual list with ascending-sorted: ") {
	const expected = [...actual].sort((a, b) => a.localeCompare(b));
	assertWithLog(actual, expected, message);
}

export function expectSortedDesc(
	actual,
	message = "Comparing actual list with descending-sorted: ",
) {
	const expected = [...actual].sort((a, b) => b.localeCompare(a));
	assertWithLog(actual, expected, message);
}

export function expectSortedNumericAsc(
	actual,
	message = "Comparing actual numeric list with ascending-sorted: ",
) {
	const expected = [...actual].sort((a, b) => a - b);
	assertWithLog(actual, expected, message);
}

export function expectSortedNumericDesc(
	actual,
	message = "Comparing actual numeric list with descending-sorted: ",
) {
	const expected = [...actual].sort((a, b) => b - a);
	assertWithLog(actual, expected, message);
}

export function expectSameMembers(
	actual,
	expected,
	message = "Comparing lists after sorting (order ignored)",
) {
	const sortedActual = [...actual].sort();
	const sortedExpected = [...expected].sort();
	assertWithLog(sortedActual, sortedExpected, message);
}
