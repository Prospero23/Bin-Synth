import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

//get all posts
export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find({});
    return NextResponse.json(posts);
  } catch (e) {}
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//add a new post  AUTHENTICATED
export async function POST(request: Request) {
  //@ts-ignore
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in" },
      { status: 401 }
    );
  }

  try {
    const formData: FormData = await request.formData();

    // Retrieve the form fields
    const title = formData.get("title");
    const description = formData.get("description");
    const imageFile = formData.get("image");
    const dateMade = formData.get("dateMade");

    if (!imageFile) {
      throw new Error("No image file. Please try again");
    }

    // Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      imageFile.toString(),
      {
        folder: "posts",
        format: "png",
      }
    );

    if (!uploadResult) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    //public_id, secure_url
    const imageUrl = uploadResult.secure_url;
    const imageId = uploadResult.public_id;

    dbConnect();
    const post = new Post({ title, description, dateMade });

    post.image = {
      url: imageUrl,
      filename: imageId,
    };

    //@ts-ignore
    post.author = session.user.id;

    //console.log('IMAGE', post.image)
    //console.log('post', post);

    //save post to DB ISSUE
      await post.save();
      return NextResponse.json({ message: 'New Post Created' });

  } catch (e) {
    console.error('Error saving post:', e)
    // Handle error
  }
}

//maybe group form data under something
