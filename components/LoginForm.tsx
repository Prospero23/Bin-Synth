"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loginWithGoogle = () => {
    setIsLoading(true);
    // console.log('bang')

    try {
      signIn("google", { callbackUrl: "/users/login/loggedIn" });
    } catch (error) {
      // send TOAST notification to user
      toast.error("Error signing in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={loginWithGoogle}
      className="bg-gray-100 text-black btn hover:bg-sky-500 w-96 my-2 mt-4 flex"
    >
      <div className="flex items-center">
        {isLoading ? (
          <span className="loading loading-spinner loading-sm mr-24"></span>
        ) : (
          <FaGoogle className="mr-24" />
        )}
        <span className="">Continue with Google</span>
      </div>
    </button>
  );
}

// fix width to be better
