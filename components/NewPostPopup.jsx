"use client";

import { useState, useEffect } from "react";

export default function NewPostPopup({ post, isModalOpen }) {
  const [formData, setFormData] = useState({
    title: post.title,
    description: post.description,
    dateMade: post.dateMade,
    image: post.image,
  });

  // Update form data whenever the post prop changes
  useEffect(() => {
    setFormData({
      title: post.title,
      description: post.description,
      dateMade: post.dateMade,
      image: post.image,
    });
  }, [post]);

  function handleChange(evt) {
    const fieldName = evt.target.name;
    const value = evt.target.value;

    setFormData((currData) => {
      return {
        ...currData,
        [fieldName]: value,
      };
    });
  }

  //FIX HAVE
  const handleSubmit = async (e) => {
    e.preventDefault();

    //submit as multi-type form
    const multiData = new FormData();
    multiData.append("title", formData.title);
    multiData.append("description", formData.description);
    multiData.append("dateMade", formData.dateMade);
    multiData.append("image", formData.image);

    const userActions = null; //FIIXIXIXIXIXIX

    //send data to API route
    const res = await fetch(`http://localhost:3000/api/posts/`, {
      method: "POST",
      body: multiData,
    });

    const result = await res.json();
    console.log(result);

    // //sends back to the show page of a post with hard reload FIX
    //window.location.href = `/posts`;
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
        onSubmit={handleSubmit}
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
            value={formData.title}
            onChange={handleChange}
            name="title"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-sky-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-300 font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-sky-500"
          ></textarea>
        </div>
        <div className="mb-4">{/* date made here maybe? */}</div>
        <div className="w-full flex flex-col">
          <button className="m-auto hover:bg-sky-500 rounded-md p-1 hover:text-black">
            Submit
          </button>
        </div>
      </form>
    </dialog>
  );
}
