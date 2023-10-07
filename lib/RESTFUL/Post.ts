import { isValidObjectId } from "@/lib/dbConnect";
import Post from "@/models/Post";
import dbConnect from "@/lib/dbConnect";
import { type ObjectId } from "mongoose";
import User from "@/models/User"

import { MouseAction, PostDocument, UserDocument } from "../types";

const MAX_RETRIES = 3;

//get all posts
export const getAllPosts = async (page = 1, retries = 0): Promise<PostDocument[] | null[]> => {
  try {
    let currentPage = page >= 1 ? page : 1; //min page allowed is 1

    const pageSize = 10;
    const skip = (currentPage - 1) * pageSize;

    await dbConnect();
    const result = await Post.find({}).limit(pageSize).skip(skip).populate({
      path: "author",
      model: "User"
    }).sort({ dateMade: -1 });

    if (result.length === 0 && currentPage > 1) {
      // If there are no results and this is not the first page, return the results of the last available page with results

      // Get the total count of posts
      const totalCount = await Post.countDocuments({});

      // Calculate the number of pages
      const totalPages = Math.ceil(totalCount / pageSize);

      // Set the currentPage to the last available page with results
      currentPage = totalPages > 0 ? totalPages : 1;

      // Calculate the skip value for the last available page with results
      const lastPageSkip = (currentPage - 1) * pageSize;

      // Get the results for the last available page with results
      const lastPageResults = await Post.find({})
        .limit(pageSize)
        .skip(lastPageSkip)
        .populate({
          path: "author",
          model: "User"
        })
        .sort({ dateMade: -1 });

      return (lastPageResults);
    }

    // If there are results for the current page, return them along with the current page number and total count of posts
    return (result);
  } catch (error) {
    //RETRY
    console.log(error)
    if (retries < MAX_RETRIES) {
      //console.log(`Retrying... (${retries + 1})`);
      return await getAllPosts(page, retries + 1);
    } else {
      return []; // Or you can decide what to return in case of persistent failure
    }
  }
};


//get single post
export async function getPost(id: string, retries = 0): Promise<PostDocument | null> {

  if (!isValidObjectId(id)) {
    throw new Error("not valid id")
  }
  await dbConnect();

  //fetch post and grab both comments + authors and author data of the post

  try {
    const result = await Post.findById(id).populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        model: "User"
      },
    }).populate({
      path: "author",
      model: "User",
    })
    const post = JSON.parse(JSON.stringify(result));
    return post;
  }
  catch (error) {
    //RETRY
    if (retries < MAX_RETRIES) {
      //console.log(`Retrying... (${retries + 1})`);
      return await getPost(id, retries + 1);
    } else {
      //console.error(`Failed to fetch after ${MAX_RETRIES} attempts.`);
      return null; // Or you can decide what to return in case of persistent failure
    }
  }
}


//get user's posts

interface UserResult {
  name: string;
  allMouseActions: MouseAction[];
  postNumber: number | undefined;
}

export async function getUser(id: string, retries = 0): Promise<UserResult | undefined> {
  try {
    await dbConnect();

    const user = await User.findById(id).populate({
      path: 'posts',
      select: 'mouseActions'
    });

    if (user) {
      const userWithPosts = user as unknown as { posts: PostDocument[] };

      const allMouseActions = userWithPosts.posts.flatMap((post: PostDocument, postIndex: number) =>
        post.mouseActions.map(({ event, x, y, prevX, prevY, time }) => ({
          event,
          x,
          y,
          prevX,
          prevY,
          time: time + (10000 * postIndex),
        }))
      );


      return {
        name: user.name,
        allMouseActions: allMouseActions,
        postNumber: user.posts?.length
      };
    } if (!user) {
      throw new Error(`User with ID: ${id} not found`);
    }
  } catch (error) {
    if (retries < MAX_RETRIES) {
      // Consider adding a delay here using setTimeout or a sleep function
      // Example: await new Promise(res => setTimeout(res, 1000)); // Waits for 1 second
      return await getUser(id, retries + 1);
    } else {
      console.error(`Failed to fetch after ${MAX_RETRIES} attempts.`);
      throw error; // You might want to propagate the error instead of returning a default value
    }
  }
}