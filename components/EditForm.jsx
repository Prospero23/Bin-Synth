"use client";


//use react hook form for validation
//add warning on refresh to lose changes?

import { useState } from "react";
import { useRouter } from "next/navigation";

function EditForm({ post }) {
    const router = useRouter()
  const [formData, setFormData] = useState({
    title: post.title,
    description: post.description,
  });
 
  function handleChange(evt) {
    const fieldName = evt.target.name;
    const value = evt.target.valie;

    setFormData(currData => {
        currData[fieldName] = value;
        return {...currData};
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('SUBMITTED')
    //sends back to the show page of a post
    router.replace(`${post._id}`)
  }
  return (
    <form>
      <div>
        <label htmlFor="title">Update title</label>
        <textarea
          name="title"
          id="title"
          cols="30"
          rows="10"
          value={formData.title}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label htmlFor="description">Update description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}

export default EditForm;

//edit description, title for now

//i like the idea of having each of the photos just being a random photo of some thing
//ISSUE THAT NEEDS TO BE FIXED
//https://github.com/vercel/next.js/issues/47447

//change description and title
