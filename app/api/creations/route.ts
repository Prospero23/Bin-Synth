import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";

//get all posts
export async function GET() {
  const result = await fetch(
    "https://official-joke-api.appspot.com/jokes/programming/random"
  );
  const data = await result.json();
  return NextResponse.json(data);
}
//add a new post
export async function POST() {
  return NextResponse.json({ type: "POST" });
}
