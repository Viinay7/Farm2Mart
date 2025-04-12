
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'farmer' | 'buyer' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  address?: string;
  phone?: string;
  joinDate?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateProfile?: (profileData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('farm-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    // For now we'll simulate authentication
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in local storage (simulating a database)
      const storedUsers = JSON.parse(localStorage.getItem('farm-users') || '[]');
      const foundUser = storedUsers.find((u: any) => u.email === email);
      
      if (!foundUser || foundUser.password !== password) {
        throw new Error('Invalid credentials');
      }
      
      // Create sanitized user object (remove password)
      const authenticatedUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        joinDate: foundUser.joinDate || new Date().toISOString().split('T')[0]
      };
      
      setUser(authenticatedUser);
      localStorage.setItem('farm-user', JSON.stringify(authenticatedUser));
      
      // Redirect based on role
      if (foundUser.role === 'farmer') {
        navigate('/farmer-dashboard');
      } else {
        navigate('/buyer-dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  
  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing users or initialize empty array
      const storedUsers = JSON.parse(localStorage.getItem('farm-users') || '[]');
      
      // Check if email already exists
      if (storedUsers.some((u: any) => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      const joinDate = new Date().toISOString().split('T')[0];
      
      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password, // In a real app, this would be hashed
        role,
        joinDate
      };
      
      // Save to "database" (localStorage)
      storedUsers.push(newUser);
      localStorage.setItem('farm-users', JSON.stringify(storedUsers));
      
      // Create sanitized user object for session
      const authenticatedUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        joinDate: newUser.joinDate
      };
      
      setUser(authenticatedUser);
      localStorage.setItem('farm-user', JSON.stringify(authenticatedUser));
      
      // Redirect based on role
      if (role === 'farmer') {
        navigate('/farmer-dashboard');
      } else {
        navigate('/buyer-dashboard');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };
  
  const updateProfile = async (profileData: Partial<User>) => {
    try {
      if (!user) {
        throw new Error('Not authenticated');
      }
      
      // Get existing users
      const storedUsers = JSON.parse(localStorage.getItem('farm-users') || '[]');
      const userIndex = storedUsers.findIndex((u: any) => u.id === user.id);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      
      // Update user data, excluding sensitive fields like password
      const { password, ...updatedUserData } = {
        ...storedUsers[userIndex],
        ...profileData
      };
      
      storedUsers[userIndex] = { password, ...updatedUserData };
      localStorage.setItem('farm-users', JSON.stringify(storedUsers));
      
      // Update current user session
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('farm-user', JSON.stringify(updatedUser));
      
      return Promise.resolve();
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('farm-user');
    navigate('/');
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        login, 
        signup, 
        logout,
        updateProfile
      }}
    >
      {children}
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
