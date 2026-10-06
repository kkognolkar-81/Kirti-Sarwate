import React, { useState, useMemo } from 'react';
import { Story } from '../types';
import { ambientSound } from '../utils/audioSynth';

interface StoriesScreenProps {
  stories: Story[];
  featuredStory: Story;
  onOpenStory: (story: Story) => void;
  onToggleBookmark: (storyId: string) => void;
  onToggleFavorite: (storyId: string) => void;
  onNavigateToCheckIn: () => void;
}

export const StoriesScreen: React.FC<StoriesScreenProps> = ({
  stories,
  featuredStory,
  onOpenStory,
  onToggleBookmark,
  onToggleFavorite,
  onNavigateToCheckIn,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'recent' | 'popular'>('recent');
  const [isPlayingHeroAudio, setIsPlayingHeroAudio] = useState(false);

  const categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'anxiety', label: 'Anxiety Relief' },
    { id: 'encouragement', label: 'Encouragement' },
    { id: 'loneliness', label: 'Overcoming Loneliness' },
    { id: 'rest', label: 'Deep Rest' },
  ];

  const filteredStories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return stories.filter((story) => {
      const matchesCategory =
        activeCategory === 'all' || story.category === activeCategory;
      const matchesQuery =
        !q ||
        story.title.toLowerCase().includes(q) ||
        story.quote.toLowerCase().includes(q) ||
        story.keywords.toLowerCase().includes(q) ||
        story.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [stories, searchQuery, activeCategory]);

  const handleHeroAudioToggle = () => {
    if (isPlayingHeroAudio) {
      ambientSound.pause();
      setIsPlayingHeroAudio(false);
    } else {
      ambientSound.play();
      setIsPlayingHeroAudio(true);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto space-y-6 pb-28 pt-2 animate-fade-in">
      {/* Header Sanctuary Greeting */}
      <div className="flex flex-col space-y-1.5 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-secondary-container text-secondary">
              <span className="material-symbols-outlined text-[17px]">auto_stories</span>
            </span>
            <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">
              Personal Sanctuary
            </span>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
            {stories.length + 11} Stories Written
          </span>
        </div>
        <h1 className="font-display-mobile text-display-mobile text-on-surface font-bold tracking-tight">
          My Stories
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Gentle allegories and mindful reflections spun from your daily check-ins.
        </p>
      </div>

      {/* Emotional Impact Warm Pill Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-secondary-container/70 via-surface-container to-primary-fixed/60 p-4 sm:p-5 shadow-sm border border-secondary-fixed/30">
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-surface/90 shadow-sm flex items-center justify-center flex-shrink-0 text-primary">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              spa
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg font-semibold text-on-surface">
              38 Moments of Peace
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Stories have grounded your nervous system 38 times this month.
            </span>
          </div>
        </div>
        {/* Ambient organic watermark flourish */}
        <div className="absolute -right-4 -bottom-6 w-24 h-24 rounded-full bg-primary-container/20 blur-xl pointer-events-none" />
      </div>

      {/* Search & Tactile Feeling Filter Bar */}
      <div className="flex flex-col space-y-3">
        <div className="relative flex items-center w-full">
          <span className="absolute left-4 text-on-surface-variant/70 material-symbols-outlined text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search themes, words, or feelings..."
            className="w-full bg-surface-container pl-11 pr-10 py-3.5 rounded-full font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary-container/40 transition-all shadow-[0_2px_8px_rgba(60,53,48,0.03)] border border-surface-container-high/40"
          />
          {searchQuery && (
            <button
              aria-label="Clear Search"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 w-7 h-7 rounded-full bg-surface-container-highest text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Filter Category Chips (Horizontal Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-sm font-semibold'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 'Freshly Written For You' Featured Story Card */}
      {(!searchQuery || featuredStory.title.toLowerCase().includes(searchQuery.toLowerCase())) && (
        <section className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Freshly Written For You
              </h2>
            </div>
            <span className="font-label-md text-label-md text-primary font-medium">
              From Today's Check-in
            </span>
          </div>

          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(232,146,124,0.14),0_4px_12px_rgba(60,53,48,0.04)] border border-surface-container-high/40 transition-all">
            {/* Atmospheric Glow */}
            <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-gradient-to-bl from-primary-fixed via-tertiary-fixed/30 to-transparent blur-2xl pointer-events-none" />

            <div className="relative p-5 sm:p-6 flex flex-col space-y-4">
              {/* Badge & Origin Metadata */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md font-medium">
                  <span className="material-symbols-outlined text-[15px]">psychology_alt</span>
                  <span>{featuredStory.originBadge || 'Created today based on feeling anxious & tender'}</span>
                </div>
                <button
                  type="button"
                  aria-label="Bookmark Story"
                  onClick={() => onToggleBookmark(featuredStory.id)}
                  className="text-outline hover:text-primary transition-colors flex items-center p-1 cursor-pointer"
                >
                  <span
                    className={`material-symbols-outlined text-[22px] ${featuredStory.isBookmarked ? 'text-primary' : ''}`}
                    style={{ fontVariationSettings: featuredStory.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    bookmark
                  </span>
                </button>
              </div>

              {/* Title & Time metrics */}
              <div className="space-y-1">
                <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                  {featuredStory.title}
                </h3>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md pt-0.5">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">schedule</span> {featuredStory.readTime}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-secondary font-medium">
                    <span className="material-symbols-outlined text-[15px]">headphones</span> {featuredStory.audioTime}
                  </span>
                </div>
              </div>

              {/* Pull Quote */}
              <div className="relative pl-4 pr-3 py-3 rounded-2xl bg-surface-container-low border-l-4 border-primary-container">
                <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
                  {featuredStory.quote}
                </p>
              </div>

              {/* Gentle Theme Pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {featuredStory.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={`px-2.5 py-0.5 rounded-full font-label-md text-label-md ${
                      i % 3 === 0
                        ? 'bg-primary-fixed text-on-primary-fixed-variant'
                        : i % 3 === 1
                        ? 'bg-secondary-fixed text-on-secondary-fixed-variant'
                        : 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenStory(featuredStory)}
                  className="flex-1 min-h-[50px] px-5 rounded-full bg-primary text-on-primary hover:bg-primary/95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm font-label-lg text-label-lg font-semibold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">auto_stories</span>
                  <span>Continue Reading</span>
                </button>
                <button
                  type="button"
                  onClick={handleHeroAudioToggle}
                  className={`min-h-[50px] px-5 rounded-full active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-label-lg text-label-lg font-semibold cursor-pointer ${
                    isPlayingHeroAudio
                      ? 'bg-secondary text-on-secondary shadow-sm'
                      : 'bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isPlayingHeroAudio ? 'pause' : 'play_arrow'}
                  </span>
                  <span>{isPlayingHeroAudio ? 'Playing (3:12)' : 'Listen Story'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Saved & Cherished Library List */}
      <section className="flex flex-col space-y-4 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Saved &amp; Cherished
            </h2>
            <span className="font-label-md text-label-md text-on-surface-variant font-normal">
              ({filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'})
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSortOrder(prev => prev === 'recent' ? 'popular' : 'recent')}
            className="font-label-md text-label-md text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>{sortOrder === 'recent' ? 'Sort by Date' : 'Sort by Heart'}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
          </button>
        </div>

        {filteredStories.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-surface-container-low text-center space-y-3 border border-surface-container-high/40">
            <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[28px]">search_off</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              No stories whisper here
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">
              Try searching for another feeling, like ‘calm’, ‘hope’, or select ‘All Stories’.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-sm cursor-pointer hover:bg-primary/95"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStories.map((story) => (
              <article
                key={story.id}
                className="group rounded-2xl sm:rounded-3xl bg-surface-container-lowest p-4 sm:p-5 shadow-[0_4px_16px_rgba(60,53,48,0.04)] hover:shadow-md transition-all flex flex-col space-y-3.5 border border-surface-container-high/40"
              >
                {/* Image Container with overlays */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-surface-container">
                  <img
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={story.image}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                  {/* Top Badges Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-on-surface font-label-md text-label-md font-medium shadow-sm">
                      {story.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        aria-label="Favorite story"
                        onClick={() => onToggleFavorite(story.id)}
                        className={`w-8 h-8 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
                          story.isFavorite ? 'text-primary' : 'text-outline hover:text-primary'
                        }`}
                      >
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: story.isFavorite ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          favorite
                        </span>
                      </button>
                      <button
                        type="button"
                        aria-label="Bookmark story"
                        onClick={() => onToggleBookmark(story.id)}
                        className={`w-8 h-8 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
                          story.isBookmarked ? 'text-primary' : 'text-outline hover:text-primary'
                        }`}
                      >
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: story.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          bookmark
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Bottom Time Duration on Image */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white font-label-md text-label-md">
                    <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                      <span className="material-symbols-outlined text-[14px]">schedule</span> {story.readTime}
                    </span>
                    <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                      <span className="material-symbols-outlined text-[14px]">headphones</span> Audio available
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3
                    onClick={() => onOpenStory(story)}
                    className="font-headline-sm text-headline-sm font-semibold text-on-surface group-hover:text-primary transition-colors cursor-pointer"
                  >
                    {story.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant italic">
                    {story.quote}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-body-sm text-body-sm text-outline">
                    {story.writtenAgo}
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenStory(story)}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md font-semibold hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                  >
                    <span>Read Story</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Interactive Story Prompt Banner */}
      <div className="rounded-2xl sm:rounded-3xl bg-surface-container p-5 flex items-center justify-between gap-4 border border-surface-container-high/40">
        <div className="space-y-1">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Need a story right now?
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Record how you feel this moment and Haven will craft a tale of solace.
          </p>
        </div>
        <button
          type="button"
          onClick={onNavigateToCheckIn}
          aria-label="Create new story"
          className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md active:scale-95 transition-transform flex-shrink-0 cursor-pointer hover:bg-primary/95"
        >
          <span className="material-symbols-outlined text-[24px]">stylus_note</span>
        </button>
      </div>
    </div>
  );
};
