import { create } from 'zustand';
import { 
  signUpUser, 
  signInUser, 
  signOutUser, 
  updateUserData, 
  subscribeToUserData,
  UserData 
} from '../services/firebaseService';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthState {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<UserData>, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<UserData>) => Promise<void>;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => {
  let unsubscribeUser: (() => void) | null = null;

  return {
    user: null,
    isAuthenticated: false,
    isLoading: true,

    login: async (email: string, password: string) => {
      set({ isLoading: true });
      try {
        const userData = await signInUser(email, password);
        set({ user: userData, isAuthenticated: true, isLoading: false });
        
        // Subscribe to real-time user data updates
        if (unsubscribeUser) unsubscribeUser();
        unsubscribeUser = subscribeToUserData(userData.id, (updatedUser) => {
          set({ user: updatedUser });
        });
      } catch (error) {
        set({ isLoading: false });
        throw error;
      }
    },

    signup: async (userData: Partial<UserData>, password: string) => {
      set({ isLoading: true });
      try {
        console.log('Starting signup process...', { userData, hasPassword: !!password });
        const newUser = await signUpUser(userData, password);
        console.log('Signup successful, setting user state...', newUser);
        
        set({ user: newUser, isAuthenticated: true, isLoading: false });
        
        // Subscribe to real-time user data updates
        if (unsubscribeUser) unsubscribeUser();
        unsubscribeUser = subscribeToUserData(newUser.id, (updatedUser) => {
          set({ user: updatedUser });
        });
        
        console.log('Auth state updated successfully');
      } catch (error) {
        console.error('Signup error in store:', error);
        set({ isLoading: false });
        throw error;
      }
    },

    logout: async () => {
      try {
        await signOutUser();
        if (unsubscribeUser) {
          unsubscribeUser();
          unsubscribeUser = null;
        }
        set({ user: null, isAuthenticated: false });
      } catch (error) {
        throw error;
      }
    },

    updateUser: async (userData: Partial<UserData>) => {
      const currentUser = get().user;
      if (currentUser) {
        try {
          await updateUserData(currentUser.id, userData);
          // The real-time listener will update the state automatically
        } catch (error) {
          throw error;
        }
      }
    },

    initializeAuth: () => {
      console.log('Initializing auth...');
      onAuthStateChanged(auth, async (firebaseUser) => {
        console.log('Auth state changed:', firebaseUser ? 'User logged in' : 'User logged out');
        
        if (firebaseUser) {
          try {
            // Get user data from Firestore
            const { getUserData } = await import('../services/firebaseService');
            const userData = await getUserData(firebaseUser.uid);
            
            if (userData) {
              console.log('User data found, setting authenticated state');
              set({ user: userData, isAuthenticated: true, isLoading: false });
              
              // Subscribe to real-time updates
              if (unsubscribeUser) unsubscribeUser();
              unsubscribeUser = subscribeToUserData(userData.id, (updatedUser) => {
                set({ user: updatedUser });
              });
            } else {
              console.log('No user data found in Firestore');
              set({ user: null, isAuthenticated: false, isLoading: false });
            }
          } catch (error) {
            console.error('Error getting user data:', error);
            set({ user: null, isAuthenticated: false, isLoading: false });
          }
        } else {
          console.log('No Firebase user, setting unauthenticated state');
          if (unsubscribeUser) {
            unsubscribeUser();
            unsubscribeUser = null;
          }
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      });
    }
  };
});