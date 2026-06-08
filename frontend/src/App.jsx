import React, { Suspense } from 'react';
import AppRoutes from './routes/AppRoutes';

const overrideStyles = `
  /* Global CSS Overrides for StackOrbit UI Redesign */

  /* Base Body and Backgrounds */
  body {
    background-color: #FFF8F0 !important;
  }
  body.dark {
    background-color: #0B0A11 !important;
  }
  [class*="bg-[#FFFDF8]"] {
    background-color: #FFF8F0 !important;
  }
  [class*="dark:bg-[#0A0915]"],
  .dark [class*="bg-[#0A0915]"] {
    background-color: #0B0A11 !important;
  }
  [class*="bg-[#121124]"] {
    background-color: #161520 !important;
  }
  .dark [class*="bg-[#121124]"] {
    background-color: #161520 !important;
  }
  
  /* Primary Violet Overrides */
  .text-brand-primary,
  [class*="text-[#6D28D9]"],
  [class*="text-brand-primary"] {
    color: #7C3AED !important;
  }
  .bg-brand-primary,
  [class*="bg-[#6D28D9]"],
  [class*="bg-brand-primary"] {
    background-color: #7C3AED !important;
  }
  .border-brand-primary,
  [class*="border-[#6D28D9]"],
  [class*="border-brand-primary"] {
    border-color: #7C3AED !important;
  }
  
  /* Semi-transparent Primary Overrides */
  [class*="bg-[#6D28D9]/5"], [class*="bg-brand-primary/5"] {
    background-color: rgba(124, 58, 237, 0.05) !important;
  }
  [class*="bg-[#6D28D9]/10"], [class*="bg-brand-primary/10"] {
    background-color: rgba(124, 58, 237, 0.1) !important;
  }
  [class*="bg-[#6D28D9]/20"], [class*="bg-brand-primary/20"] {
    background-color: rgba(124, 58, 237, 0.2) !important;
  }
  [class*="border-[#6D28D9]/10"], [class*="border-brand-primary/10"] {
    border-color: rgba(124, 58, 237, 0.1) !important;
  }
  
  /* Hover Overrides */
  [class*="hover:bg-[#6D28D9]/5"]:hover {
    background-color: rgba(124, 58, 237, 0.05) !important;
  }
  [class*="hover:bg-[#6D28D9]/10"]:hover {
    background-color: rgba(124, 58, 237, 0.1) !important;
  }
  .dark [class*="hover:bg-[#6D28D9]/10"]:hover,
  [class*="dark:hover:bg-[#6D28D9]/10"]:hover {
    background-color: rgba(124, 58, 237, 0.15) !important;
  }

  /* Active text highlights */
  [class*="text-[#A78BFA]"],
  .dark [class*="text-[#A78BFA]"] {
    color: #C084FC !important; /* Lighter violet for dark mode */
  }

  /* Secondary Amber Gold Overrides */
  .bg-brand-secondary, [class*="bg-brand-secondary"] {
    background-color: #F59E0B !important;
  }
  .text-brand-secondary, [class*="text-brand-secondary"] {
    color: #F59E0B !important;
  }
  
  /* Accent Ocean Teal overrides */
  .bg-brand-accent, [class*="bg-brand-accent"] {
    background-color: #14B8A6 !important;
  }
  .text-brand-accent, [class*="text-brand-accent"] {
    color: #14B8A6 !important;
  }
  
  /* Gradient Updates */
  [class*="from-brand-primary"] {
    --tw-gradient-from: #7C3AED !important;
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(124, 58, 237, 0)) !important;
  }
  [class*="to-[#7C3AED]"] {
    --tw-gradient-to: #F59E0B !important;
  }
  [class*="via-[#7C3AED]"] {
    --tw-gradient-via: #F59E0B !important;
  }
  [class*="to-brand-secondary"] {
    --tw-gradient-to: #F59E0B !important;
  }
  
  /* Glassmorphism Refinements */
  .glass-card {
    background: rgba(255, 255, 255, 0.8) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
    border: 1px solid rgba(124, 58, 237, 0.08) !important;
    box-shadow: 0 8px 32px 0 rgba(124, 58, 237, 0.04) !important;
  }
  .dark .glass-card {
    background: rgba(22, 21, 32, 0.75) !important;
    border: 1px solid rgba(124, 58, 237, 0.12) !important;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.35) !important;
  }
  
  .glass-sidebar {
    background: rgba(255, 248, 240, 0.8) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-right: 1px solid rgba(124, 58, 237, 0.08) !important;
  }
  .dark .glass-sidebar {
    background: rgba(11, 10, 17, 0.85) !important;
    border-right: 1px solid rgba(124, 58, 237, 0.12) !important;
  }
  
  .glass-navbar {
    background: rgba(255, 248, 240, 0.75) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
    border-bottom: 1px solid rgba(124, 58, 237, 0.08) !important;
  }
  .dark .glass-navbar {
    background: rgba(11, 10, 17, 0.8) !important;
    border-bottom: 1px solid rgba(124, 58, 237, 0.12) !important;
  }
  
  /* Custom Webkit Scrollbars */
  ::-webkit-scrollbar-thumb {
    background: rgba(124, 58, 237, 0.2) !important;
  }
  .dark ::-webkit-scrollbar-thumb {
    background: rgba(124, 58, 237, 0.25) !important;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #7C3AED !important;
  }
  .dark ::-webkit-scrollbar-thumb:hover {
    background: #7C3AED !important;
  }
  
  /* Focus Rings */
  input:focus, select:focus, textarea:focus {
    border-color: #7C3AED !important;
    box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.15) !important;
  }
  
  /* Custom glow overrides */
  .glow-purple {
    box-shadow: 0 0 40px -5px rgba(124, 58, 237, 0.18) !important;
  }
  .dark .glow-purple {
    box-shadow: 0 0 45px -5px rgba(124, 58, 237, 0.35) !important;
  }
  .glow-teal {
    box-shadow: 0 0 40px -5px rgba(20, 184, 166, 0.18) !important;
  }
  .dark .glow-teal {
    box-shadow: 0 0 45px -5px rgba(20, 184, 166, 0.35) !important;
  }
`;

function App() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] dark:bg-[#0B0A11] text-[#334155] dark:text-[#F1F5F9] transition-colors duration-300 antialiased font-sans">
      <style dangerouslySetInnerHTML={{ __html: overrideStyles }} />
      <Suspense fallback={<LoadingFallback />}>
        <AppRoutes />
      </Suspense>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#FFF8F0] dark:bg-[#0B0A11] transition-colors duration-300">
      <div className="relative flex flex-col items-center justify-center">
        {/* Glow behind */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#F59E0B] opacity-10 blur-xl animate-pulse"></div>
        {/* Spinning loading widget */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-full w-full rounded-full border-4 border-[#7C3AED]/10"></div>
          <div className="absolute h-full w-full rounded-full border-4 border-t-[#7C3AED] border-r-[#F59E0B] border-b-[#14B8A6] border-l-transparent animate-spin"></div>
        </div>
        <div className="mt-6 font-display text-sm font-semibold tracking-wider text-[#7C3AED] dark:text-[#14B8A6] uppercase animate-pulse">
          Initializing StackOrbit
        </div>
      </div>
    </div>
  );
}

export default App;
