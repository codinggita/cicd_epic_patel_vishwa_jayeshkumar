import React, { Suspense } from 'react';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="min-h-screen bg-[#FFFDF8] dark:bg-[#0A0915] text-[#334155] dark:text-[#F1F5F9] transition-colors duration-300 antialiased font-sans">
      <Suspense fallback={<LoadingFallback />}>
        <AppRoutes />
      </Suspense>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#FFFDF8] dark:bg-[#0A0915] transition-colors duration-300">
      <div className="relative flex flex-col items-center justify-center">
        {/* Glow behind */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#14B8A6] opacity-10 blur-xl animate-pulse"></div>
        {/* Spinning loading widget */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-full w-full rounded-full border-4 border-[#6D28D9]/10"></div>
          <div className="absolute h-full w-full rounded-full border-4 border-t-[#6D28D9] border-r-[#14B8A6] border-b-[#F97316] border-l-transparent animate-spin"></div>
        </div>
        <div className="mt-6 font-display text-sm font-semibold tracking-wider text-[#6D28D9] dark:text-[#14B8A6] uppercase animate-pulse">
          Initializing StackOrbit
        </div>
      </div>
    </div>
  );
}

export default App;
