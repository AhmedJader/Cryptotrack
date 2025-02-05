import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const UserSignup = pgTable('User_signup', {
  user_id: text('user_id').primaryKey().notNull(),
  email: text('email').notNull(),
  name: text('name').notNull(),
  createTs: timestamp('create_ts').defaultNow().notNull(),
})