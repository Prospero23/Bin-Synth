import User from "@/models/User";
import { type MouseAction, type PostDocument } from "../types";
import dbConnect from "../dbConnect";
import type mongoose from "mongoose";

interface UserResult {
  name: string;
  allMouseActions: MouseAction[];
  postNumber: number | undefined;
}

const MAX_RETRIES = 3;

function aggregateMouseActions(posts: PostDocument[]): MouseAction[] {
  return posts.flatMap((post, postIndex) =>
    post.mouseActions.map(({ event, x, y, prevX, prevY, time }) => ({
      event,
      x,
      y,
      prevX,
      prevY,
      time: time + 10000 * postIndex,
    })),
  );
}

function isPostDocumentArray(
  posts: mongoose.Types.ObjectId[] | PostDocument[] = [],
): posts is PostDocument[] {
  return (
    posts !== null &&
    posts !== undefined &&
    posts.length > 0 &&
    "title" in posts[0]
  );
}

export async function getUser(
  id: string,
  retries = 0,
): Promise<UserResult | undefined> {
  try {
    await dbConnect();

    const user = await User.findById(id).populate({
      path: "posts",
      select: "mouseActions",
    });

    if (user != null) {
      if (isPostDocumentArray(user.posts)) {
        const allMouseActions = aggregateMouseActions(user.posts);
        return {
          name: user.name,
          allMouseActions,
          postNumber: user.posts?.length,
        };
      }
    }
    throw new Error(`User with ID: ${id} not found`);
  } catch (error) {
    if (retries < MAX_RETRIES) {
      // Consider adding a delay here using setTimeout or a sleep function
      // Example: await new Promise(res => setTimeout(res, 1000)); // Waits for 1 second
      return await getUser(id, retries + 1);
    } else {
      console.error(`Failed to fetch after ${MAX_RETRIES} attempts.`);
      throw error;
    }
  }
}
