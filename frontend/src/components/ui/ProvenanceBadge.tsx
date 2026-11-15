import React from 'react';
import { Icon } from '../icons/Icons';
import { ProvenanceType } from '../../design-system/tokens';

export interface ProvenanceBadgeProps {
  source: ProvenanceType;
  customLabel?: string;
  className?: string;
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({
  source,
  customLabel,
  className = '',
}) => {
  switch (source) {
    case 'provider':
      return (
        <span
          className={`bd nv inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] text-[11px] font-sans font-medium text-white ${className}`}
          title="Directly reported by the AI provider"
        >
          <Icon name="shield" size={11} className="text-amber" />
          {customLabel || 'Provider-reported'}
        </span>
      );
    case 'observed':
      return (
        <span
          className={`bd ol inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] text-[11px] font-sans font-medium text-navy border border-line ${className}`}
          title="Directly counted and observed by Quotient traffic"
        >
          <Icon name="eye" size={11} className="text-mut" />
          {customLabel || 'Observed'}
        </span>
      );
    case 'estimated':
      return (
        <span
          className={`bd inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] text-[11px] font-sans font-medium text-navy border border-dashed border-amberD bg-amber4 ${className}`}
          title="Derived value based on usage statistics and known baseline rates"
        >
          <Icon name="target" size={11} className="text-amberD" />
          {customLabel || 'Estimated'}
        </span>
      );
    case 'user':
      return (
        <span
          className={`bd am inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] text-[11px] font-sans font-medium text-navy bg-amber ${className}`}
          title="Configured by workspace user"
        >
          <Icon name="slider" size={11} className="text-navy" />
          {customLabel || 'Your limit'}
        </span>
      );
    default:
      return null;
  }
};
