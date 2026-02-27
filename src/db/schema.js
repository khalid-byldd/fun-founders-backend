const { pgTable, serial, varchar, text, integer, timestamp, uniqueIndex } = require('drizzle-orm/pg-core');

const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 100 }).notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    usernameUnique: uniqueIndex('users_username_unique').on(table.username),
  })
);

const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  captain: varchar('captain', { length: 120 }).notNull(),
  season: varchar('season', { length: 40 }).notNull(),
  logo: text('logo').default('').notNull(),
  members: text('members').array().default([]).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

const events = pgTable('events', {
  id: serial('id').primaryKey(),
  season: varchar('season', { length: 40 }).notNull(),
  winner: integer('winner').notNull().references(() => teams.id, { onDelete: 'restrict' }),
  name: varchar('name', { length: 120 }).notNull(),
  logo: text('logo').default('').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

const eventScores = pgTable('event_scores', {
  id: serial('id').primaryKey(),
  eventId: integer('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  teamId: integer('team_id').notNull().references(() => teams.id, { onDelete: 'restrict' }),
  score: integer('score').notNull(),
});

const config = pgTable('config', {
  id: serial('id').primaryKey(),
  currentSeason: varchar('current_season', { length: 40 }).notNull(),
  seasons: text('seasons').array().default([]).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

module.exports = { users, teams, events, eventScores, config };
