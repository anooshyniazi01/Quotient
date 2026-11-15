import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../icons/Icons';
import { NAV_GROUPS, type NavItemDef, type NavGroupDef } from './navDef';

export { NAV_GROUPS, type NavItemDef, type NavGroupDef };

export const SectionBar: React.FC = () => {
  return (
    <nav className="nav" aria-label="Main navigation">
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="ng">
          <div className="ngl">{group.label}</div>
          <div className="ngi">
            {group.items.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => `ni ${isActive ? 'on' : ''}`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
                {item.badgeCount ? (
                  <span className="cb">{item.badgeCount}</span>
                ) : (
                  <span className="n">{item.windowNum}</span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};
