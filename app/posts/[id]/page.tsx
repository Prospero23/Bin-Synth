import {getPost} from '@/lib//RESTFUL/Post'
import Link from "next/link";

async function ShowPage({params}: {params: {id: string}}){
    const {id} = params;
    const post = await getPost(id);

    return(
        <main className="h-screen flex flex-col items-center justify-center">
        <h1 className="">{post.title}</h1>
        <h2>{post.author}</h2>
        <p>This is where the audio will be!</p>
        <audio className="my-2"
        controls
        src="/media/cc0-audio/t-rex-roar.mp3">
            <a href="/media/cc0-audio/t-rex-roar.mp3">
                Download audio
            </a>
    </audio>
<Link href="/posts">All Posts</Link>
<Link href={{
    pathname: '/posts/edit',
    query: {'post': post._id}
}}>Edit</Link>
<Link href={{
    pathname: `api/posts/`
}}>Delete</Link>
        </main>
    )
}

export default ShowPage



//need to add super much error handling 


//API call to delete