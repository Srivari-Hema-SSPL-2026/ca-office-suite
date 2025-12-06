import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../store/AuthContext';
import { Help } from '../pages/Help';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <AuthProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthProvider>
  );
};

describe('Help Page', () => {
  it('renders the help page header', () => {
    renderWithProviders(<Help />);
    expect(screen.getByText('Help & Support')).toBeInTheDocument();
  });

  it('renders FAQ section', () => {
    renderWithProviders(<Help />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
  });

  it('renders contact section', () => {
    renderWithProviders(<Help />);
    expect(screen.getByText('Contact Support')).toBeInTheDocument();
    expect(screen.getByText('Email Support')).toBeInTheDocument();
    expect(screen.getByText('Phone Support')).toBeInTheDocument();
  });

  it('renders privacy and terms sections', () => {
    renderWithProviders(<Help />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });
});
