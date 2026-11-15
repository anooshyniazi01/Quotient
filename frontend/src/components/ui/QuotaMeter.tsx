import React from 'react';

export interface QuotaMeterProps {
  percentage: number;
  warningThreshold?: number;
  criticalThreshold?: number;
  showTicks?: boolean;
  isThin?: boolean;
  isOnNavy?: boolean;
  className?: string;
}

export const QuotaMeter: React.FC<QuotaMeterProps> = ({
  percentage,
  warningThreshold = 70,
  criticalThreshold = 90,
  showTicks = true,
  isThin = false,
  isOnNavy = false,
  className = '',
}) => {
  const clamped = Math.max(0, Math.min(100, percentage));

  let statusClass = '';
  if (!isOnNavy) {
    if (clamped >= criticalThreshold) {
      statusClass = 'c';
    } else if (clamped >= warningThreshold) {
      statusClass = 'w';
    }
  }

  return (
    <div
      className={`mt ${statusClass} ${isThin ? 'thin' : ''} ${isOnNavy ? 'on-nv' : ''} ${className}`.trim()}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <i style={{ width: `${clamped}%` }} />
      {showTicks && (
        <>
          <b
            className="th"
            style={{ left: `${warningThreshold}%` }}
            title={`Warning threshold: ${warningThreshold}%`}
          />
          <b
            className="th c"
            style={{ left: `${criticalThreshold}%` }}
            title={`Critical threshold: ${criticalThreshold}%`}
          />
        </>
      )}
    </div>
  );
};
