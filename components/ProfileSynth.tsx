"use client"; // client to let synth error about hydration go away

import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { Suspense, useRef } from "react";
import useAudio from "./useAudio";

import { drawFunctionSynth } from "@/lib/synth/visualHelper";
import { type P5CanvasInstance } from "@p5-wrapper/react";
import { type UserResult } from "@/types";

const ProfileSynth = ({ user }: { user: UserResult }) => {
  // console.log(user)
  const { initAudio, startSynth, moveSynth, endSynth } = useAudio();

  const isPlaying = useRef(false);
  const p5Instance = useRef<P5CanvasInstance>(null);
  const recordingStartTime = useRef(0);
  const playbackIndex = useRef(0);
  const progress = useRef(0);

  const numberPosts = user.postNumber;
  const actionsArray = user.allMouseActions;

  const timeLength = 10000 * (numberPosts ?? 0); // total length

  const sketch = (p5: P5CanvasInstance) => {
    p5Instance.current = p5;
    const scale = 0.7; // how much space canvas takes

    // maybe change scale based on device dims?

    p5.setup = function () {
      // console.log(actionsArray)

      let side = p5.min(p5.windowHeight, p5.windowWidth) * scale;

      if (p5.windowWidth < 500) {
        side = p5.windowWidth;
      }

      p5.createCanvas(side, side);

      p5.background(0);
    };

    p5.draw = function () {
      p5.stroke(255);
      p5.strokeWeight(2);
      p5.noFill();
      p5.rect(0, 0, p5.width, p5.height);

      if (isPlaying.current) {
        const elapsedTime = p5.millis() - recordingStartTime.current;
        const scaleX = p5.width;
        const scaleY = p5.height;

        progress.current = (elapsedTime / timeLength) * p5.width;

        while (playbackIndex.current < actionsArray.length) {
          const action = actionsArray[playbackIndex.current];
          if (action.time <= elapsedTime) {
            if (action.event === "dragged") {
              drawFunctionSynth(
                p5,
                action.x * scaleX,
                action.y * scaleY,
                action.prevX * scaleX,
                action.prevY * scaleY,
                1,
              );
              moveSynth(p5, action.x * scaleX, action.y * scaleY);
            }

            if (action.event === "click") {
              drawFunctionSynth(
                p5,
                action.x * scaleX,
                action.y * scaleY,
                action.prevX * scaleX,
                action.prevY * scaleY,
                1,
              );
              startSynth(p5, action.x * scaleX, action.y * scaleY);
            }

            if (action.event === "release") {
              drawFunctionSynth(
                p5,
                action.x * scaleX,
                action.y * scaleY,
                action.prevX * scaleX,
                action.prevY * scaleY,
                1,
              );
              endSynth(p5);
            }
            playbackIndex.current++;
          } else {
            break;
          }
        }

        if (elapsedTime >= timeLength) {
          isPlaying.current = false;
          endSynth(p5);
        }
      }

      p5.fill(255);
      p5.rect(0, p5.height - 10, progress.current, 10);
    };
    p5.windowResized = function () {
      let sideLength = p5.min(p5.windowHeight, p5.windowWidth) * scale;

      if (p5.windowWidth < 500) {
        sideLength = p5.windowWidth;
      }

      p5.resizeCanvas(sideLength, sideLength);
    };
  };

  const startPlayback = async () => {
    // Wait for the audio context to start or resume
    await initAudio();

    if (p5Instance.current != null) {
      recordingStartTime.current = p5Instance.current.millis();
      isPlaying.current = true;
      p5Instance.current.background(0);
      playbackIndex.current = 0;
    }
  };

  return (
    <>
      <Suspense
        fallback={
          <p className="h-full text-center text-5xl">Loading Synth........</p>
        }
      >
        <NextReactP5Wrapper
          sketch={sketch}
          className="flex items-center"
          id="react-p5-wrapper"
        />
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

export default ProfileSynth;

// add some error logic with Array.isArray(arrayasdfa)
// add a pause button and such
