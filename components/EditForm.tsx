"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { type APIResponse, type PostDocument } from "@/lib/types";

// pass in the props -> so i can send the request from the page element itself?

// use react hook form for validation
// add warning on refresh to lose changes?
interface EditData {
  title: string;
  description: string;
}

function EditForm({ post }: { post: PostDocument }) {
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

  const updatePost = async (
    data: EditData,
    postId: string,
    authorId: string,
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, id: postId, authorId }),
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

      window.location.href = `${postId}`;
    } catch (error) {
      console.log("error", error);
    }
  };

  const onSubmit = async (data: EditData) => {
    await updatePost(data, post._id, post.author._id);
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
              validate: (value) =>
                !(value.trim().length === 0) || "not just spaces :(",
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
              validate: (value) =>
                !(value.trim().length === 0) || "not just spaces :(",
              maxLength: { value: 400, message: "Too Many Characters" }, // match with schema
            })}
            id="description"
            cols={30}
            rows={10}
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

// https://github.com/vercel/next.js/issues/47447

// {...register("description", {
//   required: { value: true, message: "Actually say something!" },
//   validate: value => !!value.trim() || 'not just spaces :('
// })}
