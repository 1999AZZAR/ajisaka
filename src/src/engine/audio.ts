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

function getContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playGamelanTone(freq: number, type: 'saron' | 'gong' | 'click' | 'error' = 'saron', vol: number = 0.3) {
  try {
    const ctx = getContext();
    if (!ctx) return;
    const t = ctx.currentTime;

    if (type === 'error') {
      // Dissonant, muted "thud" (like hitting wood incorrectly)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = 'triangle';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(150, t);
      osc2.frequency.setValueAtTime(215, t); // Dissonance
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol * 0.6, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc1.connect(gain); osc2.connect(gain); gain.connect(ctx.destination);
      osc1.start(t); osc1.stop(t + 0.3); osc2.start(t); osc2.stop(t + 0.3);
      return;
    }

    if (type === 'click') {
      // Light wooden tap (Keprak mallet)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.08); // Pitch drop for transient
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol * 0.8, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.1);
      return;
    }

    // Gamelan Additive Synthesis (Saron & Gong)
    // partials: { r: frequency ratio, a: amplitude ratio, d: decay time }
    const partials = type === 'gong' 
      ? [ {r: 1, a: 1, d: 4.0}, {r: 1.52, a: 0.5, d: 2.0}, {r: 2.46, a: 0.3, d: 1.5}, {r: 3.43, a: 0.2, d: 1.0} ] // Deep, long resonance
      : [ {r: 1, a: 1, d: 1.2}, {r: 2.76, a: 0.4, d: 0.5}, {r: 5.40, a: 0.2, d: 0.2}, {r: 8.90, a: 0.1, d: 0.1} ]; // Bright, bell-like

    const duration = type === 'gong' ? 4.0 : 1.5;

    partials.forEach((p) => {
      // Create two oscillators per partial slightly detuned to create "Ombak" (acoustic beating characteristic of Gamelan)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const pGain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      
      const beatHz = type === 'gong' ? 1.5 : 3.0;
      osc1.frequency.setValueAtTime(freq * p.r, t);
      osc2.frequency.setValueAtTime(freq * p.r + beatHz, t);

      pGain.gain.setValueAtTime(0, t);
      const attack = type === 'gong' ? 0.05 : 0.02;
      pGain.gain.linearRampToValueAtTime(vol * p.a * 0.5, t + attack);
      pGain.gain.exponentialRampToValueAtTime(0.001, t + attack + p.d);

      osc1.connect(pGain);
      osc2.connect(pGain);
      pGain.connect(ctx.destination);

      osc1.start(t); osc1.stop(t + duration);
      osc2.start(t); osc2.stop(t + duration);
    });
  } catch (e) {
    // Ignore autoplay policies
  }
}

export const playClick = () => playGamelanTone(0, 'click', 0.2);
export const playStrokeSuccess = () => playGamelanTone(Slendro.Nem, 'saron', 0.3);
export const playStrokeError = () => playGamelanTone(0, 'error', 0.2);

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
