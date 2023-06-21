"use client";



import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// updatePost = async (post) => {
//     await dbConnect()
//     const postId = post._id;
//     const foundPost = await Post.findByIdAndUpdate(postId, {
//       ...req.body.campground,
//     });
    
//     await campground.save();
//   };

//pass in the props -> so i can send the request from the page element itself? 




//use react hook form for validation
//add warning on refresh to lose changes?


function EditForm({ post }) {
    const router = useRouter()
  const [formData, setFormData] = useState({
    title: post.title,
    description: post.description,
  });
 
  function handleChange(evt) {
    const fieldName = evt.target.name;
    const value = evt.target.value;

    setFormData(currData => {
        currData[fieldName] = value;
        return {...currData};
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    //pull out the two elements needed
    const {title, description} = formData;
    const id = post._id;

    //send data to API route
    const res = await fetch(`http://localhost:3000/api/posts/${post._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, description, id})
    })

    const result = await res.json();
    console.log(result)

    //sends back to the show page of a post with hard reload
    window.location.href = `${id}`
    
  }
  return (
  <div>
    <form onSubmit={handleSubmit}>
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
      <button>Submit</button>
    </form>
    <Link href={`/posts/${post._id}`}>Back</Link>
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