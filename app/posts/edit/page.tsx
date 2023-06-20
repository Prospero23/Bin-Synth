import EditForm from '@/components/EditForm'
import {getPost} from '@/lib/RESTFUL/Post'


async function EditPage({searchParams}: {searchParams:{post:string}}){
    const postId = searchParams.post;
    //get the post with specificied ID
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





//feed the data from the top level somehow? 