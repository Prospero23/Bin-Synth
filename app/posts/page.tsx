import Card from "@/components/Card"
import {getAllPosts} from '@/lib/RESTFUL/Post'

export default async function Index() {
  const data = await getAllPosts()
  //fix stupid error popup
  const posts = JSON.parse(JSON.stringify(data))

  return (
    <main className="grid justify-center">
    <h1 className="text-4xl text-center my-8">All Posts</h1>
    {data.map((post: object) =>{
        return <Card post={post}/>
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



//ERROR HANDLING