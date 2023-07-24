import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

//get all posts NOTUSED
export async function GET(req: Request) {
  try {
    await dbConnect();

    //const { page = 1 } = req.query;

    const page = 1
    const pageSize = 5;
    const skip = (page - 1) * pageSize;

    const posts = await Post.find().limit(pageSize).skip(skip);
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
    const mouseActionsString = formData.get("mouseActions") as string; // Assuming it's the first value in the array
    const mouseActions = JSON.parse(mouseActionsString);




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

    // public_id, secure_url
    const imageUrl = uploadResult.secure_url;
    const imageId = uploadResult.public_id;

    dbConnect();
    const post = new Post({ title, description, dateMade, mouseActions });

    post.image = {
      url: imageUrl,
      filename: imageId,
    };

    //@ts-ignore
    post.author = session.user.id;

    //console.log('IMAGE', post.image)
    //console.log('post', post);

    //save post to DB
    await post.save();

    return NextResponse.json({ message: "New Post Created" });
  } catch (e) {
    console.error("Error Saving Post:", e);
    // Handle error
  }
}

//maybe group form data under something
