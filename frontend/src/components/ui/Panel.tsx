import React from 'react';

export interface PanelProps {
  children: React.ReactNode;
  variant?: 'default' | 'nv' | 'am';
  className?: string;
}

export const Panel: React.FC<PanelProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const variantClass = variant !== 'default' ? variant : '';
  return <div className={`pn ${variantClass} ${className}`.trim()}>{children}</div>;
};

export interface PanelHeaderProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({
  title,
  subtitle,
  actions,
  children,
  className = '',
}) => {
  return (
    <div className={`pnh ${className}`.trim()}>
      {children ? (
        children
      ) : (
        <>
          <div>
            {title && <h3 className="h3">{title}</h3>}
            {subtitle && <p className="sub">{subtitle}</p>}
          </div>
          {actions && <div className="row wrapf">{actions}</div>}
        </>
      )}
    </div>
  );
};

export interface PanelBodyProps {
  children: React.ReactNode;
  noTopPadding?: boolean;
  noPadding?: boolean;
  className?: string;
}

export const PanelBody: React.FC<PanelBodyProps> = ({
  children,
  noTopPadding = false,
  noPadding = false,
  className = '',
}) => {
  const padClass = noPadding ? 'p0' : noTopPadding ? 't0' : '';
  return <div className={`pnb ${padClass} ${className}`.trim()}>{children}</div>;
};
