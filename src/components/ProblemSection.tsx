import React from 'react';
import { AlertCircle, Shield, Clock, Users } from 'lucide-react';

const ProblemSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Silent <span className="text-purple-600">Crisis</span> Among Students
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            In 2025, India's students are more connected yet lonelier than ever. The numbers tell a story we can't ignore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-3xl font-bold text-red-600 mb-2">62%</div>
            <p className="text-gray-600">of students report persistent loneliness</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-2">71%</div>
            <p className="text-gray-600">never seek help due to stigma</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <p className="text-gray-600">when mental health struggles happen</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">0</div>
            <p className="text-gray-600">platforms built for Indian Gen Z</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-purple-100">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Most platforms are either too clinical, too expensive, or completely disconnected from our reality
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Students don't always need therapy. Sometimes they just need someone to talk to, someone to understand, 
              someone to remind them they're not alone in this journey.
            </p>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full inline-block">
              <span className="font-semibold">That's why we built Humonix</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;