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
    let countdown = 10000;
    let startTime;
    let photoTaken = false;
    let canvasMain;
    let isClick = false;
    let isRelease = true;
    let previousMouseIsPressed = false;
    let mouseActions = []; //MOUSE ACTIONS ARRAY

    p5.setup = function () {
      canvasMain = p5.createCanvas(p5.windowWidth, p5.windowHeight);
      p5.background(0);
      startTime = p5.millis();
    };

    p5.draw = function () {
      // calc elapsed time
      let elapsedTime = p5.millis() - startTime;

      // calc remaining time
      let remainingTime = countdown - elapsedTime;

      //drawing stuff
      if(p5.mouseIsPressed){
        p5.ellipse(p5.mouseX, p5.mouseY, 40, 40)
      }

      // RECORDING STUFF
      if (p5.mouseIsPressed && isClick) {
        let action = {
          event: "click",
          x: p5.mouseX / p5.width, //current positions of mouse NORMALIZED
          y: p5.mouseY / p5.height,
          prevX: p5.pmouseX / p5.width, //prev positions of mouse
          prevY: p5.pmouseY / p5.height,
          time: elapsedTime, //time of action
        };
        mouseActions.push(action);

        isClick = false; // Reset after the first click action
        return;
      } else if (isRelease && !p5.mouseIsPressed) {
        //release of mouse
        let action = {
          event: "release",
          x: p5.mouseX / p5.width, //current positions of mouse NORMALIZED
          y: p5.mouseY / p5.height,
          prevX: p5.pmouseX / p5.width, //prev positions of mouse
          prevY: p5.pmouseY / p5.height,
          time: elapsedTime, //time of action
        };
        mouseActions.push(action);
        isRelease = false; // Reset after the release action
        return;
      } else if (p5.mouseIsPressed) { //drag event capture
        let action = {
          event: "dragged",
          x: p5.mouseX / p5.width, //current positions of mouse NORMALIZED
          y: p5.mouseY / p5.height,
          prevX: p5.pmouseX / p5.width, //prev positions of mouse
          prevY: p5.pmouseY / p5.height,
          time: elapsedTime, //time of action
        };
        mouseActions.push(action);

        return;
      }

      //end the loop
      if (remainingTime <= 0 && !photoTaken) {
        photoTaken = true;
        console.log(remainingTime);
        p5.noLoop();
        console.log("STOP");
        openModal();

        // Call the function to save the canvas to Cloudinary
        saveCanvas(canvasMain.canvas, mouseActions);
      }
      if (isModalOpen){
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
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

  };

  function saveCanvas(canvas, mouseActions) {
    const canvasURL = canvas.toDataURL("image/png");
    // Update the post object

    console.log(mouseActions)

    setUpdatedPost((prevPost) => ({
      ...prevPost,
      image: canvasURL,
      dateMade: new Date(),
      mouseActions: mouseActions
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
        fallback={<p className="h-full text-center text-5xl">Loading Synth</p>}
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
