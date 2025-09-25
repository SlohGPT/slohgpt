import { init, i } from '@instantdb/admin'

const APP_ID = process.env.NEXT_PUBLIC_INSTANTDB_APP_ID || '4eb27ecc-4f72-4ec3-b671-de0b8783a5f8'
const ADMIN_TOKEN = process.env.INSTANTDB_ADMIN_TOKEN || '5d1f1814-6d21-4788-8564-dab9837b3c71'

// Define the schema for our users
const schema = i.schema({
  entities: {
    users: i.entity({
      email: i.string().unique().indexed(),
      name: i.string(),
      passwordHash: i.string(),
      emailVerified: i.boolean(),
      emailVerificationToken: i.string().optional(),
      createdAt: i.number(),
      updatedAt: i.number(),
    }),
  },
})

// Initialize Instant DB (admin version for server-side)
export const db = init({ 
  appId: APP_ID,
  adminToken: ADMIN_TOKEN,
  schema 
})

export default db
