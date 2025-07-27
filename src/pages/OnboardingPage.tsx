import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, Phone, User, Globe, Tag, ArrowRight, ArrowLeft, Shield, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    college: '',
    password: '',
    confirmPassword: '',
    isAnonymous: false,
    interests: [] as string[],
    emotionalTags: [] as string[],
    languages: ['English'] as string[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { signup } = useAuthStore();

  const interests = [
    'Technology', 'Music', 'Art', 'Sports', 'Reading', 'Gaming',
    'Travel', 'Photography', 'Cooking', 'Dancing', 'Writing', 'Movies'
  ];

  const emotionalTags = [
    'Anxious', 'Motivated', 'Overwhelmed', 'Happy', 'Confused', 'Excited',
    'Lonely', 'Confident', 'Stressed', 'Peaceful', 'Curious', 'Tired'
  ];

  const languages = [
    'English', 'Hindi', 'Tamil', 'Bengali', 'Marathi', 'Telugu',
    'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'
  ];

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.email) newErrors.email = 'College email is required';
      else if (!formData.email.includes('@')) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.college) newErrors.college = 'College/University is required';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (currentStep === 3) {
      if (formData.interests.length === 0) newErrors.interests = 'Please select at least one interest';
      if (formData.emotionalTags.length === 0) newErrors.emotionalTags = 'Please select at least one emotional tag';
    }

    if (currentStep === 4) {
      if (formData.languages.length === 0) newErrors.languages = 'Please select at least one language';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 4) setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      // If on step 1, navigate back to landing page
      navigate('/');
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    try {
      const userData = {
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        college: formData.college,
        isAnonymous: formData.isAnonymous,
        interests: formData.interests,
        emotionalTags: formData.emotionalTags,
        languages: formData.languages
      };

      await signup(userData, formData.password);
      toast.success('Welcome to Humonix! Your journey begins now.');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSelection = (array: string[], item: string, field: 'interests' | 'emotionalTags' | 'languages') => {
    const newArray = array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
    setFormData({ ...formData, [field]: newArray });
    // Clear error when user makes selection
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="w-8 h-8 text-emerald-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Humonix
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  i <= step ? 'bg-emerald-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600">Step {step} of 4</p>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-emerald-200 shadow-xl"
        >
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">Let's get you started</h2>
              <div className="bg-emerald-50 p-4 rounded-2xl mb-6 border border-emerald-200">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-emerald-800">All fields are mandatory</h3>
                    <p className="text-sm text-emerald-700">
                      We require complete information to ensure a safe and supportive community for everyone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    College/University *
                  </label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => {
                      setFormData({ ...formData, college: e.target.value });
                      if (errors.college) setErrors({ ...errors, college: '' });
                    }}
                    placeholder="IIT Delhi, DU, etc."
                    className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.college ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.college && <p className="text-red-500 text-sm mt-1">{errors.college}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    placeholder="Create a secure password"
                    className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.target.value });
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                    }}
                    placeholder="Confirm your password"
                    className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">Choose your identity</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Name (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="How should we call you?"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={formData.isAnonymous}
                      onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                      className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <label htmlFor="anonymous" className="text-lg font-medium">
                      <Shield className="w-5 h-5 inline mr-2" />
                      Stay Anonymous
                    </label>
                  </div>
                  <p className="text-gray-600 mt-2">
                    You can always reveal your identity later in conversations when you feel comfortable.
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">What interests you?</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select your interests *</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interests.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleSelection(formData.interests, interest, 'interests')}
                        className={`p-3 rounded-2xl text-sm font-medium transition-all ${
                          formData.interests.includes(interest)
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-emerald-100'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                  {errors.interests && <p className="text-red-500 text-sm mt-2">{errors.interests}</p>}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">How are you feeling lately? *</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {emotionalTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleSelection(formData.emotionalTags, tag, 'emotionalTags')}
                        className={`p-3 rounded-2xl text-sm font-medium transition-all ${
                          formData.emotionalTags.includes(tag)
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-teal-100'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  {errors.emotionalTags && <p className="text-red-500 text-sm mt-2">{errors.emotionalTags}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">Language preferences</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    <Globe className="w-5 h-5 inline mr-2" />
                    Which languages are you comfortable with? *
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {languages.map((language) => (
                      <button
                        key={language}
                        onClick={() => toggleSelection(formData.languages, language, 'languages')}
                        className={`p-3 rounded-2xl text-sm font-medium transition-all ${
                          formData.languages.includes(language)
                            ? 'bg-cyan-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-cyan-100'
                        }`}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                  {errors.languages && <p className="text-red-500 text-sm mt-2">{errors.languages}</p>}
                </div>
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-2">You're all set!</h3>
                  <p className="text-emerald-100">
                    Welcome to a community where your voice matters and your feelings are valid.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-6 py-3 rounded-full transition-all text-emerald-600 hover:bg-emerald-50 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{step === 1 ? 'Back to Home' : 'Back'}</span>
            </button>

            <button
              onClick={step === 4 ? handleSubmit : handleNext}
              disabled={isSubmitting}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Creating Account...' : step === 4 ? 'Join Humonix' : 'Next'}</span>
              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingPage;