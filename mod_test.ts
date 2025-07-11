import { assertEquals } from "@std/assert";
import {
  ceilToPrecision,
  floorToPrecision,
  roundToFixed,
  roundToPrecision,
  truncToPrecision,
} from "./mod.ts";

Deno.test("roundToPrecision", async (t) => {
  await t.step("rounds to 2 decimal places", () => {
    assertEquals(roundToPrecision(3.14159, 2), 3.14);
    assertEquals(roundToPrecision(3.145, 2), 3.15);
    assertEquals(roundToPrecision(3.144, 2), 3.14);
  });

  await t.step("rounds to 0 decimal places", () => {
    assertEquals(roundToPrecision(3.6, 0), 4);
    assertEquals(roundToPrecision(3.4, 0), 3);
    assertEquals(roundToPrecision(3.5, 0), 4);
  });

  await t.step("rounds negative numbers", () => {
    assertEquals(roundToPrecision(-3.14159, 2), -3.14);
    assertEquals(roundToPrecision(-3.145, 2), -3.14);
    // CAUTION here: Math.round() rounds negative .5 numbers down to the next integer!
    assertEquals(roundToPrecision(-3.4, 0), -3);
    assertEquals(roundToPrecision(-3.5, 0), -3);
    assertEquals(roundToPrecision(-3.6, 0), -4);
    assertEquals(roundToPrecision(-3.45, 1), -3.4);
    assertEquals(roundToPrecision(-3.55, 1), -3.5);
  });

  await t.step("rounds zero", () => {
    assertEquals(roundToPrecision(0, 2), 0);
    assertEquals(roundToPrecision(0, 0), 0);
  });

  await t.step("rounds large numbers", () => {
    assertEquals(roundToPrecision(123456.789, 2), 123456.79);
    assertEquals(roundToPrecision(123456.789, 0), 123457);
  });

  await t.step("rounds floating point precision issues", () => {
    assertEquals(roundToPrecision(0.1 + 0.2, 1), 0.3);
    assertEquals(roundToPrecision(0.1 + 0.2, 2), 0.30);
  });

  await t.step("rounds negative precision", () => {
    assertEquals(roundToPrecision(1234.56, -1), 1230);
    assertEquals(roundToPrecision(1234.56, -2), 1200);
  });
});

Deno.test("ceilToPrecision", async (t) => {
  await t.step("ceils to 2 decimal places", () => {
    assertEquals(ceilToPrecision(3.14159, 2), 3.15);
    assertEquals(ceilToPrecision(3.140, 2), 3.14);
    assertEquals(ceilToPrecision(3.143, 2), 3.15);
    assertEquals(ceilToPrecision(3.001, 2), 3.01);
  });

  await t.step("ceils to 0 decimal places", () => {
    assertEquals(ceilToPrecision(3.1, 0), 4);
    assertEquals(ceilToPrecision(3.9, 0), 4);
    assertEquals(ceilToPrecision(3.0, 0), 3);
  });

  await t.step("ceils negative numbers", () => {
    assertEquals(ceilToPrecision(-3.14159, 2), -3.14);
    assertEquals(ceilToPrecision(-3.15, 1), -3.1);
    assertEquals(ceilToPrecision(-3.16, 1), -3.1);
    assertEquals(ceilToPrecision(-3.19, 1), -3.1);
  });

  await t.step("ceils zero", () => {
    assertEquals(ceilToPrecision(0, 2), 0);
    assertEquals(ceilToPrecision(0, 0), 0);
  });

  await t.step("ceils negative precision", () => {
    assertEquals(ceilToPrecision(1234.56, -1), 1240);
    assertEquals(ceilToPrecision(1234.56, -2), 1300);
  });
});

Deno.test("floorToPrecision", async (t) => {
  await t.step("floors to 2 decimal places", () => {
    assertEquals(floorToPrecision(3.14159, 2), 3.14);
    assertEquals(floorToPrecision(3.140, 2), 3.14);
    assertEquals(floorToPrecision(3.143, 2), 3.14);
    assertEquals(floorToPrecision(3.149, 2), 3.14);
    assertEquals(floorToPrecision(3.001, 2), 3.00);
  });

  await t.step("floors to 0 decimal places", () => {
    assertEquals(floorToPrecision(3.1, 0), 3);
    assertEquals(floorToPrecision(3.9, 0), 3);
    assertEquals(floorToPrecision(3.0, 0), 3);
  });

  await t.step("floors negative numbers", () => {
    assertEquals(floorToPrecision(-3.14159, 2), -3.15);
    assertEquals(floorToPrecision(-3.12, 1), -3.2);
    assertEquals(floorToPrecision(-3.15, 1), -3.2);
    assertEquals(floorToPrecision(-3.16, 1), -3.2);
    assertEquals(floorToPrecision(-3.19, 1), -3.2);
  });

  await t.step("floors zero", () => {
    assertEquals(floorToPrecision(0, 2), 0);
    assertEquals(floorToPrecision(0, 0), 0);
  });

  await t.step("floors negative precision", () => {
    assertEquals(floorToPrecision(1234.56, -1), 1230);
    assertEquals(floorToPrecision(1234.56, -2), 1200);
  });
});

Deno.test("truncToPrecision", async (t) => {
  await t.step("truncates positive numbers", () => {
    assertEquals(truncToPrecision(3.14159, 2), 3.14);
    assertEquals(truncToPrecision(3.999, 2), 3.99);
    assertEquals(truncToPrecision(3.0, 2), 3.0);
  });

  await t.step("truncates negative numbers", () => {
    assertEquals(truncToPrecision(-3.14159, 2), -3.14);
    assertEquals(truncToPrecision(-3.999, 2), -3.99);
    assertEquals(truncToPrecision(-3.0, 2), -3.0);
  });

  await t.step("truncates to 0 decimal places", () => {
    assertEquals(truncToPrecision(3.7, 0), 3);
    assertEquals(truncToPrecision(-3.7, 0), -3);
    assertEquals(truncToPrecision(3.0, 0), 3);
  });

  await t.step("truncates zero", () => {
    assertEquals(truncToPrecision(0, 2), 0);
    assertEquals(truncToPrecision(0, 0), 0);
  });

  await t.step("truncates negative precision", () => {
    assertEquals(truncToPrecision(1234.56, -1), 1230);
    assertEquals(truncToPrecision(-1234.56, -1), -1230);
  });
});

Deno.test("toFixed", async (t) => {
  await t.step("formats to 2 decimal places", () => {
    assertEquals(roundToFixed(3.14159, 2), "3.14");
    assertEquals(roundToFixed(3.145, 2), "3.15");
    assertEquals(roundToFixed(3.0, 2), "3.00");
  });

  await t.step("formats to 0 decimal places", () => {
    assertEquals(roundToFixed(3.6, 0), "4");
    assertEquals(roundToFixed(3.4, 0), "3");
    assertEquals(roundToFixed(3.0, 0), "3");
  });

  await t.step("formats to  decimal places", () => {
    assertEquals(roundToFixed(3.6, 0), "4.00");
    assertEquals(roundToFixed(3.4, 0), "3.00");
    assertEquals(roundToFixed(3.0, 0), "3.00");
  });

  await t.step("formats negative numbers", () => {
    assertEquals(roundToFixed(-3.14159, 2), "-3.14");
    assertEquals(roundToFixed(-3.145, 2), "-3.14");
  });

  await t.step("formats zero", () => {
    assertEquals(roundToFixed(0, 2), "0.00");
    assertEquals(roundToFixed(0, 0), "0");
  });

  await t.step("formats floating point precision issues", () => {
    assertEquals(roundToFixed(0.1 + 0.2, 1), "0.3");
    assertEquals(roundToFixed(0.1 + 0.2, 2), "0.30");
  });

  await t.step("formats large numbers", () => {
    assertEquals(roundToFixed(123456.789, 2), "123456.79");
    assertEquals(roundToFixed(123456.789, 0), "123457");
  });
});

Deno.test("edge cases and floating point precision", async (t) => {
  await t.step("handles common floating point issues", () => {
    // These are the classic floating point precision problems
    assertEquals(roundToPrecision(0.1 + 0.2, 1), 0.3);
    assertEquals(roundToPrecision(0.1 + 0.2, 2), 0.3);
    assertEquals(roundToPrecision(0.1 + 0.2, 16), 0.3000000000000001);

    assertEquals(roundToFixed(0.1 + 0.2, 1), "0.3");
    assertEquals(roundToFixed(0.1 + 0.2, 2), "0.30");
  });

  await t.step("handles very small numbers", () => {
    assertEquals(roundToPrecision(0.000001, 6), 0.000001);
    assertEquals(ceilToPrecision(0.000001, 6), 0.000001);
    assertEquals(floorToPrecision(0.000001, 6), 0.000001);
    assertEquals(truncToPrecision(0.000001, 6), 0.000001);
  });

  await t.step("handles very large numbers", () => {
    assertEquals(roundToPrecision(1e15, 0), 1e15);
    assertEquals(ceilToPrecision(1e15, 0), 1e15);
    assertEquals(floorToPrecision(1e15, 0), 1e15);
    assertEquals(truncToPrecision(1e15, 0), 1e15);
  });

  await t.step("handles Infinity and NaN", () => {
    assertEquals(roundToPrecision(Infinity, 2), Infinity);
    assertEquals(ceilToPrecision(-Infinity, 2), -Infinity);
    assertEquals(floorToPrecision(Infinity, 2), Infinity);
    assertEquals(truncToPrecision(-Infinity, 2), -Infinity);

    // NaN should remain NaN
    assertEquals(isNaN(roundToPrecision(NaN, 2)), true);
    assertEquals(isNaN(ceilToPrecision(NaN, 2)), true);
    assertEquals(isNaN(floorToPrecision(NaN, 2)), true);
    assertEquals(isNaN(truncToPrecision(NaN, 2)), true);
  });
});
