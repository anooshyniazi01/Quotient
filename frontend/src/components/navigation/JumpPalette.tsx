import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../icons/Icons';
import { NAV_GROUPS } from './navDef';

export interface JumpPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JumpPalette: React.FC<JumpPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open handled by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allItems = NAV_GROUPS.flatMap((g) =>
    g.items.map((i) => ({ ...i, group: g.label }))
  );

  const filtered = query.trim()
    ? allItems.filter(
        (i) =>
          i.label.toLowerCase().includes(query.toLowerCase()) ||
          i.group.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  return (
    <div
      className="mback"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Jump Palette"
    >
      <div
        className="mbox w-[540px] max-w-[92vw] overflow-hidden rounded-lg border-t-[3px] border-amber shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
          <Icon name="search" size={18} className="text-navy5" />
          <input
            type="text"
            placeholder="Type a window, provider, or view name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-0 outline-none font-sans text-[14px] text-navy placeholder:text-mut2"
          />
          <kbd className="kbd">ESC</kbd>
        </div>

        <div className="max-h-[360px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-mut text-[13px]">
              No destinations match "{query}"
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.path}
                type="button"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] hover:bg-amber4 text-left transition-colors group"
                onClick={() => handleSelect(item.path)}
              >
                <div className="flex items-center gap-3">
                  <Icon name={item.icon} size={16} className="text-navy" />
                  <span className="font-medium text-[13.5px] text-navy group-hover:text-black">
                    {item.label}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-mut2 uppercase tracking-wider">
                  {item.group}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
