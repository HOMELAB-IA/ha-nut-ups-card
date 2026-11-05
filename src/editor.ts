import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { inferPrefix } from "./entities.js";
import type { CardConfig, Hass, HassDevice, SectionState } from "./types.js";

interface NutDevice {
  deviceId: string;
  name: string;
  prefix: string;
  areaName: string;
}

class NutUpsCardEditor extends LitElement {
  static styles = css`
    .form { display: flex; flex-direction: column; gap: 16px; padding: 16px; }
    .row { display: flex; flex-direction: column; gap: 4px; }
    label { font-size: 13px; color: var(--secondary-text-color, #a6abb3); }
    select, input[type="text"], input[type="number"], input[type="color"] {
      width: 100%;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #3a3d44);
      background: var(--card-background-color, #22242a);
      color: var(--primary-text-color, #e8eaed);
      font: inherit;
      font-size: 14px;
      box-sizing: border-box;
    }
    input[type="color"] { height: 38px; padding: 2px 6px; cursor: pointer; }
    .hint { font-size: 12px; color: var(--secondary-text-color, #a6abb3); margin-top: 2px; }
    .section-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
    h3 { font-size: 14px; font-weight: 600; margin: 8px 0 0; }
  `;

  @property({ attribute: false }) hass!: Hass;
  @property({ attribute: false }) _config!: CardConfig;
  @state() private _nutDevices: NutDevice[] = [];

  setConfig(config: CardConfig): void {
    this._config = { ...config };
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has("hass") && this.hass) {
      this._nutDevices = this._detectNutDevices();
    }
  }

  private _detectNutDevices(): NutDevice[] {
    const { devices, entities, areas } = this.hass;
    if (!devices || !entities) return [];

    const nutDeviceIds = new Set<string>();
    for (const entry of Object.values(entities)) {
      if (entry.platform === "nut" && entry.device_id) {
        nutDeviceIds.add(entry.device_id);
      }
    }

    return [...nutDeviceIds].map((deviceId) => {
      const device: HassDevice = devices[deviceId];
      const prefix = inferPrefix(entities, deviceId);
      const area = device?.area_id ? areas?.[device.area_id]?.name ?? "" : "";
      return {
        deviceId,
        name: device?.name ?? deviceId,
        prefix,
        areaName: area,
      };
    });
  }

  private _fire(config: Partial<CardConfig>): void {
    const merged: CardConfig = { ...this._config, ...config };
    this.dispatchEvent(
      new CustomEvent("config-changed", { bubbles: true, composed: true, detail: { config: merged } })
    );
  }

  private _onDeviceChange(e: Event): void {
    const deviceId = (e.target as HTMLSelectElement).value;
    if (!deviceId) return;
    const found = this._nutDevices.find((d) => d.deviceId === deviceId);
    if (!found) return;
    this._fire({
      prefix: found.prefix || this._config.prefix,
      name: this._config.name || found.name,
    });
  }

  private _onInput(key: keyof CardConfig) {
    return (e: Event) => {
      const val = (e.target as HTMLInputElement).value;
      this._fire({ [key]: val } as Partial<CardConfig>);
    };
  }

  private _onNumber(key: keyof CardConfig) {
    return (e: Event) => {
      const val = parseInt((e.target as HTMLInputElement).value, 10);
      if (!isNaN(val)) this._fire({ [key]: val } as Partial<CardConfig>);
    };
  }

  private _onSection(key: "input" | "battery" | "timers") {
    return (e: Event) => {
      const val = (e.target as HTMLSelectElement).value as SectionState;
      this._fire({ sections: { ...this._config.sections, [key]: val } });
    };
  }

  render() {
    if (!this.hass || !this._config) return html``;
    const c = this._config;
    const currentDeviceId =
      this._nutDevices.find((d) => d.prefix === c.prefix)?.deviceId ?? "";

    return html`
      <div class="form">

        ${this._nutDevices.length > 0 ? html`
          <div class="row">
            <label>Appareil NUT</label>
            <select @change="${this._onDeviceChange}" .value="${currentDeviceId}">
              <option value="">— sélectionner —</option>
              ${this._nutDevices.map((d) => html`
                <option value="${d.deviceId}" ?selected="${d.deviceId === currentDeviceId}">
                  ${d.name}${d.areaName ? ` (${d.areaName})` : ""}
                </option>
              `)}
            </select>
            <p class="hint">Sélectionner un appareil remplit automatiquement le préfixe.</p>
          </div>` : nothing}

        <div class="row">
          <label>Nom *</label>
          <input type="text" .value="${c.name ?? ""}" @input="${this._onInput("name")}" placeholder="APC HAOS" />
        </div>

        <div class="row">
          <label>Préfixe des entités *</label>
          <input type="text" .value="${c.prefix ?? ""}" @input="${this._onInput("prefix")}" placeholder="myups" />
          <p class="hint">Préfixe des entity_id NUT, ex. <code>myups</code> → sensor.myups_charge_de_la_batterie</p>
        </div>

        <div class="row">
          <label>Sous-titre (modèle)</label>
          <input type="text" .value="${c.model ?? ""}" @input="${this._onInput("model")}" placeholder="Back-UPS 900G2" />
        </div>

        <div class="row">
          <label>Image (URL)</label>
          <input type="text" .value="${c.image ?? ""}" @input="${this._onInput("image")}" placeholder="/local/apc-back-ups.png" />
        </div>

        <div class="row">
          <label>Couleur d'accent</label>
          <input type="color" .value="${c.accent ?? "#3ecf6e"}" @input="${this._onInput("accent")}" />
        </div>

        <div class="row">
          <label>Alerte charge (%) — repère rouge sur la barre</label>
          <input type="number" min="1" max="100" .value="${String(c.load_alert ?? 85)}" @input="${this._onNumber("load_alert")}" />
        </div>

        <h3>Sections</h3>

        <div class="section-row">
          <div class="row">
            <label>Entrée / Sortie</label>
            <select @change="${this._onSection("input")}" .value="${c.sections?.input ?? "open"}">
              <option value="open">Ouvert</option>
              <option value="collapsed">Replié</option>
              <option value="hidden">Masqué</option>
            </select>
          </div>
          <div class="row">
            <label>Batterie</label>
            <select @change="${this._onSection("battery")}" .value="${c.sections?.battery ?? "open"}">
              <option value="open">Ouvert</option>
              <option value="collapsed">Replié</option>
              <option value="hidden">Masqué</option>
            </select>
          </div>
          <div class="row">
            <label>Minuteries</label>
            <select @change="${this._onSection("timers")}" .value="${c.sections?.timers ?? "collapsed"}">
              <option value="open">Ouvert</option>
              <option value="collapsed">Replié</option>
              <option value="hidden">Masqué</option>
            </select>
          </div>
        </div>

      </div>
    `;
  }
}

customElements.define("nut-ups-card-editor", NutUpsCardEditor);
