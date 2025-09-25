import instantdb from './instantdb'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

// Generate verification token
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Create user
export async function createUser(email: string, password: string, name: string) {
  if (!instantdb) {
    throw new Error('Instant DB client not initialized')
  }

  const passwordHash = await hashPassword(password)
  const verificationToken = generateVerificationToken()
  
  const user = {
    id: crypto.randomUUID(),
    email,
    name,
    passwordHash,
    emailVerified: false,
    emailVerificationToken: verificationToken,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
  
  // Insert user into database
  await instantdb.transact([
    instantdb.tx.users[user.id].update(user)
  ])
  
  return { user, verificationToken }
}

// Verify email
export async function verifyEmail(token: string) {
  if (!instantdb) {
    throw new Error('Instant DB client not initialized')
  }

  const { data } = await instantdb.query({
    users: {
      $: {
        where: {
          emailVerificationToken: token
        }
      }
    }
  })
  
  if (data.users.length === 0) {
    throw new Error('Invalid verification token')
  }
  
  const user = data.users[0]
  
  // Update user as verified
  await instantdb.transact([
    instantdb.tx.users[user.id].update({
      emailVerified: true,
      emailVerificationToken: null,
      updatedAt: Date.now()
    })
  ])
  
  return user
}

// Login user
export async function loginUser(email: string, password: string) {
  if (!instantdb) {
    throw new Error('Instant DB client not initialized')
  }

  const { data } = await instantdb.query({
    users: {
      $: {
        where: {
          email: email
        }
      }
    }
  })
  
  if (data.users.length === 0) {
    throw new Error('User not found')
  }
  
  const user = data.users[0]
  const isValidPassword = await verifyPassword(password, user.passwordHash)
  
  if (!isValidPassword) {
    throw new Error('Invalid password')
  }
  
  if (!user.emailVerified) {
    throw new Error('Email not verified')
  }
  
  return user
}

// Get user by email
export async function getUserByEmail(email: string) {
  if (!instantdb) {
    throw new Error('Instant DB client not initialized')
  }

  const { data } = await instantdb.query({
    users: {
      $: {
        where: {
          email: email
        }
      }
    }
  })
  
  return data.users[0] || null
}
