"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewComment({ id }) {
  const router = useRouter();

  const [commentData, setCommentData] = useState({
    author: "",
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
    const { author, body } = commentData;
    // Send data to API route
    try {
      const res = await fetch(
        `http://localhost:3000/api/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ author, body }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit comment.");
      }

      const result = await res.json();
      // Handle the response data
      console.log(result);
      commentData.author = '';
      commentData.body = '';
      router.refresh();
    } catch (error) {
      // Handle any other errors that occurred during the request
      console.error(error);
    }
  }
  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="author">Name</label>
      <input
        type="text"
        name="author"
        id="author"
        value={commentData.author}
        onChange={handleChange}
      />
      <label htmlFor="body">Comment</label>
      <input
        type="text"
        name="body"
        id="body"
        value={commentData.body}
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  );
}
