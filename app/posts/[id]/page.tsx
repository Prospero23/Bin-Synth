import { getPost } from "@/lib//RESTFUL/Post";
import ShowCard from "@/components/ShowPage/ShowCard";
import Comment from "@/components/ShowPage/Comment";
import NewComment from "@/components/ShowPage/NewComment";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import Toast from "@/components/Toast"


async function ShowPage({ params }: { params: { id: string} }) {
  const { id } = params;
  const post = await getPost(id); //add fail check TODO TODO
  const session = await getAuthSession() // add fail check TODO

  return (
    <main>
      <div className="flex flex-col items-center justify-center">
      <div className="relative h-screen flex flex-col items-center justify-center">
        <Toast/>
        {/* @ts-ignore */}
        <ShowCard post={post} session={session} />
        <div className="absolute bottom-0">
          <p className="mb-1">Scroll down for comments &#x2193;</p>
        </div>
      </div>
      {post?.comments.map((c: Comment) => (
        //@ts-ignore
        <Comment comment={c} postId={params.id} key={c._id!} />
      ))}
      
      {session?.user ? (
        <NewComment id={id} />
      ) : (
        <Link href="/users/login">Login to Comment</Link>
      )}
      </div>
      {/* <div className="absolute top-52 right-0 w-1/4">
        <p>HEKKO</p>
      </div> */}
    </main>
  );
}

export default ShowPage;

//need to add super much error handling

//should make some component for a comment and then map over array of comments with it + add something to make a comment
//fix styling later on

//fix the typescript stuff
