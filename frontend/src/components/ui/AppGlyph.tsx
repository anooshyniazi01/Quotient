import React from 'react';

export interface AppGlyphProps {
  name: string;
  size?: number;
  className?: string;
}

export const AppGlyph: React.FC<AppGlyphProps> = ({
  name,
  className = '',
}) => {
  const initial = name ? name[0].toUpperCase() : 'A';
  return (
    <span
      className={`ag ${className}`}
      aria-label={`${name} application glyph`}
    >
      {initial}
    </span>
  );
};
