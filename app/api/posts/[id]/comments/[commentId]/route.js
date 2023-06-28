import Post from '@/models/Post'
import Comment from '@/models/Comment'
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

//really a delete request but delete broken atm. DELETE A COMMENT
export async function POST(request, {params}){

    //@ts-ignore
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in" },
      { status: 401 }
    );
  }

    try{
    //get comment id and id of post
    const postId = params.id;
    const commentId = params.commentId;

    //check authorship
   const comment = await Comment.findById(commentId);
   if (session.user.id !== comment.author.toString()) {
    return NextResponse.json({ error: "Not your comment" }, { status: 403 });
  }
    
    
    //get rid of comment inside post MAYBE OPTIMIZE TO NOT REFETCH
    await Post.findByIdAndUpdate(postId, { $pull: { comment: commentId } }); 
    await Comment.findByIdAndDelete(commentId)

        return NextResponse.json({'message': `comment ${commentId} deleted`})
    } catch (e){

    }
}
