import React from 'react';
import { User, Mail, Calendar, Package, Star } from 'lucide-react';
import { useGameStore } from '../context/GameStoreContext';

export default function Profile() {
  const { state } = useGameStore();

  if (!state.user) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please Log In</h2>
          <p className="text-gray-300 mb-6">You need to be logged in to view your profile.</p>
          <a
            href="/login"
            className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            Log In
          </a>
        </div>
      </div>
    );
  }

  const userOrders = state.orders.filter(order => order.userId === state.user!.id);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-xl text-gray-300">
            Manage your account and view your order history
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <div className="bg-black/50 backdrop-blur-md rounded-lg p-6 border border-purple-500/20">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">{state.user.name}</h2>
                {state.user.isAdmin && (
                  <span className="inline-block px-3 py-1 bg-purple-600/20 text-purple-400 text-sm font-medium rounded-full mt-2">
                    Administrator
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-sm text-gray-400">Email</div>
                    <div className="text-white">{state.user.email}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-sm text-gray-400">Member Since</div>
                    <div className="text-white">Today</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-sm text-gray-400">Total Orders</div>
                    <div className="text-white">{userOrders.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2">
            <div className="bg-black/50 backdrop-blur-md rounded-lg p-6 border border-purple-500/20">
              <h2 className="text-xl font-bold text-white mb-6">Order History</h2>

              {userOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">No orders yet</h3>
                  <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
                  <a
                    href="/products"
                    className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Browse Games
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {userOrders.map((order) => (
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
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-black/50 backdrop-blur-md rounded-lg p-6 border border-purple-500/20 text-center">
            <Package className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">{userOrders.length}</div>
            <div className="text-gray-300 text-sm">Total Orders</div>
          </div>

          <div className="bg-black/50 backdrop-blur-md rounded-lg p-6 border border-purple-500/20 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {userOrders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)}
            </div>
            <div className="text-gray-300 text-sm">Games Purchased</div>
          </div>

          <div className="bg-black/50 backdrop-blur-md rounded-lg p-6 border border-purple-500/20 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              ${userOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </div>
            <div className="text-gray-300 text-sm">Total Spent</div>
          </div>
        </div>
      </div>
    </div>
  );
}