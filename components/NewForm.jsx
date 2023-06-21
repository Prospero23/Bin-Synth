"use client";

import { useState } from "react";

//use react hook form for validation
//add warning on refresh to lose changes?

function NewForm({ post }) {
  const [formData, setFormData] = useState({
    author: post.author,
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
    const { title, description, author } = formData;
    const dateMade = '2023-10-19';

    //send data to API route
    const res = await fetch(`http://localhost:3000/api/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, author, dateMade }),
    });

    const result = await res.json();
    console.log(result);

    //sends back to the show page of a post with hard reload
    window.location.href = `/posts`;
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="author">Author</label>
        <input type="text" id='author' onChange={handleChange} value={formData.author} name="author"/>
      </div>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text"id='title' value={formData.title} onChange={handleChange} name="title"/>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        {/* date made here maybe? */}
      </div>
      <button>Submit</button>
    </form>
  );
}

export default NewForm;
