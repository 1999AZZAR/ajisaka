import { useProgress } from '../state/progress'

const Slendro = {
  JiLow: 130.81,
  RoLow: 146.83,
  LuLow: 164.81,
  MaLow: 196.00,
  NemLow: 220.00,
  Ji: 261.63,
  Ro: 293.66,
  Lu: 329.63,
  Ma: 392.00,
  Nem: 440.00,
  JiHigh: 523.25,
}

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let masterCompressor: DynamicsCompressorNode | null = null;

function getContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Master Bus for anti-clipping
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.6; // Reduced to prevent clipping when chords play
    
    masterCompressor = audioCtx.createDynamicsCompressor();
    masterCompressor.threshold.value = -5; // db
    masterCompressor.knee.value = 15;
    masterCompressor.ratio.value = 12;
    masterCompressor.attack.value = 0.002;
    masterCompressor.release.value = 0.15;

    masterGain.connect(masterCompressor);
    masterCompressor.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  // Apply dynamic volume setting (0 to 1) from state, smoothly transitioning to avoid clicks
  if (masterGain) {
    const state = useProgress.getState().settings;
    const isMuted = state.sound === false;
    const volSetting = state.volume ?? 1;
    masterGain.gain.setTargetAtTime(isMuted ? 0 : 0.6 * volSetting, audioCtx.currentTime, 0.05);
  }

  return { ctx: audioCtx, out: masterGain! };
}

function playGamelanTone(freq: number, type: 'saron' | 'gong' | 'click' | 'error' = 'saron', vol: number = 0.3) {
  try {
    const audioState = getContext();
    if (!audioState) return;
    const { ctx, out } = audioState;
    // Increased lookahead to 50ms to prevent main-thread lag from causing envelope clicks
    const t = ctx.currentTime + 0.05;

    if (type === 'error') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = 'triangle';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(150, t);
      osc2.frequency.setValueAtTime(215, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol * 0.8, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      gain.gain.linearRampToValueAtTime(0, t + 0.2);
      osc1.connect(gain); osc2.connect(gain); gain.connect(out);
      osc1.start(t); osc1.stop(t + 0.3); osc2.start(t); osc2.stop(t + 0.3);
      return;
    }

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.05);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol * 1.2, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
      gain.gain.linearRampToValueAtTime(0, t + 0.08);
      osc.connect(gain); gain.connect(out);
      osc.start(t); osc.stop(t + 0.2);
      return;
    }

    // Advanced Gamelan Physical Modeling Approach
    
    // 1. Mallet Strike (Exciter) - The sound of the wooden/horn hammer hitting the bronze
    const strikeOsc = ctx.createOscillator();
    const strikeGain = ctx.createGain();
    const strikeFilter = ctx.createBiquadFilter();
    strikeOsc.type = 'square';
    strikeOsc.frequency.setValueAtTime(type === 'gong' ? 200 : 1200, t);
    strikeOsc.frequency.exponentialRampToValueAtTime(type === 'gong' ? 50 : 300, t + 0.05);
    strikeFilter.type = 'bandpass';
    strikeFilter.frequency.setValueAtTime(type === 'gong' ? 400 : 2000, t);
    
    const strikeDuration = type === 'gong' ? 0.1 : 0.05;
    strikeGain.gain.setValueAtTime(0, t);
    strikeGain.gain.linearRampToValueAtTime(vol * (type === 'gong' ? 0.3 : 0.15), t + 0.005);
    const strikeDecayEnd = t + 0.005 + Math.max(0.01, strikeDuration - 0.01);
    strikeGain.gain.exponentialRampToValueAtTime(0.001, strikeDecayEnd);
    strikeGain.gain.linearRampToValueAtTime(0, strikeDecayEnd + 0.01);
    
    strikeOsc.connect(strikeFilter);
    strikeFilter.connect(strikeGain);
    strikeGain.connect(out);
    strikeOsc.start(t); strikeOsc.stop(strikeDecayEnd + 0.1);

    // 2. Bronze Resonance (Body) - Inharmonic partials with Ombak
    // Saron has very strong bright partials. Gong has massive deep resonance.
    const partials = type === 'gong' 
      ? [ {r: 1, a: 1, d: 5.0}, {r: 1.52, a: 0.6, d: 3.5}, {r: 2.46, a: 0.4, d: 2.0}, {r: 3.43, a: 0.2, d: 1.0}, {r: 4.1, a: 0.1, d: 0.5} ]
      : [ {r: 1, a: 1, d: 1.5}, {r: 2.76, a: 0.45, d: 0.7}, {r: 5.40, a: 0.25, d: 0.3}, {r: 8.90, a: 0.1, d: 0.15}, {r: 11.3, a: 0.05, d: 0.05} ];

    const beatHz = type === 'gong' ? 1.2 : 3.5;

    partials.forEach((p) => {
      // Primary Tone
      const osc1 = ctx.createOscillator();
      // Ombak (Beating) Tone
      const osc2 = ctx.createOscillator();
      const pGain = ctx.createGain();
      const pFilter = ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc2.type = 'sine';
      
      osc1.frequency.setValueAtTime(freq * p.r, t);
      osc2.frequency.setValueAtTime(freq * p.r + beatHz, t);

      // Lowpass filter that closes over time: High frequencies decay much faster in physical bronze
      pFilter.type = 'lowpass';
      pFilter.frequency.setValueAtTime(Math.min(freq * p.r * 2 + 1000, 20000), t);
      pFilter.frequency.exponentialRampToValueAtTime(Math.max(freq * p.r, 100), t + Math.max(0.1, p.d));
      
      // Envelope
      pGain.gain.setValueAtTime(0, t);
      const attack = type === 'gong' ? 0.05 : 0.015;
      const attackEnd = t + attack;
      const peakVol = Math.max(0.002, vol * p.a * 0.4); // guarantee > 0.001
      pGain.gain.linearRampToValueAtTime(peakVol, attackEnd);
      
      const decayEnd = attackEnd + Math.max(0.05, p.d - 0.05);
      pGain.gain.exponentialRampToValueAtTime(0.001, decayEnd);
      pGain.gain.linearRampToValueAtTime(0, decayEnd + 0.05);

      osc1.connect(pFilter);
      osc2.connect(pFilter);
      pFilter.connect(pGain);
      pGain.connect(out);

      osc1.start(t); osc1.stop(decayEnd + 0.2);
      osc2.start(t); osc2.stop(decayEnd + 0.2);
    });
  } catch (e) {
    // Ignore autoplay policies
  }
}

function playTone(freq: number, type: OscillatorType = 'sine', duration: number = 0.5, vol: number = 0.3) {
  try {
    const audioState = getContext();
    if (!audioState) return;
    const { ctx, out } = audioState;
    // Increased lookahead to 50ms
    const t = ctx.currentTime + 0.05;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    
    gain.gain.setValueAtTime(0, t);
    const peakVol = Math.max(0.002, vol);
    gain.gain.linearRampToValueAtTime(peakVol, t + 0.02);
    
    const decayEnd = t + 0.02 + Math.max(0.02, duration - 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, decayEnd);
    gain.gain.linearRampToValueAtTime(0, decayEnd + 0.02);
    
    osc.connect(gain); gain.connect(out);
    osc.start(t); osc.stop(decayEnd + 0.1);
  } catch (e) {}
}

export const playClick = () => {
  playTone(Slendro.Ro, 'sine', 0.15, 0.15);
}

export const playTypeSuccess = () => {
  playTone(Slendro.JiHigh, 'sine', 0.2, 0.1);
}

export const playTypeError = () => {
  playTone(150, 'sawtooth', 0.2, 0.1);
}

export const playStartGame = () => {
  playTone(Slendro.Lu, 'sine', 0.2, 0.15);
  setTimeout(() => playTone(Slendro.Nem, 'sine', 0.2, 0.15), 100);
  setTimeout(() => playTone(Slendro.JiHigh, 'sine', 0.5, 0.2), 200);
}

export const playStrokeSuccess = () => {
  playGamelanTone(Slendro.Nem, 'saron', 0.3);
}

export const playStrokeError = () => {
  playGamelanTone(0, 'error', 0.2);
}

export const playQuestionDone = () => {
  playGamelanTone(Slendro.Lu, 'saron', 0.2);
  setTimeout(() => playGamelanTone(Slendro.Ma, 'saron', 0.3), 150);
  setTimeout(() => playGamelanTone(Slendro.Nem, 'saron', 0.4), 300);
}

export const playLevelDone = () => {
  // Majestic Gamelan Arpeggio + Final Gong
  playGamelanTone(Slendro.Ji, 'saron', 0.3);
  setTimeout(() => playGamelanTone(Slendro.Ro, 'saron', 0.3), 150);
  setTimeout(() => playGamelanTone(Slendro.Lu, 'saron', 0.3), 300);
  setTimeout(() => playGamelanTone(Slendro.Ma, 'saron', 0.3), 450);
  setTimeout(() => playGamelanTone(Slendro.Nem, 'saron', 0.3), 600);
  setTimeout(() => playGamelanTone(Slendro.JiHigh, 'saron', 0.4), 750);
  
  // Big resonant Gong Ageng on the final beat
  setTimeout(() => playGamelanTone(Slendro.JiLow, 'gong', 0.7), 750);
}
