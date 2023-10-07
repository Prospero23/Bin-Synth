import Card from "@/components/Card/Card";
import { getAllPosts } from "@/lib/RESTFUL/Post";
import Link from "next/link";
import Toast from "@/components/Toast";
import NavButton from "@/components/IndexNav/NavButton";

export default async function Index({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  let allPosts;
  let errorClient = false;

  try {
    const posts = await getAllPosts(searchParams.page, 0);
    if (posts.length === 0) {
      // console.log('error loading posts')
      errorClient = true;
    } else {
      allPosts = posts;
    }
  } catch (error) {
    console.error("unhandled error: ", error);
  }

  return (
    <main className="flex justify-center w-full min-h-screen">
      <Toast retrieve={errorClient} />
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
        {allPosts?.map((post) => {
          if (post) {
            return <Card post={post} key={post._id} />;
          } else {
            // IMPROVE THIS TO FALLBACK UI?
          }
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
