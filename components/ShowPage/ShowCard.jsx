'use client'

import DeleteButton from "@/components/ShowPage/DeleteButton";
import Link from "next/link";
import ShowSynth from "@/components/ShowPage/ShowSynth";
import LikeButton from '@/components/ShowPage/LikeButton'


export default async function ShowCard({ post, session }) {
  //check to see if session user is the owner of post

  const isAuthor = post.author._id === session?.user.id;

  return (
    <div className="flex-col justify-center mt-10 relative">
         <div className="flex items-center justify-center">
      <h1 className="text-center text-2xl md:text-4xl mb-4">{post.title}</h1>
      <div className="absolute right-0 bottom-0 sm:top-0">
      <LikeButton />
      </div>
    </div>
      <h2 className="text-center text-sm md:text-lg">By: <Link href={`/users/${post.author._id}`} className="hover:underline hover:text-sky-500 mb-2">{post.author.name}</Link></h2>
      {isAuthor && (
        <div className="mt-2">
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
      <div className="text-center">
        <Link
          href="/posts"
          className="bg-gray-100 text-black btn hover:bg-sky-500"
        >
          All Posts
        </Link>
        <div className="text-end">
        </div>
      </div>

    </div>
  );
}


