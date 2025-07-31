import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { trees } from "drizzle/schema";
import { D1Database } from "@cloudflare/workers-types";

// This will be available in your Cloudflare Workers environment
export function getDb(env: { DB: D1Database }) {
  return drizzle(env.DB);
}

// Example query function
export async function getAllTrees(db: ReturnType<typeof getDb>) {
  return await db.select().from(trees);
}

export async function getTreeById(db: ReturnType<typeof getDb>, id: number) {
  return await db.select().from(trees).where(eq(trees.id, id));
}
