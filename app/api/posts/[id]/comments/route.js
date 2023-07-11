import Comment from "@/models/Comment";
import Post from "@/models/Post";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

//CREATE A COMMENT AUTH
export async function POST(request, { params }) {
  //@ts-ignore
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in" },
      { status: 401 }
    );
  }

  try {
    //grab id from search params and data from body
    const data = await request.json();
    const { body } = data;
    console.log(body)
    const postId = params.id;

    //connect and grab post from db
    dbConnect();
    const post = await Post.findById(postId);
    //create a new comment with body of post request
    const comment = new Comment({ body });

    //LATER: populate author from current user bs
    comment.author = session.user.id;

    //push comment onto post comments
    post.comments.push(comment._id);
    //console.log(post)
    //save post then comment
    await post.save();
    await comment.save();

    return NextResponse.json({ message: `comment added` });
  } catch (e) {
    NextResponse.json({ error: "rats" });
  }
}

//{params}
