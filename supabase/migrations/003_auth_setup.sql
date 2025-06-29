-- Authentication setup for Supabase
-- Run this in your Supabase SQL Editor AFTER the initial schema

-- Update RLS policies to work with authenticated users
DROP POLICY IF EXISTS "Users can view their own pantry items" ON pantry_items;
DROP POLICY IF EXISTS "Users can insert their own pantry items" ON pantry_items;
DROP POLICY IF EXISTS "Users can update their own pantry items" ON pantry_items;
DROP POLICY IF EXISTS "Users can delete their own pantry items" ON pantry_items;

-- Create new policies for pantry_items that work with auth
CREATE POLICY "Users can view their own pantry items" ON pantry_items
  FOR SELECT USING (
    auth.uid()::text = user_id OR 
    (auth.uid() IS NULL AND user_id = 'anonymous')
  );

CREATE POLICY "Users can insert their own pantry items" ON pantry_items
  FOR INSERT WITH CHECK (
    auth.uid()::text = user_id OR 
    (auth.uid() IS NULL AND user_id = 'anonymous')
  );

CREATE POLICY "Users can update their own pantry items" ON pantry_items
  FOR UPDATE USING (
    auth.uid()::text = user_id OR 
    (auth.uid() IS NULL AND user_id = 'anonymous')
  );

CREATE POLICY "Users can delete their own pantry items" ON pantry_items
  FOR DELETE USING (
    auth.uid()::text = user_id OR 
    (auth.uid() IS NULL AND user_id = 'anonymous')
  );

-- Keep recipes public for now (you can make these user-specific later)
-- The existing recipe policies should work fine

-- Optional: Create a user profiles table for additional user data
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (id)
);

-- Enable RLS for user profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user profiles
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create a trigger to automatically create a user profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
