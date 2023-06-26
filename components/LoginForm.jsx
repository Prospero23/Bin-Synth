"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

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
    <div className="bg-gray-100 text-black btn hover:bg-sky-500">
      <button onClick={loginWithGoogle}>Google</button>
    </div>
  );
}



//make element that allows an isLoading state