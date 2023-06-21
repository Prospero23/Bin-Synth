import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post"

//get all posts
export async function GET() {
  try{
  await dbConnect();
  const posts = await Post.find({});
  return NextResponse.json(posts);
  } catch (e){

  }
}


//add a new post
export async function POST(request: Request) {
  try{
  const data = await request.json();

  console.log(data)
  const {title, description, author, dateMade} = data
  
  dbConnect()
  const post = new Post({...data});
  await post.save();
  console.log(post)
  return NextResponse.json({"message": "New Post Created"})
  } catch(e){
    
  }
  //flash banners?
}

//maybe group form data under something