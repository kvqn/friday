import { relations, sql } from "drizzle-orm"
import {
  bigint,
  index,
  int,
  mysqlEnum,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/mysql-core"
import { type AdapterAccount } from "next-auth/adapters"
import { createId } from "@paralleldrive/cuid2"

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `app_${name}`)

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
})

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}))

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
)

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)

export const projects = createTable("project", {
  id: bigint("id", { mode: "number" }).notNull().primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  ownerId: varchar("owner_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  description: text("description"),
})

export const namespaces = createTable(
  "namespace",
  {
    id: bigint("id", { mode: "number" }).notNull().primaryKey().autoincrement(),
    projectId: bigint("project_id", { mode: "number" })
      .notNull()
      .references(() => projects.id),
    name: varchar("name", { length: 255 }).notNull(),
  },
  (table) => ({
    uniqueName: unique("namespace_name_unique").on(table.projectId, table.name),
  }),
)

export const logs = createTable("log", {
  id: bigint("id", { mode: "number" }).notNull().primaryKey().autoincrement(),
  namespaceId: bigint("namespace_id", { mode: "number" })
    .notNull()
    .references(() => namespaces.id),
  message: text("message"),
  level: mysqlEnum("level", [
    "debug",
    "info",
    "warning",
    "error",
    "critical",
  ]).notNull(),
  timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
})

export const projectTokens = createTable("project_token", {
  id: bigint("id", { mode: "number" }).notNull().primaryKey().autoincrement(),
  token: varchar("token", { length: 24 })
    .$defaultFn(() => createId())
    .unique(),
  projectId: bigint("project_id", { mode: "number" }).references(
    () => projects.id,
  ),
})

export const finegrainedTokens = createTable("finegrained_token", {
  id: bigint("id", { mode: "number" }).notNull().primaryKey().autoincrement(),
  token: varchar("token", { length: 24 })
    .$defaultFn(() => createId())
    .unique(),
  projectId: bigint("project_id", { mode: "number" }).references(
    () => projects.id,
  ),
})

export const fgTokenNamespaces = createTable(
  "fg_token_namespace",
  {
    tokenId: bigint("token_id", { mode: "number" }).references(
      () => finegrainedTokens.id,
    ),
    namespaceId: bigint("namespace_id", { mode: "number" }).references(
      () => namespaces.id,
    ),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.tokenId, table.namespaceId],
    }),
  }),
)
