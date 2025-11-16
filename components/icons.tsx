
import React from 'react';

export const IconWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    {children}
  </svg>
);

export const BookOpenIcon = () => (
  <IconWrapper className="text-sky-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </IconWrapper>
);

export const VideoCameraIcon = () => (
  <IconWrapper className="text-rose-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </IconWrapper>
);

export const SparklesIcon = () => (
    <IconWrapper className="text-amber-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18l-1.813-2.096a4.5 4.5 0 00-6.364-6.364L1 8l2.096-1.813a4.5 4.5 0 006.364 6.364L11 14l-1.187 1.904zM14 8l-2-2 1.5-1.5L15 6l-1 2zm-2 6l-1.5 1.5L12 17l1-2 .5.5z" />
    </IconWrapper>
);

export const ClipboardListIcon = () => (
  <IconWrapper className="text-emerald-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </IconWrapper>
);

export const UserGroupIcon = () => (
    <IconWrapper className="text-violet-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </IconWrapper>
);

export const LockClosedIcon = () => (
  <IconWrapper className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </IconWrapper>
);

export const CheckCircleIcon = () => (
    <IconWrapper className="h-5 w-5 text-green-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </IconWrapper>
);
