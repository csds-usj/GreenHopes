import { cn } from "~/lib/utils";

export default function Gradient({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-full max-w-[100vw] h-auto overflow-hidden",
        className
      )}
      width="1171"
      height="241"
      viewBox="0 0 1171 241"
      fill="none"
      aria-hidden="true"
      style={style}
    >
      <g opacity=".175" filter="url(#filter0_f)">
        <path
          d="M731.735 -179.55C596.571 -157.762 516.36 -74.1815 552.576 7.13199C588.793 88.4455 727.724 136.701 862.887 114.913C998.051 93.1247 1078.26 9.54454 1042.05 -71.769C1005.83 -153.082 866.898 -201.337 731.735 -179.55Z"
          fill="url(#primary_linear)"
        />
        <path
          d="M378 114.106C520.489 114.106 636 45.8883 636 -38.2623C636 -122.413 520.489 -190.63 378 -190.63C235.511 -190.63 120 -122.413 120 -38.2623C120 45.8883 235.511 114.106 378 114.106Z"
          fill="url(#accent_linear)"
        />
      </g>
      <defs>
        <filter
          id="filter0_f"
          x="0"
          y="-310.63"
          width="1170.74"
          height="550.775"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur stdDeviation="60" result="effect1_foregroundBlur" />
        </filter>
        {/* Primary color gradient */}
        <linearGradient
          id="primary_linear"
          x1="567.5"
          y1="1.03997"
          x2="1029.02"
          y2="64.6468"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--primary)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
        {/* Accent color gradient */}
        <linearGradient
          id="accent_linear"
          x1="155"
          y1="-11.0234"
          x2="511.855"
          y2="-162.127"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--primary)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
