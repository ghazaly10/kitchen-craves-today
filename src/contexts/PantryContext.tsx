
import React, { createContext, useContext, ReactNode } from 'react';
import { usePantryItems, useAddPantryItem, useRemovePantryItem, useClearPantry } from '@/hooks/usePantryItems';

interface PantryContextType {
  ingredients: string[];
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
  clearPantry: () => void;
  isLoading: boolean;
  error: Error | null;
}

const PantryContext = createContext<PantryContextType | undefined>(undefined);

export const usePantry = () => {
  const context = useContext(PantryContext);
  if (!context) {
    throw new Error('usePantry must be used within a PantryProvider');
  }
  return context;
};

interface PantryProviderProps {
  children: ReactNode;
}

export const PantryProvider: React.FC<PantryProviderProps> = ({ children }) => {
  const { data: pantryItems = [], isLoading, error } = usePantryItems();
  const addPantryItemMutation = useAddPantryItem();
  const removePantryItemMutation = useRemovePantryItem();
  const clearPantryMutation = useClearPantry();

  const ingredients = pantryItems.map(item => item.ingredient);

  const addIngredient = (ingredient: string) => {
    addPantryItemMutation.mutate(ingredient);
  };

  const removeIngredient = (ingredient: string) => {
    removePantryItemMutation.mutate(ingredient);
  };

  const clearPantry = () => {
    clearPantryMutation.mutate();
  };

  return (
    <PantryContext.Provider value={{
      ingredients,
      addIngredient,
      removeIngredient,
      clearPantry,
      isLoading,
      error: error as Error | null,
    }}>
      {children}
    </PantryContext.Provider>
  );
};
