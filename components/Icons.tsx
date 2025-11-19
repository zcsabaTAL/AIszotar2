
import React from 'react';

export const SearchIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const ThumbsUpIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.424 2.002-1.125.47-.701.543-1.591.228-2.375a3.5 3.5 0 00-2.23-2.23c-.784-.315-1.674-.242-2.375.228C3.424 4.88 3 5.607 3 6.413v2.838M3 10.25a2.25 2.25 0 00-2.25 2.25v6.5A2.25 2.25 0 003 21.25h14.25a2.25 2.25 0 002.25-2.25v-6.5a2.25 2.25 0 00-2.25-2.25H3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 10.25v11.25m3-11.25v11.25m3-11.25v11.25" />
    </svg>
);

export const ThumbsDownIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 13.75c.806 0 1.533.424 2.002 1.125.47.701.543 1.591.228 2.375a3.5 3.5 0 01-2.23 2.23c-.784.315-1.674.242-2.375-.228C3.424 18.12 3 17.393 3 16.587v-2.838M3 13.75a2.25 2.25 0 012.25-2.25h14.25a2.25 2.25 0 012.25 2.25v6.5A2.25 2.25 0 0119.5 2.75H3A2.25 2.25 0 01.75 20.5v-6.5A2.25 2.25 0 013 11.5H3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.75V2.5m3 11.25V2.5m3 11.25V2.5" />
    </svg>
);

export const SparklesIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.543L16.5 21.75l-.398-1.207a3.375 3.375 0 00-2.455-2.456L12.75 18l1.207-.398a3.375 3.375 0 002.455-2.456L16.5 14.25l.398 1.207a3.375 3.375 0 002.456 2.456L20.25 18l-1.207.398a3.375 3.375 0 00-2.456 2.456z" />
  </svg>
);

export const CloseIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ChatIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 01-2.53-.388m-5.182-1.232a9.75 9.75 0 01-.388-2.53C3 7.444 7.03 3.75 12 3.75c4.97 0 9 3.694 9 8.25z" />
  </svg>
);

export const SendIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);

export const BackIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

export const LoadingSpinner = ({ className = 'w-8 h-8' }: { className?: string }) => (
  <svg className={`${className} animate-spin`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const AppLogo = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="logo_gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8" /> 
        <stop offset="1" stopColor="#6366f1" />
      </linearGradient>
    </defs>
    {/* Open Book Base */}
    <path 
        d="M10 16 C 10 13 13 13 18 13 C 22 13 24 17 24 17 C 24 17 26 13 30 13 C 35 13 38 13 38 16 V 36 C 38 39 35 39 30 39 C 26 39 24 35 24 35 C 24 35 22 39 18 39 C 13 39 10 39 10 36 Z" 
        stroke="url(#logo_gradient)" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    />
    {/* Spine / Neural Line */}
    <path d="M24 17 V 35" stroke="url(#logo_gradient)" strokeWidth="2" strokeLinecap="round" />
    
    {/* AI/Spark Connectivity Rising from the book */}
    <circle cx="24" cy="8" r="3" fill="url(#logo_gradient)" />
    <path d="M24 11 V 17" stroke="url(#logo_gradient)" strokeWidth="2" />
    
    {/* Side Connections */}
    <circle cx="14" cy="10" r="2" fill="url(#logo_gradient)" opacity="0.8" />
    <path d="M14.5 11.5 L 22 16" stroke="url(#logo_gradient)" strokeWidth="1.5" opacity="0.8" />
    
    <circle cx="34" cy="10" r="2" fill="url(#logo_gradient)" opacity="0.8" />
    <path d="M33.5 11.5 L 26 16" stroke="url(#logo_gradient)" strokeWidth="1.5" opacity="0.8" />
  </svg>
);
