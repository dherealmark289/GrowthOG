import { pgTable, serial, text, integer, timestamp, boolean, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

// Users table (for authentication and user information)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password'),
  name: text('name'),
  supabaseId: text('supabase_id').unique(),
  isTemporary: boolean('is_temporary').default(false),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').default(sql`NOW()`),
  updatedAt: timestamp('updated_at').default(sql`NOW()`),
});

// Booking requests table (for strategy calls)
export const bookingRequests = pgTable('booking_requests', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  company: text('company').notNull(),
  website: text('website'),
  monthlyTraffic: text('monthly_traffic'),
  currentLinks: text('current_links'),
  goals: text('goals'),
  date: text('date').notNull(),
  time: text('time').notNull(),
  timezone: text('timezone').notNull(),
  status: text('status').default('pending').notNull(), // pending, confirmed, completed, cancelled
  createdAt: timestamp('created_at').default(sql`NOW()`),
  updatedAt: timestamp('updated_at').default(sql`NOW()`),
});

// Content Type Enum
export const contentTypeEnum = pgEnum('content_type', ['Money Page', 'Case Study', 'Blog Post', 'Landing Page']);

// Goal Type Enum
export const goalTypeEnum = pgEnum('goal_type', ['SEO', 'Conversions', 'Both']);

// Status Type Enum
export const statusEnum = pgEnum('status', ['Active', 'Paused', 'Completed']);

// Priority Content table
export const priorityContent = pgTable('priority_content', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  contentType: contentTypeEnum('content_type').notNull(),
  goal: goalTypeEnum('goal').notNull(),
  status: statusEnum('status').default('Active').notNull(),
  targetKeyword: text('target_keyword'),
  createdAt: timestamp('created_at').default(sql`NOW()`),
  updatedAt: timestamp('updated_at').default(sql`NOW()`),
});

// Link Status Enum
export const linkStatusEnum = pgEnum('link_status', ['Live', 'Submitted', 'Progress', 'Planned']);

// Link Type Enum
export const linkTypeEnum = pgEnum('link_type', ['Editorial', 'Guest Post']);

// Links table
export const links = pgTable('links', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  date: timestamp('date').default(sql`NOW()`),
  domain: text('domain').notNull(),
  domainRating: integer('domain_rating'),
  linkFrom: text('link_from').notNull(),
  linkTo: text('link_to').notNull(),
  anchorText: text('anchor_text'),
  status: linkStatusEnum('status').default('Planned').notNull(),
  type: linkTypeEnum('type').notNull(),
  price: integer('price'),
  createdAt: timestamp('created_at').default(sql`NOW()`),
  updatedAt: timestamp('updated_at').default(sql`NOW()`),
});

// Domains table
export const domains = pgTable('domains', {
  id: serial('id').primaryKey(),
  domain: text('domain').notNull().unique(),
  drScore: integer('dr_score'),
  monthlyTraffic: text('monthly_traffic'),
  price: integer('price'),
  linkType: linkTypeEnum('link_type').notNull(),
  isSelected: boolean('is_selected').default(false),
  createdAt: timestamp('created_at').default(sql`NOW()`),
  updatedAt: timestamp('updated_at').default(sql`NOW()`),
});

// Campaigns table
export const campaigns = pgTable('campaigns', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  goal: text('goal'),
  budget: integer('budget'),
  status: text('status').default('active'),
  createdAt: timestamp('created_at').default(sql`NOW()`),
  updatedAt: timestamp('updated_at').default(sql`NOW()`),
});

// Campaign Domains junction table
export const campaignDomains = pgTable('campaign_domains', {
  id: serial('id').primaryKey(),
  campaignId: integer('campaign_id').references(() => campaigns.id, { onDelete: 'cascade' }),
  domainId: integer('domain_id').references(() => domains.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').default(sql`NOW()`),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  bookingRequests: many(bookingRequests),
  priorityContent: many(priorityContent),
  links: many(links),
  campaigns: many(campaigns),
}));

export const bookingRequestsRelations = relations(bookingRequests, ({ one }) => ({
  user: one(users, {
    fields: [bookingRequests.userId],
    references: [users.id],
  }),
}));

export const priorityContentRelations = relations(priorityContent, ({ one }) => ({
  user: one(users, {
    fields: [priorityContent.userId],
    references: [users.id],
  }),
}));

export const linksRelations = relations(links, ({ one }) => ({
  user: one(users, {
    fields: [links.userId],
    references: [users.id],
  }),
}));

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  user: one(users, {
    fields: [campaigns.userId],
    references: [users.id],
  }),
  domains: many(campaignDomains),
}));

export const campaignDomainsRelations = relations(campaignDomains, ({ one }) => ({
  campaign: one(campaigns, {
    fields: [campaignDomains.campaignId],
    references: [campaigns.id],
  }),
  domain: one(domains, {
    fields: [campaignDomains.domainId],
    references: [domains.id],
  }),
}));

export const domainsRelations = relations(domains, ({ many }) => ({
  campaigns: many(campaignDomains),
}));

// Types for Insert/Select operations
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type BookingRequest = typeof bookingRequests.$inferSelect;
export type InsertBookingRequest = typeof bookingRequests.$inferInsert;

export type PriorityContent = typeof priorityContent.$inferSelect;
export type InsertPriorityContent = typeof priorityContent.$inferInsert;

export type Link = typeof links.$inferSelect;
export type InsertLink = typeof links.$inferInsert;

export type Domain = typeof domains.$inferSelect;
export type InsertDomain = typeof domains.$inferInsert;

export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = typeof campaigns.$inferInsert;

export type CampaignDomain = typeof campaignDomains.$inferSelect;
export type InsertCampaignDomain = typeof campaignDomains.$inferInsert;