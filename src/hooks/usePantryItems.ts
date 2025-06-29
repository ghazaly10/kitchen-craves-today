import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';
import { toast } from '@/hooks/use-toast';
import { useAuthContext } from '@/contexts/AuthContext';

export type PantryItem = Tables<'pantry_items'>;
export type PantryItemInsert = TablesInsert<'pantry_items'>;

export const usePantryItems = () => {
  const { user } = useAuthContext();
  const userId = user?.id || 'anonymous';

  return useQuery({
    queryKey: ['pantry-items', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pantry_items')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching pantry items:', error);
        throw error;
      }
      
      return data || [];
    },
  });
};

export const useAddPantryItem = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const userId = user?.id || 'anonymous';
  
  return useMutation({
    mutationFn: async (ingredient: string) => {
      const normalizedIngredient = ingredient.toLowerCase().trim();
      
      // Check if the ingredient already exists
      const { data: existing, error: checkError } = await supabase
        .from('pantry_items')
        .select('id')
        .eq('user_id', userId)
        .eq('ingredient', normalizedIngredient)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
        throw checkError;
      }
      
      if (existing) {
        throw new Error('Ingredient already exists in pantry');
      }
      
      const { data, error } = await supabase
        .from('pantry_items')
        .insert({
          user_id: userId,
          ingredient: normalizedIngredient,
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error adding pantry item:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pantry-items', userId] });
      toast({
        title: "Success",
        description: "Ingredient added to pantry!",
      });
    },
    onError: (error) => {
      console.error('Error adding pantry item:', error);
      const message = error.message === 'Ingredient already exists in pantry' 
        ? "This ingredient is already in your pantry."
        : "Failed to add ingredient. Please try again.";
      
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
  });
};

export const useRemovePantryItem = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const userId = user?.id || 'anonymous';
  
  return useMutation({
    mutationFn: async (ingredient: string) => {
      const { error } = await supabase
        .from('pantry_items')
        .delete()
        .eq('user_id', userId)
        .eq('ingredient', ingredient);
      
      if (error) {
        console.error('Error removing pantry item:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pantry-items', userId] });
      toast({
        title: "Success",
        description: "Ingredient removed from pantry!",
      });
    },
    onError: (error) => {
      console.error('Error removing pantry item:', error);
      toast({
        title: "Error",
        description: "Failed to remove ingredient. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useClearPantry = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const userId = user?.id || 'anonymous';
  
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('pantry_items')
        .delete()
        .eq('user_id', userId);
      
      if (error) {
        console.error('Error clearing pantry:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pantry-items', userId] });
      toast({
        title: "Success",
        description: "Pantry cleared successfully!",
      });
    },
    onError: (error) => {
      console.error('Error clearing pantry:', error);
      toast({
        title: "Error",
        description: "Failed to clear pantry. Please try again.",
        variant: "destructive",
      });
    },
  });
};
