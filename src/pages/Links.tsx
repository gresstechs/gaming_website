import React from 'react';
import { ExternalLink, Book, Code, Gamepad2, Palette } from 'lucide-react';

export default function Links() {
  const linkCategories = [
    {
      title: 'Development Resources',
      icon: <Code className="w-6 h-6" />,
      links: [
        {
          name: 'React Documentation',
          url: 'https://react.dev/',
          description: 'Official React documentation and guides for building user interfaces.'
        },
        {
          name: 'TypeScript Handbook',
          url: 'https://www.typescriptlang.org/docs/',
          description: 'Complete guide to TypeScript for type-safe JavaScript development.'
        },
        {
          name: 'Vite Guide',
          url: 'https://vitejs.dev/guide/',
          description: 'Fast build tool and development server used for this project.'
        },
        {
          name: 'React Router',
          url: 'https://reactrouter.com/',
          description: 'Client-side routing library for React applications.'
        }
      ]
    },
    {
      title: 'Design & UI',
      icon: <Palette className="w-6 h-6" />,
      links: [
        {
          name: 'Tailwind CSS',
          url: 'https://tailwindcss.com/',
          description: 'Utility-first CSS framework used for styling this website.'
        },
        {
          name: 'Lucide React',
          url: 'https://lucide.dev/',
          description: 'Beautiful & consistent icon toolkit used throughout the site.'
        },
        {
          name: 'Pexels',
          url: 'https://www.pexels.com/',
          description: 'Source of high-quality stock photos used for game images.'
        },
        {
          name: 'CSS Gradient',
          url: 'https://cssgradient.io/',
          description: 'Tool for creating beautiful CSS gradients used in the design.'
        }
      ]
    },
    {
      title: 'Gaming Industry',
      icon: <Gamepad2 className="w-6 h-6" />,
      links: [
        {
          name: 'Steam',
          url: 'https://store.steampowered.com/',
          description: 'Digital distribution platform and inspiration for game store design.'
        },
        {
          name: 'Epic Games Store',
          url: 'https://www.epicgames.com/store/',
          description: 'Digital marketplace with modern UI/UX design patterns.'
        },
        {
          name: 'GameDev.net',
          url: 'https://www.gamedev.net/',
          description: 'Community and resources for game development.'
        },
        {
          name: 'Indie DB',
          url: 'https://www.indiedb.com/',
          description: 'Platform for independent game developers and players.'
        }
      ]
    },
    {
      title: 'Learning Resources',
      icon: <Book className="w-6 h-6" />,
      links: [
        {
          name: 'MDN Web Docs',
          url: 'https://developer.mozilla.org/',
          description: 'Comprehensive web development documentation and tutorials.'
        },
        {
          name: 'freeCodeCamp',
          url: 'https://www.freecodecamp.org/',
          description: 'Free coding education platform with interactive lessons.'
        },
        {
          name: 'JavaScript.info',
          url: 'https://javascript.info/',
          description: 'Modern JavaScript tutorial covering all aspects of the language.'
        },
        {
          name: 'CSS-Tricks',
          url: 'https://css-tricks.com/',
          description: 'Tips, tricks, and techniques for modern CSS development.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Useful Links
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Resources, tools, and references used to build this gaming store website. 
            Perfect for developers looking to create similar projects.
          </p>
        </div>

        {/* Links Categories */}
        <div className="space-y-12">
          {linkCategories.map((category, categoryIndex) => (
            <section key={categoryIndex} className="bg-black/50 backdrop-blur-md rounded-lg p-8 border border-purple-500/20">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-2 bg-purple-600/20 rounded-lg text-purple-400">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{category.title}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {category.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 bg-gray-800/50 rounded-lg border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 hover:bg-gray-700/50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {link.name}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors flex-shrink-0 ml-2" />
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {link.description}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-8 border border-purple-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">About This Project</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">Technologies Used</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• React 18 with TypeScript</li>
                <li>• Vite for build tooling</li>
                <li>• Tailwind CSS for styling</li>
                <li>• React Router for navigation</li>
                <li>• Context API for state management</li>
                <li>• Lucide React for icons</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">Key Features</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Responsive design across all devices</li>
                <li>• Advanced search and filtering</li>
                <li>• Shopping cart functionality</li>
                <li>• User authentication system</li>
                <li>• Admin panel for management</li>
                <li>• Modern gaming-themed UI</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-yellow-200 text-sm">
              <strong>Note:</strong> This website is created for educational purposes as part of a student assignment. 
              All external links are provided for reference and learning purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}