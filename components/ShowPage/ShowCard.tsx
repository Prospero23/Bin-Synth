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
    <div className="flex-col justify-center mt-24 relative">
      <div className="flex items-center justify-center">
        <h1 className="text-center text-2xl md:text-4xl mb-2 lg:mb-3">
          {post.title}
        </h1>
        <div className="absolute right-0 bottom-0 sm:top-0">
          {/* <LikeButton /> */}
        </div>
      </div>
      {post.author != null && "username" in post.author ? (
        <h2 className="text-center text-sm md:text-lg">
          By:{" "}
          <Link
            href={`/users/${post.author._id}`}
            className="hover:underline hover:text-sky-500 mb-1 lg:mb-2"
          >
            {name.username}
          </Link>
        </h2>
      ) : (
        <h2 className="text-center text-sm md:text-lg">By: Who Knows?</h2>
      )}
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
      <div className="">
        <ShowSynth actionsArray={post.mouseActions} />
      </div>
      <div className="text-right -mt-5 uppercase">
        <Link href="/posts" className=" hover:bg-sky-500">
          All Posts
        </Link>
      </div>
    </div>
  );
}

// mt-10
