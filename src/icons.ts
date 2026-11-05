import { svg } from "lit";
import type { TemplateResult } from "lit";

export const upsDefaultImage: TemplateResult = svg`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
     style="width:200px;height:200px;display:block"
     role="img" aria-label="UPS">
  <defs>
    <linearGradient id="batt-fb" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="var(--nut-accent,#3ecf6e)" stop-opacity="1"/>
      <stop offset="1" stop-color="var(--nut-accent,#3ecf6e)" stop-opacity="0.55"/>
    </linearGradient>
    <filter id="glow-fb" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
  </defs>
  <rect x="0" y="0" width="512" height="512" rx="114" fill="#18191d"/>
  <rect x="3" y="3" width="506" height="506" rx="111" fill="none" stroke="#fff" stroke-opacity="0.06" stroke-width="2"/>
  <ellipse cx="268" cy="406" rx="112" ry="10" fill="#000" opacity="0.45"/>
  <g stroke="#e8eaed" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
    <polygon points="180,160 204,142 356,142 332,160" fill="#2a2d34"/>
    <polygon points="332,160 356,142 356,374 332,392" fill="#202227"/>
    <rect x="180" y="160" width="152" height="232" rx="6" fill="#1f2126"/>
    <line x1="341" y1="330" x2="347" y2="326" stroke-width="4" opacity="0.6"/>
    <line x1="341" y1="346" x2="347" y2="342" stroke-width="4" opacity="0.6"/>
    <line x1="341" y1="362" x2="347" y2="358" stroke-width="4" opacity="0.6"/>
  </g>
  <rect x="222" y="271" width="68" height="85" rx="6" fill="var(--nut-accent,#3ecf6e)" opacity="0.55" filter="url(#glow-fb)"/>
  <g stroke="#e8eaed" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" fill="none">
    <rect x="242" y="214" width="28" height="10" rx="3" fill="#e8eaed"/>
    <rect x="212" y="224" width="88" height="142" rx="12" fill="#17181c"/>
  </g>
  <rect x="222" y="271" width="68" height="85" rx="6" fill="url(#batt-fb)"/>
  <line x1="222" y1="310" x2="290" y2="310" stroke="#17181c" stroke-width="4"/>
  <circle cx="256" cy="188" r="7" fill="var(--nut-accent,#3ecf6e)"/>
  <g stroke="#e8eaed" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M180 352 C 150 352, 156 300, 138 300"/>
    <rect x="100" y="282" width="38" height="36" rx="9" fill="#1f2126"/>
    <line x1="100" y1="292" x2="82" y2="292"/>
    <line x1="100" y1="308" x2="82" y2="308"/>
  </g>
</svg>`;
