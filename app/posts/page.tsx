import Card from "@/components/Card";
import { getAllPosts } from "@/lib/RESTFUL/Post";
import Link from "next/link";

export default async function Index() {
  const data = await getAllPosts();
  //fix stupid error popup
  const posts = JSON.parse(JSON.stringify(data));

  return (
    <main className="grid justify-center">
      <h1 className="text-4xl text-center mt-24 mb-6">All Posts</h1>
      <Link href="/posts/new">New Post</Link>
      {data.map((post: object) => {
        //@ts-ignore
        return <Card post={post} key={post._id} />;
      })}
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
