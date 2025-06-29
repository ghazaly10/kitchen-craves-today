# Supabase Database Setup Guide

This guide will walk you through setting up your Supabase database for the Kitchen Craves Today application.

## Prerequisites

- A Supabase account ([sign up here](https://supabase.com))
- Access to your Supabase project dashboard

## Step 1: Access Your Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to your project: `rrhfikcdctegkcxihfqc`
3. Click on the SQL Editor from the left sidebar

## Step 2: Run Database Migrations

### Migration 1: Initial Schema

Copy and paste the contents of `supabase/migrations/001_initial_schema.sql` into the SQL Editor and execute it.

This migration will:
- Create the `difficulty_level` enum type
- Create the `recipes` table with all necessary columns
- Create the `pantry_items` table for storing user ingredients
- Set up indexes for better query performance
- Enable Row Level Security (RLS)
- Create security policies for data access
- Set up automatic timestamp updating

### Migration 2: Seed Data

Copy and paste the contents of `supabase/migrations/002_seed_data.sql` into the SQL Editor and execute it.

This migration will:
- Insert 6 sample recipes into the database
- Provide initial data to test the application

## Step 3: Verify Setup

After running both migrations, you should see:

1. **Tables created:**
   - `recipes` - Contains recipe information
   - `pantry_items` - Contains user pantry ingredients

2. **Sample data:**
   - 6 recipes ranging from Easy to Medium difficulty
   - Various recipe types (breakfast, dinner, snacks)

## Step 4: Test Connection

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:8080/admin`
3. Click "Test Connection" to verify everything is working
- 🎯 Real-time data synchronization
- 🔧 Database administration interface

## Setup Instructions

### 1. Prerequisites

- Node.js (v18 or higher)
- A Supabase account and project

### 2. Environment Configuration

1. Copy the `.env.local` file that has been created for you
2. Update the Supabase URL and API key if needed:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 3. Database Setup

1. **Create the database tables:**
   - Open your Supabase project dashboard
   - Go to the SQL Editor
   - Run the migration files in order:
     - `supabase/migrations/001_initial_schema.sql`
     - `supabase/migrations/002_seed_data.sql`

2. **Verify the setup:**
   - Navigate to `/admin` in your app
   - Click "Test Connection" to verify the database connection
   - You should see sample recipes and be able to add pantry items

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Application

```bash
npm run dev
```

## Database Schema

### Tables

#### `recipes`
- `id` (UUID, Primary Key)
- `name` (Text)
- `description` (Text)
- `ingredients` (Text Array)
- `instructions` (Text Array)
- `cooking_time` (Text)
- `difficulty` (Enum: Easy, Medium, Hard)
- `tags` (Text Array)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

#### `pantry_items`
- `id` (UUID, Primary Key)
- `user_id` (Text)
- `ingredient` (Text)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Features

- **Row Level Security (RLS)** enabled for both tables
- **Indexes** for performance optimization
- **Triggers** for automatic timestamp updates
- **Unique constraints** to prevent duplicate pantry items

## Usage

### Managing Your Pantry

1. Navigate to "My Pantry" (`/pantry`)
2. Add ingredients you have available
3. Remove ingredients when you run out
4. Clear your entire pantry when needed

### Finding Recipes

1. Navigate to "Find Recipes" (`/recipes`)
2. View recipes sorted by how many ingredients you have
3. See detailed ingredient matching
4. Recipes you can make completely are highlighted
5. View full recipe details including instructions

### Database Administration

1. Navigate to "Database" (`/admin`)
2. Check connection status
3. View current data statistics
4. Migrate local recipe data if needed
5. Clear all data for testing

## Development

### Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (PantryContext)
├── hooks/              # Custom hooks for database operations
├── integrations/       # Supabase client and types
├── pages/              # Page components
├── utils/              # Utility functions
└── data/               # Local data (for migration)
```

### Key Files

- `src/integrations/supabase/client.ts` - Supabase client configuration
- `src/integrations/supabase/types.ts` - TypeScript types for database
- `src/hooks/useRecipes.ts` - Recipe database operations
- `src/hooks/usePantryItems.ts` - Pantry database operations
- `src/contexts/PantryContext.tsx` - Pantry state management
- `src/utils/database.ts` - Database utility functions

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Features in Detail

### Recipe Matching Algorithm

The app calculates recipe match percentages based on:
- Ingredients you have available in your pantry
- Total ingredients required for each recipe
- Displays match percentage and highlights recipes you can make completely

### Real-time Updates

- Pantry changes are immediately reflected in recipe matching
- Database changes are synchronized across all components
- Optimistic updates with error handling

### Error Handling

- Comprehensive error handling for database operations
- User-friendly error messages
- Automatic retry mechanisms where appropriate

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check your environment variables
   - Verify your Supabase project is active
   - Ensure RLS policies are correctly set up

2. **No Recipes Showing**
   - Run the migration scripts in the correct order
   - Check if data was properly seeded
   - Use the admin interface to verify data exists

3. **Pantry Items Not Saving**
   - Check browser console for errors
   - Verify the pantry_items table exists
   - Ensure RLS policies allow anonymous access

### Getting Help

- Check the browser console for detailed error messages
- Use the database admin interface to test connectivity
- Verify your Supabase project configuration

## Technology Stack

- **Frontend:** React, TypeScript, Vite
- **UI Components:** Radix UI, Tailwind CSS
- **State Management:** React Query, React Context
- **Database:** Supabase (PostgreSQL)
- **Routing:** React Router
- **Build Tool:** Vite

## License

This project is licensed under the MIT License.
