import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { eq } from "drizzle-orm";
import { trees } from "drizzle/schema";

// Server-side only database connection
let db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!db) {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL || "libsql://green-hopes-db-csds.aws-ap-south-1.turso.io",
      authToken: process.env.TURSO_AUTH_TOKEN || "",
    });
    db = drizzle(client);
  }
  return db;
}

// Example query function
export async function getAllTrees() {
  return await getDb().select().from(trees);
}

export async function getTreeById(id: number) {
  return await getDb().select().from(trees).where(eq(trees.id, id));
}

export async function getTreeByScientificName(scientificName: string) {
  return await getDb().select().from(trees).where(eq(trees.scientificName, scientificName));
}

export { getDb };
