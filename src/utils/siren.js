/**
 * Web Audio API Emergency Siren and Ringtone Sound Generator
 * Client-side browser sound synthesis without external audio file assets
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.sirenOsc = null;
    this.sirenGain = null;
    this.sirenInterval = null;
    this.ringInterval = null;
  }

  initContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  startSiren() {
    this.initContext();
    if (!this.audioCtx) return;

    this.stopSiren();

    try {
      this.sirenOsc = this.audioCtx.createOscillator();
      this.sirenGain = this.audioCtx.createGain();

      this.sirenOsc.type = 'sawtooth';
      this.sirenOsc.frequency.setValueAtTime(440, this.audioCtx.currentTime);

      this.sirenGain.gain.setValueAtTime(0.35, this.audioCtx.currentTime);

      this.sirenOsc.connect(this.sirenGain);
      this.sirenGain.connect(this.audioCtx.destination);

      this.sirenOsc.start();

      let high = false;
      this.sirenInterval = setInterval(() => {
        if (!this.audioCtx || !this.sirenOsc) return;
        const now = this.audioCtx.currentTime;
        high = !high;
        const targetFreq = high ? 950 : 440;
        this.sirenOsc.frequency.cancelScheduledValues(now);
        this.sirenOsc.frequency.linearRampToValueAtTime(targetFreq, now + 0.35);
      }, 400);
    } catch (err) {
      console.warn('Siren sound error:', err);
    }
  }

  stopSiren() {
    if (this.sirenInterval) {
      clearInterval(this.sirenInterval);
      this.sirenInterval = null;
    }
    if (this.sirenOsc) {
      try {
        this.sirenOsc.stop();
        this.sirenOsc.disconnect();
      } catch (_) {}
      this.sirenOsc = null;
    }
  }

  playRingTone() {
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(852, this.audioCtx.currentTime); // dual tone ring 852Hz + 1209Hz
      gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 1.2);
    } catch (err) {
      console.warn('Ringtone error:', err);
    }
  }
}

export const soundEngine = new SoundEngine();
