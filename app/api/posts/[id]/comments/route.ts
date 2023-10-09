import Comment from "@/models/Comment";
import Post from "@/models/Post";
import dbConnect from "@/lib/dbConnect";
import { type NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { authenticateSession, handleError } from "@/lib/routeHelpers";
import mongoose from "mongoose";
import { ServerError, UnauthorizedError } from "@/lib/exceptions";
// CREATE A COMMENT AUTH
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await authenticateSession(authOptions);

    // grab id from search params and data from body
    const data = await request.json();
    const { body } = data;
    const postId = params.id;

    if (session.user?.id == null) {
      throw new UnauthorizedError("You must be signed in");
    }

    await createComment(body, postId, session.user.id);
    return NextResponse.json({ message: `comment added` });
  } catch (e) {
    if (e instanceof Error) {
      handleError(e);
    }
  }
}

async function createComment(
  body: string,
  postId: string,
  userId: string,
): Promise<void> {
  await dbConnect();

  const post = await Post.findById(postId);
  if (post == null) {
    throw new ServerError("Post not found");
  }

  const comment = new Comment({ body });
  // @ts-expect-error this wants me to make wrong type of ObjectID -> throws an error
  comment.author = new mongoose.Types.ObjectId(userId);

  post.comments.push(comment._id);

  await post.save();
  await comment.save();
}

// TODO: make body more clear in typing
