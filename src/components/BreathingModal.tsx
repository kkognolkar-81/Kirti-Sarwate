import React, { useState, useEffect } from 'react';
import { ambientSound } from '../utils/audioSynth';

interface BreathingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BreathPhase = 'Inhale' | 'Hold' | 'Exhale' | 'Rest';

export const BreathingModal: React.FC<BreathingModalProps> = ({ isOpen, onClose }) => {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [phase, setPhase] = useState<BreathPhase>('Inhale');
  const [cycleTime, setCycleTime] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(60);
      setCycleTime(0);
      setPhase('Inhale');
      ambientSound.pause();
      return;
    }

    if (soundEnabled) {
      ambientSound.play();
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });

      setCycleTime((prev) => {
        const next = (prev + 1) % 14;
        // 4s Inhale, 4s Hold, 6s Exhale
        if (next < 4) {
          setPhase('Inhale');
        } else if (next < 8) {
          setPhase('Hold');
        } else {
          setPhase('Exhale');
        }
        return next;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      ambientSound.pause();
    };
  }, [isOpen, soundEnabled]);

  if (!isOpen) return null;

  const toggleSound = () => {
    if (soundEnabled) {
      ambientSound.pause();
      setSoundEnabled(false);
    } else {
      ambientSound.play();
      setSoundEnabled(true);
    }
  };

  // Breathing circle scale based on phase
  let circleScale = 'scale-100';
  let phaseInstruction = 'Breathe in softly through your nose...';
  if (phase === 'Inhale') {
    circleScale = 'scale-125 transition-transform duration-[4000ms] ease-out';
    phaseInstruction = 'Fill your lungs with gentle, warm air...';
  } else if (phase === 'Hold') {
    circleScale = 'scale-125 transition-transform duration-500';
    phaseInstruction = 'Rest quietly in the stillness...';
  } else if (phase === 'Exhale') {
    circleScale = 'scale-90 transition-transform duration-[6000ms] ease-in-out';
    phaseInstruction = 'Let all tension dissolve as you breathe out...';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-surface rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(32,26,22,0.25)] flex flex-col items-center text-center overflow-hidden border border-surface-container-highest">
        {/* Ambient glow in background */}
        <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-primary-container/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-secondary-container/40 blur-3xl pointer-events-none" />

        {/* Top Controls */}
        <div className="w-full flex items-center justify-between z-10 mb-6">
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors"
            title="Toggle calming sound"
          >
            <span className="material-symbols-outlined text-[18px]">
              {soundEnabled ? 'volume_up' : 'volume_off'}
            </span>
            <span>{soundEnabled ? 'Cello & Rain' : 'Muted'}</span>
          </button>

          <span className="font-label-md text-label-md font-semibold text-primary bg-primary-fixed px-3 py-1 rounded-full">
            {secondsLeft}s remaining
          </span>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors"
            aria-label="Close breathing reset"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Headline */}
        <div className="space-y-1 mb-8 z-10">
          <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">
            60-Second Sanctuary Reset
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
            Follow the gentle rhythm
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant min-h-[36px] transition-all">
            {phaseInstruction}
          </p>
        </div>

        {/* Breathing Visual Orb */}
        <div className="relative w-64 h-64 flex items-center justify-center my-4">
          {/* Outer diffuse halo */}
          <div 
            className={`absolute w-56 h-56 rounded-full bg-gradient-to-tr from-secondary-container/60 via-primary-container/40 to-tertiary-fixed/50 blur-xl ${circleScale}`}
          />
          
          {/* Middle ripple ring */}
          <div 
            className={`absolute w-44 h-44 rounded-full border-2 border-primary-container/60 ${circleScale}`}
          />

          {/* Core Orb */}
          <div 
            className={`relative w-36 h-36 rounded-full bg-gradient-to-br from-primary-container to-secondary-container shadow-inner flex flex-col items-center justify-center text-on-primary-container select-none ${circleScale}`}
          >
            <span className="material-symbols-outlined text-[32px] opacity-80 mb-0.5">
              {phase === 'Inhale' ? 'north' : phase === 'Exhale' ? 'south' : 'pause'}
            </span>
            <span className="font-headline-sm text-headline-sm font-bold tracking-tight">
              {phase}
            </span>
          </div>
        </div>

        {/* Bottom Reassurance */}
        <div className="mt-8 z-10 space-y-3 w-full">
          <p className="font-body-sm text-body-sm text-on-surface-variant italic">
            “Your nervous system learns to trust when you give it this quiet pause.”
          </p>
          <button
            onClick={onClose}
            className="w-full h-12 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-semibold hover:bg-primary/95 active:scale-[0.98] transition-all shadow-sm"
          >
            Complete Reset
          </button>
        </div>
      </div>
    </div>
  );
};
