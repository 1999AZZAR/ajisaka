const Slendro = {
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

function playTone(freq: number, type: OscillatorType = 'sine', duration: number = 0.5, vol: number = 0.3) {
  try {
    const ctx = getContext();
    if (!ctx) return;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Gamelan-like envelope: percussive attack, exponential decay
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Ignore audio errors (e.g. autoplay policies)
  }
}

export const playClick = () => playTone(Slendro.Ro, 'sine', 0.15, 0.15);
export const playStrokeSuccess = () => playTone(Slendro.Nem, 'sine', 0.6, 0.2);
export const playStrokeError = () => playTone(150, 'sawtooth', 0.2, 0.1);

export const playQuestionDone = () => {
  playTone(Slendro.Ji, 'sine', 0.4, 0.15);
  setTimeout(() => playTone(Slendro.Lu, 'sine', 0.4, 0.15), 150);
  setTimeout(() => playTone(Slendro.Nem, 'sine', 1.0, 0.2), 300);
}

export const playLevelDone = () => {
  // Gamelan arpeggio
  playTone(Slendro.Ji, 'sine', 0.5, 0.2);
  setTimeout(() => playTone(Slendro.Ro, 'sine', 0.5, 0.2), 120);
  setTimeout(() => playTone(Slendro.Lu, 'sine', 0.5, 0.2), 240);
  setTimeout(() => playTone(Slendro.Ma, 'sine', 0.5, 0.2), 360);
  setTimeout(() => playTone(Slendro.Nem, 'sine', 0.5, 0.2), 480);
  setTimeout(() => playTone(Slendro.JiHigh, 'sine', 2.0, 0.3), 600);
}
