import { getPost } from "@/lib//RESTFUL/Post";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";

async function ShowPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await getPost(id);

  return (
    <main className="h-screen flex flex-col items-center justify-center">
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
            className=''
          >
            Edit
          </Link>
          <DeleteButton id={id} />
        </div>
        <div className="text-center my-2">
          <Link href="/posts" className="bg-gray-100 text-black btn hover:bg-sky-500">
            All Posts
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ShowPage;

//need to add super much error handling
