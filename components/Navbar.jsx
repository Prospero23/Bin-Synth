"use client";



import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setNavbarVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleSignOut = () => {
    console.log("bang");
    signOut({
      redirect: false,
    });
    toast.success("successfully logged out", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <div
        className={`bg-base-100 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3 fixed w-full z-10 transition-opacity duration-400 bg-opacity-70 ${
          navbarVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 sm:p-0">
          <div>
            <Link href="/synth" className="btn btn-ghost normal-case text-xl">
              BinSynth
            </Link>
          </div>
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        <nav
          className={`${
            isOpen ? "block" : "hidden px-2 pt-2 pb-4 sm:flex sm:p-0"
          }`}
        >
          <Link
            href="/posts"
            className="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800"
          >
            Community Creations
          </Link>
          {session?.user ? (
            <>
              <Link
                href={`/users/${session.user.id}`}
                className="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-2"
              >
                Profile
                <img
                  className="w-8 h-8 rounded-full inline ml-2"
                  src={session.user.image}
                  alt="Profile Photo"
                />
              </Link>
              <Link
                href="#"
                className="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-2" //little offset
                onClick={handleSignOut}
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              href="/users/login"
              className="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-2"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}
