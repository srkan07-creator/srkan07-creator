import React from 'react';

export const WooqooLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="logo-play-gradient" x1="48" y1="0" x2="0" y2="48">
        <stop stopColor="#F8534F"/>
        <stop offset="1" stopColor="#E54335"/>
      </linearGradient>
      <linearGradient id="logo-ring-gradient" x1="12" y1="12" x2="36" y2="36">
        <stop stopColor="#FFC145"/>
        <stop offset="1" stopColor="#FF8B45"/>
      </linearGradient>
    </defs>
    <path d="M45.5 21.3C48.4 23 48.4 25 45.5 26.7L7.9 46.2C5.1 47.9 1.5 45.6 1.5 42.6V5.4C1.5 2.4 5.1 0.1 7.9 1.8L45.5 21.3Z" fill="url(#logo-play-gradient)"/>
    <circle cx="24" cy="24" r="14.5" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.5"/>
    <circle cx="24" cy="24" r="12" fill="url(#logo-ring-gradient)"/>
    <circle cx="24"cy="24" r="8.5" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.7"/>
    <circle cx="24" cy="24" r="7.5" fill="#200A00"/>
    <circle cx="27.5" cy="20.5" r="2.5" fill="white"/>
  </svg>
);
