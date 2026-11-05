import { css } from "lit";

export const cardStyles = css`
  :host {
    --nut-accent: #3ecf6e;
    --nut-card-bg: var(--ha-card-background, #22242a);
    --nut-block-bg: #2b2e35;
    --nut-block-bg2: #212328;
    --nut-text: var(--primary-text-color, #e8eaed);
    --nut-text-secondary: var(--secondary-text-color, #a6abb3);
    --nut-track: var(--divider-color, #3a3d44);
    --nut-border: #2a2c31;
    --nut-separator: #33363c;
  }

  .card {
    background: linear-gradient(180deg, #22242a 0%, #18191d 100%);
    background: var(--nut-card-bg);
    border-radius: 16px;
    border: 1px solid var(--nut-border);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-family: inherit;
    color: var(--nut-text);
  }

  /* ── Header ─────────────────────────────────────── */
  .header {
    display: grid;
    grid-template-columns: 210px 1fr;
    align-items: center;
    gap: 16px;
  }

  .header img {
    width: 210px;
    height: 200px;
    object-fit: contain;
  }

  .header-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    text-align: right;
  }

  .pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid #3a3d44;
    color: var(--nut-text);
    font-size: 14px;
    font-weight: 500;
  }

  .pill-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .pill-dot.blink {
    animation: blink 1.4s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pill-dot.blink { animation: none; }
  }

  .pill-code {
    color: var(--nut-text-secondary);
    font-family: ui-monospace, monospace;
    font-size: 12px;
  }

  .ups-name {
    font-size: 30px;
    font-weight: 700;
    line-height: 1.1;
  }

  .ups-model {
    font-size: 14px;
    color: var(--nut-text-secondary);
  }

  .runtime-label {
    font-size: 12px;
    color: var(--nut-text-secondary);
  }

  .runtime-value {
    font-size: 26px;
    font-weight: 700;
  }

  /* ── Blocks ──────────────────────────────────────── */
  .block {
    background: linear-gradient(160deg, var(--nut-block-bg) 0%, var(--nut-block-bg2) 100%);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .block-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .block-title-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .block-title {
    font-size: 15px;
    font-weight: 500;
  }

  .block-value {
    font-size: 22px;
    font-weight: 700;
  }

  .block-value-sub {
    font-size: 13px;
    font-weight: 400;
    color: var(--nut-text-secondary);
  }

  /* ── Progress bar ────────────────────────────────── */
  .bar-wrap {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .bar-track {
    position: relative;
    height: 10px;
    border-radius: 5px;
    background: var(--nut-track);
    overflow: visible;
  }

  .bar-fill {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    border-radius: 5px;
  }

  .bar-marker {
    position: absolute;
    top: -4px;
    width: 2px;
    height: 18px;
  }

  .bar-legend {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: var(--nut-text-secondary);
  }

  /* ── Collapsible ─────────────────────────────────── */
  .toggle-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 44px;
    margin: -8px 0;
    padding: 0;
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    cursor: pointer;
    text-align: left;
  }

  .chevron {
    transition: transform 0.2s;
  }

  .chevron.open {
    transform: rotate(180deg);
  }

  .collapsible-content {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .separator {
    border-top: 1px solid var(--nut-separator);
    padding-top: 12px;
  }

  /* ── Grid de détails ─────────────────────────────── */
  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 16px;
    font-size: 13px;
  }

  .detail-cell {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .detail-label {
    color: var(--nut-text-secondary);
  }

  .detail-value {
    font-weight: 500;
    cursor: pointer;
  }

  .detail-value:hover {
    text-decoration: underline;
  }

  .full-width {
    grid-column: 1 / -1;
  }

  /* ── Footer line ─────────────────────────────────── */
  .footer-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    border-top: 1px solid var(--nut-separator);
    padding-top: 12px;
  }

  .footer-label {
    color: var(--nut-text-secondary);
  }

  .footer-value {
    font-weight: 500;
    cursor: pointer;
  }

  .footer-value:hover {
    text-decoration: underline;
  }

  /* ── Clickable value ─────────────────────────────── */
  [data-entity] {
    cursor: pointer;
  }

  [data-entity]:hover {
    opacity: 0.8;
  }
`;
