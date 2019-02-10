/*
 * Effects
 * Connect change instrument .toMaster() to .connect(effectname);
 */
const autoWah = new Tone.AutoWah({
  baseFrequency: 90,
  octaves: 8,
  sensitivity: 0.1,
  Q: 6,
  gain: 3,
  follower: {
    attack: 0.1,
    release: 0.2
  },
  wet: 0.3
}).toMaster();
autoWah.Q.value = 3;

const phaser = new Tone.Phaser({
  frequency: 0.1,
  octaves: 6,
  stages: 10,
  Q: 3,
  baseFrequency: 350,
  wet: 0.3
}).toMaster();

const chorus = new Tone.Chorus({
  frequency: 1.5,
  delayTime: 3.5,
  depth: 0.7,
  type: 'sine',
  spread: 180,
  wet: 0.3
});

/*
 * Delay
 */
const pingPong = new Tone.PingPongDelay({
  delayTime: '12n',
  maxDelayTime: 1,
  wet: 0.1
}).toMaster();

/*
 * Bass
 */
const bassSynth = new Tone.MonoSynth({
  volume: -5,
  oscillator: {
    type: 'fmsquare5',
    modulationType: 'triangle',
    modulationIndex: 2,
    harmonicity: 0.501
  },
  filter: {
    Q: 1,
    type: 'lowpass',
    rolloff: -24
  },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.4,
    release: 2
  },
  filterEnvelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.8,
    release: 1.5,
    baseFrequency: 50,
    octaves: 4.4
  }
}).chain(autoWah);

/*
 * Drums
 */
const drums505 = new Tone.Sampler(
  {
    D4: 'snare.[mp3|ogg]',
    C3: 'kick.[mp3|ogg]',
    G3: 'hh.[mp3|ogg]',
    A3: 'hho.[mp3|ogg]'
  },
  {
    volume: 11,
    release: 1,
    baseUrl: './audio/505/'
  }
).chain(autoWah, phaser);

/*
 * Pizz
 */
const pizzSynth = new Tone.MonoSynth({
  volume: -5,
  oscillator: {
    type: 'sawtooth4'
  },
  filter: {
    Q: 3,
    type: 'highpass',
    rolloff: -12
  },
  envelope: {
    attack: 0.01,
    decay: 0.3,
    sustain: 0.3,
    release: 0.9
  },
  filterEnvelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0,
    release: 0.1,
    baseFrequency: 800,
    octaves: -1.2
  }
}).chain(pingPong, chorus);
