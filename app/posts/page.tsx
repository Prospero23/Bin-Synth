import Card from "@/components/Card";
import { getAllPosts } from "@/lib/RESTFUL/Post";
import Link from "next/link";
import Toast from "@/components/Toast";
import NavButton from "@/components/IndexNav/NavButton";

export default async function Index({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const data = await getAllPosts(searchParams.page);
  //fix stupid error popup
  const posts = JSON.parse(JSON.stringify(data));

  return (
    <main className="flex justify-center">
      <Toast />
      <div className="">
        <h1 className="text-4xl text-center mt-24 mb-6">Community Creations</h1>
        <div className="w-full col-start-3">
          <Link
            href="/synth"
            className="hover:bg-sky-500 hover:rounded-md p-1 hover:text-black w-fit "
          >
            Click ME to try SYNTH
          </Link>
        </div>
        {data.map((post: object) => {
          //@ts-ignore
          return <Card post={post} key={post._id} />;
        })}
        {/* @ts-ignore */}
        <NavButton type='prev' />
        {/* @ts-ignore */}
        <NavButton type='next' />
      </div>
    </main>
  );
}

// /posts /posts/new
// /posts/:id /posts/:id/edit

//creation date, creator
//button needs to be rendered client side and have a click event

//add types to the shit soo that that stupid parse thing doesnt have to happen

//fix key thing

//maybe add sorting? or some other form of looking at posts
//infitite scroll?

//ERROR HANDLING
