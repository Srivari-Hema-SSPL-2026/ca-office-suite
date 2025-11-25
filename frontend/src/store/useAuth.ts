import { useContext } from 'react';
import type { AuthState } from '../types';
import { AuthContext } from './authContextDef';

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
