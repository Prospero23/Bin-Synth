import Post from '@/models/Post'
import Comment from '@/models/Comment'
import { NextResponse } from 'next/server';

//really a delete request but delete broken atm. DELETE A COMMENT
export async function POST(request, {params}){
    try{
    //get comment id and id of post
    const postId = params.id;
    const commentId = params.commentId;
    
    //get rid of comment inside post
    await Post.findByIdAndUpdate(postId, { $pull: { comment: commentId } }); 
    await Comment.findByIdAndDelete(commentId)

        return NextResponse.json({'message': `comment ${commentId} deleted`})
    } catch (e){

    }
}
