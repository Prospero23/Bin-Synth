import { getPost } from "@/lib//RESTFUL/Post";
import ShowCard from "@/components/ShowPage/ShowCard";
import Comment from "@/components/ShowPage/Comment";
import NewComment from "@/components/ShowPage/NewComment";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import Toast from "@/components/Toast"
import { ExtendedSession } from "@/lib/types";


async function ShowPage({ params }: { params: { id: string } }) {
  const { id } = params;
  let post;
  let session;
  let errorClient = false;


  try {
    const postFetched = await getPost(id); //add fail check TODO TODO

    if (postFetched != null) {
      post = postFetched;
    }
    else {
      errorClient = true;
      post = null;
    }
  } catch (error) {
    console.log('super weird error', error)

  }
  try {
    const sessionFetched = await getAuthSession() // add fail check TODO
    session = sessionFetched
  } catch (error) {
    console.log('error fetching session info: ', error)
    session = null
  }

  const extendedSession = session as ExtendedSession;

  return (
    <main>
      <div className="flex flex-col items-center justify-center">
        <div className="relative h-screen flex flex-col items-center justify-center">
          {/* @ts-expect-error fix this later */}
          <Toast error={errorClient} />
          {post ? <ShowCard post={post} session={extendedSession} /> : null}
          <div className="absolute bottom-0">
            <p className="mb-1">Scroll down for comments &#x2193;</p>
          </div>
        </div>
        {post ? post.comments.map(c => {
          if ('_id' in c) {
            return <Comment comment={c} postId={params.id} key={c._id!.toString()} />;
          }
          return null; // or another suitable default value
        }) : null}

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
