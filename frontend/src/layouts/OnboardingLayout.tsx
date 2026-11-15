import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../components/icons/Icons';
import { Button } from '../components/ui/Button';
import { WindowMap } from '../components/navigation/WindowMap';

interface Step {
  id: string;
  path: string;
  label: string;
  desc: string;
}

const ONBOARDING_STEPS: Step[] = [
  { id: '1', path: '/onboarding/workspace', label: 'Workspace', desc: 'Create your environment' },
  { id: '2', path: '/onboarding/provider', label: 'AI Provider', desc: 'Connect initial credentials' },
  { id: '3', path: '/onboarding/application', label: 'Application', desc: 'Register your service' },
  { id: '4', path: '/onboarding/integration', label: 'Integration', desc: 'Setup Proxy or SDK' },
];

export const OnboardingLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = ONBOARDING_STEPS.findIndex((s) => s.path === location.pathname);
  const activeStep = currentIndex >= 0 ? currentIndex : 0;

  const handleNext = () => {
    if (activeStep < ONBOARDING_STEPS.length - 1) {
      navigate(ONBOARDING_STEPS[activeStep + 1].path);
    } else {
      navigate('/overview');
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      navigate(ONBOARDING_STEPS[activeStep - 1].path);
    }
  };

  const handleSkip = () => {
    navigate('/overview');
  };

  return (
    <div className="ob">
      {/* Navy Progress Track Side Column */}
      <aside className="trk" aria-label="Onboarding Progress">
        <div className="wm2">
          <Logo size={24} color="#FFFFFF" />
          <span>Quotient</span>
        </div>

        <ol>
          {ONBOARDING_STEPS.map((step, idx) => {
            const isDone = idx < activeStep;
            const isCurrent = idx === activeStep;
            return (
              <li
                key={step.id}
                className={`${isCurrent ? 'on' : ''} ${isDone ? 'done' : ''}`}
                onClick={() => navigate(step.path)}
              >
                <span className="d">{isDone ? '✓' : idx + 1}</span>
                <div>
                  <b>{step.label}</b>
                  <small>{step.desc}</small>
                </div>
              </li>
            );
          })}
        </ol>
      </aside>

      {/* Main Content Area */}
      <div className="main flex flex-col justify-between">
        <div className="flex-1 pb-16">
          <Outlet />
        </div>

        {/* Fixed Footer */}
        <footer className="obf" role="contentinfo">
          <div>
            {activeStep > 0 && (
              <Button variant="gh" onClick={handleBack}>
                Previous
              </Button>
            )}
          </div>
          <div className="row">
            <Button variant="gh" onClick={handleSkip}>
              Skip for now
            </Button>
            <Button variant="pri" onClick={handleNext}>
              {activeStep === ONBOARDING_STEPS.length - 1 ? 'Enter Quotient' : 'Continue'}
            </Button>
          </div>
        </footer>
      </div>

      <WindowMap />
    </div>
  );
};
