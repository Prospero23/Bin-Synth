"use client";

import { useState } from "react";

//use react hook form for validation
//add warning on refresh to lose changes?

function NewForm({ post }) {
  const [formData, setFormData] = useState({
    
    title: post.title,
    description: post.description,
    dateMade: post.dateMade,
  });

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

  //FIX
  const handleSubmit = async (e) => {
    e.preventDefault();

    //pull out the two elements needed
    const { title, description } = formData;
    const dateMade = '2023-10-19';

    //send data to API route
    const res = await fetch(`http://localhost:3000/api/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, dateMade }),
    });

    const result = await res.json();
    console.log(result);

    //sends back to the show page of a post with hard reload
    window.location.href = `/posts`;
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-2">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-300 font-semibold mb-2">Title</label>
        <input type="text"id='title' value={formData.title} onChange={handleChange} name="title" className="w-full px-4 py-2 border rounded focus:outline-none focus:border-sky-500"/>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-300 font-semibold mb-2">Description</label>
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
      <div className="mb-4">
        {/* date made here maybe? */}
      </div>
      <div className="w-full flex flex-col">
      <button className="m-auto hover:bg-sky-500 rounded-md p-1 hover:text-black">Submit</button>
      </div>
    </form>
  );
}

export default NewForm;
