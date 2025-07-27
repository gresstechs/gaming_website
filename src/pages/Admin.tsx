import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, Package, DollarSign } from 'lucide-react';
import { useGameStore, Game } from '../context/GameStoreContext';

export default function Admin() {
  const { state, dispatch } = useGameStore();
  const [activeTab, setActiveTab] = useState('games');
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Check if user is admin
  if (!state.user || !state.user.isAdmin) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-6">You need administrator privileges to access this page.</p>
          <a
            href="/home"
            className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  const handleDeleteGame = (gameId: number) => {
    if (confirm('Are you sure you want to delete this game?')) {
      dispatch({ type: 'DELETE_GAME', payload: gameId });
    }
  };

  const totalRevenue = state.orders.reduce((sum, order) => sum + order.total, 0);
  const totalUsers = 1; // Simplified for demo
  const totalGames = state.games.length;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Manage your gaming store
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-black/50 backdrop-blur-md rounded-lg p-6 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Games</p>
                <p className="text-2xl font-bold text-white">{totalGames}</p>
              </div>
              <Package className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-black/50 backdrop-blur-md rounded-lg p-6 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Orders</p>
                <p className="text-2xl font-bold text-white">{state.orders.length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-black/50 backdrop-blur-md rounded-lg p-6 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-black/50 backdrop-blur-md rounded-lg p-1 border border-purple-500/20">
            <button
              onClick={() => setActiveTab('games')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'games'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Games Management
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Orders
            </button>
          </div>
        </div>

        {/* Games Management */}
        {activeTab === 'games' && (
          <div className="bg-black/50 backdrop-blur-md rounded-lg p-6 border border-purple-500/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Games Management</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Game</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="pb-3 text-gray-300 font-medium">Game</th>
                    <th className="pb-3 text-gray-300 font-medium">Genre</th>
                    <th className="pb-3 text-gray-300 font-medium">Price</th>
                    <th className="pb-3 text-gray-300 font-medium">Rating</th>
                    <th className="pb-3 text-gray-300 font-medium">Stock</th>
                    <th className="pb-3 text-gray-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {state.games.map((game) => (
                    <tr key={game.id} className="border-b border-gray-700/50">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={game.image}
                            alt={game.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <div className="text-white font-medium">{game.title}</div>
                            <div className="text-sm text-gray-400">{game.developer}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">{game.genre}</td>
                      <td className="py-4">${game.price}</td>
                      <td className="py-4">{game.rating}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          game.inStock 
                            ? 'bg-green-900/50 text-green-400' 
                            : 'bg-red-900/50 text-red-400'
                        }`}>
                          {game.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingGame(game)}
                            className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteGame(game.id)}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Management */}
        {activeTab === 'orders' && (
          <div className="bg-black/50 backdrop-blur-md rounded-lg p-6 border border-purple-500/20">
            <h2 className="text-xl font-bold text-white mb-6">Recent Orders</h2>

            {state.orders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">No orders yet</h3>
                <p className="text-gray-500">Orders will appear here once customers start purchasing</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.orders.map((order) => (
                  <div key={order.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold">Order #{order.id}</h3>
                        <p className="text-gray-400 text-sm">
                          {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-purple-400 font-bold">${order.total.toFixed(2)}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Processing' 
                            ? 'bg-yellow-900/50 text-yellow-400' 
                            : 'bg-green-900/50 text-green-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-8 h-8 object-cover rounded"
                            />
                            <span className="text-gray-300">{item.title}</span>
                          </div>
                          <div className="text-gray-400">
                            {item.quantity}x ${item.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}