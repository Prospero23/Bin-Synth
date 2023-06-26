import Comment from "@/models/Comment";
import Post from "@/models/Post";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    //grab id from search params and data from body
    const data = await request.json();
    const { author, body } = data;
    const postId = params.id;

    //connect and grab post from db
    dbConnect();
    const post = await Post.findById(postId);
    //create a new comment with body of post request
    const comment = new Comment({ author, body });

    //LATER: populate author from current user bs

    //push comment onto post comments
    post.comments.push(comment._id);
    //console.log(post)
    //save post then comment
    await post.save();
    await comment.save();

    return NextResponse.json({ message: `comment ${comment._id} added` });
    //return NextResponse.json({'message' : 'working'})
  } catch (e) {
    NextResponse.json({ error: "rats" });
  }
}

//{params}
