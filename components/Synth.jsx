"use client";

import { useEffect } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { Suspense } from "react";
import Timer from "@/components/Timer";
import NewPostPopup from "./NewPostPopup";
import { useState } from "react";
import * as Tone from "tone";
import {
  granularOptions,
  synthStart,
  synthMove,
  synthEnd,
} from "@/lib/synth/soundHelper";
import { drawFunction, recordAction } from "@/lib/synth/visualHelper";

//need the post info at the top level here to pass into the sub component

const Synth = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); //controls for popup
  const [updatedPost, setUpdatedPost] = useState(post);
  //update post stuff

  const openModal = () => {
    setIsModalOpen(true);
  };

  /////////////SKETCH STUFF////////////////////
  const sketch = (p5) => {
    Tone.start();
    let countdown = 10000;
    let offset = 70; //canvas vert offset
    let startTime;
    let photoTaken = false;
    let canvasMain;
    let isClick = false;
    let isRelease = true;
    let mouseActions = []; //MOUSE ACTIONS ARRAY

    let inCanvas = false;

    //SOUND///
    const fmSynth = new Tone.FMSynth();
    fmSynth.oscillator.type = "sawtooth";

    const randomPulseSynth = new Tone.Synth();
    randomPulseSynth.oscillator.type = "sine";

    const granularSynth = new Tone.GrainPlayer(granularOptions);
    const sineSynth = new Tone.Synth();

    const bitCrusher = new Tone.BitCrusher({
      bits: 8,
    });
    const reverb = new Tone.Reverb({
      decay: 5,
    });
    const limiter = new Tone.Limiter();
    limiter.threshold.value = -50; // Adjust the threshold level as needed
    const compressor = new Tone.Compressor(-20, 3);

    const reverb1 = new Tone.Reverb({
      decay: 0.5,
    });

    const distortion1 = new Tone.Distortion(0.3);

    fmSynth.chain(reverb1, distortion1, Tone.Destination);
    randomPulseSynth.chain(
      reverb,
      bitCrusher,
      compressor,
      limiter,
      Tone.Destination
    );
    granularSynth.chain(Tone.Destination);
    sineSynth.chain(Tone.Destination);

    function logisticMap(x, r) {
      //randomizer for the pitch of pulseSynth
      return r * x * (1 - x);
    }
    //values for randomizing pulse
    let value2 = 0.5; // Set the initial value (between 0 and 1)
    const parameter2 = 3.2; // Set the parameter (can be changed)

    p5.setup = function () {
      canvasMain = p5.createCanvas(p5.windowWidth, p5.windowHeight);
      canvasMain.position(0, offset);
      p5.background(0);
      startTime = p5.millis();
    };
    ///////DRAW///////
    p5.draw = function () {
      let elapsedTime = p5.millis() - startTime; //how long recording has been going
      let remainingTime = countdown - elapsedTime; // calc remaining time

      const randTime = 50;
      const timeTime = p5.millis(); //calculate when random pitch changes

      if (timeTime % 100 >= randTime - 10) {
        //check if it has been over 100ish ms
        value2 = logisticMap(value2, parameter2);
        const frequency = Tone.Frequency(value2).toFrequency();

        randomPulseSynth.frequency.value = frequency * 440;
      }
      //drawing FUNCTIONALITY
      if (p5.mouseIsPressed) {
        drawFunction(p5, p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
      }

      /// RECORDING STUFF ///
      if (p5.mouseIsPressed && isClick && isInCanvas()) {
        recordAction(p5, elapsedTime, mouseActions, "click");
        synthStart(
          p5,
          fmSynth,
          randomPulseSynth,
          granularSynth,
          sineSynth,
          p5.mouseX,
          p5.mouseY
        );

        isClick = false; // Reset after the first click action
        return;
      } else if (isRelease && !p5.mouseIsPressed) {
        //release of mouse
        recordAction(p5, elapsedTime, mouseActions, "release");
        synthEnd(p5, fmSynth, randomPulseSynth, granularSynth, sineSynth);
        isRelease = false; // Reset after the release action
        return;
      } else if (p5.mouseIsPressed && isInCanvas()) {
        //drag event capture
        recordAction(p5, elapsedTime, mouseActions, "dragged");

        synthMove(
          p5,
          fmSynth,
          randomPulseSynth,
          granularSynth,
          sineSynth,
          p5.mouseX,
          p5.mouseY
        );

        return;
      }

      //end the loop
      if (remainingTime <= 0 && !photoTaken) {
        photoTaken = true;
        p5.noLoop();
        openModal();

        // Call the function to save the canvas to Cloudinary
        saveCanvas(canvasMain.canvas, mouseActions);
      }
      if (isModalOpen) {
        p5.noLoop();
      }
    };

    //when mouse is pressed
    p5.mousePressed = function () {
      isClick = true;
    };

    //when mouse is released
    p5.mouseReleased = function () {
      isRelease = true;
    };

    //handle window resize
    p5.windowResized = function () {
      //p5.resizeCanvas(p5.canvas.width, p5.canvas.height, false); //FIX THIS
    };

    function isInCanvas() {
      const x = p5.mouseX;
      const y = p5.mouseY;

      if (x >= 0 && x <= p5.width && y >= offset && y <= p5.height) {
        return true;
      }
      return false;
    }
  };

  function saveCanvas(canvas, mouseActions) {
    const canvasURL = canvas.toDataURL("image/png");
    // Update the post object
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
        fallback={<p className="h-full text-center text-9xl">SYNTH LOADING</p>}
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
