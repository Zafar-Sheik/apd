// Hand-drawn brand illustrations. Wheels carry the `wheel` class so GSAP can spin them.

type ArtProps = { className?: string };

function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g className="wheel">
      <circle cx={cx} cy={cy} r={r} fill="#0a0a0a" />
      <circle cx={cx} cy={cy} r={r * 0.62} fill="#1d1d1d" stroke="#f5f3ef" strokeWidth={2} />
      <path
        d={`M${cx - r * 0.55} ${cy}H${cx + r * 0.55}M${cx} ${cy - r * 0.55}V${cy + r * 0.55}`}
        stroke="#f5f3ef"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={r * 0.16} fill="#e10600" />
    </g>
  );
}

export function Scooter({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 240 150" fill="none" aria-hidden="true">
      {/* delivery box on the rear rack */}
      <rect x="8" y="22" width="72" height="54" rx="6" fill="#e10600" stroke="#0a0a0a" strokeWidth="3" />
      <rect x="8" y="22" width="72" height="12" rx="6" fill="#b30500" />
      <text x="44" y="66" textAnchor="middle" fontFamily="var(--font-display), Impact, sans-serif" fontSize="23" fill="#f5f3ef">
        APD
      </text>
      {/* rider: drawn twice so a light outline shows on dark backgrounds */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M100 68L122 36M104 70L136 80L146 102M122 40L164 42" stroke="#f5f3ef" strokeWidth="19" />
        <path d="M100 68L122 36M104 70L136 80L146 102M122 40L164 42" stroke="#1d1d1d" strokeWidth="14" />
      </g>
      <circle cx="128" cy="20" r="15" fill="#e10600" stroke="#0a0a0a" strokeWidth="3" />
      <path d="M130 14h13a6 6 0 0 1 0 12h-13z" fill="#0a0a0a" />
      {/* rear cowl, floor and leg shield */}
      <path
        d="M20 116C20 92 38 78 64 78H114C124 78 126 88 122 96L116 110C114 114 110 116 106 116Z"
        fill="#f5f3ef"
        stroke="#0a0a0a"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M58 70h56c6 0 8 8 2 10H60c-6 0-8-10-2-10z" fill="#0a0a0a" />
      <path d="M104 104H158V114H104Z" fill="#0a0a0a" />
      <path
        d="M150 114L170 40H182L170 94C188 98 202 108 206 122H186C184 114 176 110 168 112L160 116Z"
        fill="#f5f3ef"
        stroke="#0a0a0a"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M162 40L194 34" stroke="#0a0a0a" strokeWidth="6" strokeLinecap="round" />
      <circle cx="184" cy="56" r="6" fill="#ffd43b" stroke="#0a0a0a" strokeWidth="2.5" />
      <Wheel cx={58} cy={122} r={22} />
      <Wheel cx={190} cy={122} r={22} />
    </svg>
  );
}

export function Van({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 340 170" fill="none" aria-hidden="true">
      <path
        d="M12 32c0-10 8-18 18-18h196c8 0 14 4 18 10l40 54 34 12c8 3 12 10 12 18v14c0 6-4 10-10 10H22c-6 0-10-4-10-10z"
        fill="#f5f3ef"
        stroke="#0a0a0a"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M232 30h10l36 48h-46z" fill="#0a0a0a" />
      <rect x="12" y="92" width="318" height="16" fill="#e10600" />
      <path d="M12 108h318" stroke="#0a0a0a" strokeWidth="3" />
      <text x="34" y="78" fontFamily="var(--font-display), Impact, sans-serif" fontSize="46" fill="#0a0a0a">
        APD
      </text>
      <text x="36" y="104" fontFamily="var(--font-mono), monospace" fontSize="11" letterSpacing="2" fill="#f5f3ef">
        PARCEL DELIVERIES
      </text>
      <path d="M150 30v100M222 30v100" stroke="#0a0a0a" strokeWidth="2" opacity=".35" />
      <rect x="314" y="100" width="16" height="10" rx="2" fill="#ffd43b" stroke="#0a0a0a" strokeWidth="2" />
      <Wheel cx={84} cy={136} r={24} />
      <Wheel cx={262} cy={136} r={24} />
    </svg>
  );
}

const CAR_BODY =
  "M20 118c0-14 6-24 20-28l60-12 50-40c10-8 22-12 36-12h88c16 0 30 6 40 18l30 34 50 8c16 2 26 14 26 30v12c0 6-4 10-10 10H30c-6 0-10-4-10-10z";

const MUD = [
  [60, 112, 22], [120, 128, 16], [170, 100, 26], [230, 124, 20], [290, 96, 18], [350, 120, 24], [390, 132, 14],
  [200, 60, 14], [260, 48, 10], [140, 86, 10], [90, 132, 12], [320, 136, 12], [40, 128, 10], [250, 90, 8],
];

export function Car({ className, id = "car", dirty = false }: ArtProps & { id?: string; dirty?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 420 170" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-paint`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={dirty ? "#7a4a3c" : "#ff2a1f"} />
          <stop offset="1" stopColor={dirty ? "#3d2620" : "#9a0400"} />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={dirty ? "#4a4038" : "#3a3a3a"} />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d={CAR_BODY} />
        </clipPath>
      </defs>
      <path
        d={CAR_BODY}
        fill={`url(#${id}-paint)`}
        stroke="#0a0a0a"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M118 80l42-34c8-6 16-8 26-8h40v42z" fill={`url(#${id}-glass)`} />
      <path d="M238 38h28c12 0 22 4 30 14l22 28h-80z" fill={`url(#${id}-glass)`} />
      <path d="M40 104h360" stroke="#0a0a0a" strokeWidth="2" opacity=".3" />
      {dirty ? (
        <g clipPath={`url(#${id}-clip)`} fill="#5b3a22" opacity=".85">
          {MUD.map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} />
          ))}
          <path d="M20 140h390v30H20z" />
        </g>
      ) : (
        <path className="car__glint" d="M150 46l60-6-90 56z" fill="#fff" opacity=".35" />
      )}
      <rect x="388" y="98" width="20" height="10" rx="3" fill="#ffd43b" stroke="#0a0a0a" strokeWidth="2" />
      <rect x="20" y="96" width="14" height="10" rx="3" fill="#ff7a70" stroke="#0a0a0a" strokeWidth="2" />
      <Wheel cx={104} cy={138} r={26} />
      <Wheel cx={320} cy={138} r={26} />
    </svg>
  );
}

export function ParcelIcon({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 4l26 13v30L32 60 6 47V17z" fill="#c8915a" stroke="#0a0a0a" strokeWidth="3" strokeLinejoin="round" />
      <path d="M6 17l26 13 26-13M32 30v30" stroke="#0a0a0a" strokeWidth="3" strokeLinejoin="round" />
      <path d="M19 10.5l26 13v9" stroke="#e10600" strokeWidth="5" />
    </svg>
  );
}
