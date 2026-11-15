import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  isMono?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  hint,
  error,
  isMono = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="fld">
      {label && (
        <label htmlFor={inputId} className="lb">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`inp ${isMono ? 'mono' : ''} ${error ? 'err' : ''} ${className}`.trim()}
        {...props}
      />
      {hint && !error && <span className="hint">{hint}</span>}
      {error && <span className="msg err">{error}</span>}
    </div>
  );
};
