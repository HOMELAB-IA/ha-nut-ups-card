import { describe, it, expect } from "vitest";
import { resolveEntityId, inferPrefix } from "../src/entities.js";
import type { CardConfig } from "../src/types.js";

const baseConfig = (prefix: string, overrides?: Record<string, string>): CardConfig => ({
  type: "custom:nut-ups-card",
  name: "Test",
  prefix,
  entities: overrides,
});

describe("resolveEntityId", () => {
  it("resolves battery_charge with prefix", () => {
    const id = resolveEntityId("battery_charge", "myups");
    expect(id).toBe("sensor.myups_charge_de_la_batterie");
  });

  it("resolves power_nominal as array", () => {
    const ids = resolveEntityId("power_nominal", "myups");
    expect(Array.isArray(ids)).toBe(true);
    expect((ids as string[])[0]).toBe("sensor.myups_puissance_reelle_nominale");
    expect((ids as string[])[1]).toBe("sensor.myups_puissance_nominale");
  });

  it("honours override", () => {
    const id = resolveEntityId("battery_charge", "myups", { battery_charge: "sensor.custom_bat" });
    expect(id).toBe("sensor.custom_bat");
  });
});

describe("inferPrefix", () => {
  it("extracts prefix from battery charge entity", () => {
    const entries = {
      e1: { entity_id: "sensor.myups_charge_de_la_batterie", device_id: "dev1", platform: "nut", area_id: null },
    };
    expect(inferPrefix(entries, "dev1")).toBe("myups");
  });

  it("returns empty string when no matching entity", () => {
    expect(inferPrefix({}, "dev1")).toBe("");
  });

  it("ignores entities from other devices", () => {
    const entries = {
      e1: { entity_id: "sensor.eatonups_charge_de_la_batterie", device_id: "dev2", platform: "nut", area_id: null },
    };
    expect(inferPrefix(entries, "dev1")).toBe("");
  });
});
