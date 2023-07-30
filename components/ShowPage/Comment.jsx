'use client'

import { useState } from "react";

export default function Comment({ comment, postId }) {
  const [clicked, setClicked] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const handleClick = () => {
    if (deleted) {
      setIsHidden(true); // Hide the component if it's already deleted
    } else {
      setClicked(!clicked);
    }
  };

  const handleDelete = async () => {
    setDeleted(true);
    const res = await fetch(
      `http://localhost:3000/api/posts/${postId}/comments/${comment._id}`,
      {
        method: "POST",
      }
    );
    // You can perform any additional deletion logic here
    // e.g., make an API call to delete the comment from the server
    setIsHidden(true); // Hide the component after the deletion animation
  };

  const handleAnimationEnd = () => {
    if (deleted) {
      setIsHidden(true); // Hide the component once the fade-out animation is completed
    }
  };

  return (
    <div
      className={`max-w-lg border p-2 relative hover:cursor-pointer ${
        deleted ? "animate-fadeOut" : clicked ? "pr-10" : ""
      }`}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
      style={{ display: isHidden ? "none" : "block" }}
    >
      {deleted ? (
        <p className="text-red-500">Comment deleted.</p>
      ) : (
        <>
          <p>{comment.body}</p>
          <h1>- {comment.author.name}</h1>

          {clicked && (
            <button
              className="absolute bottom-2 right-2 p-2 text-white rounded-full transition-opacity duration-300 opacity-30 hover:opacity-100"
              onClick={handleDelete}
            >
              X
            </button>
          )}
        </>
      )}
    </div>
  );
}


// 