'use client'

import React from "react";
import sketch from "@/lib/sketch";
import { ReactP5Wrapper } from "react-p5-wrapper";

const Synth = () => {
  return <ReactP5Wrapper sketch={sketch} />;
};

export default Synth;