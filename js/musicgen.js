(function() {
  'use strict';

  let p = new Population(5);

  // boolean
  let playing = false;

  // CSS accent-color variable
  const accentColor = getComputedStyle(document.body).getPropertyValue(
    '--accent-color'
  );

  // CSS default-color variable
  const defaultColor = getComputedStyle(document.body).getPropertyValue(
    '--default-color'
  );

  // dom elements to animate
  const kickBox = document.querySelector('.kickbox');
  const snareBox = document.querySelector('.snarebox');
  const violinBox = document.querySelector('.violinbox');
  const bassBox = document.querySelector('.bassbox');
  const pianoBox = document.querySelector('.pianobox');

  const $playBtn = document.getElementById('play-btn');

  var piano = SampleLibrary.load({
      instruments: 'piano',
      baseUrl: "/audio/"
  })

  var violin = SampleLibrary.load({
      instruments: 'violin',
      baseUrl: "/audio/"
  })

  /*
   * Master FX
   */
  //some overall compression to keep the levels in check
  const masterCompressor = new Tone.Compressor({
    threshold: -20,
    ratio: 12,
    attack: 0,
    release: 0.3
  });

  //give a little boost to the lows
  const lowBump = new Tone.Filter({
    type: 'lowshelf',
    frequency: 90,
    Q: 1,
    gain: 20
  });

  /*
   * Sequence Parts
   */
  // const pizzPart = new Tone.Sequence(
  //   function(time, note) {
  //     changeColor(pizzBox);
  //     pizzSynth.triggerAttackRelease(note, '10hz', time);
  //   },
  //   pizzNotes,
  //   '16n'
  // );

  // Bass Sequence
  const bassPart = new Tone.Sequence(
    function(time, note) {
      changeColor(bassBox);
      bassSynth.triggerAttackRelease(note, '10hz', time);
    },
    bassNotes,
    '16n'
  );

  // High-hat Sequence
  const highHatPart = new Tone.Sequence(
    function(time, note) {
      changeColor(highHatBox);
      drums505.triggerAttackRelease(note, '4n', time);
    },
    highHatNotes,
    '16n'
  );

  // Snare Sequence
  const snarePart = new Tone.Sequence(
    function(time, note) {
      changeColor(snareBox);
      drums505.triggerAttackRelease('D4', '4n', time);
    },
    ['D4'],
    '4n'
  );

  // Kick Sequence
  const kickPart = new Tone.Sequence(
    function(time, note) {
      changeColor(kickBox);
      drums505.triggerAttackRelease('C3', '4n', time);
    },
    kickNotes,
    '16n'
  );

  const Cmajor = ['C4','D4','E4','F4','G4','A4','B4','C5',null,null,null,null];

  const pianoPart = new Tone.Sequence(
    function(time, note) {
      changeColor(pianoBox);
      piano.triggerAttackRelease(note, '4n', time);
    },
    ['D4','D4','D4',null,'D4',null],
    '16n'
  );
  piano.toMaster();

  const violinPart = new Tone.Sequence(
    function(time, note) {
      changeColor(violinBox);
      violin.triggerAttackRelease(note, '4n', time);
    },
    ['D4','C4','D4'],
    '2n'
  );
  violin.toMaster();

  // starting time of sequences
  bassPart.start();
  snarePart.start('8n');
  pianoPart.start();
  violinPart.start();
  kickPart.start();

  /*
   * Change background color of elements
   */
  function changeColor(elem) {
    elem.style.backgroundColor = accentColor;
    setTimeout(function() {
      elem.style.backgroundColor = defaultColor;
    }, 100);
  }

  // Route everything through the filter & compressor before playing
  Tone.Master.chain(lowBump, masterCompressor);

  /*
   * Tone Transport
   * set the beats per minute, volume, swing feel etc...
   */
  Tone.Transport.bpm.value = 50;
  Tone.Transport.swing = 0;
  Tone.Transport.swingSubdivision = '16n';
  Tone.Transport.loopStart = 0;


  /*
   * Play Controls
   */
  $playBtn.addEventListener('click', function() {

    if (Tone.context.state !== 'running') {
      Tone.context.resume();
      Tone.Master.mute = false;
      Tone.Transport.start('+0.1');
      playing = true;
      $playBtn.value = 'I dislike';
    } else {
      p.reportFitness(-1);
    }
    for (var i = 0; i < 6; i ++) {
      let note = p.candidates[p.current].DNA[i];
      pianoPart.add(i, Cmajor[note]);
    }
    for (var i = 6; i < 9; i ++) {
      let note = p.candidates[p.current].DNA[i];
      violinPart.removeAll():
      violinPart.add(i, Cmajor[note]);
    }

  });
})();
