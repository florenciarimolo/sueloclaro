import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function SuctionIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 12a8 8 0 0 1 16 0" />
      <path d="M7.5 12a4.5 4.5 0 0 1 9 0" />
      <path d="M12 12v8" />
      <path d="M9 17l3 3 3-3" />
    </Base>
  );
}

export function NavigationIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2" />
      <path d="M10 14l1.2-3.8L15 9l-1.2 3.8z" />
    </Base>
  );
}

export function MopIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="8" cy="15" r="4" />
      <circle cx="16" cy="15" r="4" />
      <path d="M8 11V5M16 11V5M8 5h8" />
    </Base>
  );
}

export function DockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="6" y="3" width="12" height="15" rx="2" />
      <path d="M9 7h6M9 10h6" />
      <path d="M4 21h16" />
    </Base>
  );
}

export function HeightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 4v16" />
      <path d="M9 7l3-3 3 3M9 17l3 3 3-3" />
      <path d="M4 20h4M16 20h4" />
    </Base>
  );
}

export function PetIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="6.5" cy="10" r="1.8" />
      <circle cx="10" cy="6.5" r="1.8" />
      <circle cx="14" cy="6.5" r="1.8" />
      <circle cx="17.5" cy="10" r="1.8" />
      <path d="M12 12c-3 0-5 3-5 5.2 0 1.6 1.4 2.3 2.8 1.8.8-.3 1.5-.5 2.2-.5s1.4.2 2.2.5c1.4.5 2.8-.2 2.8-1.8C17 15 15 12 12 12z" />
    </Base>
  );
}

export function CarpetIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="6" width="18" height="12" rx="1.5" />
      <path d="M3 10h18M3 14h18" />
      <path d="M6 18v2M10 18v2M14 18v2M18 18v2" />
    </Base>
  );
}

export function SmallFlatIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 11l8-6 8 6" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </Base>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </Base>
  );
}

export function CompareIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="5" width="7" height="14" rx="1.5" />
      <rect x="14" y="5" width="7" height="14" rx="1.5" />
      <path d="M10 12h4" />
    </Base>
  );
}
