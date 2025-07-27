import React from 'react';
import { Smartphone, Mail, Bell } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 md:p-16 text-white text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Healing?
          </h2>
          <p className="text-xl mb-8 text-emerald-100">
            Join thousands of students who've found their voice and their community. 
            Your journey to emotional wellness starts with a single conversation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <span>Download App</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Join Beta Waitlist</span>
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">Get Early Access</h3>
            <p className="text-emerald-100 mb-6">Be among the first to experience the future of emotional wellness</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <button className="bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Notify Me</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;