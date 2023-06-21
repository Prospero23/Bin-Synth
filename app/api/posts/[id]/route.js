import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";

//update a post
export async function PATCH(request){
    try{
    const data = await request.json()
    //console.log('data: ', data);

    const {title, description, id} = data; 

    dbConnect()
    const post = await Post.findByIdAndUpdate(id, {
        title, description, id
    });
    
    await post.save()

    return NextResponse.json({ title, description, id});
} catch (e){

}
}


//delete specified post. DELETE MESSED UP SO USING A POST REQUEST
export async function POST(request){
    try{
    const {id} = await request.json();

    if (!id) return NextResponse.json({"message": "Post id required "})

    dbConnect()
    await Post.findByIdAndDelete(id);
    return NextResponse.json({"message": `Post ${id} deleted`});
    } catch(e){

    }
}


//check header for authentification in these 

//pass in the props -> so i can send the request from the page element itself? 
