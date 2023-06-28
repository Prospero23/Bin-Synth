import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

//get all posts
export async function GET() {
  try{
  await dbConnect();
  const posts = await Post.find({});
  return NextResponse.json(posts);
  } catch (e){

  }
}


//add a new post  AUTHENTICATED
export async function POST(request: Request) {
  //@ts-ignore
  const session = await getServerSession(authOptions)

  
    if (!session) {
      return NextResponse.json({ error: 'You must be logged in' }, { status: 401 })
    }
  
  try{
  const data = await request.json();

  console.log(data)
  //const {title, description, author, dateMade} = data
  
  dbConnect()
  const post = new Post({...data});
  //@ts-ignore
  post.author = session.user.id;
  await post.save();
  console.log(post)
  return NextResponse.json({"message": "New Post Created"})
  } catch(e){
    
  }
  //flash banners?
}




//maybe group form data under something