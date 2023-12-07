"use client"; // client to let synth error about hydration go away

import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { Suspense, useEffect, useRef } from "react";

import { drawFunction } from "@/lib/synth/visualHelper";
import { type P5CanvasInstance } from "@p5-wrapper/react";
import { type MouseAction } from "@/types";
import useAudio from "../useAudio";

const ShowSynth = ({ actionsArray }: { actionsArray: MouseAction[] }) => {
  const isPlaying = useRef<boolean>(false);
  const p5Instance = useRef<P5CanvasInstance | null>(null);
  const recordingStartTime = useRef<number>(0);
  const playbackIndex = useRef<number>(0);
  const progress = useRef<number>(0);
  const { initAudio, startSynth, moveSynth, endSynth, stopAudio } = useAudio();

  // makes sure all audio is stopped when entering
  useEffect(() => {
    stopAudio();
    return () => {
      stopAudio();
    };
  });

  const sketch = (p5: P5CanvasInstance) => {
    p5Instance.current = p5;
    let container: any;

    p5.setup = function () {
      container = document.getElementById("sketch-container");
      const side = p5.min(container?.offsetWidth, container?.offsetHeight);
      const canvas = p5.createCanvas(side, side);
      console.log(container?.offsetWidth, container?.offsetHeight);
      canvas.parent("sketch-container");
      p5.background(0);
      initAudio();
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

        progress.current = (elapsedTime / 10000) * p5.width;

        while (playbackIndex.current < actionsArray.length) {
          const action = actionsArray[playbackIndex.current];
          if (action.time <= elapsedTime) {
            if (action.event === "dragged") {
              drawFunction(
                p5,
                action.x * scaleX,
                action.y * scaleY,
                action.prevX * scaleX,
                action.prevY * scaleY,
              );
              moveSynth(p5, action.x * scaleX, action.y * scaleY);
            }

            if (action.event === "click") {
              drawFunction(
                p5,
                action.x * scaleX,
                action.y * scaleY,
                action.prevX * scaleX,
                action.prevY * scaleY,
              );
              startSynth(p5, action.x * scaleX, action.y * scaleY);
            }

            if (action.event === "release") {
              drawFunction(
                p5,
                action.x * scaleX,
                action.y * scaleY,
                action.prevX * scaleX,
                action.prevY * scaleY,
              );
              endSynth(p5);
            }
            playbackIndex.current++;
          } else {
            break;
          }
        }

        if (elapsedTime >= 10000) {
          isPlaying.current = false;
          endSynth(p5);
        }
      }

      p5.fill(255);
      p5.rect(0, p5.height - 10, progress.current, 10);
    };
    p5.windowResized = function () {
      const side = p5.min(container?.offsetWidth, container?.offsetHeight);
      p5.resizeCanvas(side, side);
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
        {/* Square Aspect Ratio Container */}
        <div className="relative w-full" style={{ paddingTop: "100%" }}>
          {/* Flex Container for Centering */}
          <div
            className="flex items-center justify-center absolute top-0 left-0 right-0 bottom-0"
            id="sketch-container"
          >
            <NextReactP5Wrapper sketch={sketch} />
          </div>
        </div>
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
