import { describe, it, expect } from "vitest";
import { parseNutStatus, formatRuntime, parseRuntimeState, barPos, clamp } from "../src/nut-status.js";

const ACCENT = "#3ecf6e";

describe("parseNutStatus", () => {
  it("OL → En ligne, accent color", () => {
    const s = parseNutStatus("OL", ACCENT);
    expect(s.label).toBe("En ligne");
    expect(s.color).toBe(ACCENT);
    expect(s.blink).toBe(false);
  });

  it("OL CHRG → En ligne · charge", () => {
    const s = parseNutStatus("OL CHRG", ACCENT);
    expect(s.label).toBe("En ligne · charge");
    expect(s.blink).toBe(false);
  });

  it("OB → Sur batterie, blinking", () => {
    const s = parseNutStatus("OB", ACCENT);
    expect(s.label).toBe("Sur batterie");
    expect(s.color).toBe("#f5b84a");
    expect(s.blink).toBe(true);
  });

  it("LB → Batterie faible, red, blinking", () => {
    const s = parseNutStatus("OB LB", ACCENT);
    expect(s.label).toBe("Batterie faible");
    expect(s.color).toBe("#ff6b5b");
    expect(s.blink).toBe(true);
  });

  it("RB → Batterie à remplacer, no blink", () => {
    const s = parseNutStatus("RB", ACCENT);
    expect(s.color).toBe("#ff6b5b");
    expect(s.blink).toBe(false);
  });

  it("unavailable → Indisponible, grey", () => {
    const s = parseNutStatus("unavailable", ACCENT);
    expect(s.label).toBe("Indisponible");
    expect(s.color).toBe("#a6abb3");
  });

  it("undefined → Indisponible", () => {
    const s = parseNutStatus(undefined, ACCENT);
    expect(s.label).toBe("Indisponible");
  });
});

describe("formatRuntime", () => {
  it("seconds to minutes", () => expect(formatRuntime(2520)).toBe("42 min"));
  it("seconds to hours + minutes", () => expect(formatRuntime(3661)).toBe("1 h 01"));
  it("0 → 0 min", () => expect(formatRuntime(0)).toBe("0 min"));
  it("negative → —", () => expect(formatRuntime(-1)).toBe("—"));
  it("undefined → —", () => expect(formatRuntime(undefined)).toBe("—"));
});

describe("parseRuntimeState", () => {
  it("parses '47min 40s' → 2860 s", () => expect(parseRuntimeState("47min 40s", "min")).toBe(2860));
  it("parses '1h 02min' → 3720 s", () => expect(parseRuntimeState("1h 02min", undefined)).toBe(3720));
  it("parses plain number with unit=min → seconds", () => expect(parseRuntimeState("90", "min")).toBe(5400));
  it("parses plain number with unit=s → seconds", () => expect(parseRuntimeState("120", "s")).toBe(120));
  it("unavailable → undefined", () => expect(parseRuntimeState("unavailable", "min")).toBeUndefined());
  it("unknown → undefined", () => expect(parseRuntimeState("unknown", undefined)).toBeUndefined());
  it("undefined state → undefined", () => expect(parseRuntimeState(undefined, "min")).toBeUndefined());
  it("non-numeric string → undefined", () => expect(parseRuntimeState("N/A", undefined)).toBeUndefined());
});

describe("barPos", () => {
  it("maps value within range", () => expect(barPos(230, 170, 280)).toBeCloseTo(54.5, 0));
  it("clamps below low", () => expect(barPos(100, 170, 280)).toBe(0));
  it("clamps above high", () => expect(barPos(300, 170, 280)).toBe(100));
});

describe("clamp", () => {
  it("clamps to 0-100", () => {
    expect(clamp(-5)).toBe(0);
    expect(clamp(105)).toBe(100);
    expect(clamp(50)).toBe(50);
  });
});
