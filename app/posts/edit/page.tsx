import EditForm from '@/components/EditForm'
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';

async function getPost(id:string){
    await dbConnect()
    const result = await Post.findById(id);
    const post = JSON.parse(JSON.stringify(result))
  return post
}


async function EditPage({searchParams}: {searchParams:{post:string}}){
    const postId = searchParams.post;
    const post = await getPost(postId);
    return(
        <div className='h-screen flex flex-col items-center justify-center'>
        <h1>EDIT</h1>
        <EditForm post={post}/>
        </div>
    )
}

// export const dynamic = 'force-dynamic'
export default EditPage;


//check to see if there is a campground and then render the edit page