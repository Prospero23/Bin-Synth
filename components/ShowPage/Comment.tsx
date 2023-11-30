"use client";

import { useState } from "react";
import {
  type ExtendedSession,
  type APIResponse,
  type CommentDocument,
  type UserDocument,
} from "@/types";

export default function Comment({
  comment,
  postId,
  session,
}: {
  comment: CommentDocument;
  postId: string;
  session: ExtendedSession;
}) {
  const [clicked, setClicked] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const { body } = comment;

  const author = comment.author as UserDocument;

  const isAuthor =
    session?.user != null ? author._id === session.user.id : false;

  const handleDelete = async () => {
    if (!isAuthor) return; // Prevent any action if not the author

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}/comments/${comment._id}`,
        {
          method: "POST",
        },
      );

      const data: APIResponse = await res.json();

      if ("error" in data && data.error != null) {
        throw new Error(data.error);
      } else if ("message" in data && data.message != null) {
        setDeleted(true);
      } else {
        throw new Error("Unknown response structure.");
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        throw e;
      } else {
        throw new Error("Non-error thrown...");
      }
    }
  };

  const handleClick = () => {
    if (!isAuthor) return; // Prevent any action if not the author

    if (deleted) {
      setIsHidden(true); // Hide the component if it's already deleted
    } else {
      setClicked(!clicked);
    }
  };

  const handleAnimationEnd = () => {
    setIsHidden(true); // Hide the component once the fade-out animation is completed
  };

  return (
    <div
      className={`max-w-lg border p-2 relative ${
        deleted ? "animate-fadeOut" : clicked ? "pr-10" : ""
      } ${isAuthor ? "hover:cursor-pointer" : ""}`}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
      style={{ display: isHidden ? "none" : "block" }}
    >
      {deleted ? (
        <p className="text-red-500">Comment deleted.</p>
      ) : (
        <>
          <p>{body}</p>
          <h1>- {"name" in author ? author.name : "Unknown Author"}</h1>

          {isAuthor && clicked && (
            <button
              className="absolute bottom-2 right-2 p-2 rounded-full transition-opacity duration-300 opacity-30 hover:opacity-100"
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
// const Comment: React.FC<CommentProps>
