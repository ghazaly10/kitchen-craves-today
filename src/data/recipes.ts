
export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
}

export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Classic Scrambled Eggs',
    description: 'Fluffy and creamy scrambled eggs perfect for any time of day',
    ingredients: ['eggs', 'butter', 'salt', 'pepper'],
    instructions: [
      'Crack eggs into a bowl and whisk until combined',
      'Heat butter in a non-stick pan over medium-low heat',
      'Pour in eggs and gently stir continuously',
      'Season with salt and pepper before serving'
    ],
    cookingTime: '5 minutes',
    difficulty: 'Easy',
    tags: ['breakfast', 'quick', 'protein']
  },
  {
    id: '2',
    name: 'Simple Pasta Aglio e Olio',
    description: 'Classic Italian pasta with garlic and olive oil',
    ingredients: ['pasta', 'garlic', 'olive oil', 'salt', 'pepper'],
    instructions: [
      'Cook pasta according to package directions',
      'Heat olive oil in a large pan',
      'Add sliced garlic and cook until golden',
      'Toss drained pasta with the garlic oil',
      'Season with salt and pepper'
    ],
    cookingTime: '15 minutes',
    difficulty: 'Easy',
    tags: ['dinner', 'italian', 'vegetarian']
  },
  {
    id: '3',
    name: 'Chicken Rice Bowl',
    description: 'Hearty bowl with seasoned chicken and rice',
    ingredients: ['chicken', 'rice', 'onion', 'garlic', 'salt', 'pepper'],
    instructions: [
      'Cook rice according to package directions',
      'Season chicken with salt and pepper',
      'Cook chicken in a pan until golden brown',
      'Sauté diced onion and garlic',
      'Serve chicken over rice with sautéed vegetables'
    ],
    cookingTime: '25 minutes',
    difficulty: 'Medium',
    tags: ['dinner', 'protein', 'filling']
  },
  {
    id: '4',
    name: 'Fresh Garden Salad',
    description: 'Crisp salad with fresh vegetables',
    ingredients: ['lettuce', 'tomato', 'cucumber', 'onion', 'olive oil'],
    instructions: [
      'Wash and chop lettuce into bite-sized pieces',
      'Dice tomatoes and cucumber',
      'Thinly slice onion',
      'Combine all vegetables in a large bowl',
      'Drizzle with olive oil and toss'
    ],
    cookingTime: '10 minutes',
    difficulty: 'Easy',
    tags: ['lunch', 'healthy', 'vegetarian', 'fresh']
  },
  {
    id: '5',
    name: 'Cheesy Omelet',
    description: 'Fluffy omelet filled with melted cheese',
    ingredients: ['eggs', 'cheese', 'butter', 'salt', 'pepper'],
    instructions: [
      'Beat eggs with salt and pepper',
      'Heat butter in a non-stick pan',
      'Pour in eggs and let set on bottom',
      'Add cheese to one half of the omelet',
      'Fold omelet in half and slide onto plate'
    ],
    cookingTime: '8 minutes',
    difficulty: 'Medium',
    tags: ['breakfast', 'cheese', 'protein']
  },
  {
    id: '6',
    name: 'Garlic Butter Toast',
    description: 'Crispy toast with aromatic garlic butter',
    ingredients: ['bread', 'butter', 'garlic', 'salt'],
    instructions: [
      'Mix softened butter with minced garlic and salt',
      'Spread garlic butter on bread slices',
      'Toast in oven or toaster until golden',
      'Serve warm'
    ],
    cookingTime: '5 minutes',
    difficulty: 'Easy',
    tags: ['snack', 'quick', 'garlic']
  }
];
