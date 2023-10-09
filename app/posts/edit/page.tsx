import EditForm from "@/components/EditForm";
import { getPost } from "@/lib/server_actions/getPost";
import { type PostDocument } from "@/types";

async function EditPage({ searchParams }: { searchParams: { post: string } }) {
  const postId = searchParams.post;
  // get the post with specified ID
  let postDoc: PostDocument | null = null;
  try {
    const postFetched = await getPost(postId); // add fail check TODO TODO

    if (postFetched.data != null) {
      postDoc = postFetched.data;
    } else if (postFetched.error != null) {
      throw new Error(postFetched.error.message);
    } else {
      throw new Error("Nothing was returned from request"); // or handle this case differently
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in EditPage:", error.message);
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1>EDIT</h1>
      {postDoc !== null && <EditForm post={postDoc} />}
    </div>
  );
}

export const dynamic = "force-dynamic";

export default EditPage;
