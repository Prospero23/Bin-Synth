let fmSynthVolume = -10;

export const granularOptions = {
    url: "/scrEEch.wav",
    autostart: false,
    mute: false,
    volume: 0,
    overlap: 0.05,
    grainSize: 0.1,
    playbackRate: 1,
    loop: true,
    loopStart: 0,
    loopEnd: 0,
    reverse: false,
}

//start SYNTH
export function synthStart(p5, fmSynth, randomPulseSynth, granularSynth, sineSynth, x, y) {


    fmSynth.triggerAttack("c4"); //change this?
    fmSynth.volume.rampTo(-100, 0.01);
    randomPulseSynth.triggerAttack("d5");
    randomPulseSynth.volume.rampTo(-100, 0.01);
    granularSynth.start();
    granularSynth.volume.rampTo(-100, 0.01);
    sineSynth.triggerAttack(10000);
    sineSynth.volume.rampTo(-100, 0.01);

    const harmonicity = p5.map(x, p5.width / 2, 0, 1, 5); // Map Y-axis to volume range from -40 dB to -10 dB
    const pitch1 = p5.map(y, p5.height / 2, 0, 200, 1000); // Map Y-axis to volume range from -40 dB to -10 dB
    const start3 = p5.map(x, p5.width / 2, 0, 0.01, 0.95);
    const end3 = p5.random() * (1 - start3 - 0.01) + start3;
    const pitch4 = p5.map(y - p5.height / 2, p5.height / 2, 0, 8000, 15000);

    //volume for Q1 + Q2
    const volumeTop = p5.map(y, p5.height / 2, 0, -40, -10); // Map Y-axis to volume range from -40 dB to -10 dB
    //volume for Q3 + Q4
    const volumeBottom = p5.map(y - p5.height / 2, p5.height / 2, 0, -40, -10); // Map Y-axis to volume range from -40 dB to -10 dB

    // Check which quadrant was clicked and only update all of the things that must be
    if (x < p5.width / 2 && y < p5.height / 2) {
      fmSynth.volume.rampTo(fmSynthVolume, 0.01);
      fmSynth.harmonicity.rampTo(harmonicity, 0.1);
      fmSynth.frequency.rampTo(pitch1, 0.1);
    } else if (x >= p5.width / 2 && y < p5.height / 2) {
      randomPulseSynth.volume.rampTo(volumeTop, 0.01);
      fmSynthVolume = volumeTop;
    } else if (x < p5.width / 2 && y >= p5.height / 2) {
      granularSynth.volume.rampTo(volumeBottom, 0.01);
      granularSynth.loopStart = start3;
      granularSynth.loopEnd = end3;
      sineSynth.frequency.value = pitch4;
    } else {
      sineSynth.volume.rampTo(volumeBottom, 0.01);
    }
  };

  export function synthMove(p5, fmSynth, randomPulseSynth, granularSynth, sineSynth, x, y) {

    const pitch1 = p5.map(y, p5.height / 2, 0, 200, 1000); // Map Y-axis to volume range from -40 dB to -10 dB
    const harmonicity = p5.map(x, p5.width / 2, 0, 1, 5); // Map Y-axis to volume range from -40 dB to -10 dB
    const start3 = p5.map(x, p5.width / 2, 0, 0.01, 0.99);
    const end3 = p5.random() * (1 - start3 - 0.01) + start3;
    const playback3 = p5.map(y - p5.height / 2, p5.height / 2, 0, 0.1, 3); // Map Y-axis to volume range from -40 dB to -10 dB
    const pitch4 = p5.map(y - p5.height / 2, p5.height / 2, 0, 8000, 15000);

    //volume for Q1 + Q2
    const volumeTop = p5.map(y, p5.height / 2, 0, -40, -10); // Map Y-axis to volume range from -40 dB to -10 dB
    //volume for Q3 + Q4
    const volumeBottom = p5.map(y - p5.height / 2, p5.height / 2, 0, -40, -10); // Map Y-axis to volume range from -40 dB to -10 dB

    // Check which quadrant was moved in and update values

    if (x < p5.width / 2 && y < p5.height / 2) {
      fmSynth.volume.rampTo(fmSynthVolume, 0.01);
      randomPulseSynth.volume.rampTo(-100, 0.01);
      granularSynth.volume.rampTo(-100, 0.01);
      sineSynth.volume.rampTo(-100, 0.01);

      fmSynth.harmonicity.rampTo(harmonicity, 0.5);
      fmSynth.frequency.rampTo(pitch1, 0.1);
    } else if (x >= p5.width / 2 && y < p5.height / 2) {
      fmSynthVolume = volumeTop;
      randomPulseSynth.volume.rampTo(volumeTop, 0.01);
      granularSynth.volume.rampTo(-100, 0.01);
      sineSynth.volume.rampTo(-100, 0.01);
    } else if (x < p5.width / 2 && y >= p5.height / 2) {
      fmSynth.volume.rampTo(-100, 0.01);
      randomPulseSynth.volume.rampTo(-100, 0.01);
      granularSynth.volume.rampTo(volumeBottom, 0.01);
      granularSynth.loopStart = start3;
      granularSynth.loopEnd = end3;
      granularSynth.playbackRate = playback3;

      sineSynth.volume.rampTo(-100, 0.01);
      sineSynth.frequency.value = pitch4;
    } else {
      fmSynth.volume.rampTo(-100, 0.01);
      randomPulseSynth.volume.rampTo(-100, 0.01);
      granularSynth.volume.rampTo(-100, 0.01);
      sineSynth.volume.rampTo(volumeBottom, 0.01);
    }
  }

  export function synthEnd(p5, fmSynth, randomPulseSynth, granularSynth, sineSynth) {
    fmSynth.triggerRelease();
    randomPulseSynth.triggerRelease(0.1);
    granularSynth.stop();
    sineSynth.triggerRelease(0.1);
  }

  export function resetSynth(fmSynth, randomPulseSynth, granularSynth, sineSynth){
    //reset the things in here
  }