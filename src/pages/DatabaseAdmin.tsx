import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { testDatabaseConnection, migrateRecipesToDatabase, clearAllData } from '@/utils/database';
import { useRecipes } from '@/hooks/useRecipes';
import { usePantryItems } from '@/hooks/usePantryItems';
import { Database, Trash2, Upload, RefreshCw } from 'lucide-react';

const DatabaseAdmin = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const { toast } = useToast();
  const { data: recipes = [], refetch: refetchRecipes } = useRecipes();
  const { data: pantryItems = [], refetch: refetchPantry } = usePantryItems();

  const handleTestConnection = async () => {
    setIsConnecting(true);
    try {
      const result = await testDatabaseConnection();
      if (result.success) {
        toast({
          title: "Connection Successful",
          description: "Database is connected and working properly.",
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Could not connect to the database. Check your configuration.",
          variant: "destructive",
        });
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const handleMigrateRecipes = async () => {
    setIsMigrating(true);
    try {
      const result = await migrateRecipesToDatabase();
      if (result.success) {
        toast({
          title: "Migration Successful",
          description: `Migrated ${result.data?.length || 0} recipes to the database.`,
        });
        refetchRecipes();
      } else {
        toast({
          title: "Migration Failed",
          description: "Could not migrate recipes to the database.",
          variant: "destructive",
        });
      }
    } finally {
      setIsMigrating(false);
    }
  };

  const handleClearData = async () => {
    if (!confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      return;
    }

    setIsClearing(true);
    try {
      const result = await clearAllData();
      if (result.success) {
        toast({
          title: "Data Cleared",
          description: "All data has been cleared from the database.",
        });
        refetchRecipes();
        refetchPantry();
      } else {
        toast({
          title: "Clear Failed",
          description: "Could not clear data from the database.",
          variant: "destructive",
        });
      }
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Database Administration</h1>
          <p className="text-muted-foreground">
            Manage your Supabase database connection and data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Database Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Status
              </CardTitle>
              <CardDescription>
                Current database statistics and connection status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Recipes in Database:</span>
                <Badge variant="outline">{recipes.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Pantry Items:</span>
                <Badge variant="outline">{pantryItems.length}</Badge>
              </div>
              <Button 
                onClick={handleTestConnection} 
                disabled={isConnecting}
                className="w-full"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Testing Connection...
                  </>
                ) : (
                  <>
                    <Database className="mr-2 h-4 w-4" />
                    Test Connection
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Database Actions</CardTitle>
              <CardDescription>
                Manage your data and perform administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={handleMigrateRecipes} 
                disabled={isMigrating}
                className="w-full"
                variant="outline"
              >
                {isMigrating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Migrating...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Migrate Local Recipes
                  </>
                )}
              </Button>
              
              <Button 
                onClick={handleClearData} 
                disabled={isClearing}
                className="w-full"
                variant="destructive"
              >
                {isClearing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Clearing...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All Data
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
            <CardDescription>
              How to set up your Supabase database
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm space-y-2">
              <h4 className="font-medium">1. Create Tables</h4>
              <p className="text-muted-foreground">
                Run the SQL migration files in your Supabase SQL editor:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4">
                <li><code>supabase/migrations/001_initial_schema.sql</code></li>
                <li><code>supabase/migrations/002_seed_data.sql</code></li>
              </ul>
            </div>
            
            <div className="text-sm space-y-2">
              <h4 className="font-medium">2. Test Connection</h4>
              <p className="text-muted-foreground">
                Click "Test Connection" to verify your database is set up correctly.
              </p>
            </div>
            
            <div className="text-sm space-y-2">
              <h4 className="font-medium">3. Optional: Migrate Local Data</h4>
              <p className="text-muted-foreground">
                If you want to use the local recipe data instead of the seeded data, 
                click "Migrate Local Recipes" (after clearing the existing data if needed).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatabaseAdmin;
