import { supabase } from './supabase'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

// User interface
interface User {
  id: string
  email: string
  name: string
  passwordHash: string
  emailVerified: boolean
  emailVerificationToken?: string
  createdAt: string
  updatedAt: string
}

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

export function generatePasswordResetToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Create user in Supabase
export async function createUser(email: string, password: string, name: string) {
  try {
    const passwordHash = await hashPassword(password)
    const verificationToken = generateVerificationToken()
    
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          name,
          password_hash: passwordHash,
          email_verified: false, // Require email verification
          email_verification_token: verificationToken,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(`Registration failed: ${error.message}`)
    }

    const user = {
      id: data.id,
      email: data.email,
      name: data.name,
      passwordHash: data.password_hash,
      emailVerified: data.email_verified,
      emailVerificationToken: data.email_verification_token,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }

    return { user, verificationToken }
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

// Verify email
export async function verifyEmail(token: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email_verification_token', token)
      .single()

    if (error || !data) {
      throw new Error('Invalid verification token')
    }

    // Update user as verified
    const { error: updateError } = await supabase
      .from('users')
      .update({
        email_verified: true,
        email_verification_token: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', data.id)

    if (updateError) {
      throw new Error('Failed to verify email')
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      passwordHash: data.password_hash,
      emailVerified: true,
      emailVerificationToken: null,
      createdAt: data.created_at,
      updatedAt: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error verifying email:', error)
    throw error
  }
}

// Login user
export async function loginUser(email: string, password: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !data) {
      throw new Error('User not found')
    }

    const isValidPassword = await verifyPassword(password, data.password_hash)

    if (!isValidPassword) {
      throw new Error('Nesprávne heslo')
    }

    if (!data.email_verified) {
      throw new Error('Email not verified')
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      passwordHash: data.password_hash,
      emailVerified: data.email_verified,
      emailVerificationToken: data.email_verification_token,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }
  } catch (error) {
    console.error('Error logging in user:', error)
    throw error
  }
}

// Get user by email
export async function getUserByEmail(email: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !data) {
      return null
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      passwordHash: data.password_hash,
      emailVerified: data.email_verified,
      emailVerificationToken: data.email_verification_token,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }
  } catch (error) {
    console.error('Error getting user by email:', error)
    return null
  }
}

// Get all users (for debugging)
export async function getAllUsers() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')

    if (error) {
      console.error('Supabase error:', error)
      return []
    }

    return data.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      passwordHash: user.password_hash,
      emailVerified: user.email_verified,
      emailVerificationToken: user.email_verification_token,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    }))
  } catch (error) {
    console.error('Error getting all users:', error)
    return []
  }
}

// Request password reset
export async function requestPasswordReset(email: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, name')
      .eq('email', email)
      .single()

    if (error || !data) {
      throw new Error('User not found')
    }

    const resetToken = generatePasswordResetToken()
    const resetExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    const { error: updateError } = await supabase
      .from('users')
      .update({
        password_reset_token: resetToken,
        password_reset_expires: resetExpires.toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', data.id)

    if (updateError) {
      throw new Error('Failed to generate reset token')
    }

    return {
      user: {
        id: data.id,
        email: data.email,
        name: data.name
      },
      resetToken
    }
  } catch (error) {
    console.error('Error requesting password reset:', error)
    throw error
  }
}

// Reset password with token
export async function resetPasswordWithToken(token: string, newPassword: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, name, password_reset_expires')
      .eq('password_reset_token', token)
      .single()

    if (error || !data) {
      throw new Error('Invalid or expired reset token')
    }

    // Check if token is expired
    const now = new Date()
    const expiresAt = new Date(data.password_reset_expires)
    
    if (now > expiresAt) {
      throw new Error('Reset token has expired')
    }

    // Hash new password
    const passwordHash = await hashPassword(newPassword)

    // Update password and clear reset token
    const { error: updateError } = await supabase
      .from('users')
      .update({
        password_hash: passwordHash,
        password_reset_token: null,
        password_reset_expires: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', data.id)

    if (updateError) {
      throw new Error('Failed to update password')
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name
    }
  } catch (error) {
    console.error('Error resetting password:', error)
    throw error
  }
}

// Resend verification email
export async function resendVerificationEmail(email: string) {
  try {
    // Find user by email
    const { data, error } = await supabase
      .from('users')
      .select('id, email, name, email_verified, email_verification_token')
      .eq('email', email)
      .single()

    if (error || !data) {
      throw new Error('User not found')
    }

    if (data.email_verified) {
      throw new Error('Email is already verified')
    }

    // Generate new verification token
    const verificationToken = generateVerificationToken()

    // Update user with new token
    const { error: updateError } = await supabase
      .from('users')
      .update({
        email_verification_token: verificationToken,
        updated_at: new Date().toISOString()
      })
      .eq('id', data.id)

    if (updateError) {
      throw new Error('Failed to update verification token')
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      verificationToken
    }
  } catch (error) {
    console.error('Error resending verification email:', error)
    throw error
  }
}
