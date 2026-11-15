import React from 'react';
import { ICON_PATHS } from './iconPaths';

export { ICON_PATHS };

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
  className?: string;
  title?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  className = '',
  title,
  ...props
}) => {
  const innerHtml = ICON_PATHS[name] || '';
  return (
    <svg
      className={`ic ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={!title}
      dangerouslySetInnerHTML={{ __html: innerHtml }}
      {...props}
    >
      {title && <title>{title}</title>}
    </svg>
  );
};

export const Logo: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 26,
  color = 'currentColor',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    aria-hidden="true"
    className={className}
  >
    <circle
      cx="15"
      cy="15"
      r="10.2"
      fill="none"
      stroke={color}
      strokeWidth="3.2"
      strokeDasharray="52 12.1"
      transform="rotate(-100 15 15)"
    />
    <path d="M20 20l8 8" stroke="#FCA311" strokeWidth="4" strokeLinecap="round" />
    <circle cx="15" cy="15" r="2" fill="#FCA311" />
  </svg>
);
