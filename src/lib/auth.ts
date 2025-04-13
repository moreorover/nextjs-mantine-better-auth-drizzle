import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { twoFactor } from "better-auth/plugins";

import { db } from "@/db/drizzle";
import {
  account,
  session,
  twoFactor as twoFactorSchema,
  user,
  verification,
} from "@/db/schema";
import { resend } from "@/lib/email/resend";
import { reactResetPasswordEmail } from "@/lib/email/reset-password";

const from = process.env.BETTER_AUTH_EMAIL || "delivered@resend.dev";

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
    async sendResetPassword({ user, url }) {
      await resend.emails.send({
        from,
        to: user.email,
        subject: "Reset your password",
        react: reactResetPasswordEmail({
          username: user.email,
          resetLink: url,
        }),
      });
    },
  },
  plugins: [twoFactor(), nextCookies()], // make sure nextCookies is the last plugin in the array
});
