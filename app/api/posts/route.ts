import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post"

//get all posts
export async function GET() {
  await dbConnect();
  const posts = await Post.find({});
  return NextResponse.json(posts);
}
//add a new post
export async function POST() {
  return NextResponse.json({ type: "POST" });
}
