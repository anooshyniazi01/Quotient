export const TOKENS = {
  colors: {
    navy: '#14213D',
    navy2: '#1B2C52',
    navy3: '#2B3D69',
    navy4: '#4A5C86',
    navy5: '#8793B0',

    amber: '#FCA311',
    amber2: '#FFD27A',
    amber3: '#FFEFCB',
    amber4: '#FFF8E8',
    amberD: '#B36A00',

    ink: '#14213D',
    mut: '#5C667D',
    mut2: '#8A92A5',
    line: '#E5E5E5',
    line2: '#EEEEEC',
    bg2: '#F5F5F3',

    ok: '#1F8A5B',
    okbg: '#E6F4EC',
    bad: '#C9382E',
    badbg: '#FBE9E7',
    white: '#FFFFFF',
    black: '#000000',
  },
  providers: {
    gemini: { name: 'Gemini', color: '#FCA311' },
    openai: { name: 'OpenAI', color: '#14213D' },
    groq: { name: 'Groq', color: '#4A5C86' },
    anthropic: { name: 'Anthropic', color: '#FFD27A' },
    openrouter: { name: 'OpenRouter', color: '#C3CADB' },
    custom: { name: 'Custom OpenAI-compatible', color: '#8793B0' },
  },
  fonts: {
    sans: 'Instrument Sans, system-ui, -apple-system, sans-serif',
    serif: 'Instrument Serif, Georgia, serif',
    mono: 'IBM Plex Mono, ui-monospace, monospace',
  },
  breakpoints: {
    desktop: 1180,
    tablet: 940,
    bottomNav: 820,
    mobile: 520,
  },
} as const;

export type ProvenanceType = 'provider' | 'observed' | 'estimated' | 'user';
