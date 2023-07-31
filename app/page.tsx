import Link from "next/link";

export default function Home() {
  return (
    <div className="overflow-hidden bg-cover bg-no-repeat text-center bg-home-page h-screen w-screen bg-center">
      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed bg-black bg-opacity-50">
        <div className="flex h-full items-center justify-center">
          <div className="text-gray-200">
            <h1 className="mb-4 text-6xl md:text-8xl xl:text-9xl font-semibold">binSynth</h1>
            <h2 className="mb-6 md:text-2xl xl:text-4xl font-semibold">
              10 Seconds, 1 Synth, 1 Attempt
            </h2>
            <Link
              className="btn bg-opacity-50 text-gray-300 hover:bg-sky-500 hover:text-gray-100"
              data-te-ripple-init
              data-te-ripple-color="light"
              href="/posts"
            >
              Enter Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

//bg-home-page
