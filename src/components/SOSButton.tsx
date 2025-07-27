import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Phone, MessageCircle, X } from 'lucide-react';

const SOSButton = () => {
  const [showSOS, setShowSOS] = useState(false);

  const emergencyContacts = [
    { name: 'KIRAN Helpline', number: '1800-599-0019', description: 'National Mental Health Helpline' },
    { name: 'Vandrevala Foundation', number: '9999-666-555', description: '24/7 Crisis Support' },
    { name: 'iCall', number: '9152-987-821', description: 'Psychosocial Helpline' }
  ];

  return (
    <>
      {/* SOS Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowSOS(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all"
      >
        <AlertTriangle className="w-8 h-8" />
      </motion.button>

      {/* SOS Modal */}
      <AnimatePresence>
        {showSOS && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-red-600">Crisis Support</h2>
                <button
                  onClick={() => setShowSOS(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-600 mb-6">
                If you're in immediate danger or having thoughts of self-harm, please reach out for help immediately.
              </p>

              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="bg-red-50 p-4 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-red-800">{contact.name}</h3>
                      <a
                        href={`tel:${contact.number}`}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                    <p className="text-sm text-red-600 mb-2">{contact.description}</p>
                    <p className="font-mono text-red-800">{contact.number}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
                <h3 className="font-semibold text-blue-800 mb-2">Need Someone to Talk?</h3>
                <button
                  onClick={() => {
                    setShowSOS(false);
                    // Navigate to immediate AI support
                    window.location.href = '/talk-to-ai?emergency=true';
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-3 rounded-full hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Talk to AI Companion Now</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SOSButton;