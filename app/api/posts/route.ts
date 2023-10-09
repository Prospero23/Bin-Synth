import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import User from "@/models/User";
import { type AuthOptions, getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import { type MouseAction, type ExtendedSession } from "@/lib/types";
import mongoose from "mongoose";

import {
  UnauthorizedError,
  BadRequestError,
  CloudinaryError,
} from "@/lib/exceptions";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(request: Request) {
  try {
    // @ts-expect-error Todo: fix this error with authoptions
    const sessionData = await getSessionData(authOptions);
    const formData = await validateFormData(request);
    const uploadResult = await uploadToCloudinary(formData.imageFile);
    await createPostInDb(sessionData, formData, uploadResult);

    return NextResponse.json({ message: "New Post Created" });
  } catch (e) {
    if (e instanceof Error) {
      return handleError(e);
    }
  }
}
async function getSessionData(
  authOptions: AuthOptions,
): Promise<ExtendedSession> {
  const session = await getServerSession(authOptions);
  if (session == null) throw new UnauthorizedError("No session info");
  if (session.user == null)
    throw new UnauthorizedError("You must be logged in.");

  return session as ExtendedSession;
}

async function validateFormData(request: Request): Promise<FormDataType> {
  const formData: FormData = await request.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as string;
  const dateMade = formData.get("dateMade") as string;
  const mouseActionsString = formData.get("mouseActions") as string;

  if (
    title == null ||
    description == null ||
    imageFile == null ||
    dateMade == null ||
    mouseActionsString == null
  ) {
    throw new BadRequestError("Missing required fields.");
  }

  const mouseActions = JSON.parse(mouseActionsString);
  if (mouseActions == null) {
    throw new BadRequestError("Invalid mouse actions data.");
  }
  const dateValue = new Date(dateMade);

  return { title, description, imageFile, dateMade: dateValue, mouseActions };
}

async function uploadToCloudinary(imageFile: any): Promise<any> {
  const uploadResult = await cloudinary.uploader.upload(imageFile.toString(), {
    folder: "posts",
    format: "png",
  });

  if (uploadResult == null) {
    throw new CloudinaryError("Failed to upload image");
  }

  return uploadResult;
}

async function createPostInDb(
  session: ExtendedSession,
  formData: any,
  uploadResult: any,
) {
  await dbConnect();

  const post = new Post({
    title: formData.title,
    description: formData.description,
    dateMade: formData.dateMade,
    mouseActions: formData.mouseActions,
  });

  const user = await User.findById(session.user?.id);

  if (user == null) {
    throw new Error("User not found in database");
  }

  if (user.posts == null) {
    user.posts = [];
  }
  user.posts.push(post._id);

  post.image = {
    url: uploadResult.secure_url,
    filename: uploadResult.public_id,
  };
  if (session.user?.id != null) {
    if (!mongoose.Types.ObjectId.isValid(session.user.id)) {
      throw new Error("Invalid or missing user ID");
    }
  }

  post.author = new mongoose.Types.ObjectId(session.user?.id);

  await post.save();
  await user.save();
}

function handleError(error: Error) {
  switch (error.name) {
    case "UnauthorizedError":
      return NextResponse.json({ error: error.message }, { status: 401 });
    case "BadRequestError":
      return NextResponse.json({ error: error.message }, { status: 400 });
    // ... other cases ...
    default:
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
  }
}

// add better types

interface FormDataType {
  title: string;
  description: string;
  imageFile: string; // or Blob if it's a file object
  dateMade: Date; // or Date if it's a date object
  mouseActions: MouseAction[]; // define a more specific type if possible
}
