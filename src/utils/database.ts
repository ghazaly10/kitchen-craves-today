import { supabase } from '@/integrations/supabase/client';
import { recipes as localRecipes } from '@/data/recipes';

// Function to migrate local recipes to Supabase
export const migrateRecipesToDatabase = async () => {
  try {
    console.log('Starting recipe migration...');
    
    const recipesForDb = localRecipes.map(recipe => ({
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      cooking_time: recipe.cookingTime,
      difficulty: recipe.difficulty as 'Easy' | 'Medium' | 'Hard',
      tags: recipe.tags,
    }));

    const { data, error } = await supabase
      .from('recipes')
      .insert(recipesForDb)
      .select();

    if (error) {
      console.error('Error migrating recipes:', error);
      return { success: false, error };
    }

    console.log(`Successfully migrated ${data.length} recipes to database`);
    return { success: true, data };
  } catch (error) {
    console.error('Migration failed:', error);
    return { success: false, error };
  }
};

// Function to check database connection
export const testDatabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('count', { count: 'exact', head: true });

    if (error) {
      console.error('Database connection failed:', error);
      return { success: false, error };
    }

    console.log('Database connection successful');
    return { success: true, count: data };
  } catch (error) {
    console.error('Database connection test failed:', error);
    return { success: false, error };
  }
};

// Function to clear all data (useful for development)
export const clearAllData = async () => {
  try {
    console.log('Clearing all data...');
    
    // Clear pantry items
    const { error: pantryError } = await supabase
      .from('pantry_items')
      .delete()
      .gte('id', '0');

    if (pantryError) {
      console.error('Error clearing pantry items:', pantryError);
    }

    // Clear recipes
    const { error: recipesError } = await supabase
      .from('recipes')
      .delete()
      .gte('id', '0');

    if (recipesError) {
      console.error('Error clearing recipes:', recipesError);
    }

    console.log('All data cleared successfully');
    return { success: true };
  } catch (error) {
    console.error('Error clearing data:', error);
    return { success: false, error };
  }
};
