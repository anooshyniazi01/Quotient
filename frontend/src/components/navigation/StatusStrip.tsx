import React from 'react';
import { Logo, Icon } from '../icons/Icons';
import { Link, useNavigate } from 'react-router-dom';

export interface StatusStripProps {
  workspaceName?: string;
  environmentName?: string;
  liveRate?: string;
  quotaPercent?: number;
  spendMTD?: string;
  onOpenJumpPalette: () => void;
  userInitials?: string;
}

export const StatusStrip: React.FC<StatusStripProps> = ({
  workspaceName = 'Meridian Labs',
  environmentName = 'Production',
  liveRate = '42 req/min',
  quotaPercent = 78,
  spendMTD = '$6,139',
  onOpenJumpPalette,
  userInitials = 'AO',
}) => {
  const navigate = useNavigate();

  return (
    <header className="strip" role="banner">
      <Link to="/" className="wm">
        <Logo size={22} color="#FFFFFF" />
        <span>Quotient</span>
      </Link>

      <i className="sep" aria-hidden="true" />

      <button
        type="button"
        className="wsb"
        aria-label={`Current workspace: ${workspaceName}`}
      >
        <span
          className="av"
          style={{ width: 20, height: 20, fontSize: 9 }}
          aria-hidden="true"
        >
          {workspaceName
            .split(' ')
            .map((w) => w[0])
            .join('')
            .slice(0, 2)}
        </span>
        <b style={{ fontWeight: 500 }}>{workspaceName}</b>
        <Icon name="chev" size={12} />
      </button>

      <span className="wsb hm">
        <i className="dt" aria-hidden="true" />
        <span>{environmentName}</span>
        <Icon name="chev" size={12} />
      </span>

      <div className="live hm" aria-label="Live workspace telemetry">
        <span>
          <i className="dt pulse" style={{ marginRight: 6 }} aria-hidden="true" />
          <b>{liveRate.replace(/ req\/(s|min)/, '')}</b> {liveRate.includes('min') ? 'req/min' : 'req/s'}
        </span>
        {quotaPercent !== undefined && (
          <span>
            quota <b>{quotaPercent}%</b>
          </span>
        )}
        {spendMTD && (
          <span>
            MTD <b>{spendMTD}</b>
          </span>
        )}
      </div>

      <span className="sp" aria-hidden="true" />

      <button
        type="button"
        className="ib hm"
        onClick={onOpenJumpPalette}
        aria-label="Jump to (Ctrl+K)"
      >
        <span className="kbd">Ctrl K</span>
      </button>

      <button
        type="button"
        className="ib"
        onClick={() => navigate('/alerts')}
        aria-label="Alerts"
      >
        <Icon name="alerts" size={18} />
      </button>

      <button
        type="button"
        className="ib"
        aria-label="Account"
      >
        <span className="av" style={{ width: 28, height: 28 }}>
          {userInitials}
        </span>
      </button>
    </header>
  );
};
