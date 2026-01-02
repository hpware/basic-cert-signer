import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../drizzle/db"; // your drizzle instance

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  user: {
    modelName: "sso_users",
  },
  session: {
    modelName: "sso_sessions",
  },
  account: {
    modelName: "sso_accounts",
  },
  verification: {
    modelName: "sso_verifications",
  },
});
