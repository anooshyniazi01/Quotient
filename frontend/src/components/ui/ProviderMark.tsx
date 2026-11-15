import React from 'react';

const PROVIDER_GLYPHS: Record<string, string> = {
  gemini: '<path d="M12 3c.9 5.2 3.8 8.1 9 9-5.2.9-8.1 3.8-9 9-.9-5.2-3.8-8.1-9-9 5.2-.9 8.1-3.8 9-9z" fill="currentColor" stroke="none"/>',
  openai: '<path d="M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9z"/><path d="M12 8l4 2.3v4.6L12 17.2 8 14.9v-4.6z"/>',
  groq: '<path d="M17 8.5A5.5 5.5 0 1 0 17 15.5M12.5 12H17v4"/>',
  anthropic: '<path d="M5 19L12 5l7 14M8.5 14.5h7"/>',
  openrouter: '<path d="M3 12h5l4-6h6M8 12l4 6h6"/><path d="M16 3.5L19 6l-3 2.5M16 15.5l3 2.5-3 2.5"/>',
  custom: '<path d="M9 4C7 4 6 5 6 7v2c0 1.2-1 2.5-2.5 3C5 12.5 6 13.8 6 15v2c0 2 1 3 3 3M15 4c2 0 3 1 3 3v2c0 1.2 1 2.5 2.5 3-1.5.5-2.5 1.8-2.5 3v2c0 2-1 3-3 3"/>',
};

export interface ProviderMarkProps {
  provider: string;
  size?: number;
  isLight?: boolean;
  className?: string;
}

export const ProviderMark: React.FC<ProviderMarkProps> = ({
  provider,
  size = 32,
  isLight = false,
  className = '',
}) => {
  const glyph = PROVIDER_GLYPHS[provider.toLowerCase()] || '';

  return (
    <span
      className={`pm ${isLight ? 'lt' : ''} ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-label={`${provider} provider mark`}
    >
      <svg
        width={size * 0.62}
        height={size * 0.62}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: glyph }}
      />
    </span>
  );
};
