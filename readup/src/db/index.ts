import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type DB = PostgresJsDatabase<typeof schema>;

const globalForDb = globalThis as unknown as { __readupDb?: DB };

function create(): DB {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set. Copy .env.example to .env and fill it in.");
  // prepare: false keeps this compatible with Neon's pooled (pgbouncer) connection string.
  const client = postgres(url, { prepare: false, max: process.env.NODE_ENV === "production" ? 5 : 3 });
  return drizzle(client, { schema });
}

export function getDb(): DB {
  if (!globalForDb.__readupDb) globalForDb.__readupDb = create();
  return globalForDb.__readupDb;
}

export { schema };
