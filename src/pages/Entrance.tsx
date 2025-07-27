import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowRight } from 'lucide-react';

export default function Entrance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gamepad2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            GameStore
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your Ultimate Gaming Destination
          </p>
        </div>

        <div className="bg-black/50 backdrop-blur-md rounded-lg p-8 border border-purple-500/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Student Assignment Notice</h2>
          <div className="text-gray-300 space-y-3">
            <p><strong>Student Name:</strong> John Doe</p>
            <p><strong>Student ID:</strong> 12345678</p>
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 mt-6">
              <p className="text-yellow-200 font-semibold">⚠️ DISCLAIMER</p>
              <p className="text-yellow-100 mt-2">
                This website is part of a student assignment and is not a commercial site offering merchandise for sale. 
                No actual transactions will be processed, and no payments will be collected.
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/home"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 group"
        >
          Enter GameStore
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}