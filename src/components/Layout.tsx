import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Shield } from 'lucide-react';
import { useGameStore } from '../context/GameStoreContext';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { state, dispatch } = useGameStore();
  const location = useLocation();
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/search', label: 'Search' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/links', label: 'Links' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Navigation */}
      <nav className="bg-black/80 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/home" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GS</span>
              </div>
              <span className="text-white font-bold text-xl">GameStore</span>
            </Link>

            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-purple-400 bg-purple-900/50'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/order"
                className="relative p-2 text-gray-300 hover:text-white transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {state.user ? (
                <div className="flex items-center space-x-2">
                  {state.user.isAdmin && (
                    <Link
                      to="/admin"
                      className="p-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <Shield className="w-5 h-5" />
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="p-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-gray-300">{state.user.name}</span>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-md border-t border-purple-500/20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 GameStore. This is a student project for educational purposes only.</p>
            <p className="mt-2 text-sm">Not a commercial website. No actual transactions are processed.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}