import React, { useState } from 'react';
import { Trash2, Plus, Minus, CreditCard, Mail } from 'lucide-react';
import { useGameStore } from '../context/GameStoreContext';

export default function Order() {
  const { state, dispatch } = useGameStore();
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = total * 0.08;
  const finalTotal = total + tax;

  const placeOrder = () => {
    if (!state.user) {
      alert('Please log in to place an order');
      return;
    }

    setIsProcessingOrder(true);
    
    // Simulate order processing
    setTimeout(() => {
      const order = {
        id: Date.now(),
        userId: state.user!.id,
        items: [...state.cart],
        total: finalTotal,
        status: 'Processing',
        date: new Date().toISOString()
      };

      dispatch({ type: 'PLACE_ORDER', payload: order });
      setIsProcessingOrder(false);
      setOrderPlaced(true);
      
      // Simulate sending order email
      console.log('Order email sent:', {
        to: state.user!.email,
        subject: `Order Confirmation #${order.id}`,
        body: `Thank you for your order! Your games will be available for download shortly.`
      });
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-black/50 backdrop-blur-md rounded-lg p-8 border border-green-500/20">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-300 mb-6">
            Your order has been processed and a confirmation email has been sent to your email address.
            You can view your order history in your profile.
          </p>
          <button
            onClick={() => setOrderPlaced(false)}
            className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CreditCard className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h2>
          <p className="text-gray-300 mb-6">
            Add some games to your cart to get started with your order.
          </p>
          <a
            href="/products"
            className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            Browse Games
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Order
          </h1>
          <p className="text-xl text-gray-300">
            Review your items and complete your purchase
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-black/50 backdrop-blur-md rounded-lg p-6 border border-purple-500/20">
              <h2 className="text-xl font-bold text-white mb-6">Cart Items</h2>
              
              <div className="space-y-4">
                {state.cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.platform}</p>
                      <p className="text-purple-400 font-bold">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-black/50 backdrop-blur-md rounded-lg p-6 border border-purple-500/20">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Actions */}
            <div className="space-y-4">
              {!state.user && (
                <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4">
                  <p className="text-yellow-200 text-sm">
                    Please <a href="/login" className="underline">log in</a> to complete your order.
                  </p>
                </div>
              )}

              <button
                onClick={placeOrder}
                disabled={!state.user || isProcessingOrder}
                className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessingOrder ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Order...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Place Order (Simulated)
                  </>
                )}
              </button>

              <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
                <p className="text-blue-200 text-sm">
                  <strong>Note:</strong> This is a simulated order system. No actual payment will be processed. 
                  Your order confirmation will be sent via email simulation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}