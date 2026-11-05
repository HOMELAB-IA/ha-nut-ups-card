import type { EntityKey, HassEntity, Hass, CardConfig } from "./types.js";

const DEFAULT_SUFFIXES: Record<EntityKey, string | string[]> = {
  status: "etat",
  status_code: "code_d_etat",
  ups_type: "type_d_ups",
  battery_charge: "charge_de_la_batterie",
  battery_low_pct: "consigne_de_batterie_faible",
  battery_runtime: "autonomie_de_la_batterie",
  battery_runtime_low: "autonomie_de_la_batterie_faible",
  battery_voltage: "tension_de_la_batterie",
  battery_voltage_nominal: "tension_nominale_de_la_batterie",
  battery_chemistry: "chimie_de_la_batterie",
  battery_mfr_date: "date_de_fabrication_de_la_batterie",
  self_test: "resultat_de_l_autotest",
  beeper: "etat_du_signal_sonore",
  load: "charge",
  power_real: "puissance_reelle_actuelle",
  power_nominal: ["puissance_reelle_nominale", "puissance_nominale"],
  input_voltage: "tension_d_entree",
  input_voltage_nominal: "tension_d_entree_nominale",
  input_sensitivity: "sensibilite_de_la_puissance_d_entree",
  transfer_low: "transfert_tension_basse",
  transfer_high: "transfert_tension_haute",
  output_voltage: "tension_de_sortie",
  output_voltage_nominal: "tension_de_sortie_nominale",
  output_frequency_nominal: "frequence_de_sortie_nominale",
  shutdown_delay: "delai_d_arret_de_l_onduleur",
  restart_delay: "charger_le_delai_de_redemarrage",
  load_off_timer: "minuterie_d_arret_de_la_charge",
  load_on_timer: "minuterie_de_demarrage_de_la_charge",
  load_restart_timer: "minuterie_de_redemarrage_de_la_charge",
  outlet_1_desc: "description_de_la_prise_powershare_outlet_1",
};

export function resolveEntityId(
  key: EntityKey,
  prefix: string,
  overrides?: Record<string, string>
): string | string[] {
  if (overrides?.[key]) return overrides[key];
  const suffix = DEFAULT_SUFFIXES[key];
  if (Array.isArray(suffix)) {
    return suffix.map((s) => `sensor.${prefix}_${s}`);
  }
  return `sensor.${prefix}_${suffix}`;
}

export function getEntity(
  hass: Hass,
  key: EntityKey,
  config: CardConfig
): HassEntity | undefined {
  const prefix = config.prefix ?? "";
  const ids = resolveEntityId(key, prefix, config.entities);
  if (Array.isArray(ids)) {
    for (const id of ids) {
      const e = hass.states[id];
      if (e && e.state !== "unavailable" && e.state !== "unknown") return e;
    }
    // return first even if unavailable so callers can decide
    const first = hass.states[ids[0]];
    return first;
  }
  return hass.states[ids];
}

export function getEntityId(key: EntityKey, config: CardConfig): string {
  const prefix = config.prefix ?? "";
  const ids = resolveEntityId(key, prefix, config.entities);
  return Array.isArray(ids) ? ids[0] : ids;
}

export function getVal(
  hass: Hass,
  key: EntityKey,
  config: CardConfig
): string | undefined {
  const e = getEntity(hass, key, config);
  if (!e) return undefined;
  if (e.state === "unavailable" || e.state === "unknown") return undefined;
  return e.state;
}

export function getNum(
  hass: Hass,
  key: EntityKey,
  config: CardConfig
): number | undefined {
  const v = getVal(hass, key, config);
  if (v === undefined) return undefined;
  const n = parseFloat(v);
  return isNaN(n) ? undefined : n;
}

export function inferPrefix(
  entityEntries: Record<string, { entity_id: string; device_id: string | null; platform: string }>,
  deviceId: string
): string {
  const marker = "_charge_de_la_batterie";
  for (const entry of Object.values(entityEntries)) {
    if (entry.device_id === deviceId && entry.entity_id.endsWith(marker)) {
      return entry.entity_id.slice("sensor.".length, -marker.length);
    }
  }
  return "";
}
