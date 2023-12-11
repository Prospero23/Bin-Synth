"use client";

import * as Tone from "tone";
import {
  granularOptions,
  synthStart,
  synthMove,
  synthEnd,
} from "@/lib/synth/soundHelper";
import { type P5CanvasInstance } from "@p5-wrapper/react";
import { useRef } from "react";

export default function useAudio() {
  // Declare synth variables without initializing them immediately
  let fmSynth: any,
    randomPulseSynth: any,
    granularSynth: any,
    sineSynth: any,
    bitCrusher,
    reverb,
    limiter,
    compressor,
    reverb1,
    distortion1;

  const isAudioInitialized = useRef(false);

  async function initAudio() {
    if (!isAudioInitialized.current) {
      if (Tone.context.state === "suspended") {
        await Tone.context.resume();
      }
      await Tone.start();

      setupSynths();
      isAudioInitialized.current = true;
    }
  }

  function setupSynths() {
    // SOUND///
    fmSynth = new Tone.FMSynth();
    fmSynth.oscillator.type = "sawtooth";

    randomPulseSynth = new Tone.Synth();
    randomPulseSynth.oscillator.type = "sine";

    granularSynth = new Tone.GrainPlayer(granularOptions);
    sineSynth = new Tone.Synth();

    bitCrusher = new Tone.BitCrusher({
      bits: 8,
    });
    reverb = new Tone.Reverb({
      decay: 5,
    });
    limiter = new Tone.Limiter();
    limiter.threshold.value = -50; // Adjust the threshold level as needed
    compressor = new Tone.Compressor(-20, 3);

    reverb1 = new Tone.Reverb({
      decay: 0.5,
    });

    distortion1 = new Tone.Distortion(0.3);

    fmSynth.chain(reverb1, distortion1, Tone.Destination);
    randomPulseSynth.chain(
      reverb,
      bitCrusher,
      compressor,
      limiter,
      Tone.Destination,
    );
    granularSynth.chain(Tone.Destination);
    sineSynth.chain(Tone.Destination);
  }

  function startSynth(p5: P5CanvasInstance, x: number, y: number) {
    if (fmSynth === undefined) {
      // make sure synths defined first
      return;
    }
    synthStart(p5, fmSynth, randomPulseSynth, granularSynth, sineSynth, x, y);
  }
  function moveSynth(p5: P5CanvasInstance, x: number, y: number) {
    if (fmSynth === undefined) {
      return;
    }
    synthMove(p5, fmSynth, randomPulseSynth, granularSynth, sineSynth, x, y);
  }
  function endSynth(p5: P5CanvasInstance) {
    if (fmSynth === undefined) {
      return;
    }
    synthEnd(p5, fmSynth, randomPulseSynth, granularSynth, sineSynth);
  }

  function stopAudio() {
    if (fmSynth !== undefined) fmSynth.volume.value = -100;
    if (randomPulseSynth !== undefined) randomPulseSynth.volume.value = -100;
    if (granularSynth !== undefined) granularSynth.volume.value = -100;
    if (sineSynth !== undefined) sineSynth.volume.value = -100;
    Tone.Transport.stop();
  }

  return { initAudio, startSynth, moveSynth, endSynth, stopAudio };
}
