/**
 * Soothing ambient audio engine using Web Audio API.
 * Generates warm, calming harmonic drone chords (C major 9th / F major 7th in 432Hz tuning)
 * with gentle pink noise resembling soft forest rain or distant ocean swells.
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private noiseNode: AudioNode | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.init();
    if (!this.ctx) return;
    if (this.isPlaying) return;

    this.isPlaying = true;
    const now = this.ctx.currentTime;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.2, now + 2.0); // Gentle fade-in
    this.masterGain.connect(this.ctx.destination);

    // Warm chord notes (C3, G3, B3, E4, A4 around 432Hz harmonic base)
    const baseFreqs = [129.6, 194.4, 243.0, 324.0, 432.0];

    this.oscillators = baseFreqs.map((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const noteGain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.5, now);

      // Lowpass filter for soft warm acoustic cello/pad timbre
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);
      filter.Q.setValueAtTime(1.0, now);

      // LFO for slow breath-like swell
      const lfo = this.ctx!.createOscillator();
      const lfoGain = this.ctx!.createGain();
      lfo.frequency.setValueAtTime(0.1 + i * 0.03, now); // ~10s breath cycle
      lfoGain.gain.setValueAtTime(0.04, now);
      lfo.connect(lfoGain);
      lfoGain.connect(noteGain.gain);
      lfo.start();

      noteGain.gain.setValueAtTime(0.07 / (i + 1), now);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain!);

      osc.start();
      return osc;
    });

    // Gentle rain pink noise buffer
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.15;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(600, now);
      noiseFilter.Q.setValueAtTime(0.5, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.02, now);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      whiteNoise.start();
      this.noiseNode = whiteNoise;
    } catch {
      // Ignore fallback
    }
  }

  public pause() {
    if (!this.ctx || !this.isPlaying) return;
    this.isPlaying = false;
    const now = this.ctx.currentTime;

    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.2); // Gentle fade-out
      setTimeout(() => {
        this.oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch {}
        });
        this.oscillators = [];
        if (this.noiseNode) {
          try { (this.noiseNode as AudioBufferSourceNode).stop(); this.noiseNode.disconnect(); } catch {}
          this.noiseNode = null;
        }
      }, 1300);
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const ambientSound = new AmbientSoundEngine();
