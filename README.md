# @codemonument/simple-rounding

This module contains "mostly"(tm) relieable custom functions for rounding, ceiling, flooring, truncating and formatting floating point numbers.

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

---

# For Contributors

## Deploy a new version

1. Update the version in deno.json
2. Update all examples & docs
3. Run `deno task test` & fix errors
4. Run `deno task dry` & fix errors`
5. Commit, make a tag and push the tag (will then be built by github actions)
