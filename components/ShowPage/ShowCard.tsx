"use client";

import dynamic from "next/dynamic";
import DeleteButton from "@/components/ShowPage/DeleteButton";
import Link from "next/link";
import {
  type UserDocument,
  type ExtendedSession,
  type PostDocument,
} from "@/types";
const ShowSynth = dynamic(
  async () => await import("@/components/ShowPage/ShowSynth"),
  {
    ssr: false, // This will only render the component on the client-side
  },
);

export default function ShowCard({
  post,
  session,
}: {
  post: PostDocument;
  session: ExtendedSession;
}) {
  const isAuthor =
    session?.user != null ? post.author._id === session.user.id : false;

  const name = post.author as UserDocument;

  return (
    <div className="flex flex-col mt-8 sm:flex-row items-center justify-center">
      <div className="sm:mx-6 lg:mx-24">
        <h1 className="text-center short-and-wide:text-sm text-lg sm:text-xl md:text-3xl lg:text-4xl mb-2 lg:mb-3">
          {post.title}
        </h1>
        {post.author != null && "username" in post.author ? (
          <h2 className="text-center short-and-wide:text-sm text-sm md:text-md lg:text-2xl">
            By:{" "}
            <Link
              href={`/users/${post.author._id}`}
              className="hover:underline hover:text-sky-500 mb-1 lg:mb-2"
            >
              {name.username}
            </Link>
          </h2>
        ) : (
          <h2 className="text-center short-and-wide:text-sm text-sm md:text-md lg:text-2xl">
            By: Who Knows?
          </h2>
        )}
      </div>
      {/* {isAuthor && (
        <div className="flex justify-between">
          <Link
            href={{
              pathname: "/posts/edit",
              query: { post: post._id },
            }}
            className="hover:underline hover:text-sky-500"
          >
            Edit
          </Link>
          <DeleteButton id={post._id} authorId={post.author._id} />
        </div>
      )} */}
      <div>
        {isAuthor && (
          <div className="flex justify-between">
            <Link
              href={{
                pathname: "/posts/edit",
                query: { post: post._id },
              }}
              className="hover:underline hover:text-sky-500"
            >
              Edit
            </Link>
            <DeleteButton id={post._id} authorId={post.author._id} />
          </div>
        )}
        <ShowSynth actionsArray={post.mouseActions} />
      </div>
    </div>
  );
}

// mt-10
