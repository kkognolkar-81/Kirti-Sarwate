import React, { useState } from 'react';
import { BRAND_ASSETS } from '../data/mockStories';

interface ProfileScreenProps {
  onOpenCrisis: () => void;
  onOpenBreathing: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onOpenCrisis,
  onOpenBreathing,
}) => {
  const [ambientChoice, setAmbientChoice] = useState('cello');
  const [narratorChoice, setNarratorChoice] = useState('clara');
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto space-y-6 pb-28 pt-2 animate-fade-in">
      {/* Profile Header */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-primary-fixed/60 via-surface-container to-surface-container-high p-6 text-center flex flex-col items-center border border-primary-fixed">
        <div className="relative w-24 h-24 mb-3">
          <img
            alt="Elena Vance"
            className="w-full h-full rounded-full object-cover shadow-md ring-4 ring-surface"
            src={BRAND_ASSETS.avatar}
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[16px]">eco</span>
          </div>
        </div>

        <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
          Elena Vance
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Gentle soul · Sanctuary member since Oct 2024
        </p>

        <div className="mt-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md font-semibold shadow-2xs">
            🌱 5 Days Caring Streak
          </span>
          <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-semibold shadow-2xs">
            📚 14 Stories Crafted
          </span>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-2xl bg-secondary-container text-on-secondary-container text-center font-label-md text-label-md animate-fade-in font-medium">
          {toastMessage}
        </div>
      )}

      {/* Sanctuary Audio & Narration Preferences */}
      <section className="p-5 rounded-2xl sm:rounded-3xl bg-surface-container-lowest border border-surface-container-high/40 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Audio &amp; Story Atmosphere
          </h2>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5 font-medium">
              Default Background Ambience
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'cello', label: 'Soothing Cello' },
                { id: 'rain', label: 'Woodland Rain' },
                { id: 'silent', label: 'Pure Silence' },
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setAmbientChoice(opt.id);
                    showToast(`Ambience updated to ${opt.label}`);
                  }}
                  className={`p-2.5 rounded-xl font-label-md text-label-md transition-all cursor-pointer ${
                    ambientChoice === opt.id
                      ? 'bg-primary text-on-primary font-semibold shadow-xs'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5 font-medium">
              Story Narrator
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'clara', name: 'Clara', desc: 'Gentle, maternal & warm' },
                { id: 'julian', name: 'Julian', desc: 'Deep, slow & resonant' },
              ].map(voice => (
                <button
                  key={voice.id}
                  type="button"
                  onClick={() => {
                    setNarratorChoice(voice.id);
                    showToast(`Narrator set to ${voice.name}`);
                  }}
                  className={`p-3 rounded-xl text-left transition-all cursor-pointer ${
                    narratorChoice === voice.id
                      ? 'bg-secondary-container text-on-secondary-container ring-1 ring-secondary'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <p className="font-label-lg text-label-lg font-bold">{voice.name}</p>
                  <p className="font-body-sm text-xs opacity-80">{voice.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gentle Mindfulness Settings */}
      <section className="p-5 rounded-2xl sm:rounded-3xl bg-surface-container-lowest border border-surface-container-high/40 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">notifications_active</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Gentle Rhythms
          </h2>
        </div>

        <div className="flex items-center justify-between py-1">
          <div>
            <p className="font-label-lg text-label-lg text-on-surface font-semibold">
              Morning Check-in Invitation
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              A quiet, unobtrusive nudge around 8:30 AM
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setRemindersEnabled(prev => !prev);
              showToast(remindersEnabled ? 'Morning reminders paused' : 'Morning reminders enabled');
            }}
            className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
              remindersEnabled ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform absolute top-1 ${
                remindersEnabled ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>

        <div className="pt-2 border-t border-surface-container-high/60 flex items-center justify-between">
          <div>
            <p className="font-label-lg text-label-lg text-on-surface font-semibold">
              60-Second Breathing Reset
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Quick access anytime to ground your breath
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenBreathing}
            className="px-3.5 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-semibold hover:bg-secondary-fixed transition-colors cursor-pointer"
          >
            Launch Pacer
          </button>
        </div>
      </section>

      {/* Sanctuary Privacy Guarantee */}
      <section className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high/40 space-y-2">
        <div className="flex items-center gap-2 text-primary font-semibold font-label-lg">
          <span className="material-symbols-outlined text-[18px]">lock</span>
          <span>Sanctuary Privacy Promise</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Your feelings, voice notes, and journal entries are private to your device. Haven is designed as your confidential, sacred space where you never have to perform or prove anything.
        </p>
      </section>

      {/* Crisis and Warmline Link */}
      <button
        type="button"
        onClick={onOpenCrisis}
        className="w-full p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-between cursor-pointer border border-surface-container-high/60"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-container/30 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
          </div>
          <div className="text-left">
            <p className="font-label-lg text-label-lg text-on-surface font-semibold">
              Crisis &amp; 24/7 Warmline Support
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Direct access to 988, text lines, and grounding resources
            </p>
          </div>
        </div>
        <span className="material-symbols-outlined text-outline">chevron_right</span>
      </button>

      {/* Footer Info */}
      <footer className="text-center text-on-surface-variant font-body-sm text-xs pt-4 pb-2 space-y-1">
        <p>Haven Sanctuary · Version 2.4</p>
        <p className="italic">“Softness is not weakness; it is the courage to stay open.”</p>
      </footer>
    </div>
  );
};
