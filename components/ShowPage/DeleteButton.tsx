"use client";

import { useState } from "react";
import DeletePostPop from "@/components/ShowPage/DeletePostPop";
import { type APIResponse } from "@/types";

export default function DeleteButton({
  id,
  authorId,
}: {
  id: string;
  authorId: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false); // controls for popup

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deletionFunction = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
      {
        // api call to delete
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, authorId }),
      },
    );
    const result: APIResponse = await response.json();

    if ("error" in result) {
      // Handle error scenario using result.error
      localStorage.setItem("error", JSON.stringify(result));
    } else {
      // Handle success scenario using result.message
      localStorage.setItem("result", JSON.stringify(result));
    }

    // sends back to the index page with hard reload
    window.location.href = "/posts";
  };

  async function handleClick() {
    openModal();
  }

  return (
    <>
      <button
        onClick={handleClick}
        className=" hover:text-red-500 hover:underline"
      >
        Delete
      </button>
      <DeletePostPop
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleDelete={deletionFunction}
      />
    </>
  );
}

// popup that confirms delete action
