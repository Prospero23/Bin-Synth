"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewComment({ id }) {
  const router = useRouter();

  const [commentData, setCommentData] = useState({
    body: "",
  });

  function handleChange(evt) {
    const fieldName = evt.target.name;
    const value = evt.target.value;

    setCommentData((currData) => {
      return {
        ...currData,
        [fieldName]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Pull out the two fields
    const { body } = commentData;
    // Send data to API route
    try {
      const res = await fetch(
        `http://localhost:3000/api/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit comment.");
      }

      const result = await res.json();
      // Handle the response data
      console.log(result);
      commentData.body = "";
      router.refresh();
    } catch (error) {
      // Handle any other errors that occurred during the request
      console.error(error);
    }
  }
  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="border mt-2"
    >
        <div className="mb-1">
          <label htmlFor="body" className="block text-gray-300 font-semibold mb-2">New Comment</label>
          <textarea name="body" id="body" cols="30" rows="3" value={commentData.body} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-sky-500"></textarea>
        </div>
        <div className="w-full flex flex-col mb-1">
      <button className="m-auto hover:bg-sky-500 rounded-md p-1 hover:text-black">Submit</button>
      </div>
    </form>



  );
}

