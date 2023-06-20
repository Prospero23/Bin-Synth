
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { useRouter } from "next/navigation";


//get all posts
export const getAllPosts = async () => {
    await dbConnect();
    const result = await Post.find({});
    return result
  };
  
//get single post
  export async function getPost(id){
    await dbConnect()
    const result = await Post.findById(id);
    const post = JSON.parse(JSON.stringify(result))
  return post

}

//update a post
export const updatePost = async (post, update) =>{
  const router = useRouter()
  const updatedPost = await Post.findByIdAndUpdate(post._id, {
    ...update,
  });
  await updatedPost.save();
  router.replace(`${post._id}`);
}

//delete a post
