import React from 'react';
import { Button } from './Button';
import { Icon } from '../icons/Icons';

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  iconName?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  iconName = 'overview',
}) => {
  return (
    <div className="empty">
      <div>
        <h3 className="text-[28px] font-serif text-navy mb-2">{title}</h3>
        <p className="text-mut text-[14px] max-w-[420px] mb-4">{description}</p>
        {actionLabel && onAction && (
          <Button variant="pri" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
      <div className="hidden tablet:flex justify-center items-center opacity-30 text-navy">
        <Icon name={iconName} size={84} />
      </div>
    </div>
  );
};
