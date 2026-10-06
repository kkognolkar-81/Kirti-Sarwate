import React from 'react';
import { SavedReflection } from '../types';

interface InsightsScreenProps {
  reflections: SavedReflection[];
  onOpenBreathing: () => void;
  onNavigateToCheckIn: () => void;
}

export const InsightsScreen: React.FC<InsightsScreenProps> = ({
  reflections,
  onOpenBreathing,
  onNavigateToCheckIn,
}) => {
  const weeklyData = [
    { day: 'Wed', val: 5, state: 'Heavy', fill: '#ede0d9' },
    { day: 'Thu', val: 6, state: 'Tender', fill: '#ffdbd2' },
    { day: 'Fri', val: 7, state: 'Centered', fill: '#cbe5dc' },
    { day: 'Sat', val: 8, state: 'Peaceful', fill: '#cbe5dc' },
    { day: 'Sun', val: 8, state: 'Quiet', fill: '#cbe5dc' },
    { day: 'Mon', val: 6, state: 'Tender', fill: '#ffdbd2' },
    { day: 'Today', val: 7, state: 'Centered', fill: '#e8927c', active: true },
  ];

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto space-y-6 pb-28 pt-2 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-1.5 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-secondary-container text-secondary">
              <span className="material-symbols-outlined text-[17px]">ssid_chart</span>
            </span>
            <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">
              Gentle Rhythm
            </span>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
            Last 7 Days
          </span>
        </div>
        <h1 className="font-display-mobile text-display-mobile text-on-surface font-bold tracking-tight">
          Mood &amp; Heart Insights
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Observing your emotional seasons without urgency or judgment.
        </p>
      </div>

      {/* Hero Stats Ribbon */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high/40 shadow-xs flex flex-col space-y-1">
          <div className="flex items-center justify-between text-primary">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">Moments of Peace</span>
            <span className="material-symbols-outlined text-[18px]">spa</span>
          </div>
          <span className="font-display-mobile text-display-mobile text-on-surface font-bold">38</span>
          <span className="font-body-sm text-body-sm text-secondary">Stories &amp; breaths completed</span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high/40 shadow-xs flex flex-col space-y-1">
          <div className="flex items-center justify-between text-secondary">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">Caring Streak</span>
            <span className="material-symbols-outlined text-[18px]">eco</span>
          </div>
          <span className="font-display-mobile text-display-mobile text-on-surface font-bold">5 Days</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">Tending your sanctuary</span>
        </div>
      </div>

      {/* Trajectory Graph Card */}
      <section className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-surface-container-lowest border border-surface-container-high/40 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Emotional Trajectory
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Notice the gentle rise after your quiet morning check-ins.
            </p>
          </div>
          <span className="font-label-md text-label-md px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-medium">
            Softening Trend
          </span>
        </div>

        {/* Visual Bar / Curve chart */}
        <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2">
          {weeklyData.map((item, idx) => {
            const heightPct = (item.val / 10) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-semibold text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.val}/10
                </span>
                <div
                  className={`w-full max-w-[36px] rounded-t-xl transition-all duration-500 relative ${
                    item.active ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                  style={{
                    height: `${heightPct}%`,
                    backgroundColor: item.fill,
                  }}
                >
                  {item.active && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                <span className={`font-label-md text-[11px] ${item.active ? 'font-bold text-primary' : 'text-on-surface-variant'}`}>
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs text-on-surface-variant pt-2 border-t border-surface-container-high/60">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ede0d9]" />
            <span>Heavy / Restless</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#cbe5dc]" />
            <span>Centered &amp; Peaceful</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
            <span>Today</span>
          </div>
        </div>
      </section>

      {/* Dominant Emotional Roots */}
      <section className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high/40 space-y-3">
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
          What Touched Your Heart Most This Week
        </h3>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-body-sm font-medium mb-1 text-on-surface">
              <span>Work &amp; Deadlines</span>
              <span className="text-on-surface-variant font-label-md">4 check-ins</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-primary-container rounded-full" style={{ width: '65%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-body-sm font-medium mb-1 text-on-surface">
              <span>Sleep &amp; Rest</span>
              <span className="text-on-surface-variant font-label-md">3 check-ins</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-secondary-fixed-dim rounded-full" style={{ width: '48%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-body-sm font-medium mb-1 text-on-surface">
              <span>Solitude</span>
              <span className="text-on-surface-variant font-label-md">3 check-ins</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-tertiary-fixed-dim rounded-full" style={{ width: '45%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Sanctuary Journal Entries */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Your Whispers &amp; Reflections
          </h3>
          <span className="font-label-md text-label-md text-on-surface-variant">
            ({reflections.length} saved)
          </span>
        </div>

        {reflections.length === 0 ? (
          <div className="p-6 rounded-2xl bg-surface-container text-center space-y-2">
            <span className="material-symbols-outlined text-[24px] text-on-surface-variant">
              stylus
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant">
              No reflections written yet today. You can write your first thought during check-in or after reading a story.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {reflections.map((ref) => (
              <div
                key={ref.id}
                className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high/40 shadow-xs space-y-1.5"
              >
                <div className="flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                  <span className="font-medium text-secondary">{ref.storyTitle}</span>
                  <span>{ref.date}</span>
                </div>
                <p className="font-body-sm text-body-sm font-semibold text-on-surface">
                  “{ref.prompt}”
                </p>
                <p className="font-body-md text-body-md text-on-surface italic bg-surface-container-low p-2.5 rounded-xl">
                  {ref.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          onClick={onOpenBreathing}
          className="h-12 rounded-full bg-secondary-container text-on-secondary-container font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 hover:bg-secondary-fixed transition-all cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">air</span>
          <span>Breathe (60s)</span>
        </button>
        <button
          type="button"
          onClick={onNavigateToCheckIn}
          className="h-12 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/95 transition-all cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>New Check-In</span>
        </button>
      </div>
    </div>
  );
};
