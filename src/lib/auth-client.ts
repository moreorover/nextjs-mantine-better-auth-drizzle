import { createAuthClient } from "better-auth/react";
import { twoFactorClient } from "better-auth/plugins";
export const authClient = createAuthClient({
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/two-factor";
      },
    }),
  ],
});
