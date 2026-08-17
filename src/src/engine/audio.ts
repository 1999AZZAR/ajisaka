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
    masterGain.gain.value = 0.9;
    
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
  return { ctx: audioCtx, out: masterGain! };
}

function playGamelanTone(freq: number, type: 'saron' | 'gong' | 'click' | 'error' = 'saron', vol: number = 0.3) {
  try {
    const audioState = getContext();
    if (!audioState) return;
    const { ctx, out } = audioState;
    const t = ctx.currentTime + 0.01;

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
      osc1.start(t); osc1.stop(t + 0.2); osc2.start(t); osc2.stop(t + 0.2);
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
      osc.start(t); osc.stop(t + 0.08);
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
    strikeGain.gain.exponentialRampToValueAtTime(0.001, t + strikeDuration - 0.01);
    strikeGain.gain.linearRampToValueAtTime(0, t + strikeDuration);
    
    strikeOsc.connect(strikeFilter);
    strikeFilter.connect(strikeGain);
    strikeGain.connect(out);
    strikeOsc.start(t); strikeOsc.stop(t + strikeDuration);

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
      pFilter.frequency.exponentialRampToValueAtTime(Math.max(freq * p.r, 100), t + p.d);
      
      // Envelope
      pGain.gain.setValueAtTime(0, t);
      const attack = type === 'gong' ? 0.05 : 0.015;
      pGain.gain.linearRampToValueAtTime(vol * p.a * 0.4, t + attack);
      pGain.gain.exponentialRampToValueAtTime(0.001, t + attack + p.d - 0.05);
      pGain.gain.linearRampToValueAtTime(0, t + attack + p.d);

      osc1.connect(pFilter);
      osc2.connect(pFilter);
      pFilter.connect(pGain);
      pGain.connect(out);

      const totalDuration = attack + p.d;
      osc1.start(t); osc1.stop(t + totalDuration);
      osc2.start(t); osc2.stop(t + totalDuration);
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
    const t = ctx.currentTime + 0.01;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration - 0.02);
    gain.gain.linearRampToValueAtTime(0, t + duration);
    osc.connect(gain); gain.connect(out);
    osc.start(t); osc.stop(t + duration);
  } catch (e) {}
}

export const playClick = () => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
  playTone(Slendro.Ro, 'sine', 0.15, 0.15);
}

export const playTypeSuccess = () => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
  playTone(Slendro.JiHigh, 'sine', 0.2, 0.1);
}

export const playTypeError = () => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([30, 40, 30]);
  playTone(150, 'sawtooth', 0.2, 0.1);
}

export const playStartGame = () => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([30, 100, 40, 200, 60]);
  playTone(Slendro.Lu, 'sine', 0.2, 0.15);
  setTimeout(() => playTone(Slendro.Nem, 'sine', 0.2, 0.15), 100);
  setTimeout(() => playTone(Slendro.JiHigh, 'sine', 0.5, 0.2), 200);
}

export const playStrokeSuccess = () => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(30);
  playGamelanTone(Slendro.Nem, 'saron', 0.3);
}

export const playStrokeError = () => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([40, 60, 40]);
  playGamelanTone(0, 'error', 0.2);
}

export const playQuestionDone = () => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([30, 150, 40, 300, 50]);
  playGamelanTone(Slendro.Lu, 'saron', 0.2);
  setTimeout(() => playGamelanTone(Slendro.Ma, 'saron', 0.3), 150);
  setTimeout(() => playGamelanTone(Slendro.Nem, 'saron', 0.4), 300);
}

export const playLevelDone = () => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([50, 150, 50, 150, 50, 150, 100, 150, 200]);
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
