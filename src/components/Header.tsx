import React from 'react';
import { BRAND_ASSETS } from '../data/mockStories';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onProfileClick: () => void;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onProfileClick, onHomeClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(232,146,124,0.08)] border-b border-surface-container-high/60 transition-colors">
      <div className="max-w-xl mx-auto h-16 px-4 sm:px-5 flex items-center justify-between">
        <button 
          onClick={onHomeClick}
          className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none rounded-full"
          aria-label="Haven Sanctuary Home"
        >
          <img 
            alt="Haven Logo" 
            className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105" 
            src={BRAND_ASSETS.logo}
            referrerPolicy="no-referrer"
          />
          <span className="font-headline-md text-on-surface tracking-tight font-semibold">
            Haven
          </span>
        </button>

        <div className="flex items-center gap-2">
          <button 
            aria-label="Elena Vance's Profile and Sanctuary Settings" 
            onClick={onProfileClick}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-all active:scale-95 cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 p-0.5"
          >
            <img 
              alt="Elena Vance" 
              className="w-full h-full rounded-full object-cover" 
              src={BRAND_ASSETS.avatar}
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
