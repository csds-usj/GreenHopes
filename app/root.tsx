import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Nav from "~/components/nav";
import Footer from "~/components/footer";
import { Button } from "~/components/ui/button";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&display=swap",
  },
  // Added Baloo Bhai 2 font
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@400..800&display=swap",
  },
  // Added Libre Baskerville font
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/green-hopes-favicon.svg" />
        <Meta />
        <Links />
      </head>
      <body>
        <main
          className="flex min-w-[340px] flex-col font-sans antialiased overflow-hidden"
          style={{ background: "var(--background-gradient)" }}
        >
          <header className="bg-background px-safe pt-safe lg:h-16 flex justify-center mt-4 px-7.5">
            <Gradient />
            <Nav />
          </header>
          <div className="min-h-screen">{children}</div>
        </main>
        <ScrollRestoration />
        <Scripts />
        <Footer />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center px-safe py-[120px]">
      <div className="container mx-auto flex flex-col items-center justify-center lg:max-w-5xl">
        <h2 className="cta-title">{message}</h2>
        <p className="mt-5 max-w-[262px] text-center text-slate-500 tracking-tight md:max-w-none md:text-lg lg:mt-6 lg:text-xl">
          {details}
          <br className="block md:hidden" /> Let's get you back on track.
        </p>
        <div className="relative flex justify-center mt-5 md:mt-6 lg:mt-8">
          <Button>
            <Link to="/" className="flex items-center">
              Go Home
            </Link>
          </Button>
        </div>
        {stack && (
          <pre className="w-full p-4 mt-8 overflow-x-auto bg-slate-100 rounded text-xs text-slate-700">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </section>
  );
}

function Gradient() {
  return (
    <svg
      className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-full min-w-[80rem] h-auto"
      width="1171"
      height="241"
      viewBox="0 0 1171 241"
      fill="none"
      aria-hidden="true"
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
