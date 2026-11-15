import React, { useEffect } from 'react';
import { Icon } from '../icons/Icons';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  isWide?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  isWide = false,
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
    <div className="mback" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={`mbox ${isWide ? 'wide' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mh">
          <div>
            {title && <h3 className="h3">{title}</h3>}
            {subtitle && <p className="sub mt-1">{subtitle}</p>}
          </div>
          <button
            type="button"
            className="ib"
            onClick={onClose}
            aria-label="Close modal"
          >
            <Icon name="x" size={16} />
          </button>
        </div>
        <div className="mb">{children}</div>
        {footer && <div className="mf">{footer}</div>}
      </div>
    </div>
  );
};
