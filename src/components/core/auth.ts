import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../drizzle/db"; // your drizzle instance
import { genericOAuth } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  user: {
    modelName: "core_users",
  },
  session: {
    modelName: "core_sessions",
  },
  account: {
    modelName: "core_accounts",
  },
  verification: {
    modelName: "core_verifications",
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "sso",
          clientId: "ssoClientID948402GK-jfvos",
          clientSecret: "vkdOCVXO40ws0Kx0VKXPp",
          discoveryUrl: `${process.env.NEXT_PUBLIC_SSO_URL}/.well-known/openid-configuration`,
        },
      ],
    }),
  ],
});
