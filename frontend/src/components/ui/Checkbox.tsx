import React from 'react';
import { Icon } from '../icons/Icons';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        className={`ck ${checked ? 'on' : ''}`}
        onClick={() => onChange(!checked)}
      >
        <Icon name="check" size={12} />
      </button>
      {label && <span className="text-[13px] text-navy">{label}</span>}
    </label>
  );
};
