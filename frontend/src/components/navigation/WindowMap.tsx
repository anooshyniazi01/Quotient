import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '../icons/Icons';
import { Modal } from '../ui/Modal';

const ALL_WINDOWS = [
  { n: '01', title: 'Landing Page', path: '/' },
  { n: '02', title: 'Authentication', path: '/auth' },
  { n: '03', title: 'Workspace Setup', path: '/onboarding/workspace' },
  { n: '04', title: 'Connect AI Provider', path: '/onboarding/provider' },
  { n: '05', title: 'Application Setup', path: '/onboarding/application' },
  { n: '06', title: 'Integration Setup', path: '/onboarding/integration' },
  { n: '07', title: 'Overview Dashboard', path: '/overview' },
  { n: '08', title: 'Analytics', path: '/analytics' },
  { n: '09', title: 'Quotas', path: '/quotas' },
  { n: '10', title: 'Request Explorer', path: '/requests' },
  { n: '11', title: 'Insights', path: '/insights' },
  { n: '12', title: 'Providers', path: '/providers' },
  { n: '13', title: 'Applications', path: '/applications' },
  { n: '14', title: 'Integrations', path: '/integrations' },
  { n: '15', title: 'Alerts', path: '/alerts' },
  { n: '16', title: 'Team Management', path: '/team' },
  { n: '17', title: 'Settings', path: '/settings' },
];

export const WindowMap: React.FC = () => {
  const isDevMapEnabled = import.meta.env.VITE_ENABLE_DEV_WINDOW_MAP === 'true';
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!isDevMapEnabled) return null;

  const currentWindow = ALL_WINDOWS.find((w) => w.path === location.pathname) || ALL_WINDOWS[6];

  return (
    <>
      <div className="dock fixed left-4 bottom-4 z-50">
        <button
          type="button"
          className="btn dk sm shadow-lg text-[11px] font-mono tracking-wider flex items-center gap-1.5"
          onClick={() => setIsOpen(true)}
          aria-label="Open 17-Window Prototype Navigator (Dev Only)"
        >
          <Icon name="grid" size={13} className="text-amber" />
          <span>Window {currentWindow.n}/17</span>
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Quotient Architecture — 17 Windows Map"
        subtitle="Developer Navigation Tool (Enabled via VITE_ENABLE_DEV_WINDOW_MAP)"
        isWide
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 py-2">
          {ALL_WINDOWS.map((win) => {
            const isCurrent = win.path === location.pathname;
            return (
              <button
                key={win.n}
                type="button"
                className={`p-3 rounded-[5px] border text-left flex items-start gap-3 transition-colors ${
                  isCurrent
                    ? 'border-navy bg-amber4 shadow-sm'
                    : 'border-line hover:border-navy bg-white hover:bg-bg2'
                }`}
                onClick={() => {
                  navigate(win.path);
                  setIsOpen(false);
                }}
              >
                <span className="font-mono text-[11px] text-amberD font-medium">
                  {win.n}
                </span>
                <div>
                  <div className="font-sans font-medium text-[13px] text-navy">
                    {win.title}
                  </div>
                  <div className="font-mono text-[10.5px] text-mut2 mt-0.5">
                    {win.path}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Modal>
    </>
  );
};
