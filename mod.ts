/**
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
 * tt-bj2 selected (on 2024-09-09):
 * https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary#:~:text=Solution%202%3A%20purely%20mathematical%20(Number.EPSILON)
 */

/**
 * Decimal round (half away from zero) to a defined precision
 *
 * @bjesuiter: NOTE: this STILL produces lengthy values sometimes, with 55.00000000000001 % instead of 55% or 55.00%
 *
 * @param value The floating point value to be rounded
 * @param precision The number of decimal places to round to
 * @returns The rounded number
 */
export function roundToPrecision(value: number, precision: number): number {
    const p = Math.pow(10, precision || 0);
    const n = value * p * (1 + Number.EPSILON);
    return Math.round(n) / p;
}

/**
 * Decimal ceil
 *
 * @param value The floating point value to be ceiled
 * @param precision The number of decimal places to ceil to
 * @returns The ceiled number
 */
export function ceilToPrecision(value: number, precision: number): number {
    const p = Math.pow(10, precision || 0);
    const n = value * p * (1 - Math.sign(value) * Number.EPSILON);
    return Math.ceil(n) / p;
}

/**
 * Decimal floor
 *
 * @param value The floating point value to be floored
 * @param precision The number of decimal places to floor to
 * @returns The floored number
 */
export function floorToPrecision(value: number, precision: number): number {
    const p = Math.pow(10, precision || 0);
    const n = value * p * (1 + Math.sign(value) * Number.EPSILON);
    return Math.floor(n) / p;
}

/**
 * @param value The floating point value to be truncated
 * @param precision The number of decimal places to truncate to
 * @returns The truncated number
 */
export function truncToPrecision(value: number, precision: number): number {
    return (value < 0 ? ceilToPrecision : floorToPrecision)(value, precision);
}

/**
 * Format the value using fixed-point notation
 * @param value The floating point value to be formatted
 * @param precision The number of decimal places to format to
 * @returns The formatted number as string
 */
export function toFixed(value: number, precision: number): string {
    return roundToPrecision(value, precision).toFixed(precision);
}
