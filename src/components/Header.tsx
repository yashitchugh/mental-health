import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-emerald-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Humonix
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors">Features</a>
            <a href="#community" className="text-gray-700 hover:text-emerald-600 transition-colors">Community-Built on Bolt</a>
            <a href="#about" className="text-gray-700 hover:text-emerald-600 transition-colors">About</a>
            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Join Beta
            </button>
          </nav>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-emerald-600" /> : <Menu className="w-6 h-6 text-emerald-600" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-emerald-100">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors">Features</a>
              <a href="#community" className="text-gray-700 hover:text-emerald-600 transition-colors">Community</a>
              <a href="#about" className="text-gray-700 hover:text-emerald-600 transition-colors">About</a>
              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 w-full">
                Join Beta
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;