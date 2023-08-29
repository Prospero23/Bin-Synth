"use client"; //client to let synth error about hydration go away

import * as Tone from "tone";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { Suspense, useRef, useEffect } from "react";
import {
  granularOptions,
  synthStart,
  synthMove,
  synthEnd,
} from "@/lib/synth/soundHelper";

import { drawFunction } from "@/lib/synth/visualHelper";

const ShowSynth = ({ actionsArray }) => {
  const fmSynth = useRef(null);
  const randomPulseSynth = useRef(null);
  const granularSynth = useRef(null);
  const sineSynth = useRef(null);
  const isPlaying = useRef(false);
  const p5Instance = useRef(null);
  const recordingStartTime = useRef(0);
  const playbackIndex = useRef(0);
  const progress = useRef(0);

  useEffect(() => {
    // Create the Tone.js synths and effects
    fmSynth.current = new Tone.FMSynth();
    fmSynth.current.oscillator.type = "sawtooth";

    randomPulseSynth.current = new Tone.Synth();
    randomPulseSynth.current.oscillator.type = "sine";

    granularSynth.current = new Tone.GrainPlayer(granularOptions);
    sineSynth.current = new Tone.Synth();

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

    fmSynth.current.chain(reverb1, distortion1, Tone.Destination);
    randomPulseSynth.current.chain(
      reverb,
      bitCrusher,
      compressor,
      limiter,
      Tone.Destination
    );
    granularSynth.current.chain(Tone.Destination);
    sineSynth.current.chain(Tone.Destination);

    return () => {
      // Clean up the Tone.js resources when the component unmounts
      fmSynth.current.dispose();
      randomPulseSynth.current.dispose();
      granularSynth.current.dispose();
      sineSynth.current.dispose();
    };
  }, []);

  useEffect(() => {

  })

  const sketch = (p5) => {
    p5Instance.current = p5;
    let scale = 0.70; //how much space canvas takes

    //maybe change scale based on device dims?

    p5.setup = function () {

      let side= p5.min(p5.windowHeight, p5.windowWidth) * scale

      if (p5.windowWidth < 500){
        side = p5.windowWidth
      }

      let canvas = p5.createCanvas(side, side)
      
      p5.background(0);
    };

    p5.draw = function () {
      p5.stroke(255);
      p5.strokeWeight(2);
      p5.noFill();
      p5.rect(0, 0, p5.width, p5.height);

      if (isPlaying.current) {
        let elapsedTime = p5.millis() - recordingStartTime.current;
        const scaleX = p5.width;
        const scaleY = p5.height;

        progress.current = (elapsedTime / 10000) * p5.width;

        while (playbackIndex.current < actionsArray.length) {
          let action = actionsArray[playbackIndex.current];
          if (action.time <= elapsedTime) {
            if (action.event === "dragged") {
              drawFunction(
                p5,
                action.x * scaleX,
                action.y * scaleY,
                action.prevX * scaleX,
                action.prevY * scaleY
              );
              synthMove(
                p5,
                fmSynth.current,
                randomPulseSynth.current,
                granularSynth.current,
                sineSynth.current,
                action.x * scaleX,
                action.y * scaleY
              );
            }

            if (action.event === "click") {
              drawFunction(
                p5,
                action.x * scaleX,
                action.y * scaleY,
                action.prevX * scaleX,
                action.prevY * scaleY
              );
              synthStart(
                p5,
                fmSynth.current,
                randomPulseSynth.current,
                granularSynth.current,
                sineSynth.current,
                action.x * scaleX,
                action.y * scaleY
              );
            }

            if (action.event === "release") {
              drawFunction(
                p5,
                action.x * scaleX,
                action.y * scaleY,
                action.prevX * scaleX,
                action.prevY * scaleY
              );
              synthEnd(
                p5,
                fmSynth.current,
                randomPulseSynth.current,
                granularSynth.current,
                sineSynth.current
              );
            }
            playbackIndex.current++;
          } else {
            break;
          }
        }

        if (elapsedTime >= 10000) {
          isPlaying.current = false;
          synthEnd(
            p5,
            fmSynth.current,
            randomPulseSynth.current,
            granularSynth.current,
            sineSynth.current
          );
        }
      }

      p5.fill(255);
      p5.rect(0, p5.height - 10, progress.current, 10);

    };
    p5.windowResized = function () {
      let sideLength = p5.min(p5.windowHeight, p5.windowWidth) * scale

      if (p5.windowWidth < 500){
        sideLength = p5.windowWidth
      }

      p5.resizeCanvas(sideLength, sideLength);


      // if (sideLength < rect.width){
      //   let difference = rect.width - side 
      //   console.log(difference)
      //   p5.canvas.position(difference/2, 0)

      // }


    };
  };

  const startPlayback = () => {
    recordingStartTime.current = p5Instance.current.millis();
    isPlaying.current = true;
    p5Instance.current.background(0);
    playbackIndex.current = 0;
  };

  return (
    <>
      <Suspense
        fallback={
          <p className="h-full text-center text-5xl">Loading Synth........</p>
        }
      >
        <NextReactP5Wrapper sketch={sketch} className="flex items-center" id="react-p5-wrapper"/>
        <button
          onClick={startPlayback}
          className="hover:text-green-500 hover:underline"
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
