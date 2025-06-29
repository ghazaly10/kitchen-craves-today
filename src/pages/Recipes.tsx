
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { usePantry } from '@/contexts/PantryContext';
import { useRecipes, Recipe } from '@/hooks/useRecipes';
import { Clock, Users, ChefHat, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Recipes = () => {
  const { ingredients, isLoading: pantryLoading } = usePantry();
  const { data: recipes = [], isLoading: recipesLoading, error } = useRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const recipeMatches = useMemo(() => {
    if (!recipes || recipes.length === 0) return [];
    
    return recipes.map(recipe => {
      const matchingIngredients = recipe.ingredients.filter(ingredient => 
        ingredients.includes(ingredient.toLowerCase())
      );
      const matchPercentage = matchingIngredients.length / recipe.ingredients.length;
      
      return {
        ...recipe,
        matchingIngredients,
        matchPercentage,
        canMake: matchPercentage === 1,
        cookingTime: recipe.cooking_time // Convert database field to frontend format
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [ingredients, recipes]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (recipesLoading || pantryLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Loader2 size={64} className="mx-auto text-muted-foreground mb-4 animate-spin" />
            <h1 className="text-3xl font-bold text-foreground mb-4">Loading Recipes...</h1>
            <p className="text-muted-foreground">Please wait while we fetch your recipes.</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ChefHat size={64} className="mx-auto text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-4">Error Loading Recipes</h1>
            <p className="text-muted-foreground mb-8">
              There was an error loading recipes from the database. Please try again later.
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  if (ingredients.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ChefHat size={64} className="mx-auto text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-4">No Ingredients Yet</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Add some ingredients to your pantry first, then we'll show you recipes you can make!
            </p>
            <Button asChild size="lg">
              <Link to="/pantry">Add Ingredients to My Pantry</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Recipe Suggestions</h1>
          <p className="text-muted-foreground">
            Based on your {ingredients.length} ingredients: {ingredients.slice(0, 3).join(', ')}
            {ingredients.length > 3 && ` and ${ingredients.length - 3} more`}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipeMatches.map((recipe) => (
            <Card 
              key={recipe.id} 
              className={`hover:shadow-lg transition-all duration-300 ${
                recipe.canMake ? 'ring-2 ring-primary/20 bg-primary/5' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{recipe.name}</CardTitle>
                  {recipe.canMake && (
                    <Badge className="bg-primary text-primary-foreground">
                      Can Make!
                    </Badge>
                  )}
                </div>
                <CardDescription>{recipe.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Recipe Info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      {recipe.cookingTime}
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(recipe.difficulty)}>
                      {recipe.difficulty}
                    </Badge>
                  </div>

                  {/* Ingredient Match */}
                  <div>
                    <p className="text-sm font-medium mb-2">
                      You have {recipe.matchingIngredients.length} of {recipe.ingredients.length} ingredients
                    </p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${recipe.matchPercentage * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {recipe.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* View Recipe Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full" 
                        variant={recipe.canMake ? "default" : "outline"}
                        onClick={() => setSelectedRecipe(recipe)}
                      >
                        View Recipe
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      {selectedRecipe && (
                        <>
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{selectedRecipe.name}</DialogTitle>
                            <DialogDescription className="text-base">
                              {selectedRecipe.description}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-6">
                            {/* Recipe Info */}
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock size={16} />
                                {selectedRecipe.cookingTime}
                              </div>
                              <Badge className={getDifficultyColor(selectedRecipe.difficulty)}>
                                {selectedRecipe.difficulty}
                              </Badge>
                            </div>

                            {/* Ingredients */}
                            <div>
                              <h3 className="font-semibold text-lg mb-3">Ingredients</h3>
                              <ul className="space-y-2">
                                {selectedRecipe.ingredients.map((ingredient, index) => (
                                  <li 
                                    key={index} 
                                    className={`flex items-center gap-2 ${
                                      ingredients.includes(ingredient.toLowerCase()) 
                                        ? 'text-primary font-medium' 
                                        : 'text-muted-foreground'
                                    }`}
                                  >
                                    <span className={`w-2 h-2 rounded-full ${
                                      ingredients.includes(ingredient.toLowerCase()) 
                                        ? 'bg-primary' 
                                        : 'bg-muted'
                                    }`} />
                                    {ingredient}
                                    {ingredients.includes(ingredient.toLowerCase()) && (
                                      <span className="text-xs text-primary">(you have this)</span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Instructions */}
                            <div>
                              <h3 className="font-semibold text-lg mb-3">Instructions</h3>
                              <ol className="space-y-3">
                                {selectedRecipe.instructions.map((step, index) => (
                                  <li key={index} className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                                      {index + 1}
                                    </span>
                                    <span className="text-muted-foreground">{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {recipeMatches.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No recipes found. Try adding more ingredients!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
