import React from 'react';

export const WooqooLogo: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logo-gradient-red" x1="0" y1="0" x2="48" y2="48">
        <stop stopColor="#FF7A6E" />
        <stop offset="1" stopColor="#F8534F" />
      </linearGradient>
      <linearGradient id="logo-gradient-orange" x1="12" y1="12" x2="36" y2="36">
        <stop stopColor="#FFC145" />
        <stop offset="1" stopColor="#FF8B45" />
      </linearGradient>
    </defs>
    <path 
      d="M45.5,21.3L7.9,1.8C5.1-0.1,1.5,2.2,1.5,5.4v37.1c0,3.2,3.6,5.5,6.4,3.6l37.6-19.5C48.4,24.7,48.4,23.3,45.5,21.3z" 
      fill="url(#logo-gradient-red)" 
    />
    <circle cx="24" cy="24" r="12" fill="url(#logo-gradient-orange)" />
    <circle cx="24" cy="24" r="10" fill="white" fillOpacity="0.3" />
    <circle cx="24" cy="24" r="8" fill="#0F172A" />
    <circle cx="27" cy="21" r="2" fill="white" fillOpacity="0.8" />
  </svg>
);
