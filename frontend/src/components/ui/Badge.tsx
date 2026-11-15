import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'ok' | 'bad' | 'warn' | 'nv' | 'am' | 'ol' | 'mono';
  dot?: 'ok' | 'warn' | 'bad' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  dot,
  className = '',
}) => {
  const variantClass = variant !== 'neutral' ? variant : '';
  const dotColorClass = dot === 'warn' ? 'w' : dot === 'bad' ? 'b' : dot === 'neutral' ? 'g' : '';

  return (
    <span className={`bd ${variantClass} ${className}`.trim()}>
      {dot && <i className={`dt ${dotColorClass}`.trim()} aria-hidden="true" />}
      {children}
    </span>
  );
};
