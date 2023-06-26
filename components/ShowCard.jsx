import DeleteButton from "@/components/DeleteButton";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function ShowCard({ post }) {

  const session = await getAuthSession()
  

  return (
    <div className="flex-col justify-center">
      <h1 className="text-center">{post.title}</h1>

      {/* link to author should go to profile */}
      <h2 className="text-center">By: {post.author}</h2>
      <audio className="my-2" controls src="/media/cc0-audio/t-rex-roar.mp3">
        <a href="/media/cc0-audio/t-rex-roar.mp3">Download audio</a>
      </audio>
      <div className="mt-2">
        <Link
          href={{
            pathname: "/posts/edit",
            query: { post: post._id },
          }}
          className=""
        >
          Edit
        </Link>
        <DeleteButton id={post._id} />
      </div>
      <div className="text-center my-2">
        <Link
          href="/posts"
          className="bg-gray-100 text-black btn hover:bg-sky-500"
        >
          All Posts
        </Link>
      </div>
    </div>
  );
}
