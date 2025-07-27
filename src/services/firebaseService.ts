import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  addDoc,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { db, auth } from '../config/firebase';

export interface UserData {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isAnonymous: boolean;
  college: string;
  phone: string;
  interests: string[];
  emotionalTags: string[];
  languages: string[];
  isAdmin: boolean;
  badges: string[];
  kindnessPoints: number;
  streakDays: number;
  settings?: any;
  createdAt: any;
  updatedAt: any;
}

export interface MoodEntry {
  id?: string;
  userId: string;
  mood: string;
  intensity: number;
  tags: string[];
  timestamp: any;
  notes?: string;
}

export interface ConversationData {
  id?: string;
  userId: string;
  type: 'ai' | 'peer' | 'video';
  duration: number;
  mood: string;
  satisfaction: number;
  timestamp: any;
}

export interface CommunityPost {
  id?: string;
  userId: string;
  authorName: string;
  content: string;
  type: 'text' | 'voice' | 'art' | 'poetry';
  tags: string[];
  likes: number;
  comments: number;
  isAnonymous: boolean;
  timestamp: any;
}

// Authentication Services
export const signUpUser = async (userData: Partial<UserData>, password: string): Promise<UserData> => {
  try {
    console.log('Creating Firebase user...', { email: userData.email });
    
    if (!userData.email || !password) {
      throw new Error('Email and password are required');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, password);
    const user = userCredential.user;
    
    console.log('Firebase user created successfully:', user.uid);

    // Update Firebase Auth profile
    await updateProfile(user, {
      displayName: userData.name || 'Anonymous User'
    });

    // Create user document in Firestore
    const newUserData: UserData = {
      id: user.uid,
      email: userData.email,
      name: userData.name || '',
      isAnonymous: userData.isAnonymous || false,
      college: userData.college || '',
      phone: userData.phone || '',
      interests: userData.interests || [],
      emotionalTags: userData.emotionalTags || [],
      languages: userData.languages || ['English'],
      isAdmin: false,
      badges: [],
      kindnessPoints: 0,
      streakDays: 0,
      settings: {},
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    console.log('Creating Firestore document...', newUserData);
    await setDoc(doc(db, 'users', user.uid), newUserData);
    console.log('Firestore document created successfully');
    
    return { ...newUserData, id: user.uid };
  } catch (error: any) {
    console.error('Error signing up user:', error);
    
    // Provide more specific error messages
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('This email is already registered. Please try signing in instead.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('Password is too weak. Please choose a stronger password.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Please enter a valid email address.');
    } else {
      throw new Error(error.message || 'Failed to create account. Please try again.');
    }
  }
};

export const signInUser = async (email: string, password: string): Promise<UserData> => {
  try {
    console.log('Signing in user...', { email });
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const userData = { id: user.uid, ...userDoc.data() } as UserData;
      console.log('User signed in successfully:', userData.id);
      return userData;
    } else {
      throw new Error('User data not found');
    }
  } catch (error: any) {
    console.error('Error signing in user:', error);
    
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email. Please sign up first.');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password. Please try again.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Please enter a valid email address.');
    } else {
      throw new Error(error.message || 'Failed to sign in. Please try again.');
    }
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out user:', error);
    throw error;
  }
};

// User Data Services
export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { id: userId, ...userDoc.data() } as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

export const updateUserData = async (userId: string, updates: Partial<UserData>): Promise<void> => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

// Mood Tracking Services
export const saveMoodEntry = async (moodData: Omit<MoodEntry, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'moods'), {
      ...moodData,
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving mood entry:', error);
    throw error;
  }
};

export const getUserMoodHistory = async (userId: string, limitCount: number = 30): Promise<MoodEntry[]> => {
  try {
    const q = query(
      collection(db, 'moods'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as MoodEntry[];
  } catch (error) {
    console.error('Error getting mood history:', error);
    throw error;
  }
};

// Conversation Services
export const saveConversation = async (conversationData: Omit<ConversationData, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'conversations'), {
      ...conversationData,
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving conversation:', error);
    throw error;
  }
};

export const getUserConversations = async (userId: string): Promise<ConversationData[]> => {
  try {
    const q = query(
      collection(db, 'conversations'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ConversationData[];
  } catch (error) {
    console.error('Error getting conversations:', error);
    throw error;
  }
};

// Community Services
export const createCommunityPost = async (postData: Omit<CommunityPost, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'communityPosts'), {
      ...postData,
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating community post:', error);
    throw error;
  }
};

export const getCommunityPosts = async (limitCount: number = 20): Promise<CommunityPost[]> => {
  try {
    const q = query(
      collection(db, 'communityPosts'),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as CommunityPost[];
  } catch (error) {
    console.error('Error getting community posts:', error);
    throw error;
  }
};

export const updatePostLikes = async (postId: string, newLikeCount: number): Promise<void> => {
  try {
    await updateDoc(doc(db, 'communityPosts', postId), {
      likes: newLikeCount
    });
  } catch (error) {
    console.error('Error updating post likes:', error);
    throw error;
  }
};

// Real-time listeners
export const subscribeToUserData = (userId: string, callback: (userData: UserData) => void) => {
  return onSnapshot(doc(db, 'users', userId), (doc) => {
    if (doc.exists()) {
      callback({ id: userId, ...doc.data() } as UserData);
    }
  });
};

export const subscribeToCommunityPosts = (callback: (posts: CommunityPost[]) => void) => {
  const q = query(
    collection(db, 'communityPosts'),
    orderBy('timestamp', 'desc'),
    limit(20)
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as CommunityPost[];
    callback(posts);
  });
};