import React from 'react';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-surface rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(32,26,22,0.25)] flex flex-col space-y-5 border border-surface-container-highest max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">volunteer_activism</span>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                You Are Never Alone
              </h2>
              <span className="font-label-md text-label-md text-primary font-medium">
                Free, Confidential 24/7 Support
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors"
            aria-label="Close crisis support information"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant">
          If you are carrying a burden that feels too heavy or painful right now, compassionate, trained human beings are ready to listen without judgment.
        </p>

        {/* Support lines */}
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div>
              <h3 className="font-label-lg text-label-lg font-bold text-on-surface">
                988 Suicide & Crisis Lifeline
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Available 24/7 across the US & Canada. Call or text anytime.
              </p>
            </div>
            <a
              href="tel:988"
              className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold shrink-0 hover:bg-primary/90 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>Call 988</span>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div>
              <h3 className="font-label-lg text-label-lg font-bold text-on-surface">
                Crisis Text Line
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Text HOME to 741741 to connect with a compassionate crisis counselor.
              </p>
            </div>
            <a
              href="sms:741741?body=HOME"
              className="px-4 py-2 rounded-full bg-secondary text-on-secondary font-label-md text-label-md font-semibold shrink-0 hover:bg-secondary/90 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>Text 741741</span>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div>
              <h3 className="font-label-lg text-label-lg font-bold text-on-surface">
                The Trevor Project (LGBTQ+)
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Confidential suicide prevention & crisis intervention.
              </p>
            </div>
            <a
              href="tel:18664887386"
              className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold shrink-0 hover:bg-surface-container-highest active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>1-866-488-7386</span>
            </a>
          </div>
        </div>

        {/* Immediate 5-4-3-2-1 Sensory Grounding Box */}
        <div className="p-4 rounded-2xl bg-secondary-container/40 border border-secondary-fixed space-y-2">
          <div className="flex items-center gap-1.5 text-secondary font-semibold font-label-md text-label-md">
            <span className="material-symbols-outlined text-[18px]">nature</span>
            <span>Immediate 5-4-3-2-1 Grounding Whisper</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Look gently around the room you are in right now: notice <strong>5</strong> things you can see, <strong>4</strong> things you can touch, <strong>3</strong> sounds you can hear, <strong>2</strong> things you can smell, and take <strong>1</strong> deep breath into your belly.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full h-12 rounded-full bg-surface-container text-on-surface font-label-lg text-label-lg font-semibold hover:bg-surface-container-high active:scale-[0.98] transition-all"
        >
          Return to Sanctuary
        </button>
      </div>
    </div>
  );
};
