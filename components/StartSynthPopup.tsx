"use client";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

export default function StartSynthPopup({
  setIsStarted,
  initAudio,
}: {
  setIsStarted: Dispatch<SetStateAction<boolean>>;
  initAudio: () => Promise<any>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(true);
  }, []);

  // HANDLE SUBMIT HERE
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handleDelete();
    setIsStarted(true); // start synth
    setIsOpen(false); // close modal
  };

  const handleClick = async () => {};

  return (
    <dialog id="deletePost" className="modal" autoFocus open={isOpen}>
      <form
        method="dialog"
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-8 modal-box shadow-sm shadow-gray-100 text-gray-100 bg-gray-900"
      >
        <h1 className="w-full text-center text-2xl mb-1">Are You Ready?</h1>
        <p className="text-center">
          Use mouse/touch movements to control the synth. Keep device
          orientation the same throughout your performance for best experience
          :)
        </p>
        <div className=" justify-evenly flex my-2">
          <button className="hover:text-green-500" onClick={handleClick}>
            START
          </button>
        </div>
      </form>
    </dialog>
  );
}

// make button inactive after click
