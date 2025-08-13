import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { Route } from "./+types/root";
import "./app.css";
import Nav from "~/components/nav";
import Footer from "~/components/footer";
import { Button } from "~/components/ui/button";
import Gradient from "~/components/gradient";

// Create a client
const queryClient = new QueryClient();

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
          className="flex min-w-[340px] flex-col font-sans antialiased "
          style={{ background: "var(--background-gradient)" }}
        >
          <header className="bg-background px-safe pt-safe lg:h-16 flex justify-center mt-4 px-7.5 ">
            <Gradient />
            <Nav />
          </header>
          <div className="min-h-screen ">{children}</div>
        </main>
        <ScrollRestoration />
        <Scripts />
        <Footer />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
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
