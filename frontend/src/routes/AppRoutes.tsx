import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { PublicLayout } from '../layouts/PublicLayout';
import { OnboardingLayout } from '../layouts/OnboardingLayout';
import { Button } from '../components/ui/Button';
import { Panel, PanelHeader, PanelBody } from '../components/ui/Panel';
import { Badge } from '../components/ui/Badge';
import { Icon } from '../components/icons/Icons';

interface BackendHealth {
  status: string;
  version: string;
  environment: string;
  timestamp: string;
  service: string;
}

// Overview Window Component with live Backend health indicator
const OverviewShell: React.FC = () => {
  const [health, setHealth] = useState<BackendHealth | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/api/v1/health`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data: BackendHealth) => {
        setHealth(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page">
      <div className="ph">
        <div>
          <span className="eb">Window 07 — Monitor</span>
          <h1>Overview Dashboard</h1>
          <p>Centralized AI API telemetry, capacity limits, and operational health.</p>
        </div>
        <div className="row wrapf">
          <Link to="/onboarding/provider">
            <Button variant="pri" icon={<Icon name="plus" size={13} />}>
              Connect Provider
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <Panel variant="nv">
          <PanelBody>
            <span className="eb text-navy5">Backend API Connection</span>
            <div className="text-[28px] font-serif mt-1">
              {loading ? (
                'Connecting...'
              ) : health ? (
                <span className="text-ok flex items-center gap-2">
                  <i className="dt" /> Operational
                </span>
              ) : (
                <span className="text-amber2 flex items-center gap-2">
                  <i className="dt w" /> Unreachable
                </span>
              )}
            </div>
            <div className="mt-3 text-[12px] font-mono text-navy5">
              {health ? (
                <>
                  Service: <b className="text-white">{health.service}</b> v{health.version} [{health.environment}]
                </>
              ) : (
                <>Error: {error || 'Could not reach backend health endpoint'}</>
              )}
            </div>
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader title="Active Monitors" subtitle="Observed endpoints" />
          <PanelBody noTopPadding>
            <div className="text-[28px] font-serif text-navy">5 Services</div>
            <p className="text-[12.5px] text-mut mt-1">
              Ready for real traffic ingestion via API Proxy &amp; SDK.
            </p>
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader title="Security &amp; Isolation" subtitle="Workspace Boundary" />
          <PanelBody noTopPadding>
            <div className="flex items-center gap-2">
              <Badge variant="ok">Isolated</Badge>
              <Badge variant="mono">SHA-256</Badge>
            </div>
            <p className="text-[12.5px] text-mut mt-2">
              All credentials encrypted at rest. No raw prompts stored.
            </p>
          </PanelBody>
        </Panel>
      </div>

      <Panel>
        <PanelHeader
          title="Foundation Ready"
          subtitle="Slice 0 Shell and Design System Initialized"
        />
        <PanelBody noTopPadding>
          <div className="py-8 text-center max-w-lg mx-auto">
            <h3 className="text-[22px] font-serif text-navy mb-2">
              All 17 Windows Mapped to Real Routes
            </h3>
            <p className="text-mut text-[13.5px] mb-6">
              Use the top section bar to explore Monitor, Manage, and Workspace windows, or press{' '}
              <kbd className="kbd">Ctrl K</kbd> to jump between surfaces.
            </p>
            <div className="row justify-center">
              <Link to="/quotas">
                <Button variant="dk">View Quotas</Button>
              </Link>
              <Link to="/requests">
                <Button>Request Explorer</Button>
              </Link>
            </div>
          </div>
        </PanelBody>
      </Panel>
    </div>
  );
};

// Generic Window Shell builder
const WindowShell: React.FC<{ windowNum: string; title: string; section: string; desc: string }> = ({
  windowNum,
  title,
  section,
  desc,
}) => (
  <div className="page">
    <div className="ph">
      <div>
        <span className="eb">Window {windowNum} — {section}</span>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
    </div>
    <Panel>
      <PanelBody>
        <div className="py-12 text-center max-w-md mx-auto">
          <h3 className="text-[24px] font-serif text-navy mb-2">{title} Shell</h3>
          <p className="text-mut text-[13.5px] mb-4">
            Specification verified. Backend models, adapters, and data interfaces will be implemented in subsequent vertical slices.
          </p>
          <Badge variant="mono">SPECIFIED IN PRODUCT-SPECIFICATION.MD</Badge>
        </div>
      </PanelBody>
    </Panel>
  </div>
);

// Public Landing Shell
const LandingShell: React.FC = () => (
  <div className="page py-16">
    <div className="max-w-3xl mx-auto text-center py-12">
      <span className="eb am">QUOTIENT PLATFORM</span>
      <h1 className="text-[54px] font-serif text-navy leading-tight mt-2 mb-4">
        Every API. Every limit. <em className="italic">One place.</em>
      </h1>
      <p className="text-[17px] text-mut max-w-xl mx-auto mb-8">
        Monitor consumption, understand quotas, and keep your AI applications running without losing track of provider limits.
      </p>
      <div className="row justify-center gap-4">
        <Link to="/overview">
          <Button variant="pri" size="lg">
            Open Dashboard
          </Button>
        </Link>
        <Link to="/auth">
          <Button variant="dk" size="lg">
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

// Auth Shell
const AuthShell: React.FC = () => (
  <div className="page py-12 max-w-md mx-auto">
    <Panel>
      <PanelHeader title="Sign in to Quotient" subtitle="Monitor every API. Master every limit." />
      <PanelBody noTopPadding>
        <div className="col gap-4 py-4">
          <Button variant="pri" className="w-full justify-center">
            Continue to Overview
          </Button>
        </div>
      </PanelBody>
    </Panel>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingShell />} />
        <Route path="/auth" element={<AuthShell />} />
      </Route>

      {/* Onboarding Flow (Windows 3-6) */}
      <Route element={<OnboardingLayout />}>
        <Route
          path="/onboarding/workspace"
          element={<WindowShell windowNum="03" section="Onboarding" title="Workspace Setup" desc="Define your workspace organization." />}
        />
        <Route
          path="/onboarding/provider"
          element={<WindowShell windowNum="04" section="Onboarding" title="Connect AI Provider" desc="Add credentials for Gemini, OpenAI, Groq, Anthropic." />}
        />
        <Route
          path="/onboarding/application"
          element={<WindowShell windowNum="05" section="Onboarding" title="Application Setup" desc="Register your software application." />}
        />
        <Route
          path="/onboarding/integration"
          element={<WindowShell windowNum="06" section="Onboarding" title="Integration Setup" desc="Configure API Proxy or SDK instrumentation." />}
        />
      </Route>

      {/* Authenticated Application (Windows 7-17) */}
      <Route element={<AppLayout />}>
        {/* MONITOR */}
        <Route path="/overview" element={<OverviewShell />} />
        <Route
          path="/analytics"
          element={<WindowShell windowNum="08" section="Monitor" title="Analytics" desc="Usage trends, percentiles, token distributions, and cost reporting." />}
        />
        <Route
          path="/quotas"
          element={<WindowShell windowNum="09" section="Monitor" title="Quotas" desc="Track provider-reported limits and user-defined enforcement quotas." />}
        />
        <Route
          path="/requests"
          element={<WindowShell windowNum="10" section="Monitor" title="Request Explorer" desc="Filter, inspect, and analyze individual API request lifecycles." />}
        />
        <Route
          path="/insights"
          element={<WindowShell windowNum="11" section="Monitor" title="Insights" desc="Evidence-based quota prediction and anomaly analysis." />}
        />

        {/* MANAGE */}
        <Route
          path="/providers"
          element={<WindowShell windowNum="12" section="Manage" title="Providers" desc="Manage active provider connections, keys, and discovered models." />}
        />
        <Route
          path="/applications"
          element={<WindowShell windowNum="13" section="Manage" title="Applications" desc="Application environments, configurations, and associated providers." />}
        />
        <Route
          path="/integrations"
          element={<WindowShell windowNum="14" section="Manage" title="Integrations" desc="Proxy routing credentials, SDK keys, and connection diagnostics." />}
        />
        <Route
          path="/alerts"
          element={<WindowShell windowNum="15" section="Manage" title="Alerts" desc="Real-time alert rules, trigger history, and notification channels." />}
        />

        {/* WORKSPACE */}
        <Route
          path="/team"
          element={<WindowShell windowNum="16" section="Workspace" title="Team Management" desc="Collaborator access control, roles, and invitation lifecycle." />}
        />
        <Route
          path="/settings"
          element={<WindowShell windowNum="17" section="Workspace" title="Settings" desc="Workspace preferences, security, data retention, and privacy." />}
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
