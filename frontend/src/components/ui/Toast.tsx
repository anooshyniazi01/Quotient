import React from 'react';
import { Icon } from '../icons/Icons';

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export const Toast: React.FC<{ message: ToastMessage; onDismiss?: () => void }> = ({
  message,
}) => {
  return (
    <div className="toast" role="status">
      <Icon name="check" size={14} className="text-amber" />
      <span>{message.text}</span>
    </div>
  );
};
