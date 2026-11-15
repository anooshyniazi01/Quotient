import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { StatusStrip } from '../components/navigation/StatusStrip';
import { SectionBar } from '../components/navigation/SectionBar';
import { NAV_GROUPS } from '../components/navigation/navDef';
import { TOKENS } from '../design-system/tokens';

describe('Visual Parity & Design System Verification', () => {
  it('has exact color token parity with quotient-preview.html', () => {
    const c = TOKENS.colors;
    expect(c.navy).toBe('#14213D');
    expect(c.navy2).toBe('#1B2C52');
    expect(c.navy3).toBe('#2B3D69');
    expect(c.navy4).toBe('#4A5C86');
    expect(c.navy5).toBe('#8793B0');

    expect(c.amber).toBe('#FCA311');
    expect(c.amber2).toBe('#FFD27A');
    expect(c.amber3).toBe('#FFEFCB');
    expect(c.amber4).toBe('#FFF8E8');
    expect(c.amberD).toBe('#B36A00');

    expect(c.ink).toBe('#14213D');
    expect(c.mut).toBe('#5C667D');
    expect(c.mut2).toBe('#8A92A5');
    expect(c.line).toBe('#E5E5E5');
    expect(c.line2).toBe('#EEEEEC');
    expect(c.bg2).toBe('#F5F5F3');

    expect(c.ok).toBe('#1F8A5B');
    expect(c.okbg).toBe('#E6F4EC');
    expect(c.bad).toBe('#C9382E');
    expect(c.badbg).toBe('#FBE9E7');
  });

  it('renders exact .strip class structure for status strip', () => {
    const { container } = render(
      <BrowserRouter>
        <StatusStrip onOpenJumpPalette={() => {}} />
      </BrowserRouter>
    );

    const header = container.querySelector('header');
    expect(header).toHaveClass('strip');

    // Logo & Wordmark
    const wm = container.querySelector('.wm');
    expect(wm).toBeInTheDocument();
    expect(wm?.textContent).toContain('Quotient');

    // Separator
    expect(container.querySelector('.sep')).toBeInTheDocument();

    // Workspace & Environment triggers
    const wsb = container.querySelectorAll('.wsb');
    expect(wsb.length).toBeGreaterThanOrEqual(2);

    // Live telemetry pill
    const live = container.querySelector('.live');
    expect(live).toBeInTheDocument();
    expect(live).toHaveClass('hm');

    // Ctrl K jump trigger
    const kbd = container.querySelector('.kbd');
    expect(kbd?.textContent).toBe('Ctrl K');
  });

  it('renders exact .nav, .ng, .ngl, .ngi, .ni structure for section bar', () => {
    const { container } = render(
      <BrowserRouter>
        <SectionBar />
      </BrowserRouter>
    );

    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('nav');

    const groups = container.querySelectorAll('.ng');
    expect(groups.length).toBe(3); // Monitor, Manage, Workspace

    const labels = container.querySelectorAll('.ngl');
    expect(labels[0].textContent).toBe('Monitor');
    expect(labels[1].textContent).toBe('Manage');
    expect(labels[2].textContent).toBe('Workspace');

    const items = container.querySelectorAll('.ni');
    expect(items.length).toBe(11); // 5 in Monitor + 4 in Manage + 2 in Workspace

    // Window numbers
    const numBadges = container.querySelectorAll('.n');
    expect(numBadges.length).toBe(9); // 11 items minus 2 with cb badges
  });

  it('verifies navigation definitions match design.md strictly', () => {
    expect(NAV_GROUPS.map((g) => g.label)).toEqual(['Monitor', 'Manage', 'Workspace']);
    expect(NAV_GROUPS[0].items.map((i) => i.id)).toEqual([
      'overview',
      'analytics',
      'quotas',
      'requests',
      'insights',
    ]);
    expect(NAV_GROUPS[1].items.map((i) => i.id)).toEqual([
      'providers',
      'applications',
      'integrations',
      'alerts',
    ]);
    expect(NAV_GROUPS[2].items.map((i) => i.id)).toEqual(['team', 'settings']);
  });
});
