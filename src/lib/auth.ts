import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { user, account, session, verification } from "@/db/schema";

import { db } from "@/db/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: { user, account, session, verification },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()], // make sure nextCookies is the last plugin in the array
});
