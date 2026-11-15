import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../icons/Icons';
import { NAV_GROUPS } from './navDef';

export const MobileBottomNav: React.FC = () => {
  // Flatten all navigation items into a primary list for the bottom bar
  const allItems = NAV_GROUPS.flatMap((group) => group.items);

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-navy shadow-[0_-8px_24px_rgba(20,33,61,0.12)] flex overflow-x-auto scrollbar-none px-1"
      aria-label="Mobile Navigation"
    >
      {allItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 py-2 px-3 min-w-[64px] text-[10.5px] transition-colors relative whitespace-nowrap ${
              isActive ? 'text-navy bg-amber4' : 'text-mut hover:text-navy'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute top-0 left-0 right-0 h-[3px] bg-amber" />
              )}
              <Icon name={item.icon} size={18} />
              <span className="mt-1 font-medium">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
