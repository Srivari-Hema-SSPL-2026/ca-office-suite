import type { Client, Task, User } from '../types';
import { mockClients, mockTasks, mockUsers } from './mockData';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth service
export const authService = {
  async login(email: string, password: string): Promise<User | null> {
    await delay(500);
    // Mock authentication - accepts any password for demo
    const user = mockUsers.find(u => u.email === email);
    if (user && password.length >= 4) {
      return user;
    }
    return null;
  },

  async logout(): Promise<void> {
    await delay(200);
  },
};

// Client service
export const clientService = {
  async getClients(): Promise<Client[]> {
    await delay(300);
    return mockClients;
  },

  async getClientById(id: string): Promise<Client | undefined> {
    await delay(200);
    return mockClients.find(c => c.id === id);
  },

  async searchClients(query: string): Promise<Client[]> {
    await delay(300);
    const lowerQuery = query.toLowerCase();
    return mockClients.filter(
      c =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.pan.toLowerCase().includes(lowerQuery) ||
        c.email.toLowerCase().includes(lowerQuery)
    );
  },
};

// Task service
export const taskService = {
  async getTasks(): Promise<Task[]> {
    await delay(300);
    return mockTasks;
  },

  async getTaskById(id: string): Promise<Task | undefined> {
    await delay(200);
    return mockTasks.find(t => t.id === id);
  },

  async getTasksByClient(clientId: string): Promise<Task[]> {
    await delay(300);
    return mockTasks.filter(t => t.clientId === clientId);
  },

  async filterTasks(filters: {
    status?: string;
    type?: string;
    priority?: string;
  }): Promise<Task[]> {
    await delay(300);
    return mockTasks.filter(t => {
      if (filters.status && t.status !== filters.status) return false;
      if (filters.type && t.type !== filters.type) return false;
      if (filters.priority && t.priority !== filters.priority) return false;
      return true;
    });
  },
};
