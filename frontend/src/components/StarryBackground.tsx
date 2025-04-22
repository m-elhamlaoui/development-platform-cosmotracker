import React from 'react';

const StarryBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      <div className="absolute inset-0 bg-slate-950">
        {/* Small stars */}
        <div className="absolute top-1/4 left-1/3 h-1 w-1 bg-white rounded-full opacity-80 animate-twinkle"></div>
        <div className="absolute top-3/4 left-1/5 h-1 w-1 bg-white rounded-full opacity-70 animate-twinkle"></div>
        <div className="absolute top-1/2 left-2/3 h-1 w-1 bg-white rounded-full opacity-90 animate-twinkle"></div>
        <div className="absolute top-1/6 left-3/4 h-1 w-1 bg-white rounded-full opacity-60 animate-twinkle"></div>
        <div className="absolute top-5/6 left-1/2 h-1 w-1 bg-white rounded-full opacity-80 animate-twinkle"></div>
        
        {/* Medium stars */}
        <div className="absolute top-1/3 left-1/5 h-1.5 w-1.5 bg-white rounded-full opacity-70 animate-twinkle"></div>
        <div className="absolute top-2/3 left-4/5 h-1.5 w-1.5 bg-white rounded-full opacity-80 animate-twinkle"></div>
        <div className="absolute top-1/5 left-2/5 h-1.5 w-1.5 bg-white rounded-full opacity-90 animate-twinkle"></div>
        
        {/* Large stars */}
        <div className="absolute top-2/5 left-1/6 h-2 w-2 bg-white rounded-full opacity-80 animate-twinkle"></div>
        <div className="absolute top-3/5 left-3/4 h-2 w-2 bg-white rounded-full opacity-70 animate-twinkle"></div>
        
        {/* Colorful stars */}
        <div className="absolute top-1/4 left-2/3 h-2 w-2 bg-primary-400 rounded-full opacity-60 animate-twinkle"></div>
        <div className="absolute top-3/4 left-1/3 h-2 w-2 bg-secondary-400 rounded-full opacity-60 animate-twinkle"></div>
        <div className="absolute top-1/2 left-1/4 h-2 w-2 bg-accent-400 rounded-full opacity-60 animate-twinkle"></div>
        
        {/* Nebula-like gradients */}
        <div className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-primary-900/20 blur-3xl"></div>
        <div className="absolute top-1/2 -right-10 h-80 w-80 rounded-full bg-secondary-900/20 blur-3xl"></div>
        <div className="absolute -bottom-10 left-1/3 h-72 w-72 rounded-full bg-accent-900/10 blur-3xl"></div>
      </div>
    </div>
  );
};

export default StarryBackground;