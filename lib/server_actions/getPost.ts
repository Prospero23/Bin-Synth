import dbConnect, { isValidObjectId } from "@/lib/dbConnect";
import Post from "@/models/Post";

import { type PostDocument, type Result } from "../../types";

const MAX_RETRIES = 3;

export async function getPost(
  id: string,
  retries = 0,
): Promise<Result<PostDocument | null>> {
  // Check if ObjectId is valid
  if (!isValidObjectId(id)) {
    return {
      data: null,
      error: new ValidationError("Invalid Post ID"),
    };
  }

  await dbConnect();

  try {
    const result = await Post.findById(id)
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "author",
          model: "User",
        },
      })
      .populate({
        path: "author",
        model: "User",
      });

    // Handle if Post doesn't exist
    if (result == null) {
      return {
        data: null,
        error: new NotFoundError("Post not found"),
      };
    }

    const post = JSON.parse(JSON.stringify(result));
    return { data: post, error: null };
  } catch (error) {
    if (retries < MAX_RETRIES) {
      // For DB errors, attempt a retry
      return await getPost(id, retries + 1);
    } else {
      console.error(`Failed to fetch after ${MAX_RETRIES} attempts.`);
      return {
        data: null,
        error: new DatabaseError("Failed to fetch post after multiple retries"),
      };
    }
  }
}

// Example custom errors
class ValidationError extends Error {}
class NotFoundError extends Error {}
class DatabaseError extends Error {}
