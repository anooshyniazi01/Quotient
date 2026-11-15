import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProvenanceBadge } from '../components/ui/ProvenanceBadge';
import { QuotaMeter } from '../components/ui/QuotaMeter';
import { Panel, PanelHeader, PanelBody } from '../components/ui/Panel';

describe('UI Primitives', () => {
  it('renders primary button with expected styling', () => {
    render(<Button variant="pri">Connect Provider</Button>);
    const btn = screen.getByRole('button', { name: /Connect Provider/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass('pri');
  });

  it('renders badges with status dots', () => {
    render(<Badge variant="ok" dot="ok">Healthy</Badge>);
    expect(screen.getByText('Healthy')).toBeInTheDocument();
  });

  it('renders all four provenance badges correctly', () => {
    const { rerender } = render(<ProvenanceBadge source="provider" />);
    expect(screen.getByText('Provider-reported')).toBeInTheDocument();

    rerender(<ProvenanceBadge source="observed" />);
    expect(screen.getByText('Observed')).toBeInTheDocument();

    rerender(<ProvenanceBadge source="estimated" />);
    expect(screen.getByText('Estimated')).toBeInTheDocument();

    rerender(<ProvenanceBadge source="user" />);
    expect(screen.getByText('Your limit')).toBeInTheDocument();
  });

  it('renders quota meter with threshold states', () => {
    render(<QuotaMeter percentage={85} warningThreshold={70} criticalThreshold={90} />);
    const meter = screen.getByRole('progressbar');
    expect(meter).toHaveClass('w'); // Warning state
  });

  it('renders panels with header and body', () => {
    render(
      <Panel variant="nv">
        <PanelHeader title="Telemetry Engine" />
        <PanelBody>Active</PanelBody>
      </Panel>
    );
    expect(screen.getByText('Telemetry Engine')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
});
