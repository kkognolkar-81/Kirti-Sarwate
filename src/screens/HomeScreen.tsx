import React, { useState } from 'react';
import { Story } from '../types';
import { ambientSound } from '../utils/audioSynth';

interface HomeScreenProps {
  featuredStory: Story;
  onStartCheckIn: (prefillMood?: string, prefillChips?: string[]) => void;
  onOpenStory: (story: Story) => void;
  onOpenBreathing: () => void;
  onOpenCrisis: () => void;
  onToggleBookmark: (storyId: string) => void;
  onSaveDailyWhisperNote: (note: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  featuredStory,
  onStartCheckIn,
  onOpenStory,
  onOpenBreathing,
  onOpenCrisis,
  onToggleBookmark,
  onSaveDailyWhisperNote,
}) => {
  const [selectedMood, setSelectedMood] = useState<'overwhelmed' | 'anxious' | 'neutral' | 'peaceful' | 'radiant'>('neutral');
  const [selectedChips, setSelectedChips] = useState<string[]>(['Quietly peaceful']);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(28); // 28% from mockup
  const [whisperNote, setWhisperNote] = useState('');
  const [whisperSaved, setWhisperSaved] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  const moods = [
    { id: 'overwhelmed', label: 'Heavy', icon: 'cloud_off', fill: false },
    { id: 'anxious', label: 'Restless', icon: 'air', fill: false },
    { id: 'neutral', label: 'Centered', icon: 'filter_vintage', fill: true },
    { id: 'peaceful', label: 'Peaceful', icon: 'water_drop', fill: false },
    { id: 'radiant', label: 'Radiant', icon: 'wb_sunny', fill: true },
  ] as const;

  const chips = [
    'A bit heavy',
    'Quietly peaceful',
    'Restless thoughts',
    'Gently hopeful',
  ];

  const handleChipToggle = (chip: string) => {
    setSelectedChips(prev => 
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      ambientSound.pause();
      setIsPlayingAudio(false);
    } else {
      ambientSound.play();
      setIsPlayingAudio(true);
      // Gentle progression
      const interval = setInterval(() => {
        setAudioProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setIsPlayingAudio(false);
            return 0;
          }
          return p + 1;
        });
      }, 800);
    }
  };

  const handleSaveWhisper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whisperNote.trim()) return;
    onSaveDailyWhisperNote(whisperNote.trim());
    setWhisperSaved(true);
    setTimeout(() => setWhisperSaved(false), 3000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto space-y-6 pb-28 pt-2 animate-fade-in">
      {/* Subtle Greeting & Header Rhythm */}
      <section className="flex flex-col space-y-1.5 px-0.5">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant font-medium tracking-wide">
            Good morning, Elena · Tuesday, Oct 24
          </span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container">
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              eco
            </span>
            <span className="font-label-md text-label-md font-semibold">5 days caring</span>
          </div>
        </div>
        <h1 className="font-display-mobile text-display-mobile text-on-surface font-bold tracking-tight">
          How are you feeling today?
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Take a quiet breath and let us know where your mind is resting right now.
        </p>
      </section>

      {/* Hero Check-In Sanctuary Card */}
      <section className="relative w-full rounded-2xl sm:rounded-3xl bg-gradient-to-b from-surface-container-low via-surface-container to-surface-container-high p-5 sm:p-6 shadow-[0_12px_32px_-6px_rgba(232,146,124,0.22)] overflow-hidden border border-surface-container-high/40">
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-primary-container/20 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-secondary-container/30 blur-xl pointer-events-none" />

        <div className="relative flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-container/30 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  spa
                </span>
              </div>
              <span className="font-label-lg text-label-lg font-semibold text-on-surface">Daily Check-In</span>
            </div>
            <span className="font-label-md text-label-md text-primary font-medium">Step 1 of 2</span>
          </div>

          {/* Mood Pebble Selector */}
          <div className="flex flex-col space-y-2 pt-1">
            <p className="font-label-md text-label-md text-on-surface-variant">
              Tap the icon that best speaks to your body:
            </p>
            <div className="grid grid-cols-5 gap-2 pt-1">
              {moods.map(m => {
                const isActive = selectedMood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMood(m.id)}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-surface-container-lowest/80 text-on-surface-variant transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-primary text-on-primary shadow-sm'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[22px]"
                        style={{ fontVariationSettings: isActive || m.fill ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {m.icon}
                      </span>
                    </div>
                    <span
                      className={`font-label-md text-[11px] leading-tight text-center ${
                        isActive ? 'font-semibold text-primary' : 'font-medium'
                      }`}
                    >
                      {m.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Mood Sentiment Chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {chips.map(chip => {
              const isSelected = selectedChips.includes(chip);
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleChipToggle(chip)}
                  className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all shadow-sm cursor-pointer ${
                    isSelected
                      ? 'bg-primary-container text-on-primary-container font-medium'
                      : 'bg-surface-container-lowest/90 text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() => onStartCheckIn(selectedMood, selectedChips)}
            className="w-full h-14 mt-1 rounded-full bg-primary text-on-primary flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(144,75,57,0.3)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="font-label-lg text-label-lg font-semibold tracking-wide">
              Begin Today's Check-In
            </span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Today's Personalized Motivational Story */}
      <section className="flex flex-col space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_stories
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Story for Your Heart</h2>
          </div>
          <span className="font-label-md text-label-md text-primary font-medium">Personalized</span>
        </div>

        <div className="w-full rounded-2xl sm:rounded-3xl bg-surface-container-lowest overflow-hidden shadow-[0_8px_24px_-4px_rgba(232,146,124,0.14),0_2px_8px_rgba(32,26,22,0.04)] flex flex-col border border-surface-container-high/40">
          {/* Story Visual Header */}
          <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-surface-container">
            <img
              alt="An atmospheric warm watercolor painting of a majestic ancient oak tree standing gently on a rolling hill during golden hour autumn."
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              src={featuredStory.image}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/20 to-transparent" />
            
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm flex items-center gap-1.5 text-on-surface">
              <span className="material-symbols-outlined text-tertiary text-[14px]">headphones</span>
              <span className="font-label-md text-[11px] font-medium tracking-tight">
                3 min listen · 4 min read
              </span>
            </div>

            <button
              aria-label="Save story"
              onClick={() => onToggleBookmark(featuredStory.id)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: featuredStory.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
              >
                {featuredStory.isBookmarked ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>
          </div>

          {/* Story Narrative Body */}
          <div className="p-5 sm:p-6 flex flex-col space-y-3.5 pt-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-md text-[11px] font-semibold uppercase tracking-wider">
                Tailored to your journey
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant">· Theme: Release</span>
            </div>

            <h3 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
              {featuredStory.title}
            </h3>

            <p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">
              {featuredStory.quote}
            </p>

            {/* Audio Player Snippet Mini Puck */}
            <div className="mt-1 p-3 rounded-2xl bg-surface-container-low flex items-center justify-between gap-3 border border-surface-container-high/40">
              <button
                type="button"
                aria-label="Play audio narration"
                onClick={handleToggleAudio}
                className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isPlayingAudio ? 'pause' : 'play_arrow'}
                </span>
              </button>

              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-center text-on-surface-variant font-label-md text-[11px]">
                  <span className="font-medium truncate">Read by Clara · Soothing cello background</span>
                  <span>{isPlayingAudio ? 'Playing' : '03:12'}</span>
                </div>
                {/* Progress Line */}
                <div className="w-full h-1.5 rounded-full bg-surface-container-high mt-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-primary-container rounded-full transition-all duration-300"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onOpenStory(featuredStory)}
                className="flex-1 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center gap-2 font-label-lg text-label-lg font-semibold hover:brightness-105 active:scale-[0.98] transition-all shadow-sm cursor-pointer"
              >
                <span>Read Story</span>
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
              </button>
              <button
                type="button"
                aria-label="Share story"
                onClick={handleShare}
                className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
            </div>

            {shareToast && (
              <div className="text-center font-label-md text-label-md text-secondary py-1 animate-fade-in">
                Link to story copied to clipboard ♥
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Daily Grounding Reflection / Micro-Affirmation */}
      <section className="w-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-secondary-container/40 via-surface-container to-surface-container-high p-5 sm:p-6 shadow-sm flex flex-col space-y-4 relative overflow-hidden border border-secondary-fixed/50">
        <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-secondary-fixed/50 blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[16px]">format_quote</span>
          </div>
          <span className="font-label-lg text-label-lg font-semibold text-secondary">
            Daily Grounding Whisper
          </span>
        </div>

        <blockquote className="font-body-lg text-body-lg text-on-surface font-medium leading-snug">
          “You don't have to carry the whole mountain today. Just step on the nearest pebble.”
        </blockquote>

        {/* Reflective Input Basin */}
        <form onSubmit={handleSaveWhisper} className="p-4 rounded-2xl bg-surface-container-lowest/80 backdrop-blur-sm flex flex-col space-y-2 border border-surface-container-high/40">
          <label className="font-label-md text-label-md font-semibold text-on-surface flex items-center gap-1.5" htmlFor="reflection-input">
            <span className="material-symbols-outlined text-primary text-[15px]">edit_note</span>
            What is one small kindness you can grant yourself before noon?
          </label>
          <div className="relative flex items-center">
            <input
              id="reflection-input"
              type="text"
              value={whisperNote}
              onChange={(e) => setWhisperNote(e.target.value)}
              placeholder="e.g., A warm cup of tea without my phone..."
              className="w-full h-11 bg-surface-container-low rounded-full px-4 pr-12 text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/60 focus:outline-none focus:bg-surface-container-lowest transition-all"
            />
            <button
              type="submit"
              aria-label="Save note"
              className="absolute right-1.5 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">check</span>
            </button>
          </div>
          {whisperSaved && (
            <p className="text-secondary font-label-md text-label-md pt-0.5 animate-fade-in">
              Whisper saved tenderly to your journey ♥
            </p>
          )}
        </form>
      </section>

      {/* Calming Breathing Quick-Anchor */}
      <section className="rounded-2xl sm:rounded-3xl bg-surface-container-lowest p-5 sm:p-6 shadow-sm flex items-center justify-between gap-4 border border-surface-container-high/40">
        <div className="flex flex-col space-y-1">
          <span className="font-label-md text-label-md text-primary font-semibold uppercase tracking-wider">
            60-Second Reset
          </span>
          <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Need a moment to breathe?
          </h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Sync your breath with an expanding soft circle.
          </p>
        </div>

        {/* Interactive Pulsing Pacer */}
        <button
          type="button"
          onClick={onOpenBreathing}
          aria-label="Start breathing exercise"
          className="relative group w-16 h-16 rounded-full flex items-center justify-center bg-primary-container/20 shrink-0 cursor-pointer"
        >
          <div className="absolute inset-0 rounded-full bg-primary-container/40 animate-ping opacity-75" />
          <div className="relative w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
            <span className="material-symbols-outlined text-[24px]">air</span>
          </div>
        </button>
      </section>

      {/* Discreet Crisis Support Sanctuary Banner */}
      <footer className="w-full rounded-2xl bg-surface-container-low p-4 flex items-center justify-between gap-3 border border-surface-container-high/40">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant shrink-0">
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
          </div>
          <div className="flex flex-col min-w-0">
            <p className="font-label-lg text-label-lg font-medium text-on-surface truncate">
              Need someone to talk to right now?
            </p>
            <p className="font-label-md text-label-md text-on-surface-variant truncate">
              Confidential, 24/7 crisis support is always here.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenCrisis}
          className="px-3 py-1.5 rounded-full bg-surface-container-highest text-primary font-label-md text-label-md font-semibold shrink-0 hover:bg-surface-variant transition-colors cursor-pointer"
        >
          Get Support
        </button>
      </footer>
    </div>
  );
};
