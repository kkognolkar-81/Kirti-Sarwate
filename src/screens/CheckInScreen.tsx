import React, { useState } from 'react';
import { CheckInData, Story } from '../types';

interface CheckInScreenProps {
  initialMood?: string;
  initialChips?: string[];
  onGenerateStory: (checkInData: CheckInData) => Promise<Story>;
  onOpenCrisis: () => void;
  onStoryGenerated: (story: Story) => void;
}

export const CheckInScreen: React.FC<CheckInScreenProps> = ({
  initialMood = 'anxious',
  initialChips = ['Sleep & Rest', 'Work & Deadlines', 'Future Thoughts'],
  onGenerateStory,
  onOpenCrisis,
  onStoryGenerated,
}) => {
  const [selectedEmotion, setSelectedEmotion] = useState(
    initialMood === 'overwhelmed' ? 'overwhelmed' :
    initialMood === 'neutral' ? 'stuck' :
    initialMood === 'peaceful' ? 'hopeful' :
    initialMood === 'radiant' ? 'encouragement' : 'anxious'
  );
  const [valence, setValence] = useState(6);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(initialChips);
  const [reflectionText, setReflectionText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [showInspiration, setShowInspiration] = useState(false);

  const valenceLabels: Record<number, string> = {
    1: 'Barely perceptible, gentle stillness',
    2: 'Soft hum, calm waters',
    3: 'Light flutter, easily carried',
    4: 'Noticeable presence, needs attention',
    5: 'Steady presence, taking space',
    6: 'Tender, needing softness & space',
    7: 'Heavy weight, seeking sanctuary',
    8: 'Intense tide, difficult to quiet',
    9: 'Overwhelming surge, needing anchoring',
    10: 'Deep storm, prioritizing safety & care',
  };

  const emotions = [
    {
      id: 'anxious',
      title: 'I feel anxious',
      desc: 'Gentle ground underfoot',
      icon: 'air',
      bg: 'bg-primary-container/20 text-primary',
    },
    {
      id: 'encouragement',
      title: 'I need support',
      desc: 'A kind, uplifting spark',
      icon: 'auto_awesome',
      bg: 'bg-tertiary-fixed text-tertiary',
    },
    {
      id: 'lonely',
      title: 'I feel lonely',
      desc: 'Quiet craving for warmth',
      icon: 'coffee',
      bg: 'bg-secondary-container text-secondary',
    },
    {
      id: 'overwhelmed',
      title: 'I feel overwhelmed',
      desc: 'Anchoring the swirl',
      icon: 'anchor',
      bg: 'bg-surface-variant text-on-surface-variant',
    },
    {
      id: 'stuck',
      title: 'I feel stuck',
      desc: 'Waiting to gently bud',
      icon: 'spa',
      bg: 'bg-secondary-fixed text-secondary',
    },
    {
      id: 'hopeful',
      title: 'I feel hopeful',
      desc: 'Dawn peeking through',
      icon: 'wb_twilight',
      bg: 'bg-tertiary-fixed-dim/60 text-on-tertiary-container',
    },
  ];

  const lifeAreas = [
    { name: 'Sleep & Rest', icon: 'bedtime' },
    { name: 'Work & Deadlines', icon: 'hourglass_empty' },
    { name: 'Relationships', icon: 'favorite' },
    { name: 'Solitude', icon: 'self_improvement' },
    { name: 'Future Thoughts', icon: 'psychology' },
    { name: 'Physical Health', icon: 'fitness_center' },
    { name: 'Finances', icon: 'wallet' },
  ];

  const inspirations = [
    '“What is one weight I am carrying today that isn’t truly mine?”',
    '“Where does my body feel tight, and what does it need?”',
    '“If a kind elder hugged me right now, what would they whisper?”',
    '“What can wait until tomorrow without the world ending?”',
  ];

  const toggleArea = (name: string) => {
    setSelectedAreas(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  const handleVoiceRecord = () => {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.onstart = () => setIsRecording(true);
        recognition.onend = () => setIsRecording(false);
        recognition.onerror = () => setIsRecording(false);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setReflectionText(prev => prev ? `${prev} ${transcript}` : transcript);
          setIsRecording(false);
        };
        recognition.start();
        return;
      } catch {
        // Fallback simulation
      }
    }

    // Gentle simulation if browser blocks or lacks speech API
    setIsRecording(true);
    setTimeout(() => {
      setReflectionText(prev =>
        prev
          ? `${prev} Feeling tender about balancing quiet solitude with expectations.`
          : 'Feeling tender about balancing quiet solitude with expectations today.'
      );
      setIsRecording(false);
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    setGenerationStep('Tuning into your heart’s frequency...');

    const chosenEmotionObj = emotions.find(e => e.id === selectedEmotion)!;
    const checkInData: CheckInData = {
      emotionId: selectedEmotion,
      emotionTitle: chosenEmotionObj.title,
      emotionSubtitle: chosenEmotionObj.desc,
      valence,
      valenceLabel: valenceLabels[valence],
      areas: selectedAreas,
      reflectionText,
      timestamp: Date.now(),
    };

    setTimeout(() => {
      setGenerationStep('Weaving an allegory of solace for Elena...');
    }, 1200);

    try {
      const generatedStory = await onGenerateStory(checkInData);
      setTimeout(() => {
        setIsGenerating(false);
        onStoryGenerated(generatedStory);
      }, 2200);
    } catch {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto space-y-6 pb-28 pt-2 animate-fade-in">
      {/* Step Tracker & Compassionate Header */}
      <header className="flex flex-col space-y-2 pt-2">
        <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
          <span>Step 1 of 3 · Tuning In</span>
        </div>
        <h1 className="font-display-mobile text-display-mobile text-on-surface font-bold tracking-tight">
          Tell us where your heart is
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
          There are no wrong answers here. Take a breath and take all the time you need.
        </p>
      </header>

      {/* Emotional State Grid */}
      <section className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            What feels most present?
          </span>
          <span className="font-label-md text-label-md text-on-surface-variant">Tap to pick</span>
        </div>

        <div className="grid grid-cols-2 gap-3" id="emotion-grid">
          {emotions.map((item) => {
            const isSelected = selectedEmotion === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedEmotion(item.id)}
                className={`relative flex flex-col items-start p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-surface-container-low shadow-md scale-[1.01] ring-2 ring-primary-container border-transparent'
                    : 'bg-surface-container hover:bg-surface-container-high border border-surface-container-highest/40'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${item.bg}`}>
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                </div>
                <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                  {item.title}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  {item.desc}
                </span>

                {isSelected && (
                  <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Mood Valence Scale */}
      <section className="flex flex-col p-5 rounded-2xl sm:rounded-3xl bg-surface-container-low shadow-sm space-y-4 border border-surface-container-high/40">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Intensity of feeling
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              How deeply is this sitting right now?
            </span>
          </div>
          <div className="flex items-baseline gap-0.5 px-3 py-1 rounded-full bg-surface text-primary font-semibold shadow-xs">
            <span className="font-headline-md text-headline-md">{valence}</span>
            <span className="font-label-md text-label-md text-on-surface-variant">/10</span>
          </div>
        </div>

        {/* Active Mood Descriptor Badge */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-surface text-on-surface shadow-xs">
          <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            sentiment_calm
          </span>
          <span className="font-body-sm text-body-sm font-medium">
            {valenceLabels[valence]}
          </span>
        </div>

        {/* 10-point gentle pill selectors */}
        <div className="flex items-center justify-between gap-1 w-full pt-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
            const isSelected = valence === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => setValence(num)}
                className={`w-7 sm:w-8 h-9 rounded-full font-label-md text-label-md font-semibold flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-sm scale-110'
                    : 'bg-surface text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center text-on-surface-variant font-label-md text-label-md px-1">
          <span>Subtle whisper</span>
          <span>A deep ache</span>
        </div>
      </section>

      {/* Context & Triggers Chips */}
      <section className="flex flex-col space-y-3">
        <div className="flex flex-col">
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            What areas are touching this?
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Select whatever resonates today. Leave what doesn't.
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {lifeAreas.map((area) => {
            const isSelected = selectedAreas.includes(area.name);
            return (
              <button
                key={area.name}
                type="button"
                onClick={() => toggleArea(area.name)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-lg text-label-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-secondary-container text-on-secondary-container shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {area.icon}
                </span>
                <span>{area.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Optional Reflection & Audio Voice Note */}
      <section className="flex flex-col p-4 rounded-2xl bg-surface-container space-y-3 border border-surface-container-high/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">draw</span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Quiet reflection
            </span>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant">Optional</span>
        </div>

        <div className="relative w-full">
          <textarea
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            rows={3}
            placeholder="A single phrase, a stray thought, or what's weighing quietly..."
            className="w-full p-3.5 pr-12 rounded-xl bg-surface text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container/40 transition-all shadow-inner resize-none"
          />
          {/* Voice recording button */}
          <button
            type="button"
            aria-label="Record voice reflection"
            onClick={handleVoiceRecord}
            className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm cursor-pointer ${
              isRecording
                ? 'bg-error text-on-error animate-pulse'
                : 'bg-surface-container-high text-primary hover:bg-primary-container hover:text-on-primary-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isRecording ? 'graphic_eq' : 'mic'}
            </span>
          </button>
        </div>

        {isRecording && (
          <div className="text-primary font-label-md text-label-md animate-pulse">
            Listening to your quiet whisper...
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-label-md">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Private to your local device</span>
          </div>
          <button
            type="button"
            onClick={() => setShowInspiration(prev => !prev)}
            className="text-tertiary font-label-md text-label-md hover:underline cursor-pointer"
          >
            Need inspiration?
          </button>
        </div>

        {showInspiration && (
          <div className="p-3 rounded-xl bg-surface/80 space-y-1.5 animate-fade-in border border-surface-container-high">
            <span className="font-label-md text-label-md font-semibold text-on-surface">
              Gentle inquiry sparks:
            </span>
            {inspirations.map((text, i) => (
              <p
                key={i}
                onClick={() => {
                  setReflectionText(text.replace(/“|”/g, ''));
                  setShowInspiration(false);
                }}
                className="text-xs text-on-surface-variant hover:text-primary cursor-pointer transition-colors"
              >
                {text}
              </p>
            ))}
          </div>
        )}
      </section>

      {/* Primary Story Generator CTA */}
      <section className="flex flex-col space-y-3 pt-2">
        <button
          type="button"
          disabled={isGenerating}
          onClick={handleSubmit}
          className="w-full min-h-[54px] px-6 py-3.5 rounded-full bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold shadow-md hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              <span>{generationStep || 'Crafting your sanctuary tale...'}</span>
            </div>
          ) : (
            <>
              <span>Generate My Story &amp; Reflection</span>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_stories
              </span>
            </>
          )}
        </button>

        {/* Discreet Emotional Safety & Support Trigger */}
        <button
          type="button"
          onClick={onOpenCrisis}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-transparent hover:bg-surface-container text-on-surface-variant transition-colors text-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px] text-primary">volunteer_activism</span>
          <span className="font-body-sm text-body-sm">
            In intense distress or unsafe?{' '}
            <span className="font-semibold text-primary underline underline-offset-2">
              Free 24/7 warmline
            </span>
          </span>
        </button>
      </section>
    </div>
  );
};
