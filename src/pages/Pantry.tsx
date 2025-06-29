
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePantry } from '@/contexts/PantryContext';
import { X, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pantry = () => {
  const { ingredients, addIngredient, removeIngredient, clearPantry } = usePantry();
  const [newIngredient, setNewIngredient] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const commonIngredients = [
    'tomato', 'egg', 'rice', 'onion', 'garlic', 'chicken', 'beef', 'pasta',
    'bread', 'milk', 'cheese', 'butter', 'olive oil', 'salt', 'pepper',
    'carrot', 'potato', 'lettuce', 'spinach', 'bell pepper', 'mushroom',
    'lemon', 'flour', 'sugar', 'yogurt', 'salmon', 'tuna', 'broccoli',
    'cucumber', 'avocado', 'banana', 'apple', 'orange', 'ginger', 'basil'
  ];

  const filteredSuggestions = commonIngredients.filter(ingredient =>
    ingredient.toLowerCase().includes(newIngredient.toLowerCase()) &&
    !ingredients.includes(ingredient.toLowerCase()) &&
    newIngredient.length > 0
  ).slice(0, 8);

  const handleAddIngredient = (ingredient: string) => {
    if (ingredient.trim()) {
      addIngredient(ingredient);
      setNewIngredient('');
      setShowSuggestions(false);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddIngredient(newIngredient);
  };

  const handleSuggestionClick = (ingredient: string) => {
    handleAddIngredient(ingredient);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Pantry</h1>
          <p className="text-muted-foreground">
            Enter your available ingredients to get personalized recipe suggestions
          </p>
        </div>

        {/* Add Ingredient Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus size={20} />
              Add Ingredients
            </CardTitle>
            <CardDescription>
              Type to search and add ingredients you have in your kitchen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <form onSubmit={handleInputSubmit} className="flex gap-2 mb-2">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Type an ingredient (e.g., tomato, egg, rice)..."
                    value={newIngredient}
                    onChange={(e) => {
                      setNewIngredient(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    onFocus={() => setShowSuggestions(newIngredient.length > 0)}
                    className="pr-10"
                  />
                  
                  {/* Auto-suggestions dropdown */}
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-md shadow-lg z-10 mt-1">
                      {filteredSuggestions.map((ingredient) => (
                        <button
                          key={ingredient}
                          type="button"
                          className="w-full text-left px-3 py-2 hover:bg-muted text-sm capitalize"
                          onClick={() => handleSuggestionClick(ingredient)}
                        >
                          {ingredient}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Button type="submit" disabled={!newIngredient.trim()}>
                  Add
                </Button>
              </form>
            </div>

            {/* Quick Add Common Ingredients */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Or quickly add common ingredients:</p>
              <div className="flex flex-wrap gap-2">
                {commonIngredients.slice(0, 10).map((ingredient) => (
                  <Button
                    key={ingredient}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddIngredient(ingredient)}
                    disabled={ingredients.includes(ingredient)}
                    className="text-xs capitalize"
                  >
                    {ingredient}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Ingredients */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Your Ingredients ({ingredients.length})</CardTitle>
              <CardDescription>
                Ingredients currently in your pantry
              </CardDescription>
            </div>
            {ingredients.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearPantry}
                className="text-destructive hover:text-destructive"
              >
                Clear All
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {ingredients.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  No ingredients added yet. Start by typing an ingredient name above!
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 mb-6">
                  {ingredients.map((ingredient) => (
                    <Badge 
                      key={ingredient} 
                      variant="secondary" 
                      className="px-3 py-1 text-sm flex items-center gap-2 capitalize"
                    >
                      {ingredient}
                      <button
                        onClick={() => removeIngredient(ingredient)}
                        className="hover:text-destructive transition-colors"
                        aria-label={`Remove ${ingredient}`}
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <Button asChild size="lg" className="px-8">
                    <Link to="/recipes">
                      Find Recipes
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pantry;
