
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, Wheat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import ProfileDropdown from '@/components/ProfileDropdown';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and site name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Wheat className="h-8 w-8 text-farm-green" />
              <span className="ml-2 text-xl font-bold text-farm-green">Farm2Market</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-farm-green font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-farm-green font-medium">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-farm-green font-medium">
              About
            </Link>
          </nav>

          {/* Auth buttons or user menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to={user?.role === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard'}>
                  <Button variant="ghost" className="text-gray-700 hover:text-farm-green">
                    Dashboard
                  </Button>
                </Link>
                {user?.role === 'buyer' && (
                  <Link to="/cart">
                    <Button variant="ghost" className="relative p-2">
                      <ShoppingBag size={20} />
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-farm-green rounded-full">
                        0
                      </span>
                    </Button>
                  </Link>
                )}
                <ProfileDropdown />
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="ghost" className="text-gray-700 hover:text-farm-green">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-farm-green hover:bg-farm-green-dark text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isAuthenticated && <ProfileDropdown />}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center ml-2 p-2 rounded-md text-gray-700 hover:text-farm-green hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-farm-green"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-farm-green hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-farm-green hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-farm-green hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="space-y-1">
                  <Link
                    to={user?.role === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard'}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-farm-green hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {user?.role === 'buyer' && (
                    <Link
                      to="/cart"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-farm-green hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Cart
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-farm-green hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-farm-green hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <Link
                    to="/signin"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-farm-green hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-green bg-gray-100 hover:bg-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
