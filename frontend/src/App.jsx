import React, { Suspense } from 'react';
import AppRoutes from './routes/AppRoutes';

const overrideStyles = `
  /* Global CSS Overrides for StackOrbit UI Redesign (Emerald & Gold Theme) */

  /* Base Body and Backgrounds */
  body {
    background-color: #FAF7F0 !important;
  }
  body.dark {
    background-color: #0F1410 !important;
  }
  [class*="bg-[#FFFDF8]"], [class*="bg-[#FFF8F0]"] {
    background-color: #FAF7F0 !important;
  }
  [class*="dark:bg-[#0A0915]"], [class*="dark:bg-[#0B0A11]"],
  .dark [class*="bg-[#0A0915]"], .dark [class*="bg-[#0B0A11]"] {
    background-color: #0F1410 !important;
  }
  [class*="bg-[#121124]"], [class*="bg-[#161520]"] {
    background-color: #151C17 !important;
  }
  .dark [class*="bg-[#121124]"], .dark [class*="bg-[#161520]"] {
    background-color: #151C17 !important;
  }
  
  /* Primary Jade Emerald Overrides */
  .text-brand-primary,
  [class*="text-[#6D28D9]"],
  [class*="text-[#7C3AED]"],
  [class*="text-brand-primary"] {
    color: #059669 !important;
  }
  .bg-brand-primary,
  [class*="bg-[#6D28D9]"],
  [class*="bg-[#7C3AED]"],
  [class*="bg-brand-primary"] {
    background-color: #059669 !important;
  }
  .border-brand-primary,
  [class*="border-[#6D28D9]"],
  [class*="border-[#7C3AED]"],
  [class*="border-brand-primary"] {
    border-color: #059669 !important;
  }
  
  /* Semi-transparent Primary Overrides */
  [class*="bg-[#6D28D9]/5"], [class*="bg-[#7C3AED]/5"], [class*="bg-brand-primary/5"] {
    background-color: rgba(5, 150, 105, 0.05) !important;
  }
  [class*="bg-[#6D28D9]/10"], [class*="bg-[#7C3AED]/10"], [class*="bg-brand-primary/10"] {
    background-color: rgba(5, 150, 105, 0.1) !important;
  }
  [class*="bg-[#6D28D9]/20"], [class*="bg-[#7C3AED]/20"], [class*="bg-brand-primary/20"] {
    background-color: rgba(5, 150, 105, 0.2) !important;
  }
  [class*="border-[#6D28D9]/10"], [class*="border-[#7C3AED]/10"], [class*="border-brand-primary/10"] {
    border-color: rgba(5, 150, 105, 0.1) !important;
  }
  
  /* Hover Overrides */
  [class*="hover:bg-[#6D28D9]/5"]:hover, [class*="hover:bg-[#7C3AED]/5"]:hover {
    background-color: rgba(5, 150, 105, 0.05) !important;
  }
  [class*="hover:bg-[#6D28D9]/10"]:hover, [class*="hover:bg-[#7C3AED]/10"]:hover {
    background-color: rgba(5, 150, 105, 0.1) !important;
  }
  .dark [class*="hover:bg-[#6D28D9]/10"]:hover,
  .dark [class*="hover:bg-[#7C3AED]/10"]:hover,
  [class*="dark:hover:bg-[#6D28D9]/10"]:hover,
  [class*="dark:hover:bg-[#7C3AED]/10"]:hover {
    background-color: rgba(5, 150, 105, 0.15) !important;
  }

  /* Active text highlights */
  [class*="text-[#A78BFA]"],
  [class*="text-[#C084FC]"],
  .dark [class*="text-[#A78BFA]"],
  .dark [class*="text-[#C084FC]"] {
    color: #34D399 !important; /* Mint green for dark mode active text */
  }

  /* Secondary Bronze Gold Overrides */
  .text-brand-secondary,
  [class*="text-[#14B8A6]"],
  [class*="text-[#F59E0B]"],
  [class*="text-brand-secondary"] {
    color: #D97706 !important;
  }
  .bg-brand-secondary,
  [class*="bg-[#14B8A6]"],
  [class*="bg-[#F59E0B]"],
  [class*="bg-brand-secondary"] {
    background-color: #D97706 !important;
  }
  
  /* Semi-transparent Secondary Overrides */
  [class*="bg-[#14B8A6]/10"], [class*="bg-[#F59E0B]/10"], [class*="bg-brand-secondary/10"] {
    background-color: rgba(217, 119, 6, 0.1) !important;
  }
  [class*="bg-[#14B8A6]/20"], [class*="bg-[#F59E0B]/20"], [class*="bg-brand-secondary/20"] {
    background-color: rgba(217, 119, 6, 0.2) !important;
  }
  
  /* Accent Warm Yellow Overrides */
  .bg-brand-accent, [class*="bg-brand-accent"], [class*="bg-[#F97316]"], [class*="bg-[#EAB308]"] {
    background-color: #EAB308 !important;
  }
  .text-brand-accent, [class*="text-brand-accent"], [class*="text-[#F97316]"], [class*="text-[#EAB308]"] {
    color: #EAB308 !important;
  }
  
  /* Handle specific dashboard color overrides (teal indicators to green/gold) */
  [class*="dark:text-[#2DD4BF]"], .dark [class*="text-[#2DD4BF]"] {
    color: #FBBF24 !important;
  }
  [class*="dark:bg-[#14B8A6]/20"], .dark [class*="bg-[#14B8A6]/20"] {
    background-color: rgba(217, 119, 6, 0.15) !important;
  }
  
  /* Gradient Updates */
  [class*="from-brand-primary"], [class*="from-[#6D28D9]"], [class*="from-[#7C3AED]"] {
    --tw-gradient-from: #059669 !important;
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(5, 150, 105, 0)) !important;
  }
  [class*="to-[#7C3AED]"], [class*="to-[#14B8A6]"], [class*="to-brand-secondary"], [class*="to-[#F59E0B]"] {
    --tw-gradient-to: #D97706 !important;
  }
  [class*="via-[#7C3AED]"], [class*="via-[#14B8A6]"] {
    --tw-gradient-via: #D97706 !important;
  }
  
  /* Glassmorphism Refinements */
  .glass-card {
    background: rgba(255, 255, 255, 0.8) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
    border: 1px solid rgba(5, 150, 105, 0.08) !important;
    box-shadow: 0 8px 32px 0 rgba(5, 150, 105, 0.04) !important;
  }
  .dark .glass-card {
    background: rgba(21, 28, 23, 0.75) !important;
    border: 1px solid rgba(5, 150, 105, 0.15) !important;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.35) !important;
  }
  
  .glass-sidebar {
    background: rgba(250, 247, 240, 0.8) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-right: 1px solid rgba(5, 150, 105, 0.08) !important;
  }
  .dark .glass-sidebar {
    background: rgba(15, 20, 16, 0.85) !important;
    border-right: 1px solid rgba(5, 150, 105, 0.15) !important;
  }
  
  .glass-navbar {
    background: rgba(250, 247, 240, 0.75) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
    border-bottom: 1px solid rgba(5, 150, 105, 0.08) !important;
  }
  .dark .glass-navbar {
    background: rgba(15, 20, 16, 0.8) !important;
    border-bottom: 1px solid rgba(5, 150, 105, 0.15) !important;
  }
  
  /* Custom Webkit Scrollbars */
  ::-webkit-scrollbar-thumb {
    background: rgba(5, 150, 105, 0.2) !important;
  }
  .dark ::-webkit-scrollbar-thumb {
    background: rgba(5, 150, 105, 0.25) !important;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #059669 !important;
  }
  .dark ::-webkit-scrollbar-thumb:hover {
    background: #059669 !important;
  }
  
  /* Focus Rings */
  input:focus, select:focus, textarea:focus {
    border-color: #059669 !important;
    box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.15) !important;
  }
  
  /* Custom glow overrides */
  .glow-purple {
    box-shadow: 0 0 40px -5px rgba(5, 150, 105, 0.18) !important;
  }
  .dark .glow-purple {
    box-shadow: 0 0 45px -5px rgba(5, 150, 105, 0.35) !important;
  }
  .glow-teal {
    box-shadow: 0 0 40px -5px rgba(217, 119, 6, 0.18) !important;
  }
  .dark .glow-teal {
    box-shadow: 0 0 45px -5px rgba(217, 119, 6, 0.35) !important;
  }
`;

function App() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#0F1410] text-[#27272A] dark:text-[#F4F4F5] transition-colors duration-300 antialiased font-sans">
      <style dangerouslySetInnerHTML={{ __html: overrideStyles }} />
      <Suspense fallback={<LoadingFallback />}>
        <AppRoutes />
      </Suspense>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#FAF7F0] dark:bg-[#0F1410] transition-colors duration-300">
      <div className="relative flex flex-col items-center justify-center">
        {/* Glow behind */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#059669] to-[#D97706] opacity-10 blur-xl animate-pulse"></div>
        {/* Spinning loading widget */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-full w-full rounded-full border-4 border-[#059669]/10"></div>
          <div className="absolute h-full w-full rounded-full border-4 border-t-[#059669] border-r-[#D97706] border-b-[#EAB308] border-l-transparent animate-spin"></div>
        </div>
        <div className="mt-6 font-display text-sm font-semibold tracking-wider text-[#059669] dark:text-[#EAB308] uppercase animate-pulse">
          Initializing StackOrbit
        </div>
      </div>
    </div>
  );
}

export default App;
