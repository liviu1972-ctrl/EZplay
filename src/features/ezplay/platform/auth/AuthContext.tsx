"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';

type AuthState = {
  state: 'loggedOut' | 'loggedIn' | 'guest' | 'loading';
  email: string | null;
  user: any | null; 
};

interface AuthContextType {
  authState: AuthState;
  playAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({ 
    state: 'loading', 
    email: null,
    user: null 
  });
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setAuthState({ state: 'loggedIn', email: session.user.email || null, user: session.user });
      } else {
        setAuthState({ state: 'loggedOut', email: null, user: null });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAuthState({ state: 'loggedIn', email: session.user.email || null, user: session.user });
      } else {
        setAuthState(current => {
          if (current.state === 'guest') return current;
          return { state: 'loggedOut', email: null, user: null };
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const playAsGuest = () => {
    setAuthState({ state: 'guest', email: null, user: null });
  };

  const logout = async () => {
    if (authState.state === 'guest') {
      setAuthState({ state: 'loggedOut', email: null, user: null });
    } else {
      await supabase.auth.signOut();
    }
  };

  return <AuthContext.Provider value={{ authState, playAsGuest, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
