import User from "@/models/User";
import { type MouseAction, type PostDocument } from "../types";
import dbConnect from "../dbConnect";

interface UserResult {
  name: string;
  allMouseActions: MouseAction[];
  postNumber: number | undefined;
}

const MAX_RETRIES = 3;

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
      const userWithPosts = user as unknown as { posts: PostDocument[] };

      const allMouseActions = userWithPosts.posts.flatMap(
        (post: PostDocument, postIndex: number) =>
          post.mouseActions.map(({ event, x, y, prevX, prevY, time }) => ({
            event,
            x,
            y,
            prevX,
            prevY,
            time: time + 10000 * postIndex,
          })),
      );

      return {
        name: user.name,
        allMouseActions,
        postNumber: user.posts?.length,
      };
    }
    if (!user) {
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
