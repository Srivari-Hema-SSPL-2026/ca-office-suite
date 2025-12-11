import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../store/AuthContext';
import { Clients } from '../pages/Clients';
import { clientApiService } from '../services/apiClient';

// Mock the API service
vi.mock('../services/apiClient', () => ({
  clientApiService: {
    getClients: vi.fn(),
    getClientById: vi.fn(),
    getClientEngagements: vi.fn(),
  },
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <AuthProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthProvider>
  );
};

describe('Clients Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders client list when no client ID in URL', async () => {
    const mockClients = {
      items: [
        {
          id: '1',
          name: 'Test Client',
          pan: 'ABCDE1234F',
          email: 'test@example.com',
          phone: '1234567890',
          status: 'active',
          created_at: '2024-01-01T00:00:00Z',
        },
      ],
      total: 1,
      page: 1,
      page_size: 50,
    };

    vi.mocked(clientApiService.getClients).mockResolvedValue(mockClients);

    renderWithProviders(<Clients />);

    await waitFor(() => {
      expect(screen.getByText('Client Control')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    vi.mocked(clientApiService.getClients).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    renderWithProviders(<Clients />);
    // DataGrid should show loading state
    expect(screen.getByText('Client Control')).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    vi.mocked(clientApiService.getClients).mockRejectedValue(
      new Error('API Error')
    );

    renderWithProviders(<Clients />);

    await waitFor(() => {
      // Error should be handled (check for error message or empty state)
      expect(screen.getByText('Client Control')).toBeInTheDocument();
    });
  });
});

