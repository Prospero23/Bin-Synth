import Link from "next/link";

export default function LoggedIn() {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-4xl lg:text-6xl mb-6 text-gray-100">
        You Are Successfully Logged In!
      </h1>
      <Link
        href="/posts"
        className="btn text-gray-100 bg-black hover:bg-sky-500 hover:bg-opacity-70"
      >
        go back to all posts
      </Link>
    </main>
  );
}
