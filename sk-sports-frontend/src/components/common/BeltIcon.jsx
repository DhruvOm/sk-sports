// A tied Taekwondo belt drawn in SVG. Pass any CSS color.
// Usage: <BeltIcon color="var(--belt-yellow)" glow />
export default function BeltIcon({ color = '#fff', size = 120, glow = false, className = '' }) {
  const isDark = color.includes('black')
  const stroke = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)'

  return (
    <svg
      className={className}
      width={size}
      height={size * 0.5}
      viewBox="0 0 120 60"
      aria-hidden="true"
      style={glow ? { filter: `drop-shadow(0 0 8px ${isDark ? 'rgba(255,255,255,0.25)' : color})` } : undefined}
    >
      {/* belt band */}
      <path d="M4 14 L50 20 L50 30 L4 26 Z" fill={color} stroke={stroke} strokeWidth="1" />
      <path d="M116 14 L70 20 L70 30 L116 26 Z" fill={color} stroke={stroke} strokeWidth="1" />
      {/* hanging tails */}
      <path d="M54 32 L30 54 L40 58 L60 36 Z" fill={color} stroke={stroke} strokeWidth="1" />
      <path d="M66 32 L90 54 L80 58 L60 36 Z" fill={color} stroke={stroke} strokeWidth="1" />
      {/* knot */}
      <rect x="48" y="14" width="24" height="22" rx="5" fill={color} stroke={stroke} strokeWidth="1.2" />
      <path d="M56 15 L56 35 M64 15 L64 35" stroke={stroke} strokeWidth="1.2" />
    </svg>
  )
}
