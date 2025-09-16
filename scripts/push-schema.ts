import { db, pool } from "../server/db";
import { sql } from "drizzle-orm";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { domains } from "../shared/schema";

// Function to migrate the database schema
async function migrateSchema() {
  console.log("Starting database schema migration...");
  
  try {
    console.log("Connected to database, running migrations...");
    
    // Perform migration based on the schema
    // Since we're not using drizzle-kit, we'll use the SQL version to ensure
    // tables are created with our schema definition
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT,
        name TEXT,
        supabase_id TEXT UNIQUE,
        is_temporary BOOLEAN DEFAULT false,
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    
    // Create necessary enums
    await db.execute(sql`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'content_type') THEN
          CREATE TYPE content_type AS ENUM ('Money Page', 'Case Study', 'Blog Post', 'Landing Page');
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'goal_type') THEN
          CREATE TYPE goal_type AS ENUM ('SEO', 'Conversions', 'Both');
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status') THEN
          CREATE TYPE status AS ENUM ('Active', 'Paused', 'Completed');
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'link_status') THEN
          CREATE TYPE link_status AS ENUM ('Live', 'Submitted', 'Progress', 'Planned');
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'link_type') THEN
          CREATE TYPE link_type AS ENUM ('Editorial', 'Guest Post');
        END IF;
      END $$;
    `);
    
    // Create other tables with foreign key references
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS booking_requests (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT NOT NULL,
        website TEXT,
        monthly_traffic TEXT,
        current_links TEXT,
        goals TEXT,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        timezone TEXT NOT NULL,
        status TEXT DEFAULT 'pending' NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS priority_content (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        url TEXT NOT NULL,
        content_type content_type NOT NULL,
        goal goal_type NOT NULL,
        status status DEFAULT 'Active' NOT NULL,
        target_keyword TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS domains (
        id SERIAL PRIMARY KEY,
        domain TEXT NOT NULL UNIQUE,
        dr_score INTEGER,
        monthly_traffic TEXT,
        price INTEGER,
        link_type link_type NOT NULL,
        is_selected BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        date TIMESTAMP DEFAULT NOW(),
        domain TEXT NOT NULL,
        domain_rating INTEGER,
        link_from TEXT NOT NULL,
        link_to TEXT NOT NULL,
        anchor_text TEXT,
        status link_status DEFAULT 'Planned' NOT NULL,
        type link_type NOT NULL,
        price INTEGER,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS campaigns (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        goal TEXT,
        budget INTEGER,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS campaign_domains (
        id SERIAL PRIMARY KEY,
        campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
        domain_id INTEGER REFERENCES domains(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    
    console.log("Migration completed successfully");
    
    // Seed some sample domain data if the domains table is empty
    const [domainCount] = await db.select({ count: sql<number>`count(*)` }).from(domains);
    
    if (!domainCount || domainCount.count === 0) {
      const sampleDomains = [
        { domain: "example1.com", drScore: 65, monthlyTraffic: "50K", price: 200, linkType: "Editorial" as const },
        { domain: "example2.com", drScore: 72, monthlyTraffic: "120K", price: 350, linkType: "Guest Post" as const },
        { domain: "example3.com", drScore: 55, monthlyTraffic: "30K", price: 150, linkType: "Editorial" as const },
        { domain: "example4.com", drScore: 81, monthlyTraffic: "200K", price: 500, linkType: "Guest Post" as const },
        { domain: "example5.com", drScore: 60, monthlyTraffic: "75K", price: 250, linkType: "Editorial" as const },
        { domain: "example6.com", drScore: 68, monthlyTraffic: "90K", price: 300, linkType: "Guest Post" as const },
        { domain: "example7.com", drScore: 45, monthlyTraffic: "25K", price: 120, linkType: "Editorial" as const },
        { domain: "example8.com", drScore: 75, monthlyTraffic: "150K", price: 400, linkType: "Guest Post" as const }
      ];
      
      // Insert sample domains
      await db.insert(domains).values(sampleDomains);
      console.log("Sample domains seeded successfully");
    }
    
  } catch (error) {
    console.error("Migration error:", error);
    throw error;
  } finally {
    console.log("Migration process complete");
  }
}

// Run the migration
migrateSchema()
  .catch(console.error)
  .finally(() => {
    // Close the database connection
    pool.end();
  });