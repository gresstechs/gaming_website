import React, { useState } from 'react';
import { Star, ShoppingCart, Filter } from 'lucide-react';
import { useGameStore } from '../context/GameStoreContext';

export default function Products() {
  const { state, dispatch } = useGameStore();
  const [sortBy, setSortBy] = useState('title');
  const [filterGenre, setFilterGenre] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');

  const addToCart = (game: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: game });
  };

  const filteredAndSortedGames = state.games
    .filter(game => filterGenre === 'all' || game.genre === filterGenre)
    .filter(game => filterPlatform === 'all' || game.platform.includes(filterPlatform))
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'release':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        default:
          return a.title.localeCompare(b.title);
      }
    });

  const genres = [...new Set(state.games.map(game => game.genre))];
  const platforms = ['PC', 'PS5', 'Xbox', 'Switch'];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Our Game Library
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover your next gaming adventure from our carefully curated collection of titles.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-black/50 backdrop-blur-md rounded-lg p-6 border border-purple-500/20 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Filters & Sorting</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="title">Title (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Rating (High to Low)</option>
                <option value="release">Release Date (Newest)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
              <select
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="all">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
              <select
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="all">All Platforms</option>
                {platforms.map(platform => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <div className="text-sm text-gray-300">
                Showing {filteredAndSortedGames.length} of {state.games.length} games
              </div>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedGames.map((game) => (
            <div key={game.id} className="bg-black/50 backdrop-blur-md rounded-lg overflow-hidden border border-purple-500/20 hover:border-purple-400 transition-all duration-300 group">
              <div className="relative">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-medium">{game.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {game.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    game.inStock 
                      ? 'bg-green-900/50 text-green-400 border border-green-500/50' 
                      : 'bg-red-900/50 text-red-400 border border-red-500/50'
                  }`}>
                    {game.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-purple-400 text-sm font-medium">{game.genre}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400 text-sm">{game.developer}</span>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{game.description}</p>

                <div className="text-gray-400 text-xs mb-4">
                  <div>Platform: {game.platform}</div>
                  <div>Released: {new Date(game.releaseDate).toLocaleDateString()}</div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-400">${game.price}</span>
                  <button
                    onClick={() => addToCart(game)}
                    disabled={!game.inStock}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedGames.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No games found matching your criteria.</div>
            <button
              onClick={() => {
                setSortBy('title');
                setFilterGenre('all');
                setFilterPlatform('all');
              }}
              className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}