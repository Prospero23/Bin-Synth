'use client'

import DeleteButton from "@/components/ShowPage/DeleteButton";
import Link from "next/link";
import ShowSynth from "@/components/ShowPage/ShowSynth";
import LikeButton from '@/components/ShowPage/LikeButton'


export default async function ShowCard({ post, session }) {
  //check to see if session user is the owner of post

  const isAuthor = post.author._id === session?.user.id;

  return (
    <div className="flex-col justify-center mt-28 relative"> 
         <div className="flex items-center justify-center">
      <h1 className="text-center text-2xl md:text-4xl mb-2 lg:mb-3">{post.title}</h1>
      {/* <div className="absolute right-0 bottom-0 sm:top-0">
      <LikeButton />
      </div> */}
    </div>
      <h2 className="text-center text-sm md:text-lg">By: <Link href={`/users/${post.author._id}`} className="hover:underline hover:text-sky-500 mb-1 lg:mb-2">{post.author.name}</Link></h2>
      {isAuthor && (
  <div class="flex justify-between">
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
      <ShowSynth actionsArray={post.mouseActions} className="min-w-full min-h-full"/>
      </div>
      <div className="text-right -mt-5 uppercase">
        <Link
          href="/posts" 
          className=" text-white hover:bg-sky-500"
        >
          All Posts
        </Link>
      </div>

    </div>
  );
}



//mt-10