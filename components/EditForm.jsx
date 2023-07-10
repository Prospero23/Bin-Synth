"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

//pass in the props -> so i can send the request from the page element itself?

//use react hook form for validation
//add warning on refresh to lose changes?

function EditForm({ post }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: post.title,
    description: post.description,
  });

  function handleChange(evt) {
    const fieldName = evt.target.name;
    const value = evt.target.value;

    setFormData((currData) => {
      currData[fieldName] = value;
      return { ...currData };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //pull out the two elements needed
    const { title, description } = formData;
    const id = post._id;
    const authorId = post.author._id;

    console.log(post)

    //send data to API route
    const res = await fetch(`http://localhost:3000/api/posts/${post._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, id, authorId}),
    });

    const result = await res.json();

    localStorage.setItem('result', JSON.stringify(result));

    //sends back to the show page of a post with hard reload
    window.location.href = `${id}`;
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-2">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-300 font-semibold mb-2"
          >
            Update title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-sky-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-300 font-semibold mb-2"
          >
            Update description
          </label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-sky-500"
          ></textarea>
        </div>
        <div className="w-full flex flex-col">
        <button className="m-auto hover:bg-sky-500 rounded-md p-1 hover:text-black">Submit</button>
        </div>
      </form>
      <Link href={`/posts/${post._id}`} className="hover:underline hover:text-sky-500">Back</Link>
    </div>
  );
}

export default EditForm;

//edit description, title for now

//i like the idea of having each of the photos just being a random photo of some thing
//ISSUE THAT NEEDS TO BE FIXED
//https://github.com/vercel/next.js/issues/47447

//change description and title

//use effect to reload a page?
