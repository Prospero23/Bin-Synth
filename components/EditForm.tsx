"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";

// pass in the props -> so i can send the request from the page element itself?

// use react hook form for validation
// add warning on refresh to lose changes?

function EditForm({ post }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post.title,
      description: post.description,
    },
  });

  const onSubmit = async (data) => {
    // pull out the two elements needed
    const { title, description } = data;
    const id = post._id;
    const authorId = post.author._id;

    // send data to API route
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, id, authorId }),
        },
      );

      const result = await res.json();

      localStorage.setItem("result", JSON.stringify(result));

      // sends back to the show page of a post with hard reload
      window.location.href = `${id}`;
    } catch (e) {
      console.log("error", e);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-2">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-300 font-semibold mb-2"
          >
            Update title
          </label>
          <input
            type="text"
            {...register("title", {
              required: { value: true, message: "Actually say something!" },
              validate: (value) => !!value.trim() || "not just spaces :(",
              maxLength: { value: 40, message: "Too Many Characters" }, // match with schema
            })}
            id="title"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-sky-500"
          />
          <p>{errors.title?.message}</p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-300 font-semibold mb-2"
          >
            Update description
          </label>
          <textarea
            {...register("description", {
              required: { value: true, message: "Actually say something!" },
              validate: (value) => !!value.trim() || "not just spaces :(",
              maxLength: { value: 400, message: "Too Many Characters" }, // match with schema
            })}
            id="description"
            cols="30"
            rows="10"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-sky-500"
          ></textarea>
          <p>{errors.description?.message}</p>
        </div>
        <div className="w-full flex flex-col">
          <button className="m-auto hover:bg-sky-500 rounded-md p-1 hover:text-black">
            Submit
          </button>
        </div>
      </form>
      <Link
        href={`/posts/${post._id}`}
        className="hover:underline hover:text-sky-500"
      >
        Back
      </Link>
    </div>
  );
}

export default EditForm;

// edit description, title for now

// i like the idea of having each of the photos just being a random photo of some thing
// ISSUE THAT NEEDS TO BE FIXED
// https://github.com/vercel/next.js/issues/47447

// {...register("description", {
//   required: { value: true, message: "Actually say something!" },
//   validate: value => !!value.trim() || 'not just spaces :('
// })}
