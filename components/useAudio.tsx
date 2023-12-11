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
  const fmSynth = useRef<Tone.FMSynth | null>(null);
  const randomPulseSynth = useRef<Tone.Synth | null>(null);
  const granularSynth = useRef<Tone.GrainPlayer | null>(null);
  const sineSynth = useRef<Tone.Synth | null>(null);
  const bitCrusher = useRef<Tone.BitCrusher | null>(null);
  const reverb = useRef<Tone.Reverb | null>(null);
  const limiter = useRef<Tone.Limiter | null>(null);
  const compressor = useRef<Tone.Compressor | null>(null);
  const reverb1 = useRef<Tone.Reverb | null>(null);
  const distortion1 = useRef<Tone.Distortion | null>(null);

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
    fmSynth.current = new Tone.FMSynth();
    fmSynth.current.oscillator.type = "sawtooth";

    randomPulseSynth.current = new Tone.Synth();
    randomPulseSynth.current.oscillator.type = "sine";

    granularSynth.current = new Tone.GrainPlayer(granularOptions);
    sineSynth.current = new Tone.Synth();

    bitCrusher.current = new Tone.BitCrusher({
      bits: 8,
    });
    reverb.current = new Tone.Reverb({
      decay: 5,
    });
    limiter.current = new Tone.Limiter();
    limiter.current.threshold.value = -50; // Adjust the threshold level as needed
    compressor.current = new Tone.Compressor(-20, 3);

    reverb1.current = new Tone.Reverb({
      decay: 0.5,
    });

    distortion1.current = new Tone.Distortion(0.3);

    fmSynth.current.chain(
      reverb1.current,
      distortion1.current,
      Tone.Destination,
    );
    randomPulseSynth.current.chain(
      reverb.current,
      bitCrusher.current,
      compressor.current,
      limiter.current,
      Tone.Destination,
    );
    granularSynth.current.chain(Tone.Destination);
    sineSynth.current.chain(Tone.Destination);
  }

  function startSynth(p5: P5CanvasInstance, x: number, y: number) {
    if (fmSynth.current === null) {
      // make sure synths defined first
      return;
    }
    synthStart(
      p5,
      fmSynth.current,
      randomPulseSynth.current,
      granularSynth.current,
      sineSynth.current,
      x,
      y,
    );
  }
  function moveSynth(p5: P5CanvasInstance, x: number, y: number) {
    if (fmSynth.current === null) {
      return;
    }

    synthMove(
      p5,
      fmSynth.current,
      randomPulseSynth.current,
      granularSynth.current,
      sineSynth.current,
      x,
      y,
    );
  }
  function endSynth(p5: P5CanvasInstance) {
    if (fmSynth.current === null) {
      return;
    }
    synthEnd(
      p5,
      fmSynth.current,
      randomPulseSynth.current,
      granularSynth.current,
      sineSynth.current,
    );
  }

  function stopAudio() {
    if (fmSynth.current !== null) fmSynth.current.volume.value = -100;
    if (randomPulseSynth.current !== null)
      randomPulseSynth.current.volume.value = -100;
    if (granularSynth.current !== null)
      granularSynth.current.volume.value = -100;
    if (sineSynth.current !== null) sineSynth.current.volume.value = -100;
    Tone.Transport.stop();
  }

  return { initAudio, startSynth, moveSynth, endSynth, stopAudio };
}
