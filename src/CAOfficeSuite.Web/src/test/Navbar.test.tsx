import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../store/AuthContext';
import { Navbar } from '../components/layout/Navbar';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <AuthProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthProvider>
  );
};

describe('Navbar', () => {
  it('renders the brand name', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Office Suite')).toBeInTheDocument();
  });

  it('renders Home link', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });

  it('renders Help link', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole('link', { name: /help/i })).toBeInTheDocument();
  });

  it('renders Login link when not authenticated', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });
});
