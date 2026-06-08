/**
 * StackOrbit Design System Tokens
 * Reusable constants representing the premium brand identity.
 * Inspired by modern interfaces like Stripe, Linear, and Notion.
 */

export const theme = {
  // Color Tokens
  colors: {
    brand: {
      primary: '#6D28D9',       // Royal Violet
      secondary: '#14B8A6',     // Teal
      accent: '#F97316',        // Burnt Orange
      lightBg: '#FFFDF8',       // Warm Ivory
      darkBg: '#0A0915',        // Space Obsidian
      slateText: '#334155',     // Cool Slate
    },
    light: {
      background: '#FFFDF8',
      surface: '#FFFFFF',
      surfaceGlass: 'rgba(255, 253, 248, 0.75)',
      border: 'rgba(109, 40, 217, 0.08)',
      textPrimary: '#334155',   // Slate-700
      textSecondary: '#64748B', // Slate-500
      textMuted: '#94A3B8',     // Slate-400
      accentGlow: 'rgba(109, 40, 217, 0.04)',
    },
    dark: {
      background: '#0A0915',
      surface: '#121124',
      surfaceGlass: 'rgba(18, 17, 36, 0.7)',
      border: 'rgba(20, 184, 166, 0.1)',
      textPrimary: '#F1F5F9',   // Slate-100
      textSecondary: '#94A3B8', // Slate-400
      textMuted: '#64748B',     // Slate-500
      accentGlow: 'rgba(20, 184, 166, 0.08)',
    }
  },

  // Typography Scale (Standard system fonts, display font headers)
  typography: {
    fontFamily: {
      body: "'Plus Jakarta Sans', 'Inter', sans-serif",
      display: "'Outfit', 'Inter', sans-serif",
      mono: "'Fira Code', 'Courier New', monospace",
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    }
  },

  // Spacing Scale
  spacing: {
    0: '0px',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
  },

  // Border Radius Scale
  borderRadius: {
    none: '0px',
    sm: '0.125rem',  // 2px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px (Standard XL radius)
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },

  // Shadows Preset
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    premium: '0 10px 40px -10px rgba(109, 40, 217, 0.08)',
    premiumHover: '0 20px 50px -10px rgba(109, 40, 217, 0.15)',
    glassLight: '0 8px 32px 0 rgba(109, 40, 217, 0.04)',
    glassDark: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },

  // Animations & Transitions
  transitions: {
    fast: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    normal: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  }
};

export default theme;
