/**
 * This file handles synchronization between Supabase authentication and our Replit PostgreSQL database
 */

// For server-side API routes
import { db } from '../server/db';
import { eq } from 'drizzle-orm';
import { users } from '../shared/schema';

/**
 * Sync a Supabase user to our local database
 * This should be called whenever a user authenticates with Supabase
 * 
 * @param {Object} supabaseUser - The user object from Supabase auth
 * @returns {Object} The synchronized user from our database
 */
export async function syncSupabaseUser(supabaseUser) {
  if (!supabaseUser) return null;
  
  try {
    // Check if user already exists in our database
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.supabaseId, supabaseUser.id));
    
    if (existingUser) {
      // User exists, update the last login time
      const [updatedUser] = await db
        .update(users)
        .set({
          lastLogin: new Date(),
          email: supabaseUser.email, // Ensure email is synced
          updatedAt: new Date(),
        })
        .where(eq(users.id, existingUser.id))
        .returning();
      
      return updatedUser;
    } else {
      // Check if there's a user with the same email but no supabaseId
      const [existingUserByEmail] = await db
        .select()
        .from(users)
        .where(eq(users.email, supabaseUser.email));
      
      if (existingUserByEmail) {
        // Update the existing user with the supabaseId
        const [updatedUser] = await db
          .update(users)
          .set({
            supabaseId: supabaseUser.id,
            lastLogin: new Date(),
            isTemporary: false,
            updatedAt: new Date(),
          })
          .where(eq(users.id, existingUserByEmail.id))
          .returning();
        
        return updatedUser;
      } else {
        // Create a new user
        const [newUser] = await db
          .insert(users)
          .values({
            username: supabaseUser.email.split('@')[0], // Generate a username from email
            email: supabaseUser.email,
            name: supabaseUser.user_metadata?.name || null,
            supabaseId: supabaseUser.id,
            isTemporary: false,
            lastLogin: new Date(),
          })
          .returning();
        
        return newUser;
      }
    }
  } catch (error) {
    console.error('Error syncing Supabase user to database:', error);
    return null;
  }
}

/**
 * Creates a temporary user in our database
 * 
 * @param {string} name - The user's name
 * @param {string} email - The user's email
 * @returns {Object} The created temporary user
 */
export async function createTemporaryUser(name, email) {
  try {
    // Check if user already exists in our database
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    
    if (existingUser) {
      // Update the existing user with temporary flag
      const [updatedUser] = await db
        .update(users)
        .set({
          name: name || existingUser.name,
          isTemporary: true,
          lastLogin: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(users.id, existingUser.id))
        .returning();
      
      return updatedUser;
    } else {
      // Create a new temporary user
      const [newUser] = await db
        .insert(users)
        .values({
          username: email.split('@')[0], // Generate a username from email
          email: email,
          name: name,
          isTemporary: true,
          lastLogin: new Date(),
        })
        .returning();
      
      return newUser;
    }
  } catch (error) {
    console.error('Error creating temporary user in database:', error);
    return null;
  }
}

/**
 * Get a user by their Supabase ID
 * 
 * @param {string} supabaseId - The Supabase user ID
 * @returns {Object} The user from our database
 */
export async function getUserBySupabaseId(supabaseId) {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.supabaseId, supabaseId));
    
    return user || null;
  } catch (error) {
    console.error('Error getting user by Supabase ID:', error);
    return null;
  }
}

/**
 * Get a user by their email
 * 
 * @param {string} email - The user's email
 * @returns {Object} The user from our database
 */
export async function getUserByEmail(email) {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    
    return user || null;
  } catch (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
}