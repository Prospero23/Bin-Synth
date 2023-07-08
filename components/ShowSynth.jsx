"use client";

import * as Tone from 'tone'
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { Suspense } from "react";
import { useRef } from "react";
import {
  granularOptions,
  synthStart,
  synthMove,
  synthEnd,
} from "@/lib/synth/soundHelper";

import { drawFunction } from "@/lib/synth/visualHelper";

const ShowSynth = ({ actionsArray }) => {
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

  const isPlaying = useRef(false); // Use useRef for mutable state
  let p5Instance; // Variable to store the p5 instance
  let recordingStartTime;
  const recordingDuration = 10000;
  let playbackIndex = 0;
  let progress = 0; // Variable to store the progress of the recording

  const sketch = (p5) => {
    let canvasMain;
    let mouseActions = actionsArray;

    p5Instance = p5; // Store the p5 instance

    p5.setup = function () {
      canvasMain = p5.createCanvas(600, 600);
      p5.background(255);
    };

    p5.draw = function () {
      if (isPlaying) {
        let elapsedTime = p5.millis() - recordingStartTime;
        const scaleX = p5.width; //scale to deal with normalized value
        const scaleY = p5.height;

        progress = (elapsedTime / recordingDuration) * p5.width; //calc progress

        while (playbackIndex < mouseActions.length) {
          let action = mouseActions[playbackIndex];
          if (action.time <= elapsedTime) {
            if (action.event === "dragged") {
              drawFunction(
                p5,
                action.x * scaleX,
                action.y * scaleY,
                action.prevX * scaleX,
                action.prevY * scaleY
              );
              synthMove(p5, fmSynth, randomPulseSynth, granularSynth, sineSynth, action.x * scaleX, action.y * scaleY,)
            }

            if (action.event === "click") {
              drawFunction(
                p5,
                action.x * scaleX,
                action.y * scaleY,
                action.prevX * scaleX,
                action.prevY * scaleY
              );
              synthStart(p5, fmSynth, randomPulseSynth, granularSynth, sineSynth, action.x * scaleX, action.y * scaleY)
            }

            if (action.event === "release") {
              drawFunction(
                p5,
                action.x * scaleX,
                action.y * scaleY,
                action.prevX * scaleX,
                action.prevY * scaleY
              );
              synthEnd(p5, fmSynth, randomPulseSynth, granularSynth, sineSynth)
            }
            playbackIndex++;
          } else {
            break;
          }
        }

        if (elapsedTime >= recordingDuration) {
          isPlaying.current = false;
        }
      }
      // Draw the progress bar at the bottom of the canvas
      p5.fill(0);
      p5.rect(0, p5.height - 10, progress, 10);

      p5.windowResized = function () {
        //p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
      };
    };
  };

  const startPlayback = () => {
    recordingStartTime = p5Instance.millis();
    isPlaying.current = true; // Update the value of isPlaying without triggering re-render
    p5Instance.background(255);
    playbackIndex = 0;
    console.log("bang");

    //reset synth
    
  };

  return (
    <>
      <Suspense
        fallback={
          <p className="h-full text-center text-5xl">Loading Synth........</p>
        }
      >
        <NextReactP5Wrapper sketch={sketch} />
        <button
          onClick={startPlayback}
          className=" hover:text-green-500 hover:underline"
        >
          START
        </button>
      </Suspense>
    </>
  );
};

export default ShowSynth;

//add some error logic with Array.isArray(arrayasdfa)
//NOT STORING PROPER IMAGE END

//add a pause button and such
