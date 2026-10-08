import { pgTable, text, integer, timestamp, uuid, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const categories = pgTable('categories', {
  categoryId: serial('category_id').primaryKey(),
  categoryName: text('category_name').notNull(),
});

export const wads = pgTable('wads', {
  wadId: serial('wad_id').primaryKey(),
  wadName: text('wad_name').notNull(),
  wadDescription: text('wad_description'),
  releaseDate: timestamp('release_date', { mode: 'string' }),
  imageUrl: text('image_url'),
  isOwnedBy: integer('is_owned_by'),
  categoryId: integer('category_id')
    .references(() => categories.categoryId, { onDelete: 'set null' }),
});

export const users = pgTable('users', {
  userId: text('user_id').primaryKey(),
  userName: text('user_name').notNull(),
  passwordHash: text('password_hash').notNull(),
  signupDate: timestamp('signup_date', { mode: 'string' }),
  userStatus: text('user_status'),
  userCollectionUuid: uuid('user_collection_uuid'),
  userSettingsId: text('user_settings_id'),
  emailAddress: text('email_address').notNull(),
  credentialId: uuid('credential_id'),
});

export const userCollections = pgTable('user_collections', {
  collectionId: uuid('collection_id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.userId, { onDelete: 'cascade' }),
});

export const posts = pgTable('posts', {
  postId: serial('post_id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.userId, { onDelete: 'cascade' }),
  postTitle: text('post_title').notNull(),
  postContent: text('post_content').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }),
});

export const credentials = pgTable('credentials', {
  credentialId: uuid('credential_id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.userId, { onDelete: 'cascade' }),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  wads: many(wads),
}));

export const wadsRelations = relations(wads, ({ one }) => ({
  category: one(categories, {
    fields: [wads.categoryId],
    references: [categories.categoryId],
  }),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  collection: one(userCollections, {
    fields: [users.userCollectionUuid],
    references: [userCollections.collectionId],
  }),
  credential: one(credentials, {
    fields: [users.credentialId],
    references: [credentials.credentialId],
  }),
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.userId],
  }),
}));

export const credentialsRelations = relations(credentials, ({ one }) => ({
  user: one(users, {
    fields: [credentials.userId],
    references: [users.userId],
  }),
}));
