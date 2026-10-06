import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'check-in', label: 'Check In', icon: 'sentiment_satisfied' },
    { id: 'stories', label: 'Stories', icon: 'menu_book' },
    { id: 'insights', label: 'Insights', icon: 'ssid_chart' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_16px_rgba(232,146,124,0.10)] border-t border-surface-container-high/60 transition-colors">
      <div className="max-w-xl mx-auto flex items-center justify-around h-20 px-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[50px] py-1 px-2 rounded-full transition-all gap-0.5 cursor-pointer ${
                isActive
                  ? 'bg-surface-container-high text-primary font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50'
              }`}
            >
              <span 
                className={`material-symbols-outlined text-[24px] transition-transform duration-200 ${isActive ? 'scale-110 fill-1' : ''}`}
                style={{ fontVariationSettings: isActive ? "'FILL' 1, 'wght' 500" : "'FILL' 0, 'wght' 400" }}
              >
                {tab.icon}
              </span>
              <span className="font-label-md text-label-md tracking-tight leading-none">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
