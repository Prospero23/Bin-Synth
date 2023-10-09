import EditForm from "@/components/EditForm";
import { getPost } from "@/lib/server_actions/getPost";
import Toast from "@/components/Toast";

async function EditPage({ searchParams }: { searchParams: { post: string } }) {
  const postId = searchParams.post;
  // get the post with specified ID
  let post;
  let errorClient = false;
  try {
    const postFetched = await getPost(postId); // add fail check TODO TODO

    if (postFetched) {
      post = postFetched;
    } else {
      errorClient = true;
    }
  } catch (error) {
    console.log("super weird error", error);
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1>EDIT</h1>
      <EditForm post={post} />
      <Toast />
    </div>
  );
}

export const dynamic = "force-dynamic";

export default EditPage;
