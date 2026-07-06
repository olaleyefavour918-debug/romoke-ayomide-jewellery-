// Self-contained SVG illustrations matching the Romoke Ayomide Jewellery catalogue.
// Each illustration is a data URL so no external image hosting is required.

const svgDataUrl = (svg: string) =>
  `data:image/svg+xml,${encodeURIComponent(svg.replace(/\s+/g, ' ').trim())}`;

const bg = (inner: string, label: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F8F6F2"/>
      <stop offset="100%" stop-color="#EDE8DF"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.45" r="0.5">
      <stop offset="0%" stop-color="#F0E0A8" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#F0E0A8" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <rect width="400" height="400" fill="url(#glow)"/>
  ${inner}
  <text x="200" y="375" font-family="Poppins, sans-serif" font-size="13" fill="#0D0D0D" opacity="0.35" text-anchor="middle" font-weight="500">${label}</text>
</svg>`;

// 1. O2 Necklaces (dozen pack) — multiple gold chains
const o2Necklaces = svgDataUrl(bg(`
  <g stroke="#D4AF37" fill="none" stroke-linecap="round">
    <path d="M 200 80 Q 120 200 200 320" stroke-width="3"/>
    <path d="M 200 80 Q 140 200 200 320" stroke-width="2.5" opacity="0.8"/>
    <path d="M 200 80 Q 160 200 200 320" stroke-width="2" opacity="0.6"/>
    <path d="M 200 80 Q 180 200 200 320" stroke-width="2" opacity="0.5"/>
  </g>
  <circle cx="200" cy="80" r="6" fill="#D4AF37"/>
  <circle cx="200" cy="320" r="6" fill="#D4AF37"/>
  <g fill="#D4AF37">
    <circle cx="200" cy="200" r="8"/>
    <circle cx="200" cy="200" r="4" fill="#F8F6F2"/>
  </g>
  <text x="200" y="345" font-family="Poppins, sans-serif" font-size="11" fill="#D4AF37" text-anchor="middle" font-weight="600">12 PCS</text>
`, 'O2 Necklaces'));

// 2. Waist Chain — horizontal draped chain
const waistChain = svgDataUrl(bg(`
  <g stroke="#D4AF37" fill="none" stroke-linecap="round">
    <path d="M 60 200 Q 200 140 340 200" stroke-width="3"/>
    <path d="M 60 210 Q 200 155 340 210" stroke-width="2.5" opacity="0.8"/>
    <path d="M 60 220 Q 200 170 340 220" stroke-width="2" opacity="0.6"/>
  </g>
  <g fill="#D4AF37">
    <circle cx="120" cy="178" r="4"/>
    <circle cx="160" cy="165" r="4"/>
    <circle cx="200" cy="158" r="5"/>
    <circle cx="240" cy="165" r="4"/>
    <circle cx="280" cy="178" r="4"/>
  </g>
  <circle cx="60" cy="200" r="6" fill="#D4AF37"/>
  <circle cx="340" cy="200" r="6" fill="#D4AF37"/>
`, 'Waist Chain'));

// 3. Magnet Stud (ears & nose) — small studs
const magnetStud = svgDataUrl(bg(`
  <g fill="#D4AF37">
    <circle cx="140" cy="160" r="14"/>
    <circle cx="140" cy="160" r="6" fill="#F8F6F2"/>
    <circle cx="260" cy="160" r="14"/>
    <circle cx="260" cy="160" r="6" fill="#F8F6F2"/>
    <circle cx="200" cy="240" r="10"/>
    <circle cx="200" cy="240" r="4" fill="#F8F6F2"/>
  </g>
  <g stroke="#D4AF37" fill="none" stroke-width="1.5" opacity="0.5">
    <circle cx="140" cy="160" r="22"/>
    <circle cx="260" cy="160" r="22"/>
    <circle cx="200" cy="240" r="18"/>
  </g>
  <text x="200" y="300" font-family="Poppins, sans-serif" font-size="12" fill="#D4AF37" text-anchor="middle" font-weight="600">Ears &amp; Nose</text>
`, 'Magnet Stud'));

// 4. Fake Piercing Sticker (pack) — sheet of dots
const piercingSticker = svgDataUrl(bg(`
  <rect x="100" y="80" width="200" height="240" rx="12" fill="#FFFFFF" stroke="#D4AF37" stroke-width="2"/>
  <g fill="#D4AF37">
    <circle cx="130" cy="110" r="5"/><circle cx="160" cy="110" r="5"/><circle cx="190" cy="110" r="5"/><circle cx="220" cy="110" r="5"/><circle cx="250" cy="110" r="5"/><circle cx="270" cy="110" r="5"/>
    <circle cx="130" cy="140" r="5"/><circle cx="160" cy="140" r="5"/><circle cx="190" cy="140" r="5"/><circle cx="220" cy="140" r="5"/><circle cx="250" cy="140" r="5"/><circle cx="270" cy="140" r="5"/>
    <circle cx="130" cy="170" r="5"/><circle cx="160" cy="170" r="5"/><circle cx="190" cy="170" r="5"/><circle cx="220" cy="170" r="5"/><circle cx="250" cy="170" r="5"/><circle cx="270" cy="170" r="5"/>
    <circle cx="130" cy="200" r="5"/><circle cx="160" cy="200" r="5"/><circle cx="190" cy="200" r="5"/><circle cx="220" cy="200" r="5"/><circle cx="250" cy="200" r="5"/><circle cx="270" cy="200" r="5"/>
    <circle cx="130" cy="230" r="5"/><circle cx="160" cy="230" r="5"/><circle cx="190" cy="230" r="5"/><circle cx="220" cy="230" r="5"/><circle cx="250" cy="230" r="5"/><circle cx="270" cy="230" r="5"/>
    <circle cx="130" cy="260" r="5"/><circle cx="160" cy="260" r="5"/><circle cx="190" cy="260" r="5"/><circle cx="220" cy="260" r="5"/><circle cx="250" cy="260" r="5"/><circle cx="270" cy="260" r="5"/>
    <circle cx="130" cy="290" r="5"/><circle cx="160" cy="290" r="5"/><circle cx="190" cy="290" r="5"/><circle cx="220" cy="290" r="5"/><circle cx="250" cy="290" r="5"/><circle cx="270" cy="290" r="5"/>
  </g>
  <text x="200" y="345" font-family="Poppins, sans-serif" font-size="11" fill="#D4AF37" text-anchor="middle" font-weight="600">84 PCS</text>
`, 'Piercing Stickers'));

// 5. 3pcs VCA Bracelet — three bracelets
const vcaBracelet = svgDataUrl(bg(`
  <g stroke="#D4AF37" fill="none">
    <ellipse cx="200" cy="130" rx="80" ry="28" stroke-width="3"/>
    <ellipse cx="200" cy="200" rx="80" ry="28" stroke-width="3"/>
    <ellipse cx="200" cy="270" rx="80" ry="28" stroke-width="3"/>
  </g>
  <g fill="#D4AF37">
    <rect x="190" y="118" width="20" height="24" rx="3"/>
    <rect x="190" y="188" width="20" height="24" rx="3"/>
    <rect x="190" y="258" width="20" height="24" rx="3"/>
  </g>
  <g fill="#F8F6F2">
    <circle cx="200" cy="130" r="3"/>
    <circle cx="200" cy="200" r="3"/>
    <circle cx="200" cy="270" r="3"/>
  </g>
  <text x="200" y="345" font-family="Poppins, sans-serif" font-size="11" fill="#D4AF37" text-anchor="middle" font-weight="600">3 PCS</text>
`, 'VCA Bracelet'));

// 6. Hello Kitty (XL) Necklace — pendant with bow
const helloKitty = svgDataUrl(bg(`
  <g stroke="#D4AF37" fill="none" stroke-linecap="round">
    <path d="M 200 80 Q 130 180 200 280" stroke-width="3"/>
  </g>
  <circle cx="200" cy="80" r="6" fill="#D4AF37"/>
  <!-- Hello Kitty style head -->
  <ellipse cx="200" cy="200" rx="45" ry="40" fill="#FFFFFF" stroke="#0D0D0D" stroke-width="2"/>
  <!-- Ears -->
  <polygon points="165,170 155,140 180,165" fill="#FFFFFF" stroke="#0D0D0D" stroke-width="2"/>
  <polygon points="235,170 245,140 220,165" fill="#FFFFFF" stroke="#0D0D0D" stroke-width="2"/>
  <!-- Bow -->
  <g fill="#D4AF37">
    <ellipse cx="175" cy="175" rx="10" ry="7" transform="rotate(-20 175 175)"/>
    <ellipse cx="225" cy="175" rx="10" ry="7" transform="rotate(20 225 175)"/>
    <circle cx="200" cy="175" r="5"/>
  </g>
  <!-- Eyes -->
  <ellipse cx="185" cy="200" rx="4" ry="6" fill="#0D0D0D"/>
  <ellipse cx="215" cy="200" rx="4" ry="6" fill="#0D0D0D"/>
  <!-- Nose -->
  <ellipse cx="200" cy="212" rx="5" ry="3" fill="#D4AF37"/>
  <!-- Whiskers -->
  <g stroke="#0D0D0D" stroke-width="1.5" fill="none">
    <line x1="170" y1="210" x2="150" y2="205"/>
    <line x1="170" y1="215" x2="150" y2="215"/>
    <line x1="230" y1="210" x2="250" y2="205"/>
    <line x1="230" y1="215" x2="250" y2="215"/>
  </g>
  <text x="200" y="345" font-family="Poppins, sans-serif" font-size="11" fill="#D4AF37" text-anchor="middle" font-weight="600">XL</text>
`, 'Hello Kitty Necklace'));

export const productImages = [
  o2Necklaces,
  waistChain,
  magnetStud,
  piercingSticker,
  vcaBracelet,
  helloKitty,
];
