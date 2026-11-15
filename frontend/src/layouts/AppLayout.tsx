import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { StatusStrip } from '../components/navigation/StatusStrip';
import { SectionBar } from '../components/navigation/SectionBar';
import { MobileBottomNav } from '../components/navigation/MobileBottomNav';
import { JumpPalette } from '../components/navigation/JumpPalette';
import { WindowMap } from '../components/navigation/WindowMap';

export const AppLayout: React.FC = () => {
  const [isJumpOpen, setIsJumpOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 46px Navy Status Strip */}
      <StatusStrip onOpenJumpPalette={() => setIsJumpOpen(true)} />

      {/* Sticky White Section Bar */}
      <SectionBar />

      {/* Main Window Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation (≤820px) */}
      <MobileBottomNav />

      {/* Ctrl K Command Palette */}
      <JumpPalette isOpen={isJumpOpen} onClose={() => setIsJumpOpen(false)} />

      {/* Dev-only Window Navigator */}
      <WindowMap />
    </div>
  );
};
