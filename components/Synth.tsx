"use client";

import StartSynthPopup from "@/components/StartSynthPopup";
import { useEffect, Suspense, useState, useRef } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import Timer from "@/components/Timer";
import NewPostPopup from "./NewPostPopup";
import { drawFunctionSynth, recordAction } from "@/lib/synth/visualHelper";
import { type P5CanvasInstance } from "@p5-wrapper/react";
import { type MouseAction } from "@/types";

import useAudio from "./useAudio";
interface NewPost {
  author: string;
  title: string;
  dateMade: string | Date;
  description: string;
  picture: string;
}

const Synth = ({ post }: { post: NewPost }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // controls for popup to submit
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [updatedPost, setUpdatedPost] = useState(post);
  const { initAudio, startSynth, moveSynth, endSynth, stopAudio } = useAudio();

  let p5Context: P5CanvasInstance;
  const startTime = useRef<number>(-1);

  const openModal = () => {
    setIsModalOpen(true);
  };

  /// //////////SKETCH STUFF////////////////////
  const sketch = (p5: P5CanvasInstance) => {
    p5Context = p5; // get access to p5 outside of sketch

    const countdown = 10000;
    const offset = 70; // canvas vert offset
    let photoTaken = false;
    let canvasMain: P5CanvasInstance;
    let isClick = false;
    let isRelease = true;
    const mouseActions: MouseAction[] = []; // MOUSE ACTIONS ARRAY

    p5.setup = function () {
      canvasMain = p5.createCanvas(p5.windowWidth, p5.windowHeight);
      canvasMain.position(0, offset);
      p5.background(0);
    };
    /// ////DRAW///////
    p5.draw = function () {
      if (isStarted) {
        const elapsedTime = p5.millis() - startTime.current; // how long recording has been going
        const remainingTime = countdown - elapsedTime; // calc remaining time
        if (remainingTime > 0) {
          // drawing FUNCTIONALITY
          if (p5.mouseIsPressed === true) {
            drawFunctionSynth(
              p5,
              p5.mouseX,
              p5.mouseY,
              p5.pmouseX,
              p5.pmouseY,
              1,
            );
          }

          /// RECORDING STUFF ///
          if (p5.mouseIsPressed === true && isClick && isInCanvas()) {
            recordAction(p5, elapsedTime, mouseActions, "click");
            startSynth(p5, p5.mouseX, p5.mouseY);

            isClick = false; // Reset after the first click action
            return;
          } else if (isRelease && p5.mouseIsPressed === false) {
            // release of mouse
            recordAction(p5, elapsedTime, mouseActions, "release");
            endSynth(p5);
            isRelease = false; // Reset after the release action
            return;
          } else if (p5.mouseIsPressed === true && isInCanvas()) {
            // drag event capture
            recordAction(p5, elapsedTime, mouseActions, "dragged");

            moveSynth(p5, p5.mouseX, p5.mouseY);

            return;
          }
        }

        // end the loop
        if (remainingTime <= 0 && !photoTaken) {
          photoTaken = true;
          p5.noLoop();
          stopAudio();
          openModal();

          // Call the function to save the canvas to Cloudinary
          saveCanvas(canvasMain.canvas, mouseActions);
        }
        if (isModalOpen) {
          p5.noLoop();
        }
      }

      // when mouse is pressed
      p5.mousePressed = async function () {
        isClick = true;
        await initAudio();
      };

      // when mouse is released
      p5.mouseReleased = function () {
        isRelease = true;
      };

      // handle window resize
      p5.windowResized = function () {
        // p5.resizeCanvas(p5.canvas.width, p5.canvas.height, false); //FIX THIS
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
  };

  function saveCanvas(canvas: P5CanvasInstance, mouseActions: MouseAction[]) {
    const canvasURL = canvas.toDataURL("image/png");
    // Update the post object
    setUpdatedPost((prevPost) => ({
      ...prevPost,
      image: canvasURL,
      dateMade: new Date(),
      mouseActions,
    }));
  }

  // Call the saveArrayToFile() function to trigger the file download

  useEffect(() => {
    if (isStarted) {
      // Trigger any necessary actions when the modal opens
      startTime.current = p5Context.millis();
    }
  }, [isStarted, p5Context]);

  return (
    <>
      <Suspense
        fallback={<p className="h-full text-center text-9xl">SYNTH LOADING</p>}
      >
        <Timer initialTime={10} isStarted={isStarted} />
        <NextReactP5Wrapper sketch={sketch} />
      </Suspense>
      <StartSynthPopup setIsStarted={setIsStarted} initAudio={initAudio} />
      {/* @ts-expect-error this will be fixed with refactor */}
      <NewPostPopup isModalOpen={isModalOpen} post={updatedPost} />
    </>
  );
};

export default Synth;

// maybe allow newpost to close early?

// run code after ok button is pressed
