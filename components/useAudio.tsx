"use client";

import * as Tone from "tone";
import {
  granularOptions,
  synthStart,
  synthMove,
  synthEnd,
} from "@/lib/synth/soundHelper";
import { type P5CanvasInstance } from "@p5-wrapper/react";

export default function useAudio() {
  // SOUND///
  const fmSynth = new Tone.FMSynth();
  fmSynth.oscillator.type = "sawtooth";

  const randomPulseSynth = new Tone.Synth();
  randomPulseSynth.oscillator.type = "sine";

  const granularSynth = new Tone.GrainPlayer(granularOptions);
  const sineSynth = new Tone.Synth();

  const bitCrusher = new Tone.BitCrusher({
    bits: 8,
  });
  const reverb = new Tone.Reverb({
    decay: 5,
  });
  const limiter = new Tone.Limiter();
  limiter.threshold.value = -50; // Adjust the threshold level as needed
  const compressor = new Tone.Compressor(-20, 3);

  const reverb1 = new Tone.Reverb({
    decay: 0.5,
  });

  const distortion1 = new Tone.Distortion(0.3);

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

  function initAudio() {
    void Tone.start();
  }
  function startSynth(p5: P5CanvasInstance, x: number, y: number) {
    synthStart(p5, fmSynth, randomPulseSynth, granularSynth, sineSynth, x, y);
  }
  function moveSynth(p5: P5CanvasInstance, x: number, y: number) {
    synthMove(p5, fmSynth, randomPulseSynth, granularSynth, sineSynth, x, y);
  }
  function endSynth(p5: P5CanvasInstance) {
    synthEnd(p5, fmSynth, randomPulseSynth, granularSynth, sineSynth);
  }

  return { initAudio, startSynth, moveSynth, endSynth };
}
