import React from 'react';
import { TrendingUp, Users, MessageSquare, Award, Zap } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "10K+",
      label: "Active Students",
      description: "Across 200+ colleges in India"
    },
    {
      icon: MessageSquare,
      number: "500K+",
      label: "Conversations",
      description: "Meaningful connections made daily"
    },
    {
      icon: TrendingUp,
      number: "87%",
      label: "Feel Better",
      description: "Report improved mood after 1 week"
    },
    {
      icon: Award,
      number: "4.9/5",
      label: "User Rating",
      description: "Trusted by students nationwide"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Making Real Impact
          </h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            These aren't just numbers – they represent real students whose lives have been touched by genuine connection and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-xl font-semibold mb-2">{stat.label}</div>
              <p className="text-emerald-100 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              "For the first time in months, I felt truly heard and understood"
            </h3>
            <p className="text-lg text-emerald-100 mb-8">
              - Priya, 2nd Year Engineering Student, Delhi
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="text-sm font-medium">#VoicesHeard</span>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="text-sm font-medium">#CommunityLove</span>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="text-sm font-medium">#MentalHealthMatters</span>
              </div>
            </div>
          </div>
        </div>

        {/* Built on Bolt Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <Zap className="w-4 h-4 text-emerald-300" />
            <span className="text-sm text-emerald-300 font-medium">Built on Bolt</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;