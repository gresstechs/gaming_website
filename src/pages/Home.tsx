import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Star, Users, Shield } from 'lucide-react';
import { useGameStore } from '../context/GameStoreContext';

export default function Home() {
  const { state } = useGameStore();
  const featuredGames = state.games.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome to GameStore
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover the latest and greatest games across all platforms. From indie gems to AAA blockbusters, 
            we have everything you need to fuel your gaming passion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              Browse Games
            </Link>
            <Link
              to="/search"
              className="px-8 py-4 bg-transparent border-2 border-purple-500 text-purple-400 font-bold rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300"
            >
              Search Library
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose GameStore?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-lg border border-purple-500/20">
              <Gamepad2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Vast Game Library</h3>
              <p className="text-gray-300">
                Over 10,000 games across all platforms and genres. From retro classics to the latest releases.
              </p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-lg border border-purple-500/20">
              <Star className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Quality Guaranteed</h3>
              <p className="text-gray-300">
                All games are carefully curated and tested. Read reviews from our gaming community.
              </p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-lg border border-purple-500/20">
              <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Secure & Safe</h3>
              <p className="text-gray-300">
                Your data is protected with enterprise-grade security. Safe transactions guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Featured Games</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredGames.map((game) => (
              <div key={game.id} className="bg-black/50 backdrop-blur-md rounded-lg overflow-hidden border border-purple-500/20 hover:border-purple-400 transition-all duration-300 group">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                  <p className="text-gray-300 mb-3 text-sm line-clamp-2">{game.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-400">${game.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-gray-300 text-sm">{game.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/products"
              className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
            >
              View All Games
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">10,000+</div>
              <div className="text-gray-300">Games Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">50,000+</div>
              <div className="text-gray-300">Happy Gamers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-gray-300">Customer Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}