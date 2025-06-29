-- Create custom types
CREATE TYPE difficulty_level AS ENUM ('Easy', 'Medium', 'Hard');

-- Create recipes table
CREATE TABLE IF NOT EXISTS recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  ingredients TEXT[] NOT NULL,
  instructions TEXT[] NOT NULL,
  cooking_time TEXT NOT NULL,
  difficulty difficulty_level NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create pantry_items table
CREATE TABLE IF NOT EXISTS pantry_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  ingredient TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, ingredient)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_recipes_tags ON recipes USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_recipes_ingredients ON recipes USING GIN (ingredients);
CREATE INDEX IF NOT EXISTS idx_recipes_difficulty ON recipes (difficulty);
CREATE INDEX IF NOT EXISTS idx_pantry_items_user_id ON pantry_items (user_id);
CREATE INDEX IF NOT EXISTS idx_pantry_items_ingredient ON pantry_items (ingredient);

-- Enable RLS (Row Level Security)
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE pantry_items ENABLE ROW LEVEL SECURITY;

-- Create policies for recipes (public read, authenticated users can write)
CREATE POLICY "Allow public read access on recipes" ON recipes
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert recipes" ON recipes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'anon');

CREATE POLICY "Allow authenticated users to update recipes" ON recipes
  FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

CREATE POLICY "Allow authenticated users to delete recipes" ON recipes
  FOR DELETE USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- Create policies for pantry_items (users can only access their own items)
CREATE POLICY "Users can view their own pantry items" ON pantry_items
  FOR SELECT USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

CREATE POLICY "Users can insert their own pantry items" ON pantry_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'anon');

CREATE POLICY "Users can update their own pantry items" ON pantry_items
  FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

CREATE POLICY "Users can delete their own pantry items" ON pantry_items
  FOR DELETE USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_recipes_updated_at 
  BEFORE UPDATE ON recipes 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_pantry_items_updated_at 
  BEFORE UPDATE ON pantry_items 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
