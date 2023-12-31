import { getPost } from "@/lib/server_actions/getPost";
import ShowCard from "@/components/ShowPage/ShowCard";
import Comment from "@/components/ShowPage/Comment";
import NewComment from "@/components/ShowPage/NewComment";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import Toast from "@/components/Toast";
import { type CommentDocument, type ExtendedSession } from "@/types";

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

  function isComment(object: any): object is CommentDocument {
    return "_id" in object;
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-center">
        <div className="relative h-screen flex flex-col items-center justify-center">
          <Toast />
          {post != null ? (
            <ShowCard post={post} session={extendedSession} />
          ) : null}
          <div className="absolute bottom-0 md:left-0">
            <p className="text-sm xl:text-xl lg:text-lg">
              Scroll down for comments &#x2193;
            </p>
          </div>
        </div>
        {post != null
          ? post.comments.map((c) => {
              if (isComment(c)) {
                return (
                  <Comment
                    comment={c}
                    postId={params.id}
                    key={c._id.toString()}
                    session={extendedSession}
                  />
                );
              }
              return null;
            })
          : null}
      </div>

      {session?.user != null ? (
        <NewComment id={id} />
      ) : (
        <nav className="width-full text-center mt-2">
          <Link href="/users/login">Login to Comment!</Link>
        </nav>
      )}
    </main>
  );
}

export default ShowPage;

// should make some component for a comment and then map over array of comments with it + add something to make a comment
// fix styling later on
