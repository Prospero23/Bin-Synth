'use client'

import React from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import sketch from "@/lib/sketch";
import { Suspense } from "react";
import Timer from '@/components/Timer'


const Synth = () => {

  return (
    <>
    <Suspense fallback={<p className="h-full text-center text-5xl">Loading Synth</p>}>
        <Timer initialTime={10}/>
      <NextReactP5Wrapper sketch={sketch} />;
      </Suspense>
    </>
  );
};

export default Synth;
