import type { SVGProps } from "react";
import type { ActivityIcon } from "@/types";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, strokeWidth = 1.8, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const MenuIcon = (p: IconProps) => (
  <Svg strokeWidth={2} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const CloseIcon = (p: IconProps) => (
  <Svg strokeWidth={2} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);

export const ArrowUpIcon = (p: IconProps) => (
  <Svg strokeWidth={2} {...p}>
    <path d="M6 15l6-6 6 6" />
  </Svg>
);

export const SchoolIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 9l9-5 9 5-9 5-9-5z" />
    <path d="M7 11v5c0 1.5 2.2 3 5 3s5-1.5 5-3v-5" />
  </Svg>
);

export const BriefcaseIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="7" width="18" height="13" />
    <path d="M8 7V4h8v3" />
    <path d="M3 13h18" />
  </Svg>
);

export const IdCardIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" />
    <circle cx="9" cy="11" r="2.2" />
    <path d="M5.5 16.5c.6-1.6 2-2.5 3.5-2.5s2.9.9 3.5 2.5M15 10h3M15 13.5h3" />
  </Svg>
);

export const BarChartIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </Svg>
);

export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
  </Svg>
);

export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" />
    <path d="M3 6l9 7 9-7" />
  </Svg>
);

const activityIcons: Record<ActivityIcon, (p: IconProps) => React.ReactElement> = {
  chart: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 5-6" />
    </Svg>
  ),
  theater: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <path d="M4 4h16v6a8 8 0 0 1-16 0V4z" />
      <path d="M8.5 9h.01M15.5 9h.01" />
      <path d="M9 13.5c1.6 1.4 4.4 1.4 6 0" />
    </Svg>
  ),
  users: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M17 14c2.4 0 4 1.8 4 4.5" />
    </Svg>
  ),
  heart: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
    </Svg>
  ),
};

export function ActivityIconView({ icon, ...p }: IconProps & { icon: ActivityIcon }) {
  const Icon = activityIcons[icon] ?? activityIcons.chart;
  return <Icon {...p} />;
}
