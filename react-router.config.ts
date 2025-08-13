import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

export default {
  ssr: true,
  // Ensure predictable server build filename for Vercel lookup
  serverBuildFile: "server-index.mjs",
  future: {
    unstable_viteEnvironmentApi: true,
  },
  presets: [vercelPreset()],
} satisfies Config;
