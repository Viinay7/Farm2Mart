import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  User as FirebaseUser
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/Firebase";

// Define user type
interface User {
  uid: string;
  name: string;
  email: string;
  role?: 'farmer' | 'buyer' | 'admin';
  address?: string;
  phone?: string;
  joinDate?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'farmer' | 'buyer') => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          await fetchAndSetUserData(firebaseUser);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const fetchAndSetUserData = async (firebaseUser: FirebaseUser) => {
    // Get additional user data from Firestore
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const formattedUser = {
        uid: firebaseUser.uid,
        name: userData.name || firebaseUser.displayName || 'User',
        email: userData.email || firebaseUser.email || '',
        role: userData.role,
        address: userData.address,
        phone: userData.phone,
        joinDate: userData.createdAt ? new Date(userData.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      };
      setUser(formattedUser);
      setIsAuthenticated(true);
    } else {
      // Fallback to just Firebase auth data if Firestore data not found
      setUser({
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || 'User',
        email: firebaseUser.email || '',
      });
      setIsAuthenticated(true);
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'farmer' | 'buyer') => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Set display name in Firebase Auth
      await firebaseUpdateProfile(firebaseUser, {
        displayName: name,
      });

      // Save user info to Firestore
      await setDoc(doc(db, "users", firebaseUser.uid), {
        uid: firebaseUser.uid,
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      });

      // Set user state
      await fetchAndSetUserData(firebaseUser);
      
      // Redirect based on role
      if (role === 'farmer') {
        navigate('/farmer-dashboard');
      } else {
        navigate('/buyer-dashboard');
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Fetch user data and update state
      await fetchAndSetUserData(firebaseUser);
      
      // Get user role to determine redirect
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Redirect based on role
        if (userData.role === 'farmer') {
          navigate('/farmer-dashboard');
        } else if (userData.role === 'buyer') {
          navigate('/buyer-dashboard');
        } else if (userData.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/profile');
        }
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      if (!user) {
        throw new Error('Not authenticated');
      }
      
      // Update user data in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        ...profileData,
        updatedAt: new Date().toISOString(),
      });
      
      // If the name is being updated, also update it in Firebase Auth
      if (profileData.name && auth.currentUser) {
        await firebaseUpdateProfile(auth.currentUser, {
          displayName: profileData.name,
        });
      }
      
      // Update local user state
      setUser({
        ...user,
        ...profileData,
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated,
        login, 
        signup, 
        logout,
        updateProfile
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}