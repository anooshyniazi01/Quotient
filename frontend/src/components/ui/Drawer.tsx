import React, { useEffect } from 'react';
import { Icon } from '../icons/Icons';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="dscrim"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className="drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : 'Details drawer'}
      >
        <div className="pnh sticky top-0 bg-white z-10">
          <div>
            {title && <h3 className="h3">{title}</h3>}
            {subtitle && <p className="sub mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            className="ib"
            onClick={onClose}
            aria-label="Close drawer"
          >
            <Icon name="x" size={16} />
          </button>
        </div>
        <div className="pnb">{children}</div>
        {footer && <div className="pnb border-t border-line2 sticky bottom-0 bg-white">{footer}</div>}
      </aside>
    </>
  );
};
