import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../store/AuthContext';
import { Home } from '../pages/Home';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <AuthProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthProvider>
  );
};

describe('Home Page', () => {
  it('renders welcome message for guests', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('Welcome to CA Office Suite')).toBeInTheDocument();
  });

  it('renders Get Started link', () => {
    renderWithProviders(<Home />);
    expect(screen.getByRole('link', { name: /get started/i })).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('Client Management')).toBeInTheDocument();
    expect(screen.getByText('Task Tracking')).toBeInTheDocument();
    expect(screen.getByText('Deadline Management')).toBeInTheDocument();
  });
});
