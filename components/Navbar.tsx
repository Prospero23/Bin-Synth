"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { type ExtendedSession } from "@/types";
import Image from "next/image";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [navbarVisible, setNavbarVisible] = useState<boolean>(true);

  const { data: session, status } = useSession();

  const extendedSession = session as ExtendedSession;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setNavbarVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const handleSignOut = () => {
    try {
      void signOut({
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
    } catch (error) {
      toast.error(`error signing out`);
    }
  };

  return (
    <>
      <div
        className={`bg-grey-100 bg-black sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-6 fixed w-full z-10 transition-opacity duration-400 bg-opacity-70 ${
          navbarVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 sm:p-0">
          <div>
            <Link
              href="/synth"
              className=" text-white normal-case text-xl hover:bg-sky-500 hover:bg-opacity-80 p-4 rounded-md"
            >
              BinSynth
            </Link>
          </div>
          <div className="sm:hidden">
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
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
            isOpen ? "block sm:flex" : "hidden px-2 pt-2 pb-4 sm:flex sm:p-0"
          }`}
        >
          <Link
            href="/posts"
            className="block px-2 py-1 font-semibold rounded hover:bg-sky-500 hover:bg-opacity-80"
          >
            Community Creations
          </Link>
          {status === "authenticated" &&
          extendedSession.user !== undefined &&
          extendedSession.user !== null ? (
            <>
              <Link
                href={`/users/${extendedSession.user.id}`}
                className=" block px-2 py-1 font-semibold rounded hover:bg-sky-500 hover:bg-opacity-80 sm:mt-0 sm:ml-2"
              >
                Profile
                {extendedSession.user.image != null ? (
                  <Image
                    className="w-6 h-6 rounded-full inline ml-2"
                    src={extendedSession.user.image}
                    width={50}
                    height={50}
                    alt="Profile Photo"
                  />
                ) : null}
              </Link>
              <Link
                href="#"
                className=" block px-2 py-1 font-semibold rounded hover:bg-sky-500 hover:bg-opacity-80 sm:mt-0 sm:ml-2" // little offset
                onClick={handleSignOut}
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              href="/users/login"
              className=" block px-2 py-1 font-semibold rounded hover:bg-sky-500 sm:mt-0 sm:ml-2"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}
