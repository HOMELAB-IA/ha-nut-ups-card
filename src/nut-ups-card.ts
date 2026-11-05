import { LitElement, html, nothing, type TemplateResult } from "lit";
import "./editor.js";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { cardStyles } from "./styles.js";
import { getEntity, getVal, getNum, getEntityId } from "./entities.js";
import { parseNutStatus, formatRuntime, clamp, barPos } from "./nut-status.js";
import { upsDefaultImage } from "./icons.js";
import type { CardConfig, Hass, SectionState } from "./types.js";

const CARD_VERSION = "0.1.0";

interface SectionsState {
  input: boolean;
  battery: boolean;
  timers: boolean;
}

function sectionOpen(cfg: SectionState | undefined, def: SectionState): boolean {
  const v = cfg ?? def;
  return v === "open";
}

class NutUpsCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) hass!: Hass;
  @state() private _config!: CardConfig;
  @state() private _sections: SectionsState = { input: true, battery: true, timers: false };

  private _storageKey = "";

  setConfig(config: CardConfig): void {
    if (!config.name) throw new Error("nut-ups-card: 'name' est requis");
    if (!config.prefix && !config.entities) {
      throw new Error("nut-ups-card: 'prefix' ou 'entities' est requis");
    }
    this._config = config;
    this._storageKey = `nut-ups-card:${config.name}:${config.prefix ?? ""}`;
    this._sections = {
      input: sectionOpen(config.sections?.input, "open"),
      battery: sectionOpen(config.sections?.battery, "open"),
      timers: sectionOpen(config.sections?.timers, "collapsed"),
    };
    this._loadSections();
  }

  private _loadSections(): void {
    try {
      const raw = localStorage.getItem(this._storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<SectionsState>;
        this._sections = { ...this._sections, ...saved };
      }
    } catch {}
  }

  private _saveSections(): void {
    try {
      localStorage.setItem(this._storageKey, JSON.stringify(this._sections));
    } catch {}
  }

  private _toggle(key: keyof SectionsState): void {
    this._sections = { ...this._sections, [key]: !this._sections[key] };
    this._saveSections();
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("nut-ups-card-editor");
  }

  static getStubConfig(): Partial<CardConfig> {
    return {
      name: "Mon UPS",
      prefix: "myups",
      accent: "#3ecf6e",
      load_alert: 85,
      sections: { input: "open", battery: "open", timers: "collapsed" },
    };
  }

  getCardSize(): number {
    return 8;
  }

  private _fireMoreInfo(entityId: string): void {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId } })
    );
  }

  private _clickHandler(entityId: string) {
    return (e: Event) => {
      e.stopPropagation();
      this._fireMoreInfo(entityId);
    };
  }

  private _accent(): string {
    return this._config.accent ?? "#3ecf6e";
  }

  render(): TemplateResult {
    if (!this.hass || !this._config) return html``;
    const c = this._config;
    const h = this.hass;
    const accent = this._accent();

    // Status
    const statusVal = getVal(h, "status", c);
    const statusCode = getVal(h, "status_code", c);
    const nutStatus = parseNutStatus(statusCode, accent);

    // Runtime
    const runtimeSec = getNum(h, "battery_runtime", c);
    const runtimeStr = runtimeSec !== undefined ? formatRuntime(runtimeSec) : "—";

    // Model
    const model = c.model ?? getVal(h, "ups_type", c) ?? "";

    return html`
      <ha-card>
        <div class="card">
          ${this._renderHeader(nutStatus, statusCode, runtimeStr, model, accent)}
          ${this._renderBatteryCharge(accent)}
          ${this._renderLoad(accent)}
          ${this._renderInputOutput()}
          ${this._renderBatteryDetails()}
          ${this._renderTimers()}
        </div>
      </ha-card>
    `;
  }

  private _renderHeader(
    nutStatus: ReturnType<typeof parseNutStatus>,
    rawCode: string | undefined,
    runtimeStr: string,
    model: string,
    accent: string
  ): TemplateResult {
    const c = this._config;
    return html`
      <div class="header">
        ${c.image
          ? html`<img src="${c.image}" alt="Onduleur ${c.name}" />`
          : upsDefaultImage}
        <div class="header-info">
          <div class="pill" style=${styleMap({ background: nutStatus.color + "22" })}>
            <span
              class="pill-dot ${nutStatus.blink ? "blink" : ""}"
              style=${styleMap({ background: nutStatus.color })}
            ></span>
            <span>${nutStatus.label}</span>
            ${rawCode ? html`<span class="pill-code">${rawCode}</span>` : nothing}
          </div>
          <div>
            <div class="ups-name">${c.name}</div>
            ${model ? html`<div class="ups-model">${model}</div>` : nothing}
          </div>
          <div>
            <div class="runtime-label">Autonomie</div>
            <div
              class="runtime-value"
              style=${styleMap({ color: accent })}
              data-entity="${getEntityId("battery_runtime", c)}"
              @click="${this._clickHandler(getEntityId("battery_runtime", c))}"
            >${runtimeStr}</div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderBatteryCharge(accent: string): TemplateResult {
    const c = this._config;
    const h = this.hass;
    const pct = getNum(h, "battery_charge", c);
    const low = getNum(h, "battery_low_pct", c) ?? 10;
    const pctDisplay = pct !== undefined ? `${Math.round(pct)} %` : "—";

    return html`
      <div class="block">
        <div class="block-header">
          <div class="block-title-row">
            ${batteryIcon(accent)}
            <span class="block-title">Charge de la batterie</span>
          </div>
          <span
            class="block-value"
            data-entity="${getEntityId("battery_charge", c)}"
            @click="${this._clickHandler(getEntityId("battery_charge", c))}"
          >${pctDisplay}</span>
        </div>
        ${pct !== undefined
          ? html`
            <div class="bar-wrap">
              <div class="bar-track">
                <div
                  class="bar-fill"
                  style=${styleMap({
                    width: `${clamp(pct)}%`,
                    background: `linear-gradient(90deg, ${accent}66 0%, ${accent} 100%)`,
                  })}
                ></div>
                <div
                  class="bar-marker"
                  style=${styleMap({ left: `${low}%`, background: "#ff7a6b" })}
                ></div>
              </div>
              <div class="bar-legend">
                <span>0 %</span>
                <span>Seuil faible ${low} %</span>
                <span>100 %</span>
              </div>
            </div>`
          : nothing}
      </div>
    `;
  }

  private _renderLoad(accent: string): TemplateResult {
    const c = this._config;
    const h = this.hass;
    const loadPct = getNum(h, "load", c);
    const powerReal = getNum(h, "power_real", c);
    const powerNominal = getNum(h, "power_nominal", c);
    const loadAlert = c.load_alert ?? 85;

    const loadDisplay = loadPct !== undefined ? `${Math.round(loadPct)} %` : "—";
    let powerStr = "";
    if (powerReal !== undefined) {
      powerStr = `· ${Math.round(powerReal)} W`;
    } else if (loadPct !== undefined && powerNominal !== undefined) {
      powerStr = `· ≈ ${Math.round(loadPct * powerNominal / 100)} W`;
    }

    const nomLabel = powerNominal !== undefined
      ? `Nominale ${Math.round(powerNominal)} ${getEntity(h, "power_nominal", c)?.attributes?.unit_of_measurement ?? "W"}`
      : "";

    return html`
      <div class="block">
        <div class="block-header">
          <div class="block-title-row">
            ${loadIcon()}
            <span class="block-title">Charge (sortie)</span>
          </div>
          <span class="block-value">
            <span
              data-entity="${getEntityId("load", c)}"
              @click="${this._clickHandler(getEntityId("load", c))}"
            >${loadDisplay}</span>
            ${powerStr ? html`<span class="block-value-sub"> ${powerStr}</span>` : nothing}
          </span>
        </div>
        ${loadPct !== undefined
          ? html`
            <div class="bar-wrap">
              <div class="bar-track">
                <div
                  class="bar-fill"
                  style=${styleMap({
                    width: `${clamp(loadPct)}%`,
                    background: "linear-gradient(90deg, #2563c9 0%, #4aa3ff 100%)",
                  })}
                ></div>
                <div
                  class="bar-marker"
                  style=${styleMap({ left: `${loadAlert}%`, background: "#ff7a6b" })}
                ></div>
              </div>
              <div class="bar-legend">
                <span>0 %</span>
                <span>Alerte ${loadAlert} %</span>
                <span>${nomLabel}</span>
              </div>
            </div>`
          : nothing}
      </div>
    `;
  }

  private _renderInputOutput(): TemplateResult | typeof nothing {
    const c = this._config;
    const h = this.hass;
    const cfg = c.sections?.input;
    if (cfg === "hidden") return nothing;

    const inputV = getNum(h, "input_voltage", c);
    const outputV = getNum(h, "output_voltage", c);
    const voltage = inputV ?? outputV;
    const isInput = inputV !== undefined;
    const title = isInput ? "Entrée secteur" : "Sortie";
    const voltageEntityKey = isInput ? "input_voltage" : "output_voltage";

    if (voltage === undefined) return nothing;

    const transferLow = getNum(h, "transfer_low", c);
    const transferHigh = getNum(h, "transfer_high", c);
    const nomV = isInput
      ? (getNum(h, "input_voltage_nominal", c) ?? 230)
      : (getNum(h, "output_voltage_nominal", c) ?? getNum(h, "input_voltage_nominal", c) ?? 230);

    const hasBar = transferLow !== undefined && transferHigh !== undefined;
    const inPos = hasBar ? barPos(voltage, transferLow!, transferHigh!) : 0;
    const nomPos = hasBar ? barPos(nomV, transferLow!, transferHigh!) : 50;

    const footerKey = isInput ? "input_sensitivity" : "output_frequency_nominal";
    const footerLabel = isInput ? "Sensibilité d'entrée" : "Fréquence nominale";
    const footerEntity = getEntity(h, footerKey, c);
    const footerVal = footerEntity?.state;

    const open = this._sections.input;

    return html`
      <div class="block" style="gap:12px">
        <button
          type="button"
          class="toggle-btn"
          aria-expanded="${open}"
          aria-label="Afficher ou masquer ${title}"
          @click="${() => this._toggle("input")}"
        >
          <span class="block-title-row">
            ${lightningIcon()}
            <span class="block-title">${title}</span>
          </span>
          <span style="display:flex;align-items:center;gap:12px">
            <span
              class="block-value"
              data-entity="${getEntityId(voltageEntityKey, c)}"
              @click="${this._clickHandler(getEntityId(voltageEntityKey, c))}"
            >${Math.round(voltage)} V</span>
            ${chevronIcon(open)}
          </span>
        </button>
        ${open ? html`
          <div class="collapsible-content">
            ${hasBar ? html`
              <div class="bar-track" style="margin-top:4px">
                <div
                  class="bar-fill"
                  style=${styleMap({
                    width: `${inPos}%`,
                    background: "linear-gradient(90deg, #c9761a 0%, #f5b84a 100%)",
                  })}
                ></div>
                <div
                  class="bar-marker"
                  style=${styleMap({ left: `${nomPos}%`, background: "#e8eaed" })}
                ></div>
              </div>
              <div class="bar-legend">
                <span>Bascule basse ${transferLow} V</span>
                <span>Nominale ${nomV} V</span>
                <span>Bascule haute ${transferHigh} V</span>
              </div>` : nothing}
            ${footerVal ? html`
              <div class="footer-row">
                <span class="footer-label">${footerLabel}</span>
                <span
                  class="footer-value"
                  data-entity="${getEntityId(footerKey, c)}"
                  @click="${this._clickHandler(getEntityId(footerKey, c))}"
                >${footerVal}${footerEntity?.attributes?.unit_of_measurement ? " " + footerEntity.attributes.unit_of_measurement : ""}</span>
              </div>` : nothing}
          </div>` : nothing}
      </div>
    `;
  }

  private _renderBatteryDetails(): TemplateResult | typeof nothing {
    const c = this._config;
    const h = this.hass;
    const cfg = c.sections?.battery;
    if (cfg === "hidden") return nothing;

    const vBat = getNum(h, "battery_voltage", c);
    const vBatNom = getNum(h, "battery_voltage_nominal", c);
    const chemistry = getVal(h, "battery_chemistry", c);

    const headerVal = vBat !== undefined
      ? html`${vBat.toFixed(1)} V${vBatNom !== undefined ? html`<span class="block-value-sub"> / ${vBatNom} V nom.</span>` : nothing}`
      : (chemistry ?? "Batterie");

    const open = this._sections.battery;

    const runtimeLow = getNum(h, "battery_runtime_low", c);
    const mfrDate = getVal(h, "battery_mfr_date", c);
    const selfTest = getVal(h, "self_test", c);
    const beeper = getVal(h, "beeper", c);

    return html`
      <div class="block" style="gap:12px">
        <button
          type="button"
          class="toggle-btn"
          aria-expanded="${open}"
          aria-label="Afficher ou masquer Batterie"
          @click="${() => this._toggle("battery")}"
        >
          <span class="block-title-row">
            ${batteryDetailIcon()}
            <span class="block-title">Batterie</span>
          </span>
          <span style="display:flex;align-items:center;gap:12px">
            <span class="block-value">${headerVal}</span>
            ${chevronIcon(open)}
          </span>
        </button>
        ${open ? html`
          <div class="detail-grid separator">
            ${runtimeLow !== undefined ? html`
              <div class="detail-cell">
                <span class="detail-label">Autonomie batterie faible</span>
                <span
                  class="detail-value"
                  @click="${this._clickHandler(getEntityId("battery_runtime_low", c))}"
                >${formatRuntime(runtimeLow)}</span>
              </div>` : nothing}
            ${chemistry ? html`
              <div class="detail-cell">
                <span class="detail-label">Chimie</span>
                <span
                  class="detail-value"
                  @click="${this._clickHandler(getEntityId("battery_chemistry", c))}"
                >${chemistry}</span>
              </div>` : nothing}
            ${mfrDate ? html`
              <div class="detail-cell">
                <span class="detail-label">Fabriquée le</span>
                <span
                  class="detail-value"
                  @click="${this._clickHandler(getEntityId("battery_mfr_date", c))}"
                >${mfrDate}</span>
              </div>` : nothing}
            ${selfTest ? html`
              <div class="detail-cell">
                <span class="detail-label">Résultat de l'autotest</span>
                <span
                  class="detail-value"
                  @click="${this._clickHandler(getEntityId("self_test", c))}"
                >${selfTest}</span>
              </div>` : nothing}
            ${beeper ? html`
              <div class="detail-cell">
                <span class="detail-label">Signal sonore</span>
                <span
                  class="detail-value"
                  @click="${this._clickHandler(getEntityId("beeper", c))}"
                >${beeper}</span>
              </div>` : nothing}
          </div>` : nothing}
      </div>
    `;
  }

  private _renderTimers(): TemplateResult | typeof nothing {
    const c = this._config;
    const h = this.hass;
    const cfg = c.sections?.timers;
    if (cfg === "hidden") return nothing;

    const shutdownDelay = getVal(h, "shutdown_delay", c);
    const restartDelay = getVal(h, "restart_delay", c);
    const loadOff = getVal(h, "load_off_timer", c);
    const loadOn = getVal(h, "load_on_timer", c);
    const loadRestart = getVal(h, "load_restart_timer", c);
    const outlet1 = getVal(h, "outlet_1_desc", c);

    const hasAny =
      shutdownDelay ?? restartDelay ?? loadOff ?? loadOn ?? loadRestart ?? outlet1;
    if (!hasAny) return nothing;

    const title = outlet1 ? "Prises & minuteries" : "Minuteries";
    const open = this._sections.timers;

    const fmtTimer = (v: string | undefined) =>
      v === undefined ? "—" : v === "-1" ? "inactive" : `${v} s`;

    return html`
      <div class="block" style="gap:12px">
        <button
          type="button"
          class="toggle-btn"
          aria-expanded="${open}"
          aria-label="Afficher ou masquer ${title}"
          @click="${() => this._toggle("timers")}"
        >
          <span class="block-title-row">
            ${timerIcon()}
            <span class="block-title">${title}</span>
          </span>
          ${chevronIcon(open)}
        </button>
        ${open ? html`
          <div class="detail-grid separator">
            ${outlet1 ? html`
              <div class="detail-cell full-width">
                <span class="detail-label">Prise PowerShare</span>
                <span
                  class="detail-value"
                  @click="${this._clickHandler(getEntityId("outlet_1_desc", c))}"
                >${outlet1}</span>
              </div>` : nothing}
            ${shutdownDelay !== undefined ? html`
              <div class="detail-cell full-width">
                <span class="detail-label">Délai d'arrêt onduleur</span>
                <span
                  class="detail-value"
                  @click="${this._clickHandler(getEntityId("shutdown_delay", c))}"
                >${fmtTimer(shutdownDelay)}</span>
              </div>` : nothing}
            ${restartDelay !== undefined ? html`
              <div class="detail-cell">
                <span class="detail-label">Délai de redémarrage</span>
                <span
                  class="detail-value"
                  @click="${this._clickHandler(getEntityId("restart_delay", c))}"
                >${fmtTimer(restartDelay)}</span>
              </div>` : nothing}
            ${loadOff !== undefined ? html`
              <div class="detail-cell">
                <span class="detail-label">Minuterie arrêt charge</span>
                <span
                  class="detail-value"
                  @click="${this._clickHandler(getEntityId("load_off_timer", c))}"
                >${fmtTimer(loadOff)}</span>
              </div>` : nothing}
            ${loadOn !== undefined ? html`
              <div class="detail-cell">
                <span class="detail-label">Minuterie démarrage charge</span>
                <span
                  class="detail-value"
                  @click="${this._clickHandler(getEntityId("load_on_timer", c))}"
                >${fmtTimer(loadOn)}</span>
              </div>` : nothing}
            ${loadRestart !== undefined ? html`
              <div class="detail-cell">
                <span class="detail-label">Minuterie redémarrage charge</span>
                <span
                  class="detail-value"
                  @click="${this._clickHandler(getEntityId("load_restart_timer", c))}"
                >${fmtTimer(loadRestart)}</span>
              </div>` : nothing}
          </div>` : nothing}
      </div>
    `;
  }
}

// ── SVG icons ────────────────────────────────────────────────────────────────

function batteryIcon(accent: string): TemplateResult {
  return html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="16" height="10" rx="2"></rect><path d="M21 11v2M6 10v4M9 10v4M12 10v4"></path></svg>`;
}

function loadIcon(): TemplateResult {
  return html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4aa3ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22v-5M9 8V2M15 8V2M18 8v4a6 6 0 0 1-12 0V8z"></path></svg>`;
}

function lightningIcon(): TemplateResult {
  return html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5b84a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"></path></svg>`;
}

function batteryDetailIcon(): TemplateResult {
  return html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a6abb3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="16" height="10" rx="2"></rect><path d="M21 11v2M7 12h4M9 10v4"></path></svg>`;
}

function timerIcon(): TemplateResult {
  return html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c4a5ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="13" r="8"></circle><path d="M12 9v4l2 2M9 2h6"></path></svg>`;
}

function chevronIcon(open: boolean): TemplateResult {
  return html`<svg class="chevron ${open ? "open" : ""}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a6abb3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>`;
}

// ── Registration ─────────────────────────────────────────────────────────────

customElements.define("nut-ups-card", NutUpsCard);

type WindowWithCards = typeof window & {
  customCards?: Array<{ type: string; name: string; description: string; preview?: boolean }>;
};

const _w = window as WindowWithCards;
_w.customCards = _w.customCards ?? [];
_w.customCards.push({
  type: "nut-ups-card",
  name: "NUT UPS Card",
  description: "Carte Lovelace pour onduleurs remontés par l'intégration NUT",
  preview: true,
});

console.info(`%c NUT UPS Card %c v${CARD_VERSION} `, "color:#3ecf6e;font-weight:bold", "color:#a6abb3");
