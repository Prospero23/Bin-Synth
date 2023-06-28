import * as Tone from "tone";

export default function sketch(p5) {
  let synth;
  let currentFreq = 440; // Starting frequency
  let currentVol = -6; // Starting frequency
  let countdown = 10;
  let startTime;
  let photoTaken = false;
  let recorder;
  let canvasMain;
  let canvasTimer;

  p5.setup = function () {
    canvasMain = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    startTime = p5.second();

    // Create a new Tone.js synth
    synth = new Tone.Synth().toDestination();
    synth.frequency.value = currentFreq;

    //Create a recording
    recorder = new Tone.Recorder();
    //recorder.start();
  };

  p5.draw = function () {
    //calc elapsed time
    let elapsedTime = p5.second() - startTime;

    //calc remaining time
    let remainingTime = countdown - elapsedTime;

    if (p5.mouseIsPressed) {
      p5.fill(255);
      p5.ellipse(p5.mouseX, p5.mouseY, 80, 80);
    }

    if (remainingTime <= 0 && !photoTaken) {
      photoTaken = true;
      console.log(remainingTime);
      p5.noLoop();
      synth.disconnect();
      console.log("STOP");
      // p5.saveCanvas('trial', 'png');
      return;
    }
  };

  p5.mouseDragged = function () {
    // Map the mouse position to a frequency range
    const freqRange = { min: 220, max: 880 }; // Change the range as needed
    const ampRange = { min: -40, max: -6 }; // Change the range as needed
    const targetFreq = p5.map(
      p5.mouseX,
      0,
      p5.width,
      freqRange.min,
      freqRange.max
    );

    const targetVol = p5.map(
      p5.mouseY,
      p5.height,
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

  p5.mousePressed = function () {
    // Trigger a new note with the current frequency
    synth.triggerAttack(currentFreq);
  };

  p5.mouseReleased = function () {
    // Release the note when the mouse is released
    synth.triggerRelease();
  };

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
}

//trigger other bs once time remaining is done
