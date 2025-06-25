
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, User, LogOut } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isAuthenticated?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange, isAuthenticated = false }) => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              LoanMitra
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Button
              variant={currentPage === 'home' ? 'default' : 'ghost'}
              onClick={() => onPageChange('home')}
              className="text-gray-700 hover:text-purple-600"
            >
              Home
            </Button>
            <Button
              variant={currentPage === 'upload' ? 'default' : 'ghost'}
              onClick={() => onPageChange('upload')}
              className="text-gray-700 hover:text-purple-600"
            >
              Upload Document
            </Button>
            <Button
              variant={currentPage === 'chat' ? 'default' : 'ghost'}
              onClick={() => onPageChange('chat')}
              className="text-gray-700 hover:text-purple-600"
            >
              Ask Questions
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => onPageChange('login')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
