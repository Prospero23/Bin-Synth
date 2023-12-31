"use client";

import { useRouter } from "next/navigation";
import { type FieldValues, useForm } from "react-hook-form";
import { type ToastContainerProps, toast } from "react-toastify";

export default function NewComment({ id }: { id: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const toastConfig: ToastContainerProps = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  async function onSubmit(data: FieldValues) {
    // Send data to API route

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) {
        toast.error("Failed to Submit Comment", toastConfig);
      }

      const result = await res.json();
      // Handle the response data
      toast.success(result.message, toastConfig);
      router.refresh();
    } catch (error) {
      // Handle any other errors that occurred during the request
      console.error(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border mt-2 mx-16">
      <div className="mb-1">
        <label
          htmlFor="body"
          className="block text-gray-100 font-semibold mb-2 text-center sm:text-right sm:mr-8"
        >
          New Comment
        </label>
        <textarea
          {...register("body", {
            required: { value: true, message: "Actually say something!" },
            validate: (value) => value.trim() !== "" || "not just spaces :(",
          })}
          id="body"
          cols={30}
          rows={3}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-sky-500 bg-black"
        ></textarea>
        {/* @ts-expect-error this works fine */}
        <p>{errors.body?.message}</p>
      </div>
      <div className="w-full flex flex-col mb-1">
        <button className="m-auto hover:bg-sky-500 rounded-md p-1 hover:text-black">
          Submit
        </button>
      </div>
    </form>
  );
}
