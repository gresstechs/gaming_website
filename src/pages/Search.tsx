import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Star, ShoppingCart, X } from 'lucide-react';
import { useGameStore } from '../context/GameStoreContext';

export default function Search() {
  const { state, dispatch } = useGameStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    genre: '',
    platform: '',
    minPrice: '',
    maxPrice: '',
    minRating: ''
  });
  const [isSearching, setIsSearching] = useState(false);

  const addToCart = (game: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: game });
  };

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = state.games.filter(game => {
        const matchesQuery = !searchQuery || 
          game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.developer.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesGenre = !searchFilters.genre || game.genre === searchFilters.genre;
        const matchesPlatform = !searchFilters.platform || game.platform.includes(searchFilters.platform);
        const matchesMinPrice = !searchFilters.minPrice || game.price >= parseFloat(searchFilters.minPrice);
        const matchesMaxPrice = !searchFilters.maxPrice || game.price <= parseFloat(searchFilters.maxPrice);
        const matchesMinRating = !searchFilters.minRating || game.rating >= parseFloat(searchFilters.minRating);

        return matchesQuery && matchesGenre && matchesPlatform && matchesMinPrice && matchesMaxPrice && matchesMinRating;
      });

      dispatch({ type: 'SEARCH_GAMES', payload: results });
      setIsSearching(false);
    }, 500);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchFilters({
      genre: '',
      platform: '',
      minPrice: '',
      maxPrice: '',
      minRating: ''
    });
    dispatch({ type: 'SEARCH_GAMES', payload: [] });
  };

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  useEffect(() => {
    if (searchQuery || Object.values(searchFilters).some(filter => filter !== '')) {
      handleSearch();
    }
  }, [searchQuery, searchFilters]);

  const genres = [...new Set(state.games.map(game => game.genre))];
  const platforms = ['PC', 'PS5', 'Xbox', 'Switch'];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Search Games
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find your perfect game using our advanced search and filtering system.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-black/50 backdrop-blur-md rounded-lg p-8 border border-purple-500/20 mb-8">
          {/* Main Search */}
          <div className="relative mb-6">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for games, developers, or keywords..."
              className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors text-lg"
            />
            {(searchQuery || Object.values(searchFilters).some(filter => filter !== '')) && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
              <select
                value={searchFilters.genre}
                onChange={(e) => handleFilterChange('genre', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
              <select
                value={searchFilters.platform}
                onChange={(e) => handleFilterChange('platform', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="">All Platforms</option>
                {platforms.map(platform => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Min Price</label>
              <input
                type="number"
                value={searchFilters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                placeholder="$0"
                min="0"
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Max Price</label>
              <input
                type="number"
                value={searchFilters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                placeholder="$100"
                min="0"
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Min Rating</label>
              <select
                value={searchFilters.minRating}
                onChange={(e) => handleFilterChange('minRating', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="3.0">3.0+ Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {isSearching ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-gray-300">Searching...</p>
          </div>
        ) : state.searchResults.length > 0 ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Search Results ({state.searchResults.length})
              </h2>
              <button
                onClick={clearSearch}
                className="px-4 py-2 text-purple-400 hover:text-white border border-purple-500 rounded-lg hover:bg-purple-500/20 transition-colors"
              >
                Clear Search
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {state.searchResults.map((game) => (
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
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (searchQuery || Object.values(searchFilters).some(filter => filter !== '')) ? (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No games found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={clearSearch}
              className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Start your search</h3>
            <p className="text-gray-500">Enter keywords or use filters to find your perfect game</p>
          </div>
        )}
      </div>
    </div>
  );
}