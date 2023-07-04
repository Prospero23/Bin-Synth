"use client";

import { useEffect } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { Suspense } from "react";
import Timer from "@/components/Timer";
import NewPostPopup from "./NewPostPopup";
import { useState } from "react";

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

  const sketch = (p5) => {
    let countdown = 10;
    let startTime;
    let photoTaken = false;
    let canvasMain;
    let canvasTimer;

    p5.setup = function () {
      canvasMain = p5.createCanvas(p5.windowWidth, p5.windowHeight);
      p5.background(0);
      startTime = p5.second();
    };

    p5.draw = function () {
      // calc elapsed time
      let elapsedTime = p5.second() - startTime;

      // calc remaining time
      let remainingTime = countdown - elapsedTime;

      if (p5.mouseIsPressed) {
        p5.fill(255);
        p5.ellipse(p5.mouseX, p5.mouseY, 80, 80);
      }

      if (remainingTime <= 0 && !photoTaken) {
        photoTaken = true;
        console.log(remainingTime);
        p5.noLoop();
        console.log("STOP");
        openModal();

        // Call the function to save the canvas to Cloudinary
        saveCanvas(canvasMain.canvas);
      }
    };

    p5.windowResized = function () {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };
  };

   function saveCanvas(canvas) {
    const canvasURL = canvas.toDataURL("image/png")
      // Update the post object

    setUpdatedPost((prevPost) => ({
        ...prevPost,
        image: canvasURL,
        dateMade: new Date(),
      }));
    
  }

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
        <NextReactP5Wrapper sketch={sketch} />;
      </Suspense>
      <NewPostPopup isModalOpen={isModalOpen} post={updatedPost} />
    </>
  );
};

export default Synth;

//maybe allow newpost to close early?
