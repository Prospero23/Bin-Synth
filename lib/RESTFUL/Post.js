import {isValidObjectId} from "@/lib/dbConnect";
import Post from "@/models/Post";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User"
import { useRouter } from "next/navigation";

//get all posts
export const getAllPosts = async () => {
  await dbConnect();
  const result = await Post.find({}).populate({
    path: "author",
  });
  return result;
};

//get single post
export async function getPost(id) {

  if (!isValidObjectId(id)){
    throw new Error("not valid id")
  }
  await dbConnect();

  //fetch post and grab both comments + authors and author data of the post
  const result = await Post.findById(id).populate({
    path: "comments",
    populate: {
      path: "author",
    },
  }).populate({
    path: "author"
  })

  if (!result) {
    throw new Error("Post not found"); // Throw an error if the post is not found
  }
  const post = JSON.parse(JSON.stringify(result));
  return post;
}

//update a post
export const updatePost = async (post, update) => {
  const router = useRouter();
  const updatedPost = await Post.findByIdAndUpdate(post._id, {
    ...update,
  });
  await updatedPost.save();
  router.replace(`${post._id}`);
};

//delete a post
