import React, { useState, useEffect } from 'react';
import { Story, SavedReflection } from '../types';
import { ambientSound } from '../utils/audioSynth';

interface StoryReaderScreenProps {
  story: Story;
  onBack: () => void;
  onSaveReflection: (reflection: SavedReflection) => void;
  onToggleBookmark: (storyId: string) => void;
  onOpenCrisis: () => void;
}

export const StoryReaderScreen: React.FC<StoryReaderScreenProps> = ({
  story,
  onBack,
  onSaveReflection,
  onToggleBookmark,
  onOpenCrisis,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(84); // 01:24
  const [totalTime, setTotalTime] = useState(story.audioDurationSeconds || 225); // 03:45
  const [speedIdx, setSpeedIdx] = useState(0);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'larger'>('normal');
  const [reflectionInput, setReflectionInput] = useState('');
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [activeReactions, setActiveReactions] = useState<string[]>(['seen']);

  const speeds = ['1.0x', '1.2x', '0.8x'];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      ambientSound.pause();
    };
  }, [story.id]);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalTime) {
            setIsPlaying(false);
            ambientSound.pause();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalTime]);

  const togglePlay = () => {
    if (isPlaying) {
      ambientSound.pause();
      setIsPlaying(false);
    } else {
      ambientSound.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTime(Math.floor(pct * totalTime));
  };

  const cycleSpeed = () => {
    setSpeedIdx((prev) => (prev + 1) % speeds.length);
  };

  const cycleFontSize = () => {
    setFontSizeLevel((prev) =>
      prev === 'normal' ? 'large' : prev === 'large' ? 'larger' : 'normal'
    );
  };

  const toggleReaction = (id: string) => {
    setActiveReactions((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleSaveReflection = () => {
    if (!reflectionInput.trim()) return;
    const newRef: SavedReflection = {
      id: `ref-${Date.now()}`,
      storyTitle: story.title,
      prompt: 'What is one leaf you can let drop to the ground today?',
      content: reflectionInput.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
    onSaveReflection(newRef);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3500);
  };

  const formatSecs = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min(100, Math.max(0, (currentTime / totalTime) * 100));

  // Determine prose font size classes
  const proseSizeClass =
    fontSizeLevel === 'normal'
      ? 'text-[17px] leading-[1.8]'
      : fontSizeLevel === 'large'
      ? 'text-[19px] leading-[1.9]'
      : 'text-[21px] leading-[2.0]';

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface antialiased">
      {/* Fixed Sticky Header for Story Reader */}
      <header className="fixed top-0 left-0 right-0 z-40 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(232,146,124,0.08)] border-b border-surface-container-high/60">
        <div className="max-w-xl mx-auto h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Go back to stories"
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <span className="font-headline-sm text-headline-sm text-on-surface truncate max-w-[170px] sm:max-w-xs">
              Story Reader · Haven
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Toggle Audio narration"
              onClick={togglePlay}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                isPlaying
                  ? 'bg-primary-container text-on-primary-container'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">headphones</span>
            </button>

            <button
              type="button"
              aria-label="Text size options"
              onClick={cycleFontSize}
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
              title={`Font size: ${fontSizeLevel}`}
            >
              <span className="material-symbols-outlined text-[22px]">format_size</span>
            </button>

            <button
              type="button"
              aria-label="Bookmark story"
              onClick={() => onToggleBookmark(story.id)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span
                className={`material-symbols-outlined text-[22px] ${story.isBookmarked ? 'text-primary' : ''}`}
                style={{ fontVariationSettings: story.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
              >
                {story.isBookmarked ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>

            <button
              type="button"
              aria-label="Close reader"
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-xl mx-auto px-4 sm:px-5 pt-20 pb-16 space-y-6">
        {/* Story Metadata & Header */}
        <section className="flex flex-col items-center text-center space-y-2 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span>{story.personalizationNote || 'Written for Elena · For feeling tender & anxious'}</span>
          </div>

          <div className="space-y-1">
            <h1 className="font-display-mobile text-display-mobile text-on-surface tracking-tight font-bold">
              {story.title}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              {story.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 text-on-surface-variant font-label-md text-label-md pt-1">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              {story.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-secondary font-medium">
              <span className="material-symbols-outlined text-[16px]">spa</span>
              Grounding reflection
            </span>
          </div>
        </section>

        {/* Story Illustration Banner */}
        <div className="relative w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm bg-surface-container border border-surface-container-high/40">
          <img
            alt={story.title}
            className="w-full h-full object-cover"
            src={story.image}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-surface/85 backdrop-blur-md text-on-surface-variant font-label-md text-label-md shadow-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">palette</span>
            <span>Illustrated Sanctuary</span>
          </div>
        </div>

        {/* Audio Narration Pill Puck */}
        <section
          id="audio-puck"
          className="w-full bg-surface-container-low rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col space-y-3 border border-surface-container-high/40"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">graphic_eq</span>
              </div>
              <div className="min-w-0">
                <p className="font-label-lg text-label-lg text-on-surface truncate font-semibold">
                  Narrated by Clara
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Soothing cello &amp; gentle woodland rain
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={cycleSpeed}
                className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-md text-label-md transition-colors cursor-pointer"
              >
                {speeds[speedIdx]}
              </button>
              <button
                type="button"
                aria-label="Play narration"
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-[24px]">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
            </div>
          </div>

          {/* Scrubber Bar */}
          <div className="space-y-1.5 pt-1">
            <div
              onClick={handleSeek}
              className="relative w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden cursor-pointer"
            >
              <div
                className="absolute left-0 top-0 bottom-0 bg-primary-container rounded-full transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant">
              <span>{formatSecs(currentTime)}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Rewind 15 seconds"
                  onClick={() => setCurrentTime((t) => Math.max(0, t - 15))}
                  className="p-1 hover:text-primary transition-colors cursor-pointer"
                  title="Rewind 15s"
                >
                  <span className="material-symbols-outlined text-[18px]">replay_10</span>
                </button>
                <button
                  type="button"
                  aria-label="Fast forward 15 seconds"
                  onClick={() => setCurrentTime((t) => Math.min(totalTime, t + 15))}
                  className="p-1 hover:text-primary transition-colors cursor-pointer"
                  title="Forward 15s"
                >
                  <span className="material-symbols-outlined text-[18px]">forward_10</span>
                </button>
              </div>
              <span>{formatSecs(totalTime)}</span>
            </div>
          </div>
        </section>

        {/* Story Reading Body */}
        <article className="prose max-w-none space-y-5 text-on-surface px-1">
          {story.paragraphs.map((p, index) => {
            // Check if this is the first paragraph to render Drop-Cap
            if (index === 0) {
              const firstLetter = p.charAt(0);
              const restText = p.slice(1);
              return (
                <p key={index} className={`font-body-lg ${proseSizeClass} text-on-surface`}>
                  <span className="float-left text-display font-display text-primary-container leading-none pr-3 pt-1">
                    {firstLetter}
                  </span>
                  {restText}
                </p>
              );
            }

            // After paragraph 1, show the pull quote box
            if (index === 2) {
              return (
                <React.Fragment key={index}>
                  {/* Warm Organic Pull Quote Box */}
                  <aside className="my-6 p-6 rounded-2xl bg-surface-container relative overflow-hidden border border-surface-container-high/60">
                    <div className="absolute -right-4 -bottom-4 text-surface-container-highest select-none pointer-events-none">
                      <span className="material-symbols-outlined text-[96px] opacity-40">
                        format_quote
                      </span>
                    </div>
                    <div className="relative z-10 space-y-2">
                      <p className="font-headline-md text-headline-md text-on-surface italic leading-snug">
                        {story.quote}
                      </p>
                      {story.quoteAuthor && (
                        <span className="block font-label-md text-label-md text-primary pt-1">
                          — {story.quoteAuthor}
                        </span>
                      )}
                    </div>
                  </aside>

                  <p className={`font-body-lg ${proseSizeClass} text-on-surface`}>
                    {p}
                  </p>
                </React.Fragment>
              );
            }

            // After paragraph 3, show botanical ornament divider
            if (index === 4) {
              return (
                <React.Fragment key={index}>
                  <div className="flex items-center justify-center gap-2 py-4 text-primary-container">
                    <span className="w-12 h-[1px] bg-outline-variant" />
                    <span className="material-symbols-outlined text-[18px]">nature</span>
                    <span className="w-12 h-[1px] bg-outline-variant" />
                  </div>
                  <p className={`font-body-lg ${proseSizeClass} text-on-surface`}>
                    {p}
                  </p>
                </React.Fragment>
              );
            }

            return (
              <p key={index} className={`font-body-lg ${proseSizeClass} text-on-surface`}>
                {p}
              </p>
            );
          })}
        </article>

        {/* Secondary Companion Illustration */}
        {story.companionImage && (
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-surface-container-low shadow-sm border border-surface-container-high/40">
            <img
              alt="Companion illustration"
              className="w-full h-44 sm:h-52 object-cover"
              src={story.companionImage}
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Mindful Integration & Micro-Journal Box */}
        <section className="bg-surface-container rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm border border-surface-container-high/50">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-[22px]">self_improvement</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Gentle pause for your heart
            </h2>
          </div>

          <p className="font-body-md text-body-md text-on-surface-variant">
            Take one slow breath in through your nose, and softly out through your mouth. When you feel ready:
          </p>

          <div className="p-4 bg-surface rounded-2xl shadow-xs border border-surface-container-high/40">
            <label className="block font-label-lg text-label-lg text-on-surface mb-1" htmlFor="reflection-input-box">
              What is one leaf you can let drop to the ground today?
            </label>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
              A worry, an expectation of yourself, or a need to fix everything right now.
            </p>
            <div className="relative">
              <textarea
                id="reflection-input-box"
                value={reflectionInput}
                onChange={(e) => setReflectionInput(e.target.value)}
                placeholder="Type a breath, a thought, or just a single word here..."
                rows={3}
                className="w-full bg-surface-container-low text-on-surface rounded-xl p-3 font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface focus:ring-2 focus:ring-primary-container/40 transition-colors resize-none"
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleSaveReflection}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-sm hover:opacity-95 active:scale-98 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">favorite</span>
                <span>Save to My Journey</span>
              </button>
            </div>

            {showSavedToast && (
              <div className="mt-2 p-2 rounded-xl bg-secondary-container text-on-secondary-container font-label-md text-label-md text-center animate-fade-in font-medium">
                Saved tenderly to your sanctuary journal ♥
              </div>
            )}
          </div>

          {/* Quick Reaction Pills */}
          <div className="space-y-1.5 pt-1">
            <p className="font-label-md text-label-md text-on-surface-variant">
              How did this story land with you?
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => toggleReaction('seen')}
                className={`reaction-pill px-3 py-1.5 rounded-full font-label-md text-label-md transition-colors active:scale-95 flex items-center gap-1 shadow-xs cursor-pointer ${
                  activeReactions.includes('seen')
                    ? 'bg-secondary-container text-on-secondary-container font-semibold'
                    : 'bg-surface text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span>💛</span>
                <span>Felt seen</span>
              </button>
              <button
                type="button"
                onClick={() => toggleReaction('calmer')}
                className={`reaction-pill px-3 py-1.5 rounded-full font-label-md text-label-md transition-colors active:scale-95 flex items-center gap-1 shadow-xs cursor-pointer ${
                  activeReactions.includes('calmer')
                    ? 'bg-secondary-container text-on-secondary-container font-semibold'
                    : 'bg-surface text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span>🌿</span>
                <span>Calmer</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  toggleReaction('favorite');
                  onToggleBookmark(story.id);
                }}
                className={`reaction-pill px-3 py-1.5 rounded-full font-label-md text-label-md transition-colors active:scale-95 flex items-center gap-1 shadow-xs cursor-pointer ${
                  activeReactions.includes('favorite')
                    ? 'bg-secondary-container text-on-secondary-container font-semibold'
                    : 'bg-surface text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span>✨</span>
                <span>Saved to favorites</span>
              </button>
            </div>
          </div>
        </section>

        {/* Reassurance & Support Footer */}
        <footer className="text-center space-y-2 pt-2 pb-8 text-on-surface-variant">
          <p className="font-body-sm text-body-sm italic">
            “There is nowhere you need to hurry to. You are already whole.”
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={onOpenCrisis}
              className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              <span>Need human connection? Reach 24/7 crisis support</span>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};
