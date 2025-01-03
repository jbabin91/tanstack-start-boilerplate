/* eslint-disable sort-keys-fix/sort-keys-fix */
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const todoTable = pgTable('todos', {
  id: uuid().primaryKey(),
  title: text().notNull(),
  completed: boolean().notNull().default(false),
  createdAt: timestamp({ mode: 'string', withTimezone: true }).defaultNow(),
  updatedAt: timestamp({ mode: 'string', withTimezone: true })
    .defaultNow()
    .$onUpdateFn(() => new Date().toUTCString()),
});
