import { useState, useCallback } from 'react';
import { TabType, Story, CheckInData, SavedReflection } from './types';
import { INITIAL_STORIES } from './data/mockStories';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { BreathingModal } from './components/BreathingModal';
import { CrisisModal } from './components/CrisisModal';
import { HomeScreen } from './screens/HomeScreen';
import { CheckInScreen } from './screens/CheckInScreen';
import { StoriesScreen } from './screens/StoriesScreen';
import { StoryReaderScreen } from './screens/StoryReaderScreen';
import { InsightsScreen } from './screens/InsightsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { generateAllegoryStory } from './utils/storyGenerator';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [activeStoryForReader, setActiveStoryForReader] = useState<Story | null>(null);
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [featuredStory, setFeaturedStory] = useState<Story>(INITIAL_STORIES[0]);
  const [checkInPrefill, setCheckInPrefill] = useState<{ mood?: string; chips?: string[] }>({});
  
  const [savedReflections, setSavedReflections] = useState<SavedReflection[]>([
    {
      id: 'ref-init-1',
      storyTitle: 'The Oak and the Autumn Wind',
      prompt: 'What is one leaf you can let drop to the ground today?',
      content: 'Letting go of feeling like I need to resolve the entire project deadline before allowing my body to rest.',
      date: 'Oct 24',
    },
    {
      id: 'ref-init-2',
      storyTitle: 'The Lighthouse Keeper’s Tea',
      prompt: 'Where did you find warmth in quietness?',
      content: 'Brewing peppermint tea quietly by the window while the morning rain tapped on the glass.',
      date: 'Oct 22',
    }
  ]);

  const [isBreathingModalOpen, setIsBreathingModalOpen] = useState(false);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);

  // Story bookmarking
  const handleToggleBookmark = useCallback((storyId: string) => {
    setStories(prev =>
      prev.map(s => (s.id === storyId ? { ...s, isBookmarked: !s.isBookmarked } : s))
    );
    if (featuredStory.id === storyId) {
      setFeaturedStory(prev => ({ ...prev, isBookmarked: !prev.isBookmarked }));
    }
    if (activeStoryForReader && activeStoryForReader.id === storyId) {
      setActiveStoryForReader(prev => prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null);
    }
  }, [featuredStory, activeStoryForReader]);

  // Story favoriting
  const handleToggleFavorite = useCallback((storyId: string) => {
    setStories(prev =>
      prev.map(s => (s.id === storyId ? { ...s, isFavorite: !s.isFavorite } : s))
    );
    if (featuredStory.id === storyId) {
      setFeaturedStory(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
    }
    if (activeStoryForReader && activeStoryForReader.id === storyId) {
      setActiveStoryForReader(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  }, [featuredStory, activeStoryForReader]);

  // Save new reflection
  const handleSaveReflection = useCallback((reflection: SavedReflection) => {
    setSavedReflections(prev => [reflection, ...prev]);
  }, []);

  // Save daily whisper note from Home screen
  const handleSaveDailyWhisperNote = useCallback((note: string) => {
    const newRef: SavedReflection = {
      id: `ref-${Date.now()}`,
      storyTitle: 'Daily Grounding Whisper',
      prompt: 'What is one small kindness you can grant yourself before noon?',
      content: note,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
    setSavedReflections(prev => [newRef, ...prev]);
  }, []);

  // Start Check-in flow with optional pre-filled selections
  const handleStartCheckIn = useCallback((prefillMood?: string, prefillChips?: string[]) => {
    setCheckInPrefill({ mood: prefillMood, chips: prefillChips });
    setActiveStoryForReader(null);
    setCurrentTab('check-in');
  }, []);

  // Generate new story
  const handleGenerateStory = useCallback(async (checkInData: CheckInData): Promise<Story> => {
    // Generate authentic bespoke allegory story
    const newStory = generateAllegoryStory(checkInData);
    setStories(prev => [newStory, ...prev]);
    setFeaturedStory(newStory);
    return newStory;
  }, []);

  const handleStoryGenerated = useCallback((newStory: Story) => {
    setActiveStoryForReader(newStory);
  }, []);

  const handleOpenStory = useCallback((story: Story) => {
    setActiveStoryForReader(story);
  }, []);

  const handleCloseReader = useCallback(() => {
    setActiveStoryForReader(null);
  }, []);

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface flex flex-col antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* If reader is active, show the Reader Screen */}
      {activeStoryForReader ? (
        <StoryReaderScreen
          story={activeStoryForReader}
          onBack={handleCloseReader}
          onSaveReflection={handleSaveReflection}
          onToggleBookmark={handleToggleBookmark}
          onOpenCrisis={() => setIsCrisisModalOpen(true)}
        />
      ) : (
        <>
          {/* Main Top Header */}
          <Header
            currentTab={currentTab}
            onProfileClick={() => setCurrentTab('profile')}
            onHomeClick={() => setCurrentTab('home')}
          />

          {/* Main Tab Screen Area */}
          <main className="flex-1 w-full max-w-xl mx-auto px-4 sm:px-5 pt-16">
            {currentTab === 'home' && (
              <HomeScreen
                featuredStory={featuredStory}
                onStartCheckIn={handleStartCheckIn}
                onOpenStory={handleOpenStory}
                onOpenBreathing={() => setIsBreathingModalOpen(true)}
                onOpenCrisis={() => setIsCrisisModalOpen(true)}
                onToggleBookmark={handleToggleBookmark}
                onSaveDailyWhisperNote={handleSaveDailyWhisperNote}
              />
            )}

            {currentTab === 'check-in' && (
              <CheckInScreen
                initialMood={checkInPrefill.mood}
                initialChips={checkInPrefill.chips}
                onGenerateStory={handleGenerateStory}
                onOpenCrisis={() => setIsCrisisModalOpen(true)}
                onStoryGenerated={handleStoryGenerated}
              />
            )}

            {currentTab === 'stories' && (
              <StoriesScreen
                stories={stories}
                featuredStory={featuredStory}
                onOpenStory={handleOpenStory}
                onToggleBookmark={handleToggleBookmark}
                onToggleFavorite={handleToggleFavorite}
                onNavigateToCheckIn={() => setCurrentTab('check-in')}
              />
            )}

            {currentTab === 'insights' && (
              <InsightsScreen
                reflections={savedReflections}
                onOpenBreathing={() => setIsBreathingModalOpen(true)}
                onNavigateToCheckIn={() => setCurrentTab('check-in')}
              />
            )}

            {currentTab === 'profile' && (
              <ProfileScreen
                onOpenCrisis={() => setIsCrisisModalOpen(true)}
                onOpenBreathing={() => setIsBreathingModalOpen(true)}
              />
            )}
          </main>

          {/* Persistent Mobile Bottom Navigation Bar */}
          <BottomNav
            currentTab={currentTab}
            onTabChange={(tab) => {
              setActiveStoryForReader(null);
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </>
      )}

      {/* Global Sanctuary Modals */}
      <BreathingModal
        isOpen={isBreathingModalOpen}
        onClose={() => setIsBreathingModalOpen(false)}
      />

      <CrisisModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
      />
    </div>
  );
}
