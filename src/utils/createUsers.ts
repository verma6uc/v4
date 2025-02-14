import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import type { Database } from '../services/supabase/types'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

// Admin client for creating users
const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: false
  }
})

async function createSuperAdmin(email: string, password: string, firstName: string, lastName: string) {
  try {
    // Create user in auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName
      }
    })

    if (authError) throw authError

    // Update role in user_profiles
    const { error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .update({ role: 'SUPER_ADMIN' })
      .eq('id', authData.user.id)

    if (profileError) throw profileError

    console.log('Super admin created successfully:', {
      id: authData.user.id,
      email,
      firstName,
      lastName
    })

    return authData.user
  } catch (error) {
    console.error('Error creating super admin:', error)
    throw error
  }
}

async function createCreator(email: string, password: string, firstName: string, lastName: string) {
  try {
    // Create user in auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName
      }
    })

    if (authError) throw authError

    // No need to update role as it defaults to CREATOR through the trigger

    console.log('Creator created successfully:', {
      id: authData.user.id,
      email,
      firstName,
      lastName
    })

    return authData.user
  } catch (error) {
    console.error('Error creating creator:', error)
    throw error
  }
}

// Example usage:
async function main() {
  // Create a super admin
  await createSuperAdmin(
    'super@example.com',
    'strong-password-123',
    'John',
    'Doe'
  )

  // Create a creator
  await createCreator(
    'creator@example.com',
    'strong-password-456',
    'Jane',
    'Smith'
  )
}

// Run with: npx tsx src/utils/createUsers.ts
if (import.meta.url === new URL(import.meta.url).href) {
  main().catch(console.error)
}

export { createSuperAdmin, createCreator }