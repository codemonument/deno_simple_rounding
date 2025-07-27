/**
 * @fileoverview A deno module, containing reliable custom functions for rounding, ceiling, flooring, truncating and formatting floating point numbers.
 * 
 * Basic Problem: JS Floating Point Math is highly inaccurate.
 * Found this thread: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
 *
 * Best solution: Use a library with correct implementation of floating point math.
 *
 * - mathjs (CAUTION: not math.js!): https://www.npmjs.com/package/mathjs
 *   - is basically complete, but is FAT: 732 kB, 188 kB minified
 *   - see https://bundlephobia.com/package/mathjs@13.1.1
 *
 * - decimal.js: https://www.npmjs.com/package/decimal.js
 *   - still 31.1 kB, 12.3kB minified
 *   - good: last Publish in 2022 (today: 2024-09-09)
 *
 * - currency.js: https://www.npmjs.com/package/currency.js
 *   - 2.2kB, 1kB minified
 *   - no dependencies
 *   - BUT: only compatible with TS allowSyntheticDefaultImports: true + default import
 *
 * Second best solution: Use a custom implementation of roundToPrecision
 * bjesuiter selected (on 2024-09-09):
 * https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary#:~:text=Solution%202%3A%20purely%20mathematical%20(Number.EPSILON)
 * 
 * @module
 */

/**
 * Decimal round (to the nearest integer)
 * -  0.5 rounds to 1
 * - -0.5 rounds to -0
 *
 * Rounds a number to a given precision.
 * Rounds to the nearest integer for the last place respecting the precision.
 * CAUTION: Math.round() rounds positive .5 numbers up to the next integer,
 * but rounds negative .5 numbers down to the next integer.
 *
 * @example
 * ```ts
 * import { roundToPrecision } from "@codemonument/simple-rounding";
 * 
 * roundToPrecision(3.14159, 2); // 3.14
 * roundToPrecision(3.145, 2);   // 3.15
 * roundToPrecision(-3.4, 0);    // -3
 * roundToPrecision(-3.45, 1);   // -3.5
 * roundToPrecision(-3.55, 1);   // -3.5
 * ```
 *
 * @param value - The number to round.
 * @param precision - The number of decimal places to round to.
 * @returns The rounded number.
 */
export function roundToPrecision(value: number, precision: number): number {
  const p = Math.pow(10, precision || 0);
  return Math.round(value * p) / p;
}

/**
 * Decimal ceil
 *
 * Ceils a number to a given precision.
 * Rounds "up" to the nearest integer for the last place respecting the precision.
 * Note: Ceiling a negative number rounds it "up" towards zero, because this is the bigger number!
 *
 * @example
 * ```ts
 * import { ceilToPrecision } from "@codemonument/simple-rounding";
 * 
 * ceilToPrecision(3.14159, 2); // 3.15
 * ceilToPrecision(3.141, 2);   // 3.15
 * ceilToPrecision(3.145, 2);   // 3.15
 * ceilToPrecision(3.001, 2);   // 3.01
 * ceilToPrecision(-3.4, 0);    // -3
 * ceilToPrecision(-3.5, 0);    // -3
 * ceilToPrecision(-3.9, 0);    // -3
 * ceilToPrecision(-3.45, 1);   // -3.4
 * ceilToPrecision(-3.55, 1);   // -3.5
 * ```
 *
 * @param value - The number to round.
 * @param precision - The number of decimal places to round to.
 * @returns The rounded number.
 */
export function ceilToPrecision(value: number, precision: number): number {
  const p = Math.pow(10, precision ?? 0);
  return Math.ceil(value * p) / p;
}

/**
 * Decimal floor
 *
 * Floors a number to a given precision.
 * Rounds down to the nearest integer for the last place respecting the precision.
 *
 * CAUTION: Flooring negative numbers makes the digits look bigger, but in negative land
 * bigger digits mean smaller number!
 *
 * @example
 * ```ts
 * import { floorToPrecision } from "@codemonument/simple-rounding";
 * 
 * floorToPrecision(3.14159, 2); // 3.14
 * floorToPrecision(3.141, 2);   // 3.14
 * floorToPrecision(3.145, 2);   // 3.14
 * floorToPrecision(3.001, 2);   // 3.00
 * floorToPrecision(-3.4, 0);    // -4
 * floorToPrecision(-3.5, 0);    // -4
 * floorToPrecision(-3.9, 0);    // -4
 * ```
 *
 * @param value - The number to round.
 * @param precision - The number of decimal places to round to.
 * @returns The rounded number.
 */
export function floorToPrecision(value: number, precision: number): number {
  const p = Math.pow(10, precision ?? 0);
  return Math.floor(value * p) / p;
}

/**
 * Decimal trunc
 *
 * Truncates a number to a given precision.
 * Rounds towards zero to the nearest integer for the last place respecting the precision.
 *
 * @example
 * ```ts
 * import { truncToPrecision } from "@codemonument/simple-rounding";
 * 
 * truncToPrecision(3.14159, 2);  // 3.14
 * truncToPrecision(3.19, 1);     // 3.1
 * truncToPrecision(-3.14159, 2); // -3.14
 * truncToPrecision(-3.19, 1);    // -3.1
 * ```
 *
 * @param value - The number to round.
 * @param precision - The number of decimal places to round to.
 * @returns The rounded number.
 */
export function truncToPrecision(value: number, precision: number): number {
  if (value < 0) {
    return ceilToPrecision(value, precision);
  } else {
    return floorToPrecision(value, precision);
  }
}

/**
 * Format using fixed-point notation
 *
 * Rounds a number to a given precision and formats it with a specific number of decimal places.
 *
 * @example
 * ```ts
 * import { roundToFixed } from "@codemonument/simple-rounding";
 * 
 * roundToFixed(3.14159, 2, 2); // "3.14"
 * roundToFixed(3.1, 2, 2);     // "3.10"
 * roundToFixed(3.1, 2, 4);     // "3.1000"
 * ```
 *
 * @param value - The number to format.
 * @param precision - The number of decimal places to round to.
 * @param displayPrecision - The number of decimal places to display.
 * @returns The formatted number as a string.
 */
export function roundToFixed(
  value: number,
  precision: number,
  displayPrecision: number,
): string {
  return roundToPrecision(value, precision).toFixed(displayPrecision);
}
