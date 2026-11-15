import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SectionBar } from '../components/navigation/SectionBar';
import { StatusStrip } from '../components/navigation/StatusStrip';

describe('Navigation Shell', () => {
  it('renders navy status strip with workspace context and metrics', () => {
    render(
      <BrowserRouter>
        <StatusStrip
          workspaceName="Meridian Labs"
          liveRate="48.2 req/s"
          onOpenJumpPalette={() => {}}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Meridian Labs')).toBeInTheDocument();
    expect(screen.getByText(/48\.2/)).toBeInTheDocument();
  });

  it('renders section bar with Monitor, Manage, Workspace groups', () => {
    render(
      <BrowserRouter>
        <SectionBar />
      </BrowserRouter>
    );

    expect(screen.getByText('Monitor')).toBeInTheDocument();
    expect(screen.getByText('Manage')).toBeInTheDocument();
    expect(screen.getByText('Workspace')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /Overview/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Quotas/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Requests/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Providers/i })).toBeInTheDocument();
  });
});
