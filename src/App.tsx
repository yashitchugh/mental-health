import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';

// Pages
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import MoodMatchingPage from './pages/MoodMatchingPage';
import VoiceChatPage from './pages/VoiceChatPage';
import CommunityRoomsPage from './pages/CommunityRoomsPage';
import WellnessDashboard from './pages/WellnessDashboard';
import CommunityFeedPage from './pages/CommunityFeedPage';
import EventsPage from './pages/EventsPage';
import AdminPanel from './pages/AdminPanel';
import ConfessionPage from './pages/ConfessionPage';
import ProfilePage from './pages/ProfilePage';
import TalkToAIPage from './pages/TalkToAIPage';
import VirtualEventsPage from './pages/VirtualEventsPage';
import OfflineEventsPage from './pages/OfflineEventsPage';
import SettingsPage from './pages/SettingsPage';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import SOSButton from './components/SOSButton';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const { isAuthenticated, isLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#fff',
              color: '#333',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        
        {isAuthenticated && <Navigation />}
        {isAuthenticated && <SOSButton />}
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          
          <Route path="/mood-matching" element={
            <ProtectedRoute>
              <MoodMatchingPage />
            </ProtectedRoute>
          } />
          
          <Route path="/voice-chat" element={
            <ProtectedRoute>
              <VoiceChatPage />
            </ProtectedRoute>
          } />
          
          <Route path="/rooms" element={
            <ProtectedRoute>
              <CommunityRoomsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/wellness" element={
            <ProtectedRoute>
              <WellnessDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/community" element={
            <ProtectedRoute>
              <CommunityFeedPage />
            </ProtectedRoute>
          } />
          
          <Route path="/events" element={
            <ProtectedRoute>
              <EventsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/virtual-events" element={
            <ProtectedRoute>
              <VirtualEventsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/offline-events" element={
            <ProtectedRoute>
              <OfflineEventsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/confess" element={
            <ProtectedRoute>
              <ConfessionPage />
            </ProtectedRoute>
          } />
          
          <Route path="/talk-to-ai" element={
            <ProtectedRoute>
              <TalkToAIPage />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminPanel />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;