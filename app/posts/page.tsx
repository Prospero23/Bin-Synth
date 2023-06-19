import Button from "@/components/Button";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import Card from "@/components/Card"

const getData = async () => {
  await dbConnect();
  const result = await Post.find({});
  return result
};

export default async function Posts() {
  const data = await getData();
  //fix stupid error popup
  const posts = JSON.parse(JSON.stringify(data))

  return (
    <main className="grid justify-center">
    <h1 className="text-4xl text-center my-4">All Posts</h1>
    {posts.map((post: object) =>{
        return <Card post={post}/>
    })};
    </main>
  );
}

// /posts /posts/new
// /posts/:id /posts/:id/edit

//creation date, creator
//button needs to be rendered client side and have a click event


//add types to the shit soo that that stupid parse thing doesnt have to happen