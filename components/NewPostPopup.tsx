"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";


export default function NewPostPopup({ post, isModalOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post.title,
      description: post.description,
      dateMade: post.dateMade,
      image: post.image,
      formData: post.mouseActions,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const [givenData, setGivenData] = useState({
    title: post.title,
    description: post.description,
    dateMade: post.dateMade,
    image: post.image,
    formData: post.mouseActions,
  });

  // Update form data whenever the post prop changes
  useEffect(() => {
    setGivenData({
      dateMade: post.dateMade,
      image: post.image,
      mouseActions: post.mouseActions,
    });
  }, [post]);

  //FIX HAVE
  const onSubmit = async (formData) => {
    setIsLoading(true); //change graphic to show load

    //submit as multi-type form
    const multiData = new FormData();
    multiData.append("title", formData.title); //title + desc from form, else from state
    multiData.append("description", formData.description);
    multiData.append("dateMade", givenData.dateMade);
    multiData.append("image", givenData.image);
    multiData.append("mouseActions", JSON.stringify(givenData.mouseActions));

    //send data to API route
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/`, {
      method: "POST",
      body: multiData,
    });

    const result = await res.json();
    localStorage.setItem("result", JSON.stringify(result)); //result to local storage

    // //sends back to the show page of a post with hard reload FIX
    window.location.href = `/posts`;
  };
  return (
    <dialog
      id="newPost"
      className="modal"
      autoFocus
      open={isModalOpen ? "open" : false}
    >
      <form
        method="dialog"
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-2 modal-box"
      >
        <h1 className="w-full text-center">FINISH POST</h1>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-300 font-semibold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", {
              required: { value: true, message: "Actually say something!" },
              validate: (value) => !!value.trim() || "not just spaces :(",
            })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-sky-500"
          />
          <p>{errors.title?.message}</p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-300 font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            {...register("description", {
              required: { value: true, message: "Actually say something!" },
              validate: (value) => !!value.trim() || "not just spaces :(",
            })}
            id="description"
            cols="30"
            rows="5"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-sky-500"
          ></textarea>
          <p>{errors.description?.message}</p>
        </div>
        <div className="mb-4">{/* date made here maybe? */}</div>
        <div className="w-full flex flex-col">
          <button
            className="m-auto hover:bg-sky-500 rounded-md p-1 hover:text-black disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm items-center"></span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </dialog>
  );
}

//make button inactive after click
