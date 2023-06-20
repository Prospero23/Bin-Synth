import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import {redirect} from 'next/navigation'


//update a post
export async function PATCH(request){
    const data = await request.json()
    console.log('data: ', data);

    const {title, description} = data; 

    return NextResponse.json({ title, description});
}

//delete specified post. DELETE MESSED UP SO USING A POST REQUEST
export async function POST(request){
    const {id} = await request.json();

    if (!id) return NextResponse.json({"message": "Post id required "})

    dbConnect()
    await Post.findByIdAndDelete(id);
    redirect('/posts')
    //return NextResponse.json({"message": `Post ${id} deleted`});
}


//check header for authentification in these 


