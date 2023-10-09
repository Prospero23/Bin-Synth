import Post from "@/models/Post";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  authenticateSession,
  handleError,
  verifyAuthorship,
} from "@/lib/routeHelpers";
import { ServerError } from "@/lib/exceptions";

// really a delete request but delete is broken atm. DELETE A COMMENT
export async function POST(
  request: Request,
  { params }: { params: { id: string; commentId: string } },
) {
  const session = await authenticateSession(authOptions);
  try {
    // get comment id and id of post
    const postId = params.id;
    const commentId = params.commentId;

    // check authorship
    const comment = await Comment.findById(commentId);
    if (comment != null) {
      if (session.user != null) {
        verifyAuthorship(session.user.id, String(comment.author));
      } else {
        throw new ServerError("No id information to check");
      }
      // Check if comment is deleted successfully
      const deletedComment = await Comment.findByIdAndDelete(commentId);
      if (deletedComment == null) {
        throw new Error(`Failed to delete comment with id ${commentId}`);
      }

      // Pull the comment ID from the post's comments array
      await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });

      return NextResponse.json({ message: `comment ${commentId} deleted` });
    } else {
      throw new Error(`Comment with id ${commentId} not found`);
    }
  } catch (e) {
    // Handle the error accordingly, for example:
    if (e instanceof Error) {
      handleError(e);
    }
  }
}
