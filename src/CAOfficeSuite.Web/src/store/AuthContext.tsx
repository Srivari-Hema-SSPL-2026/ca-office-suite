import { useState, useCallback, type ReactNode } from 'react';
import type { User, AuthState } from '../types';
import { authService } from '../services/api';
import { AuthContext } from './authContextDef';

const STORAGE_KEY = 'ca_office_user';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const authenticatedUser = await authService.login(email, password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value: AuthState = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
