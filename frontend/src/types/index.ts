// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff' | 'user';
}

// Client types
export interface Client {
  id: string;
  name: string;
  pan: string;
  gstin?: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  nextDueDate?: string;
  address?: string;
  createdAt: string;
}

// Task types
export type TaskType = 'GST' | 'ITR' | 'TDS' | 'Audit' | 'ROC' | 'Other';
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'overdue';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignee: string;
  createdAt: string;
}

// Auth context types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
