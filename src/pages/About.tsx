import React from 'react';
import { Users, Award, Globe, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About GameStore
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're passionate gamers building the ultimate destination for fellow gaming enthusiasts worldwide.
          </p>
        </div>

        {/* Company Story */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2025 by a group of passionate gamers, GameStore was born from a simple idea: 
                  create a platform where gamers can discover, purchase, and enjoy the best games across all platforms.
                </p>
                <p>
                  What started as a small indie game distribution platform has grown into a comprehensive 
                  gaming marketplace serving over 50,000 gamers worldwide. We pride ourselves on our 
                  carefully curated selection of games and our commitment to the gaming community.
                </p>
                <p>
                  From indie darlings to AAA blockbusters, we believe every game has its place and every 
                  gamer deserves to find their perfect match. That's why we've built advanced search and 
                  recommendation systems to help you discover your next favorite game.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-lg p-8 border border-purple-500/20">
              <img
                src="https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Gaming setup"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Gaming First</h3>
                <p className="text-gray-300">
                  Every decision we make is with gamers in mind. We're not just a store - we're part of the community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-black/50 backdrop-blur-md rounded-lg border border-purple-500/20">
              <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Community</h3>
              <p className="text-gray-300">
                We foster a welcoming community where gamers can connect, share, and discover together.
              </p>
            </div>
            <div className="text-center p-6 bg-black/50 backdrop-blur-md rounded-lg border border-purple-500/20">
              <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Quality</h3>
              <p className="text-gray-300">
                Every game in our catalog is carefully selected and reviewed to ensure the best experience.
              </p>
            </div>
            <div className="text-center p-6 bg-black/50 backdrop-blur-md rounded-lg border border-purple-500/20">
              <Globe className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Accessibility</h3>
              <p className="text-gray-300">
                Gaming should be accessible to everyone, regardless of platform, budget, or location.
              </p>
            </div>
            <div className="text-center p-6 bg-black/50 backdrop-blur-md rounded-lg border border-purple-500/20">
              <Heart className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Passion</h3>
              <p className="text-gray-300">
                We're gamers first, and that passion drives everything we do to serve our community.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-black/50 backdrop-blur-md rounded-lg p-6 border border-purple-500/20">
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="CEO"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white mb-2">Alex Chen</h3>
              <p className="text-purple-400 mb-3">CEO & Founder</p>
              <p className="text-gray-300 text-sm">
                Veteran game developer with 15 years in the industry. Passionate about indie games and community building.
              </p>
            </div>
            <div className="text-center bg-black/50 backdrop-blur-md rounded-lg p-6 border border-purple-500/20">
              <img
                src="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="CTO"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white mb-2">Sarah Johnson</h3>
              <p className="text-purple-400 mb-3">CTO</p>
              <p className="text-gray-300 text-sm">
                Full-stack developer and gaming enthusiast. Specializes in scalable platforms and user experience.
              </p>
            </div>
            <div className="text-center bg-black/50 backdrop-blur-md rounded-lg p-6 border border-purple-500/20">
              <img
                src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="Head of Community"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white mb-2">Marcus Rodriguez</h3>
              <p className="text-purple-400 mb-3">Head of Community</p>
              <p className="text-gray-300 text-sm">
                Esports veteran and community manager. Focuses on building connections between gamers and developers.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="text-center bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-12 border border-purple-500/20">
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            To create the world's most inclusive and comprehensive gaming platform, where every gamer can discover, 
            connect, and enjoy the games they love while supporting the developers who create them.
          </p>
        </section>
      </div>
    </div>
  );
}