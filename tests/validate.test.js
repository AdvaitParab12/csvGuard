import { describe, expect, test } from "vitest";
import {
  isEmail,
  isLinkedInURL,
  isCompanyName,
  isEmployeeSize,
  isLocation,
} from "../lib/validate.js";

describe("Testing isEmail", () => {
  test("testing for a valid email", () => {
    expect(isEmail("contact@leadsync.com")).toBe(true);
  });

  test("testing NA", () => {
    expect(isEmail("NA")).toBe(true);
  });

  test("testing for an invalid email", () => {
    expect(isEmail("hey@phone@book.com")).toBe(false);
  });
});

describe("Testing isLinkedinURL", () => {
  test("testing for a valid linkedin url", () => {
    expect(isLinkedInURL("https://in.linkedin.com/company/google")).toBe(true);
  });

  test("testing for an invalid linkedin url", () => {
    expect(isLinkedInURL("https://in.linked.com/company/facebook")).toBe(false);
  });

  test("testing without http part for incorrect spelling", () => {
    expect(isLinkedInURL("www.linked.com/qualitysoftech")).toBe(false);
  });

  test("testing for valid linkedin without http", () => {
    expect(isLinkedInURL("www.linkedin.com")).toBe(true);
  });
});

describe("Testing isCompanyName", () => {
  test("testing for a alphabetical name", () => {
    expect(isCompanyName("Phleebs")).toBe(true);
  });

  test("testing for an alphanumeric one", () => {
    expect(isCompanyName("e24")).toBe(true);
  });

  test("testing for URL case", () => {
    expect(isCompanyName("e24.ai")).toBe(false);
  });

  test("testing for potential employee-size entry", () => {
    expect(isCompanyName("10-500")).toBe(false);
  });
});

describe("Testing isEmployeeSize", () => {
  test("testing for a alphabetical name", () => {
    expect(isEmployeeSize("10")).toBe(true);
  });

  test("testing for an alphanumeric one", () => {
    expect(isEmployeeSize("10-500")).toBe(true);
  });

  test("testing for URL case", () => {
    expect(isEmployeeSize("100+")).toBe(true);
  });

  test("testing for potential employee-size entry", () => {
    expect(isEmployeeSize("100k")).toBe(true);
  });

  test("testing for potential employee-size entry", () => {
    expect(isEmployeeSize("100k+")).toBe(true);
  });

  test("testing for potential employee-size entry", () => {
    expect(isEmployeeSize("100-100k")).toBe(false);
  });
});

describe("testing isEmail", () => {
  test("Testing for a valid email", () => {
    expect(isEmail("contact@mail.com")).toBe(true);
  });
  test("Testing for a valid email", () => {
    expect(isEmail("contact123@mail.com")).toBe(true);
  });
  // test("Testing NA", () => {
  //   expect(isEmail("NA")).toBe(true);
  // });//TODO: DO IT LATER
  test("Testing for an invalid email", () => {
    expect(isEmail("hey@phone@book.com")).toBe(false);
  });
});

describe("testing isLocation", async () => {
  test("Testing for a valid location", async () => {
    await expect(isLocation("New Delhi")).resolves.toBe(true);
  });
  test("Testing for a valid location", async () => {
    await expect(isLocation("Delhi")).resolves.toBe(true);
  });
  test("Testing for a valid location", async () => {
    await expect(isLocation("India")).resolves.toBe(true);
  });

  test("Test for invalid location", async () => {
    await expect(isLocation("USA")).resolves.toBe(true);
  });
});
