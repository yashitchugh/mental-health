import { create } from 'zustand';
import { saveMoodEntry, getUserMoodHistory, MoodEntry } from '../services/firebaseService';

export interface MoodState {
  currentMood: string;
  intensity: number;
  tags: string[];
  timestamp: Date;
}

interface MoodStoreState {
  currentMood: MoodState | null;
  moodHistory: MoodEntry[];
  isLoading: boolean;
  setMood: (mood: MoodState, userId: string) => Promise<void>;
  loadMoodHistory: (userId: string) => Promise<void>;
  getMoodHistory: () => MoodEntry[];
}

export const useMoodStore = create<MoodStoreState>((set, get) => ({
  currentMood: null,
  moodHistory: [],
  isLoading: false,

  setMood: async (mood: MoodState, userId: string) => {
    set({ isLoading: true });
    try {
      // Save to Firebase
      await saveMoodEntry({
        userId,
        mood: mood.currentMood,
        intensity: mood.intensity,
        tags: mood.tags,
        timestamp: mood.timestamp
      });

      // Update local state
      set(state => ({
        currentMood: mood,
        moodHistory: [
          {
            userId,
            mood: mood.currentMood,
            intensity: mood.intensity,
            tags: mood.tags,
            timestamp: mood.timestamp
          },
          ...state.moodHistory
        ].slice(0, 30), // Keep last 30 entries
        isLoading: false
      }));
    } catch (error) {
      console.error('Error saving mood:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  loadMoodHistory: async (userId: string) => {
    set({ isLoading: true });
    try {
      const history = await getUserMoodHistory(userId);
      set({ moodHistory: history, isLoading: false });
    } catch (error) {
      console.error('Error loading mood history:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  getMoodHistory: () => get().moodHistory
}));