"use client";

import { useState } from "react";

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="inline-block">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isLiked ? "red" : "none"}
        viewBox="0 0 24 24"
        className={`w-16 h-16 stroke-current cursor-pointer ${
          isLiked ? "text-red-500" : ""
        }`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        onClick={handleHeartClick}
      >
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>
    </div>
  );
};

export default LikeButton;
