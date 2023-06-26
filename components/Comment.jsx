"use client";

import { useState } from "react";

export default function Comment({ comment, postId }) {
  const [hovered, setHovered] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
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
      className={`border p-2 relative ${
        deleted ? "animate-fadeOut" : hovered ? "pr-10" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onAnimationEnd={handleAnimationEnd}
      style={{ display: isHidden ? "none" : "block" }}
    >
      {deleted ? (
        <p className="text-red-500">Comment deleted.</p>
      ) : (
        <>
          <h1>Commentor: {comment.author}</h1>
          <p>{comment.body}</p>
          {hovered && (
            <button
              className="absolute bottom-2 right-2 p-2 bg-red-500 text-white rounded-full transition-opacity duration-300 opacity-0 hover:opacity-100"
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
