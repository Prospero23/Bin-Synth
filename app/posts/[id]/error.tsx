"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="w-screen h-screen flex items-center justify-center flex-col">
      <div className="flex flex-col itmes-center justify-center bg-slate-700 p-16 rounded-md">
        <h1 className="text-xl p-6 sm:text-2xl md:text-4xl">
          Something went wrong fetching post!
        </h1>
        <button
          className="w-full bg-green-400"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => {
              reset();
            }
          }
        >
          Try again
        </button>
      </div>
    </main>
  );
}
// make this cute
