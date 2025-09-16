# GrowthOG Website

## Overview

This is a B2B SaaS link building and SEO services website built with Next.js, focusing on serving SaaS companies at different growth stages. The platform combines content marketing through blog posts and case studies with lead generation and client dashboard functionality. It serves as both a marketing website and a client management portal for link building campaigns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses Next.js with a pages-based router for server-side rendering and static generation. The UI is built with React components using Tailwind CSS for styling, with a component-based architecture organized into layout, UI, and feature-specific components. The design system uses a custom color palette with primary (teal) and secondary (gray) colors, custom fonts (Inter and Lexend), and responsive design patterns.

### Content Management Strategy
The site implements a hybrid content approach combining WordPress headless CMS integration and mock data. WordPress content is fetched via REST API for blog posts and case studies, with caching mechanisms and sitemap generation. Local mock data serves as fallback and for development purposes.

### Authentication System
The authentication system uses a dual approach combining Supabase magic link authentication for full users and a temporary localStorage-based system for lead capture. The AuthContext manages user state across the application, handling both authenticated Supabase users and temporary sessions for leads who provide name/email without full authentication.

### Database Design
The system uses Drizzle ORM with PostgreSQL for database operations. The primary `users` table supports both Supabase-authenticated users (with supabaseId) and temporary lead users (without supabaseId), storing name, email, creation timestamps, and login tracking.

### Route Protection and Navigation
Protected routes like `/dashboard/` require authentication, with automatic redirects to `/auth/` for unauthenticated users. The navigation system supports multi-step modals, sidebar navigation, and tab-based interfaces. The dashboard includes multiple sections: Priority Content, Campaign Builder, Link Progress, Link Domains, and Settings.

## External Dependencies

### Authentication Services
- **Supabase**: Provides magic link authentication, user management, and session handling
- **@supabase/auth-helpers-nextjs**: Next.js-specific Supabase integration helpers
- **@supabase/auth-helpers-react**: React components and hooks for Supabase auth

### Email Services
- **SendGrid (@sendgrid/mail)**: Handles transactional emails including magic link delivery and notifications

### Content Management
- **WordPress REST API**: Headless WordPress integration for blog posts and case studies
- **Cheerio**: HTML parsing for content extraction and manipulation

### UI Framework
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **@tailwindcss/typography**: Enhanced typography styling for content
- **@tailwindcss/forms**: Form styling components
- **@headlessui/react**: Unstyled, accessible UI components
- **@heroicons/react**: SVG icon library

### Database and ORM
- **Drizzle ORM**: Type-safe SQL query builder and ORM
- **PostgreSQL (pg)**: Primary database system
- **Drizzle-kit**: Database migration and schema management tools

### Session Management
- **Express**: Server framework for custom API routes
- **Express-session**: Session middleware for temporary user management
- **Passport**: Authentication middleware with local strategy support
- **connect-pg-simple**: PostgreSQL-based session store