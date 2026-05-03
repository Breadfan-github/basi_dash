function hexToRgb(hex) {
  const h = hex.replace("#", "")
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

/** @param {string} c1 hex
 * @param {string} c2 hex
 * @param {number} t 0..1 amount toward c2 */
export function mixHex(c1, c2, t) {
  const A = hexToRgb(c1)
  const B = hexToRgb(c2)
  const r = Math.round(A.r + (B.r - A.r) * t)
  const g = Math.round(A.g + (B.g - A.g) * t)
  const b = Math.round(A.b + (B.b - A.b) * t)
  const x = (n) => n.toString(16).padStart(2, "0")
  return `#${x(r)}${x(g)}${x(b)}`
}

/** Primary → semantic “navy” scale (matches Tailwind-ish steps used in UI). */
export function navyScaleFromPrimary(primary) {
  return {
    50: mixHex("#ffffff", primary, 0.06),
    100: mixHex("#ffffff", primary, 0.12),
    200: mixHex("#ffffff", primary, 0.28),
    300: mixHex("#ffffff", primary, 0.45),
    400: mixHex("#ffffff", primary, 0.58),
    500: mixHex("#ffffff", primary, 0.38),
    600: mixHex("#ffffff", primary, 0.22),
    700: primary,
    800: mixHex(primary, "#000000", 0.28),
    900: mixHex(primary, "#000000", 0.45),
  }
}

const ROYAL_BLACK = {
  50: "#fafafa",
  100: "#f4f4f5",
  200: "#e4e4e7",
  300: "#d4d4d8",
  400: "#a1a1aa",
  500: "#71717a",
  600: "#3f3f46",
  700: "#27272a",
  800: "#18181b",
  900: "#09090b",
}

const ROYAL_GREY = {
  50: "#f8fafc",
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#94a3b8",
  500: "#64748b",
  600: "#6b7280",
  700: "#4b5563",
  800: "#374151",
  900: "#1f2937",
}

const CARBON = {
  50: "#f9fafb",
  100: "#f3f4f6",
  200: "#e5e7eb",
  300: "#d1d5db",
  400: "#9ca3af",
  500: "#6b7280",
  600: "#4b5563",
  700: "#374151",
  800: "#1f2937",
  900: "#111827",
}

const SILVER = {
  50: "#f9fafb",
  100: "#f3f4f6",
  200: "#e5e7eb",
  300: "#d1d5db",
  400: "#9ca3af",
  500: "#6b7280",
  600: "#4b5563",
  700: "#374151",
  800: "#1f2937",
  900: "#111827",
}

const GOLD = {
  50: "#fffbeb",
  100: "#fef3c7",
  200: "#fde68a",
  300: "#fcd34d",
  400: "#fbbf24",
  500: "#f59e0b",
  600: "#d97706",
  700: "#b45309",
  800: "#92400e",
  900: "#78350f",
}

const AVERRA_NAVY = {
  50: "#f0f4ff",
  100: "#e0e7ff",
  200: "#c7d2fe",
  300: "#a5b4fc",
  400: "#818cf8",
  500: "#6366f1",
  600: "#4f46e5",
  700: "#1e3a8a",
  800: "#1e3a8a",
  900: "#1e293b",
}

const AVERRA_ROYAL = {
  50: "#eff6ff",
  100: "#dbeafe",
  200: "#bfdbfe",
  300: "#93c5fd",
  400: "#60a5fa",
  500: "#3b82f6",
  600: "#2563eb",
  700: "#1d4ed8",
  800: "#1e40af",
  900: "#1e3a8a",
}

function flattenScale(prefix, scale) {
  const out = {}
  for (const [step, val] of Object.entries(scale)) {
    out[`${prefix}-${step}`] = val
  }
  return out
}

export function brandVarsFromScales(navy, royal, carbon = CARBON, silver = SILVER, gold = GOLD) {
  const vars = {}
  Object.assign(vars, flattenScale("--brand-navy", navy))
  Object.assign(vars, flattenScale("--brand-royal", royal))
  Object.assign(vars, flattenScale("--brand-carbon", carbon))
  Object.assign(vars, flattenScale("--brand-silver", silver))
  Object.assign(vars, flattenScale("--brand-gold", gold))
  return vars
}

export function partnerBrandVars(primary, secondaryMode) {
  const navy = navyScaleFromPrimary(primary)
  const royal = secondaryMode === "grey" ? ROYAL_GREY : ROYAL_BLACK
  return brandVarsFromScales(navy, royal)
}

export function averraBrandVars() {
  return brandVarsFromScales(AVERRA_NAVY, AVERRA_ROYAL)
}
