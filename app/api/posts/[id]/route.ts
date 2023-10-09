import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { authOptions } from "@/lib/auth";
import {
  authenticateSession,
  verifyAuthorship,
  handleError,
} from "@/lib/routeHelpers";
import { BadRequestError, UnauthorizedError } from "@/lib/exceptions";

// update a post AUTH
export async function PATCH(request: Request) {
  try {
    const session = await authenticateSession(authOptions);
    const data = await request.json();
    const { title, description, id, authorId } = data;
    if (session.user != null) {
      verifyAuthorship(session?.user.id, authorId);
    } else {
      throw new UnauthorizedError("no no no");
    }
    await dbConnect();
    const post = await Post.findByIdAndUpdate(id, { title, description });
    if (post == null) {
      throw new BadRequestError("no post found");
    }
    await post.save();
    return NextResponse.json({ message: "Post Updated Successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error);
    }
  }
}

export async function POST(request: Request) {
  try {
    const session = await authenticateSession(authOptions);
    const { id, authorId } = await request.json();

    if (id == null) throw new BadRequestError("Post Id Required.");

    if (session.user != null) {
      verifyAuthorship(session.user.id, authorId);
    } else {
      throw new UnauthorizedError("no no no");
    }
    await dbConnect();
    await Post.findByIdAndDelete(id);

    return NextResponse.json({ message: `Post Deleted Successfully!` });
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error);
    }
  }
}
