import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import { createRequestHandler } from "react-router";
import * as schema from "../drizzle/schema";

interface Env {
  DB: D1Database;
}

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
    db: DrizzleD1Database<typeof schema>;
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request, env, ctx) {
    try {
      const db = drizzle(env.DB, { schema });
      return await requestHandler(request, {
        cloudflare: { env, ctx },
        db,
      });
    } catch (error) {
      return new Response(
        `Worker error: ${error instanceof Error ? error.message : String(error)}`,
        { status: 500, headers: { "Content-Type": "text/plain" } }
      );
    }
  },
} satisfies ExportedHandler<Env>;
