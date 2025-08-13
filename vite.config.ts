import { reactRouter } from "@react-router/dev/vite";
// Cloudflare plugin conflicts with Vercel output (it redirects server build to dist/ssr)
// Only include it when explicitly targeting Cloudflare (e.g. CF_PAGES or CLOUDFLARE deployment env)
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// IMPORTANT: We purposely do NOT key off CLOUDFLARE_* database credentials here
// because we still want to access a Cloudflare D1 database from Vercel without
// engaging the Cloudflare runtime/vite plugin (which changes output layout).
// Opt-in only via an explicit flag.
const isCloudflare =
  process.env.CF_PAGES === "1" ||
  process.env.DEPLOY_TARGET === "cloudflare" ||
  process.env.CLOUDFLARE_VITE === "1";

export default defineConfig({
  plugins: [
    // Only add the cloudflare plugin when we intentionally deploy to Cloudflare.
    // On Vercel this must be omitted so React Router's Vercel preset can emit build/server/*
    isCloudflare && cloudflare({ viteEnvironment: { name: "ssr" } }),
    reactRouter(),
    tailwindcss(),
    tsconfigPaths(),
  ].filter(Boolean),
});
