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
  email?: string;
  phone?: string;
  address?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

// Engagement types
export interface Engagement {
  id: string;
  client_id: string;
  file_number: number;
  file_number_as_per?: string;
  type: string;
  type2?: string;
  senior?: string;
  assistant?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Pagination types
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// API Query params types
export interface ClientQueryParams {
  page?: number;
  page_size?: number;
  search?: string;
  status?: 'active' | 'inactive';
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface EngagementQueryParams {
  page?: number;
  page_size?: number;
  client_id?: string;
  status?: string;
  type?: string;
  senior?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// Task types (keeping for backward compatibility with Tasks page)
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
