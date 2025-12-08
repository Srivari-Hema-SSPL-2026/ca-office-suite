/**
 * Real API Service for CA Office Suite
 * Connects to FastAPI backend for client and engagement data
 */

import type {
  Client,
  Engagement,
  PaginatedResult,
  ClientQueryParams,
  EngagementQueryParams,
} from '../types';

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Build query string from params object
 */
function buildQueryString(params: Record<string, any>): string {
  const filteredParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  
  return filteredParams ? `?${filteredParams}` : '';
}

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

// ============================================================================
// Client Service
// ============================================================================

export const clientApiService = {
  /**
   * Get paginated list of clients with optional filtering and sorting
   */
  async getClients(params: ClientQueryParams = {}): Promise<PaginatedResult<Client>> {
    const queryString = buildQueryString(params);
    const url = `${API_BASE_URL}/clients${queryString}`;
    return apiFetch<PaginatedResult<Client>>(url);
  },

  /**
   * Get a single client by ID
   */
  async getClientById(id: string): Promise<Client> {
    const url = `${API_BASE_URL}/clients/${id}`;
    return apiFetch<Client>(url);
  },

  /**
   * Create a new client
   */
  async createClient(clientData: Omit<Client, 'id' | 'created_at' | 'updated_at'>): Promise<Client> {
    const url = `${API_BASE_URL}/clients`;
    return apiFetch<Client>(url, {
      method: 'POST',
      body: JSON.stringify(clientData),
    });
  },

  /**
   * Update an existing client
   */
  async updateClient(id: string, clientData: Partial<Omit<Client, 'id' | 'created_at' | 'updated_at'>>): Promise<Client> {
    const url = `${API_BASE_URL}/clients/${id}`;
    return apiFetch<Client>(url, {
      method: 'PUT',
      body: JSON.stringify(clientData),
    });
  },

  /**
   * Delete a client
   */
  async deleteClient(id: string): Promise<void> {
    const url = `${API_BASE_URL}/clients/${id}`;
    await apiFetch<void>(url, {
      method: 'DELETE',
    });
  },

  /**
   * Get engagements for a specific client
   */
  async getClientEngagements(
    clientId: string,
    params: { page?: number; page_size?: number } = {}
  ): Promise<PaginatedResult<Engagement>> {
    const queryString = buildQueryString(params);
    const url = `${API_BASE_URL}/clients/${clientId}/engagements${queryString}`;
    return apiFetch<PaginatedResult<Engagement>>(url);
  },
};

// ============================================================================
// Engagement Service
// ============================================================================

export const engagementApiService = {
  /**
   * Get paginated list of engagements with optional filtering and sorting
   */
  async getEngagements(params: EngagementQueryParams = {}): Promise<PaginatedResult<Engagement>> {
    const queryString = buildQueryString(params);
    const url = `${API_BASE_URL}/engagements${queryString}`;
    return apiFetch<PaginatedResult<Engagement>>(url);
  },

  /**
   * Get a single engagement by ID
   */
  async getEngagementById(id: string): Promise<Engagement> {
    const url = `${API_BASE_URL}/engagements/${id}`;
    return apiFetch<Engagement>(url);
  },

  /**
   * Create a new engagement
   */
  async createEngagement(
    engagementData: Omit<Engagement, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Engagement> {
    const url = `${API_BASE_URL}/engagements`;
    return apiFetch<Engagement>(url, {
      method: 'POST',
      body: JSON.stringify(engagementData),
    });
  },

  /**
   * Update an existing engagement
   */
  async updateEngagement(
    id: string,
    engagementData: Partial<Omit<Engagement, 'id' | 'client_id' | 'created_at' | 'updated_at'>>
  ): Promise<Engagement> {
    const url = `${API_BASE_URL}/engagements/${id}`;
    return apiFetch<Engagement>(url, {
      method: 'PUT',
      body: JSON.stringify(engagementData),
    });
  },

  /**
   * Delete an engagement
   */
  async deleteEngagement(id: string): Promise<void> {
    const url = `${API_BASE_URL}/engagements/${id}`;
    await apiFetch<void>(url, {
      method: 'DELETE',
    });
  },
};

// ============================================================================
// Health Check
// ============================================================================

export const healthApiService = {
  /**
   * Check if API is healthy
   */
  async checkHealth(): Promise<{ status: string; service: string; version: string }> {
    const url = `${API_BASE_URL.replace('/api', '')}/health`;
    return apiFetch(url);
  },
};
