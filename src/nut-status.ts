export interface NutStatus {
  label: string;
  color: string;
  blink: boolean;
}

const LABEL_MAP: Record<string, string> = {
  OL: "En ligne",
  OB: "Sur batterie",
  LB: "Batterie faible",
  RB: "Batterie à remplacer",
  CHRG: "En charge",
  BYPASS: "Bypass",
  OVER: "Surcharge",
  TRIM: "Réduction tension",
  BOOST: "Augmentation tension",
  FSD: "Arrêt forcé",
  OFF: "Éteint",
};

export function parseNutStatus(rawCode: string | undefined, accent: string): NutStatus {
  if (!rawCode || rawCode === "unavailable" || rawCode === "unknown") {
    return { label: "Indisponible", color: "#a6abb3", blink: false };
  }

  const flags = rawCode.trim().toUpperCase().split(/\s+/);

  if (flags.includes("LB")) {
    return { label: "Batterie faible", color: "#ff6b5b", blink: true };
  }
  if (flags.includes("RB")) {
    return { label: "Batterie à remplacer", color: "#ff6b5b", blink: false };
  }
  if (flags.includes("OB")) {
    return { label: "Sur batterie", color: "#f5b84a", blink: true };
  }
  if (flags.includes("BYPASS")) {
    return { label: "Bypass", color: "#f5b84a", blink: false };
  }
  if (flags.includes("OVER")) {
    return { label: "Surcharge", color: "#f5b84a", blink: false };
  }
  if (flags.includes("TRIM")) {
    return { label: "Réduction tension", color: "#f5b84a", blink: false };
  }
  if (flags.includes("BOOST")) {
    return { label: "Augmentation tension", color: "#f5b84a", blink: false };
  }
  if (flags.includes("OL") && flags.includes("CHRG")) {
    return { label: "En ligne · charge", color: accent, blink: false };
  }
  if (flags.includes("OL")) {
    return { label: "En ligne", color: accent, blink: false };
  }

  const known = flags.map((f) => LABEL_MAP[f]).filter(Boolean);
  return {
    label: known.length ? known.join(" · ") : rawCode,
    color: "#a6abb3",
    blink: false,
  };
}

export function formatRuntime(seconds: number | undefined): string {
  if (seconds === undefined || isNaN(seconds)) return "—";
  if (seconds < 0) return "—";
  if (seconds >= 3600) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h} h ${String(m).padStart(2, "0")}`;
  }
  return `${Math.floor(seconds / 60)} min`;
}

export function clamp(v: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, v));
}

export function barPos(value: number, low: number, high: number): number {
  if (high <= low) return 0;
  return clamp(((value - low) / (high - low)) * 100);
}
