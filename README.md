# Kitchen Craves Today - Supabase Integration

A React-based kitchen management app that helps you track pantry ingredients and discover recipes you can make. Now integrated with Supabase for persistent data storage and user authentication.

**🔗 Live Demo:** [https://kitchen-craves-today.vercel.app](https://kitchen-craves-today.vercel.app)

## Features

- **🔐 User Authentication**: Secure signup/signin with email & password
- **🥄 Pantry Management**: Add and remove ingredients from your digital pantry
- **🍳 Recipe Discovery**: Find recipes based on available ingredients
- **📊 Recipe Matching**: See how many ingredients you have for each recipe
- **💾 Database Integration**: All data stored in Supabase for persistence
- **👤 User-Specific Data**: Each user has their own private pantry
- **🎨 Modern UI**: Built with React, TypeScript, and Tailwind CSS

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Radix UI, Tailwind CSS, shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Deployment**: Vercel

## Quick Start

### 1. Clone & Install

```sh
git clone https://github.com/ghazaly10/kitchen-craves-today.git
cd kitchen-craves-today
npm install
```

### 2. Environment Setup

```sh
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

1. Create a [Supabase](https://supabase.com) project
2. Go to SQL Editor in your Supabase dashboard
3. Run the migration files in order:

   **First: `supabase/migrations/001_initial_schema.sql`**
   **Then: `supabase/migrations/002_seed_data.sql`**
   **Finally: `supabase/migrations/003_auth_setup.sql`**

4. In Authentication settings, set your Site URL to your domain

### 4. Run Development Server

```sh
npm run dev
```

### 5. Build for Production

```sh
npm run build
```

## Database Schema

### Tables

1. **recipes** - Recipe information (shared among users)
2. **pantry_items** - User's pantry ingredients (private per user)
3. **user_profiles** - User profile information

### Security

- Row Level Security (RLS) enabled
- User-specific data isolation
- Secure authentication with Supabase Auth

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ghazaly10/kitchen-craves-today)

**Manual Deployment:**

1. Fork this repository
2. Connect your Vercel account to GitHub
3. Import the project to Vercel
4. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

### Environment Variables for Production

In Vercel dashboard, add these environment variables:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Available Routes

- `/` - Home page (authentication required)
- `/pantry` - Manage your pantry ingredients
- `/recipes` - Browse and discover recipes
- `/admin` - Database administration panel
- Authentication forms are shown automatically when not logged in

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── AuthForm.tsx    # Login/signup form
│   └── Navigation.tsx  # Main navigation
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication state
│   └── PantryContext.tsx # Pantry state
├── hooks/              # Custom hooks
│   ├── useAuth.ts      # Authentication hooks
│   ├── useRecipes.ts   # Recipe database operations
│   └── usePantryItems.ts # Pantry database operations
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
├── pages/              # Page components
└── utils/              # Utility functions

supabase/
└── migrations/         # Database migration files
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -am 'Add some feature'`
5. Push: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Supabase configuration
3. Ensure all migration files have been run
4. Create an issue on GitHub

---

**Built with ❤️ using React, Supabase, and Vercel**

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0e64603c-5841-47df-96d5-7358f6cdf26d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/0e64603c-5841-47df-96d5-7358f6cdf26d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
