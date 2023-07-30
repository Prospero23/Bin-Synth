"use client";
import Link from "next/link";

export default function NavSmall({ image, handleSignOut }) {
  return (
    <ul className="menu menu-horizontal px-1 sm:hidden">
      <li>
        <details>
          <summary className="hover:text-gray-200 mr-72">
            {" "}
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </summary>
          <ul className="p-2 bg-base-100 mr-10">

          <li>
              <Link href="/posts" className="hover:text-gray-200 text-xs">
                COMMUNITY CREATIONS
              </Link>
            </li>
            <li>
              <a href="">
                <img
                        className="w-8 h-8 rounded-full"
                        src={image}
                        alt="Profile Photo"
                      />
                Profile
              </a>
            </li>
            <li>
              <Link
                onClick={handleSignOut}
                href=""
                className="p-2 flex flex-col align-center"
              >
                Logout
              </Link>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
}
