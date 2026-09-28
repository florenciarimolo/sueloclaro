import type { DockKind } from "@/lib/database.types";

const dockLabel: Record<DockKind, string> = {
  none: "base de carga",
  empty: "base de autovaciado",
  wash_dry: "estación que vacía, lava y seca",
};

function Dock({ dock }: { dock: DockKind }) {
  if (dock === "none") {
    return (
      <g>
        <rect x="150" y="52" width="46" height="66" rx="8" className="fill-stone-200" />
        <rect x="160" y="64" width="26" height="4" rx="2" className="fill-stone-400" />
        <circle cx="173" cy="100" r="4" className="fill-teal-700" />
      </g>
    );
  }

  if (dock === "empty") {
    return (
      <g>
        <rect x="146" y="18" width="54" height="100" rx="10" className="fill-stone-200" />
        <rect x="156" y="30" width="34" height="34" rx="6" className="fill-stone-300" />
        <rect x="160" y="74" width="26" height="4" rx="2" className="fill-stone-400" />
        <circle cx="173" cy="100" r="4" className="fill-teal-700" />
      </g>
    );
  }

  return (
    <g>
      <rect x="138" y="10" width="70" height="108" rx="10" className="fill-stone-200" />
      <rect x="146" y="20" width="25" height="40" rx="5" className="fill-teal-100" />
      <rect x="175" y="20" width="25" height="40" rx="5" className="fill-stone-300" />
      <path d="M152 40c2-3 4-3 6 0s4 3 6 0" className="stroke-teal-700" strokeWidth="2" fill="none" />
      <rect x="152" y="72" width="42" height="4" rx="2" className="fill-stone-400" />
      <circle cx="173" cy="100" r="4" className="fill-teal-700" />
    </g>
  );
}

export function RobotSchematic({
  dock,
  className,
}: {
  dock: DockKind;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 220 132"
      role="img"
      aria-label={`Esquema de un robot aspirador con ${dockLabel[dock]}. No es una foto del modelo.`}
      className={className}
    >
      <rect x="0" y="118" width="220" height="14" rx="3" className="fill-stone-100" />
      <Dock dock={dock} />
      <ellipse cx="72" cy="118" rx="56" ry="6" className="fill-stone-300/60" />
      <circle cx="72" cy="84" r="46" className="fill-white stroke-stone-300" strokeWidth="2" />
      <circle cx="72" cy="84" r="34" className="fill-stone-50 stroke-stone-200" strokeWidth="1.5" />
      <rect x="62" y="44" width="20" height="10" rx="5" className="fill-stone-300" />
      <circle cx="72" cy="84" r="8" className="fill-teal-700" />
      <circle cx="72" cy="84" r="3" className="fill-white" />
      <path d="M40 104l-12 8M104 104l12 8" className="stroke-stone-300" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function HeroSchematic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 220"
      role="img"
      aria-label="Esquema de un robot aspirador limpiando un suelo con alfombra junto a su estación."
      className={className}
    >
      <rect x="0" y="176" width="360" height="44" rx="6" className="fill-stone-100" />
      <rect x="18" y="182" width="150" height="26" rx="4" className="fill-teal-50 stroke-teal-200" strokeWidth="1.5" />
      <path d="M26 190h134M26 196h134M26 202h134" className="stroke-teal-200" strokeWidth="1" />
      <rect x="252" y="62" width="86" height="120" rx="12" className="fill-stone-200" />
      <rect x="262" y="74" width="30" height="46" rx="6" className="fill-teal-100" />
      <rect x="298" y="74" width="30" height="46" rx="6" className="fill-stone-300" />
      <rect x="270" y="136" width="50" height="5" rx="2.5" className="fill-stone-400" />
      <circle cx="295" cy="160" r="5" className="fill-teal-700" />
      <ellipse cx="130" cy="178" rx="62" ry="7" className="fill-stone-300/60" />
      <circle cx="130" cy="138" r="52" className="fill-white stroke-stone-300" strokeWidth="2" />
      <circle cx="130" cy="138" r="38" className="fill-stone-50 stroke-stone-200" strokeWidth="1.5" />
      <rect x="118" y="92" width="24" height="12" rx="6" className="fill-stone-300" />
      <circle cx="130" cy="138" r="9" className="fill-teal-700" />
      <circle cx="130" cy="138" r="3.5" className="fill-white" />
      <path d="M60 120c-8 0-14-6-14-14M200 120c8 0 14-6 14-14" className="stroke-teal-300" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 5" />
    </svg>
  );
}
