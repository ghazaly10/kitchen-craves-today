
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChefHat } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        {/* Hero Section */}
        <div className="fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-200 to-green-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <ChefHat size={48} className="text-green-700" />
          </div>
          
          <h1 className="text-6xl font-bold text-gray-800 mb-6 leading-tight">
            What's in My Kitchen?
          </h1>
          
          <p className="text-2xl text-gray-600 mb-12 font-medium">
            Turn your fridge into a feast!
          </p>
          
          <Button 
            asChild 
            size="lg" 
            className="text-xl px-12 py-6 h-auto bg-gradient-to-r from-yellow-400 to-green-400 hover:from-yellow-500 hover:to-green-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Link to="/pantry">
              Start Cooking
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
