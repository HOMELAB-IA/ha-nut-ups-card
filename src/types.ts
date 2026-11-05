export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
}

export interface Hass {
  states: Record<string, HassEntity>;
  devices: Record<string, HassDevice>;
  entities: Record<string, HassEntityRegistryEntry>;
  areas: Record<string, HassArea>;
  callService(domain: string, service: string, data?: Record<string, any>): void;
  fireEvent(node: Element, type: string, detail?: Record<string, any>): void;
}

export interface HassDevice {
  id: string;
  name: string;
  area_id: string | null;
  config_entries: string[];
}

export interface HassEntityRegistryEntry {
  entity_id: string;
  device_id: string | null;
  platform: string;
  area_id: string | null;
}

export interface HassArea {
  area_id: string;
  name: string;
}

export type SectionState = "open" | "collapsed" | "hidden";

export interface CardConfig {
  type: string;
  name: string;
  model?: string;
  image?: string;
  prefix?: string;
  accent?: string;
  load_alert?: number;
  sections?: {
    input?: SectionState;
    battery?: SectionState;
    timers?: SectionState;
  };
  entities?: Record<string, string>;
}

export type EntityKey =
  | "status"
  | "status_code"
  | "ups_type"
  | "battery_charge"
  | "battery_low_pct"
  | "battery_runtime"
  | "battery_runtime_low"
  | "battery_voltage"
  | "battery_voltage_nominal"
  | "battery_chemistry"
  | "battery_mfr_date"
  | "self_test"
  | "beeper"
  | "load"
  | "power_real"
  | "power_nominal"
  | "input_voltage"
  | "input_voltage_nominal"
  | "input_sensitivity"
  | "transfer_low"
  | "transfer_high"
  | "output_voltage"
  | "output_voltage_nominal"
  | "output_frequency_nominal"
  | "shutdown_delay"
  | "restart_delay"
  | "load_off_timer"
  | "load_on_timer"
  | "load_restart_timer"
  | "outlet_1_desc";
