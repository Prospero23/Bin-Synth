import Card from "@/components/Card/Card";
import getAllPosts from "@/lib/server_actions/getAllPosts";
import Link from "next/link";
import NavButton from "@/components/IndexNav/NavButton";
import Toast from "@/components/Toast";
export const dynamic = "force-dynamic";

export default async function Index({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  let allPosts;
  try {
    const posts = await getAllPosts(searchParams.page, 0);

    if (posts.error != null) {
      throw new Error(posts.error.message);
    } else {
      allPosts = posts.data;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error("Unhandled error during posts fetch: " + errorMessage);
  }

  return (
    <main className="flex justify-center w-full min-h-screen">
      <Toast />
      <div className="">
        <h1 className="text-3xl md:text-4xl text-center mt-24 mb-6">
          Community Creations
        </h1>
        <div className="w-full col-start-3">
          <Link
            href="/synth"
            className="hover:bg-sky-500 hover:rounded-md p-1 hover:text-black w-fit "
          >
            Click ME to try SYNTH
          </Link>
        </div>
        {allPosts?.map((post, index) => {
          if (post != null) {
            return <Card post={post} key={post._id} />;
          }
          return <></>;
        })}
        <div className="flex justify-between md:text-2xl mx-8 md:mx-0">
          <NavButton type="prev" />
          <NavButton type="next" />
        </div>
      </div>
    </main>
  );
}

// /posts /posts/new
// /posts/:id /posts/:id/edit
