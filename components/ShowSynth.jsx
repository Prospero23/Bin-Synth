"use client";

import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { Suspense } from "react";
import { useRef } from "react";

const ShowSynth = ({ actionsArray }) => {
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
        let elapsedTime = p5Instance.millis() - recordingStartTime;

        progress = (elapsedTime / recordingDuration) * p5.width; //calc progress

        while (playbackIndex < mouseActions.length) {
          let action = mouseActions[playbackIndex];
          if (action.time <= elapsedTime) {
            if (action.event === "dragged") {
              p5Instance.ellipse(
                action.x * p5.width,
                action.y * p5.height,
                30,
                30
              );
            }

            if (action.event === "click") {
              p5Instance.ellipse(
                action.x * p5.width,
                action.y * p5.height,
                30,
                30
              );
            }

            if (action.event === "release") {
              p5Instance.ellipse(action.x * p5.width, action.y * p5.height, 30, 30);
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
  };

  return (
    <>
      <Suspense
        fallback={
          <p className="h-full text-center text-5xl">Loading Synth........</p>
        }
      >
        <NextReactP5Wrapper sketch={sketch} />
        <button onClick={startPlayback} className=" hover:text-green-500 hover:underline">START</button>
      </Suspense>
    </>
  );
};

export default ShowSynth;

//add some error logic with Array.isArray(arrayasdfa)
//NOT STORING PROPER IMAGE END


//add a pause button and such