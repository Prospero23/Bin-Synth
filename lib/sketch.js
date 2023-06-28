import * as Tone from "tone";

export default function sketch(p) {
  let synth;
  let currentFreq = 440; // Starting frequency
  let currentVol = -6; // Starting frequency

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);

    // Create a new Tone.js synth
    synth = new Tone.Synth().toDestination();
    synth.frequency.value = currentFreq;

  };

  p.draw = function () {
    if (p.mouseIsPressed) {
      p.fill(255);
      p.ellipse(p.mouseX, p.mouseY, 80, 80);
    }
  };

  p.mouseDragged = function () {
    // Map the mouse position to a frequency range
    const freqRange = { min: 220, max: 880 }; // Change the range as needed
    const ampRange = { min: -40, max: -6 }; // Change the range as needed
    const targetFreq = p.map(
      p.mouseX,
      0,
      p.width,
      freqRange.min,
      freqRange.max
    );

    const targetVol = p.map(
        p.mouseY,
        p.height,
        0,
        ampRange.min,
        ampRange.max
      );

    // Set the synth frequency smoothly using Tone.js's rampTo method
    synth.frequency.rampTo(targetFreq, 0.1);
    synth.volume.value = targetVol;
    currentFreq = targetFreq;
    currentVol = targetVol;
  };

  p.mousePressed = function () {
    // Trigger a new note with the current frequency
    synth.triggerAttack(currentFreq);
  };

  p.mouseReleased = function () {
    // Release the note when the mouse is released
    synth.triggerRelease();
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
}


