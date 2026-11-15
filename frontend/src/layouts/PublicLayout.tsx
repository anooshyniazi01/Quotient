import React from 'react';
import { Outlet } from 'react-router-dom';
import { WindowMap } from '../components/navigation/WindowMap';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Outlet />
      <WindowMap />
    </div>
  );
};
