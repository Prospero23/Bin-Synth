import EditForm from '@/components/EditForm'
import {getPost} from '@/lib/RESTFUL/Post'
import Toast from '@/components/Toast';

async function EditPage({searchParams}: {searchParams:{post:string}}){
    const postId = searchParams.post;
    //get the post with specified ID
    const post = await getPost(postId);

    return(
        <div className='h-screen flex flex-col items-center justify-center'>
        <h1>EDIT</h1>
        <EditForm post={post}/>
        <Toast/>
        </div>
    )
}


export const dynamic = 'force-dynamic'

export default EditPage;


//check to see if there is a campground and then render the edit page





//feed the data from the top level somehow? 
//is it better to use state and save this? only update when i need to and update the state as need be 