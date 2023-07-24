"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {toast} from 'react-toastify'

export default function Navbar() {
  const { data: session, status } = useSession();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

  const handleSignOut = () => {
    signOut({
      redirect: false
    })
    toast.success('successfully logged out', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setNavbarVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };


    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className={`navbar bg-base-100 fixed z-50 transition-opacity duration-400 bg-opacity-70 ${
        navbarVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/synth">
          binSynth
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href='/posts' className="hover:text-gray-200">COMMUNITY CREATIONS</Link>
          </li>

          {session?.user? (
            <li>
              <details>
                <summary className="hover:text-gray-200">{session.user.name}</summary>
                <ul className="p-2 bg-base-100">
                  <li>
                    <a href="">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={session.user.image}
                        alt="Profile Photo"
                      />
                      Profile
                    </a>
                  </li>
                  <li>
                    <Link onClick={handleSignOut} href='' className='p-2 flex flex-col align-center'>Logout</Link>
                  </li>
                </ul>
              </details>
            </li>
          ) : (
            <Link href="/users/login" className="p-2 bg-base-100 hover:bg-pink-200 hover:rounded-s-md hover:text-slate-300 hover:bg-opacity-50">Login</Link>
          )}
        </ul>
      </div>
    </nav>
  );
}

//use to manage async



//change a to LINK?