import { getPost } from "@/lib/server_actions/getPost";
import ShowCard from "@/components/ShowPage/ShowCard";
import Comment from "@/components/ShowPage/Comment";
import NewComment from "@/components/ShowPage/NewComment";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import Toast from "@/components/Toast";
import { type ExtendedSession } from "@/types";

async function ShowPage({ params }: { params: { id: string } }) {
  const { id } = params;
  let post;
  let session;
  try {
    const postResult = await getPost(id);

    if (postResult.data != null) {
      post = postResult.data;
    } else {
      throw new Error(
        `Error fetching post: ${
          postResult.error?.message != null || "Unknown error"
        }`,
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unexpected error fetching post: ${error.message}`);
    }
    post = null;
  }

  try {
    const sessionFetched = await getAuthSession(); // add fail check TODO
    session = sessionFetched;
  } catch (error) {
    throw new Error("error getting session information");
  }

  const extendedSession = session as ExtendedSession;

  return (
    <main>
      <div className="flex flex-col items-center justify-center">
        <div className="relative h-screen flex flex-col items-center justify-center">
          <Toast />
          {post != null ? (
            <ShowCard post={post} session={extendedSession} />
          ) : null}
          <div className="absolute bottom-0">
            <p className="mb-1">Scroll down for comments &#x2193;</p>
          </div>
        </div>
        {post != null
          ? post.comments.map((c) => {
              if ("_id" in c) {
                return (
                  <Comment
                    comment={c}
                    postId={params.id}
                    key={c._id.toString()}
                  />
                );
              }
              return null; // or another suitable default value
            })
          : null}

        {session?.user != null ? (
          <NewComment id={id} />
        ) : (
          <Link href="/users/login">Login to Comment</Link>
        )}
      </div>
    </main>
  );
}

export default ShowPage;

// should make some component for a comment and then map over array of comments with it + add something to make a comment
// fix styling later on
