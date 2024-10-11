# @codemonument/simple-rounding

A tiny library which simply provides "kind of" relieable rounding of a js floating point number to n decimal points.

## Why?

Basic Problem: JS Floating Point Math is highly inaccurate.
Found this thread: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary

First best solution: Use a library with correct implementation of floating point math.

- mathjs (CAUTION: not math.js!): https://www.npmjs.com/package/mathjs

  - is basically complete, but is FAT: 732 kB, 188 kB minified
  - see https://bundlephobia.com/package/mathjs@13.1.1

- decimal.js: https://www.npmjs.com/package/decimal.js

  - still 31.1 kB, 12.3kB minified
  - good: last Publish in 2022 (today: 2024-09-09)

- currency.js: https://www.npmjs.com/package/currency.js
  - 2.2kB, 1kB minified
  - no dependencies
  - BUT: only compatible with TS allowSyntheticDefaultImports: true + default import

Second best solution: Use a custom implementation of roundToPrecision
@bjesuiter selected (on 2024-09-09):
https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary#:~:text=Solution%202%3A%20purely%20mathematical%20(Number.EPSILON)
