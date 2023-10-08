"use client";

import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Toast() {
  useEffect(() => {
    // Get the value from local storage if it exists
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const result = localStorage.getItem("result") ?? "";

    if (result.length > 0) {
      try {
        const resultObj = JSON.parse(result);

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (resultObj?.message) {
          toast(resultObj.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          localStorage.removeItem("result");
        }
      } catch (err) {
        console.error("Error parsing the result from localStorage:", err);
      }
    }
  }, []);
  return <></>;
}

// add error vs success
