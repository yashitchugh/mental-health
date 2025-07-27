import React from 'react';
import { Heart, Twitter, Instagram, Linkedin, Github, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-bold">Humonix</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Where voices heal and communities thrive. Built for India's next generation 
              of students who deserve to be heard, understood, and supported.-Built on Boltt
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Crisis Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              <p>&copy; 2025 Humonix. Made with Bolt.new </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-full">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-400 font-medium">Built on Bolt</span>
              </div>
              <div className="flex space-x-6 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-2xl p-6 border border-emerald-500/20">
            <p className="text-emerald-300 text-sm">
              🚨 <strong>Crisis Support:</strong> If you're in immediate danger, please contact your local emergency services or call 
              <span className="text-white font-semibold"> KIRAN Helpline: 1800-599-0019</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;