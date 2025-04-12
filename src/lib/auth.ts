import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import {
  user,
  account,
  session,
  verification,
  twoFactor as twoFactorSchema,
} from "@/db/schema";

import { db } from "@/db/drizzle";
import { twoFactor } from "better-auth/plugins";

export const auth = betterAuth({
  appName: "prive-video",
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: {
      user,
      account,
      session,
      verification,
      twoFactor: twoFactorSchema,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [twoFactor(), nextCookies()], // make sure nextCookies is the last plugin in the array
});
