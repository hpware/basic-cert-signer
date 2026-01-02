import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index } from "drizzle-orm/pg-core";

{
  /** Core better-auth schema */
}
export const core_users = pgTable("core_users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const core_sessions = pgTable(
  "core_sessions",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => core_users.id, { onDelete: "cascade" }),
  },
  (table) => [index("core_sessions_userId_idx").on(table.userId)]
);

export const core_accounts = pgTable(
  "core_accounts",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => core_users.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("core_accounts_userId_idx").on(table.userId)]
);

export const core_verifications = pgTable(
  "core_verifications",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("core_verifications_identifier_idx").on(table.identifier)]
);

export const core_usersRelations = relations(core_users, ({ many }) => ({
  core_sessionss: many(core_sessions),
  core_accountss: many(core_accounts),
}));

export const core_sessionsRelations = relations(core_sessions, ({ one }) => ({
  core_users: one(core_users, {
    fields: [core_sessions.userId],
    references: [core_users.id],
  }),
}));

export const core_accountsRelations = relations(core_accounts, ({ one }) => ({
  core_users: one(core_users, {
    fields: [core_accounts.userId],
    references: [core_users.id],
  }),
}));

{
  /** SSO better-auth schema */
}
export const sso_users = pgTable("sso_users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const sso_sessions = pgTable(
  "sso_sessions",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => sso_users.id, { onDelete: "cascade" }),
  },
  (table) => [index("sso_sessions_userId_idx").on(table.userId)]
);

export const sso_accounts = pgTable(
  "sso_accounts",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => sso_users.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("sso_accounts_userId_idx").on(table.userId)]
);

export const sso_verifications = pgTable(
  "sso_verifications",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("sso_verifications_identifier_idx").on(table.identifier)]
);

export const sso_usersRelations = relations(sso_users, ({ many }) => ({
  sso_sessionss: many(sso_sessions),
  sso_accountss: many(sso_accounts),
}));

export const sso_sessionsRelations = relations(sso_sessions, ({ one }) => ({
  sso_users: one(sso_users, {
    fields: [sso_sessions.userId],
    references: [sso_users.id],
  }),
}));

export const sso_accountsRelations = relations(sso_accounts, ({ one }) => ({
  sso_users: one(sso_users, {
    fields: [sso_accounts.userId],
    references: [sso_users.id],
  }),
}));
