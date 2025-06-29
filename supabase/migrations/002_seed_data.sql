-- Insert sample recipes based on the existing data structure
INSERT INTO recipes (name, description, ingredients, instructions, cooking_time, difficulty, tags) VALUES
(
  'Classic Scrambled Eggs',
  'Fluffy and creamy scrambled eggs perfect for any time of day',
  ARRAY['eggs', 'butter', 'salt', 'pepper'],
  ARRAY[
    'Crack eggs into a bowl and whisk until combined',
    'Heat butter in a non-stick pan over medium-low heat',
    'Pour in eggs and gently stir continuously',
    'Season with salt and pepper before serving'
  ],
  '5 minutes',
  'Easy',
  ARRAY['breakfast', 'quick', 'protein']
),
(
  'Simple Pasta Aglio e Olio',
  'Classic Italian pasta with garlic and olive oil',
  ARRAY['pasta', 'garlic', 'olive oil', 'salt', 'pepper'],
  ARRAY[
    'Cook pasta according to package directions',
    'Heat olive oil in a large pan',
    'Add sliced garlic and cook until golden',
    'Toss drained pasta with the garlic oil',
    'Season with salt and pepper'
  ],
  '15 minutes',
  'Easy',
  ARRAY['dinner', 'italian', 'vegetarian']
),
(
  'Chicken Rice Bowl',
  'Hearty bowl with seasoned chicken and rice',
  ARRAY['chicken', 'rice', 'onion', 'garlic', 'salt', 'pepper'],
  ARRAY[
    'Cook rice according to package directions',
    'Season chicken with salt and pepper',
    'Cook chicken in a pan until golden brown',
    'Sauté diced onion and garlic',
    'Serve chicken over rice with sautéed vegetables'
  ],
  '25 minutes',
  'Medium',
  ARRAY['dinner', 'protein', 'filling']
),
(
  'Fresh Garden Salad',
  'Crisp salad with fresh vegetables',
  ARRAY['lettuce', 'tomato', 'cucumber', 'onion', 'olive oil'],
  ARRAY[
    'Wash and chop lettuce into bite-sized pieces',
    'Dice tomatoes and cucumber',
    'Thinly slice onion',
    'Combine all vegetables in a large bowl',
    'Drizzle with olive oil and toss'
  ],
  '10 minutes',
  'Easy',
  ARRAY['lunch', 'healthy', 'vegetarian', 'fresh']
),
(
  'Cheesy Omelet',
  'Fluffy omelet filled with melted cheese',
  ARRAY['eggs', 'cheese', 'butter', 'salt', 'pepper'],
  ARRAY[
    'Beat eggs with salt and pepper',
    'Heat butter in a non-stick pan',
    'Pour in eggs and let set on bottom',
    'Add cheese to one half of the omelet',
    'Fold omelet in half and slide onto plate'
  ],
  '8 minutes',
  'Medium',
  ARRAY['breakfast', 'cheese', 'protein']
),
(
  'Garlic Butter Toast',
  'Crispy toast with aromatic garlic butter',
  ARRAY['bread', 'butter', 'garlic', 'salt'],
  ARRAY[
    'Mix softened butter with minced garlic and salt',
    'Spread garlic butter on bread slices',
    'Toast in oven or toaster until golden brown',
    'Serve immediately while warm'
  ],
  '5 minutes',
  'Easy',
  ARRAY['breakfast', 'snack', 'garlic']
);
