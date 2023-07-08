"use client";

import { useEffect } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { Suspense } from "react";
import Timer from "@/components/Timer";
import NewPostPopup from "./NewPostPopup";
import { useState } from "react";
import * as Tone from "tone";

//need the post info at the top level here to pass into the sub component

const Synth = ({ post }) => {
  //controls for popup
  const [isModalOpen, setIsModalOpen] = useState(false);

  //update post stuff
  const [updatedPost, setUpdatedPost] = useState(post);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  /////////////SKETCH STUFF////////////////////
  const sketch = (p5) => {
    Tone.start()
    let countdown = 10000;
    let startTime;
    let photoTaken = false;
    let canvasMain;
    let isClick = false;
    let isRelease = true;
    let previousMouseIsPressed = false;
    let mouseActions = []; //MOUSE ACTIONS ARRAY

    //SOUND///
    const fmSynth = new Tone.FMSynth();
    fmSynth.oscillator.type = "sawtooth";
    let fmSynthVolume = -10

    const randomPulseSynth = new Tone.Synth();
    randomPulseSynth.oscillator.type = "pwm";

    const granularSynth = new Tone.GrainPlayer({
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
    });

    const sineSynth = new Tone.Synth();

    const distortion = new Tone.Distortion(4);
    const bitCrusher = new Tone.BitCrusher({
      bits: 8,
    });
    const reverb = new Tone.Reverb({
      decay: 5,
    });
    const limiter = new Tone.Limiter({
      //FIX LIMITER
      threshold: -10,
    });

    const reverb1 = new Tone.Reverb({
      decay: 2,
    });

    const distortion1 = new Tone.Distortion(0.8);

    fmSynth.chain(reverb1, distortion1, Tone.Destination);
    randomPulseSynth.chain(reverb, distortion, limiter, Tone.Destination);
    granularSynth.chain(Tone.Destination);
    sineSynth.chain(Tone.Destination);

    function logisticMap(x, r) {
      return r * x * (1 - x);
    }

    let value2 = 0.5; // Set the initial value (between 0 and 1)
    const parameter2 = 3.2; // Set the parameter (can be changed)

    p5.setup = function () {
      canvasMain = p5.createCanvas(p5.windowWidth, p5.windowHeight);
      p5.background(0);
      startTime = p5.millis();
    };
    ///////DRAW///////
    p5.draw = function () {
      // calc elapsed time
      let elapsedTime = p5.millis() - startTime; //how long recording has been going
      let diameter = 30; //circle diameter

      // calc remaining time
      let remainingTime = countdown - elapsedTime;

      //drawing FUNCTIONALITY
      if (p5.mouseIsPressed) {
        let velocity = p5.dist(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
        length = p5.map(velocity, 10, p5.width, 20, 900);
        p5.ellipse(p5.mouseX, p5.mouseY, length, length);
      }

      /// RECORDING STUFF ///
      if (p5.mouseIsPressed && isClick) {
        let action = {
          event: "click",
          x: p5.mouseX / p5.width, //current positions of mouse NORMALIZED
          y: p5.mouseY / p5.height,
          prevX: p5.pmouseX / p5.width, //prev positions of mouse
          prevY: p5.pmouseY / p5.height,
          time: elapsedTime, //time of action
        };
        mouseActions.push(action);
        synthStart()

        isClick = false; // Reset after the first click action
        return;
      } else if (isRelease && !p5.mouseIsPressed) {
        //release of mouse
        let action = {
          event: "release",
          x: p5.mouseX / p5.width, //current positions of mouse NORMALIZED
          y: p5.mouseY / p5.height,
          prevX: p5.pmouseX / p5.width, //prev positions of mouse
          prevY: p5.pmouseY / p5.height,
          time: elapsedTime, //time of action
        };
        mouseActions.push(action);
        synthEnd()

        isRelease = false; // Reset after the release action
        return;
      } else if (p5.mouseIsPressed) {
        //drag event capture
        let action = {
          event: "dragged",
          x: p5.mouseX / p5.width, //current positions of mouse NORMALIZED
          y: p5.mouseY / p5.height,
          prevX: p5.pmouseX / p5.width, //prev positions of mouse
          prevY: p5.pmouseY / p5.height,
          time: elapsedTime, //time of action
        };
        mouseActions.push(action);
        synthMove()

        return;
      }

      //end the loop
      // if (remainingTime <= 0 && !photoTaken) {
      //   photoTaken = true;
      //   console.log(remainingTime);
      //   p5.noLoop();
      //   console.log("STOP");
      //   openModal();
      //   p5.saveJSON(mouseActions, 'mouseActions.json');

      //   // Call the function to save the canvas to Cloudinary
      //   saveCanvas(canvasMain.canvas, mouseActions);
      // }
      // if (isModalOpen){
      //   p5.noLoop();
      // }
    };

    //when mouse is pressed
    p5.mousePressed = function () {
      isClick = true;
    };

    //when mouse is released
    p5.mouseReleased = function () {
      isRelease = true;
    };
    //start SYNTH
     function synthStart() {
      const x = p5.mouseX;
      const y = p5.mouseY;

      console.log('rarararar')

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

    function synthMove() {
      const x = p5.mouseX;
      const y = p5.mouseY;

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

    function synthEnd() {
      fmSynth.triggerRelease();
      randomPulseSynth.triggerRelease(0.1);
      granularSynth.stop();
      sineSynth.triggerRelease(0.1);
    }

    //handle window resize
    p5.windowResized = function () {
      //p5.resizeCanvas(p5.canvas.width, p5.canvas.height, false); //FIX THIS
    };
  };

  function saveCanvas(canvas, mouseActions) {
    const canvasURL = canvas.toDataURL("image/png");
    // Update the post object

    console.log(mouseActions);

    setUpdatedPost((prevPost) => ({
      ...prevPost,
      image: canvasURL,
      dateMade: new Date(),
      mouseActions: mouseActions,
    }));
  }

  // Call the saveArrayToFile() function to trigger the file download

  //in here  => send the data into the modal
  useEffect(() => {
    if (isModalOpen) {
      // Trigger any necessary actions when the modal opens
      console.log("Modal opened!");
    }
  }, [isModalOpen]);

  return (
    <>
      <Suspense
        fallback={<p className="h-full text-center text-5xl">Loading Synth</p>}
      >
        <Timer initialTime={10} />
        <NextReactP5Wrapper sketch={sketch} />
      </Suspense>
      <NewPostPopup isModalOpen={isModalOpen} post={updatedPost} />
    </>
  );
};

export default Synth;

//maybe allow newpost to close early?

//MOVE MOST LOGIC OUT OF THIS FILE
