"use client";

import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { Suspense } from "react";

//take in an array of actions and then pew pew pew with them at press of button

const ShowSynth = ({ actionsArray }) => {
  const sketch = (p5) => {
    let canvasMain;
    let mouseActions = []; // Array to store recorded mouse actions
    let isPlaying = false; // Flag to indicate playback state
    let playbackIndex = 0; // Index to keep track of playback position
    let recordingStartTime; // Variable to store the recording start time

    p5.setup = function () {
      canvasMain = p5.createCanvas(600, 600);
      p5.background(255);
    };

    p5.draw = function () {
      if (isPlaying) {
        // Playback recorded mouse actions based on adjusted elapsed time
        let elapsedTime = millis() - recordingStartTime;
        while (playbackIndex < mouseActions.length) {
          let action = mouseActions[playbackIndex];
          if (action.time <= elapsedTime) {
            if (action.event === "dragged") {
              line(
                action.prevX * p5.width,
                action.prevY * p5.height,
                action.x * p5.width,
                action.y * p5.height
              );
              //synthStuff(action.x, action.y);
            }
    
            if (action.event === "click") {
              rect(action.x * width, action.y * height, 30, 30);
              //synth.triggerAttack(currentFreq);
            }
    
            if (action.event === "release") {
              circle(action.x * width, action.y * height, 15);
              //synth.triggerRelease();
            }
            playbackIndex++;
          } else {
            break;
          }
        }
    
        // Stop playback when all actions have been played
        if (playbackIndex >= mouseActions.length) {
          isPlaying = false;
        }
      }
    
    };

    p5.windowResized = function () {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };
  };

  return (
    <>
      <Suspense
        fallback={<p className="h-full text-center text-5xl">Loading Synth</p>}
      >
        <NextReactP5Wrapper sketch={sketch} />
      </Suspense>
    </>
  );
};

export default ShowSynth;

//maybe allow newpost to close early?
