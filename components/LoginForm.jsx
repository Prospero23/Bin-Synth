"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      //send TOAST notification to user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 text-black btn hover:bg-sky-500 w-96 my-2 mt-4">
      <button onClick={loginWithGoogle} className="w-full">
        <div className="flex items-center">
          <FaGoogle className='mr-24' />
          <span className="">Continue with Google</span>
        </div>
      </button>
    </div>
  );
}

//make element that allows an isLoading state