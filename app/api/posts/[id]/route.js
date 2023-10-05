import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

//update a post AUTH
export async function PATCH(request) {
  //@ts-ignore
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in" },
      { status: 401 }
    );
  }

  try {
    const data = await request.json();

    const { title, description, id, authorId } = data;

    //check authorship
     if (session.user.id !== authorId) {
       return NextResponse.json({ error: "Not your post" }, { status: 403 });
     }

    dbConnect();
    const post = await Post.findByIdAndUpdate(id, {
      title,
      description
    });

    await post.save();

    return NextResponse.json({ message: "Post Updated Successfully" });
  } catch (e) {
    console.log(e)
  }
}

//delete specified post. DELETE MESSED UP SO USING A POST REQUEST AUTH
export async function POST(request) {
  //@ts-ignore
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in" },
      { status: 401 }
    );
  }

  try {
    const { id, authorId } = await request.json();

    if (!id) return NextResponse.json({ message: "Post Id Required " });

    //check authorship
    if (session.user.id !== authorId) {
      return NextResponse.json(
        { error: "Not Your Post to Delete" },
        { status: 403 }
      );
    }

    dbConnect();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: `Post Deleted Successfully!` });
  } catch (e) {}
}

//check header for authentification in these

//pass in the props -> so i can send the request from the page element itself?
