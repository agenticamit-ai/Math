import { describe, expect, it } from "vitest";
import { answersMatch, isCorrect } from "./answers";

describe("answersMatch", () => {
  it.each([
    ["3/4", "0.75"],
    ["6/8", "3/4"],
    [".75", "3/4"],
    ["2 1/2", "5/2"],
    ["2.5", "2 1/2"],
    ["-2 1/2", "-2.5"],
    ["1,000", "1000"],
    ["$12", "12"],
    ["25%", "25"],
    ["12 cm", "12"],
    ["45 degrees", "45"],
    [" 7 ", "7"],
    ["Tuesday", "tuesday"],
    ["the red one.", "red one"],
  ])("%s == %s", (a, b) => expect(answersMatch(a, b)).toBe(true));

  it.each([
    ["3/4", "4/3"],
    ["12", "13"],
    ["", "0"],
    ["1/0", "0"],
    ["monday", "tuesday"],
    ["2 1/2", "2.4"],
  ])("%s != %s", (a, b) => expect(answersMatch(a, b)).toBe(false));
});

describe("isCorrect", () => {
  it("checks multiple choice by letter", () => {
    expect(isCorrect("b", { style: "mc", answer: "B" })).toBe(true);
    expect(isCorrect("C", { style: "mc", answer: "B" })).toBe(false);
  });
  it("accepts alternates", () => {
    expect(isCorrect("twelve", { style: "short", answer: "12", acceptable: ["twelve"] })).toBe(true);
  });
});
