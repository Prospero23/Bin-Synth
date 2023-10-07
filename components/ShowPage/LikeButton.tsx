"use client";

import { useState } from "react";

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="-mt-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isLiked ? "red" : "none"}
        viewBox="0 0 24 24"
        className={`w-10 h-10 md:w-16 md:h-16 stroke-current cursor-pointer ${
          isLiked ? "text-red-500" : ""
        }`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        onClick={handleHeartClick}
      >
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>
      <p className="text-center">0</p>
    </div>
  );
};

export default LikeButton;
//maybe add hover state?

//move likes from user to post? and then just check if user id is in likes array 