"use client"; // client to let synth error about hydration go away

import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { Suspense, useEffect, useRef } from "react";

import { drawFunction } from "@/lib/synth/visualHelper";
import { type P5CanvasInstance } from "@p5-wrapper/react";
import { type MouseAction } from "@/types";
// import useAudio from "../useAudio";
import Link from "next/link";

const ShowSynth = ({ actionsArray }: { actionsArray: MouseAction[] }) => {
  const isPlaying = useRef<boolean>(false);
  const p5Instance = useRef<P5CanvasInstance | null>(null);
  const recordingStartTime = useRef<number>(0);
  const playbackIndex = useRef<number>(0);
  const progress = useRef<number>(0);
  // const { initAudio, startSynth, moveSynth, endSynth, stopAudio } = useAudio();

  // // makes sure all audio is stopped when entering
  // useEffect(() => {
  //   stopAudio();
  //   return () => {
  //     stopAudio();
  //   };
  // });

  const sketch = (p5: P5CanvasInstance) => {
    p5Instance.current = p5;
    let scale = set_scale();

    p5.setup = function () {
      const side = p5.min(p5.windowHeight, p5.windowWidth) * scale;
      p5.createCanvas(side, side);
      p5.background(0);
      // initAudio();
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
              // moveSynth(p5, action.x * scaleX, action.y * scaleY);
            }

            if (action.event === "click") {
              drawFunction(
                p5,
                action.x * scaleX,
                action.y * scaleY,
                action.prevX * scaleX,
                action.prevY * scaleY,
              );
              // startSynth(p5, action.x * scaleX, action.y * scaleY);
            }

            if (action.event === "release") {
              drawFunction(
                p5,
                action.x * scaleX,
                action.y * scaleY,
                action.prevX * scaleX,
                action.prevY * scaleY,
              );
              // endSynth(p5);
            }
            playbackIndex.current++;
          } else {
            break;
          }
        }

        if (elapsedTime >= 10000) {
          isPlaying.current = false;
          // endSynth(p5);
        }
      }

      p5.fill(255);
      p5.rect(0, p5.height - 10, progress.current, 10);
    };
    p5.windowResized = function () {
      scale = set_scale();
      console.log(p5.windowHeight, p5.windowWidth);
      const side = p5.min(p5.windowWidth, p5.windowHeight) * scale;
      p5.resizeCanvas(side, side);
    };

    function set_scale() {
      let scale = 0.7;
      if (p5.windowHeight < 610 && p5.windowWidth > 710) {
        scale = 0.6;
      }
      if (p5.windowHeight < 440 && p5.windowWidth > 710) {
        scale = 0.5;
      }
      return scale;
    }
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
        <div className="flex items-center flex-col justify-center short-and-wide:justify-start">
          <NextReactP5Wrapper sketch={sketch} />
          <div className="flex flex-row justify-between w-full">
            <button
              className="hover:text-green-500 hover:underline"
              onClick={startPlayback}
            >
              Play
            </button>
            <Link href="/posts" className=" hover:bg-sky-500">
              All Posts
            </Link>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default ShowSynth;
