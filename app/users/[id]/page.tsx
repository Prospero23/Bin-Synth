import ProfileSynth from "@/components/ProfileSynth";
import { getAuthSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Post from "@/models/Post";


async function getUser(id:string){
    try{

    await dbConnect();
    const user = await User.findById(id).populate({path: 'posts', select: 'mouseActions'})

    //glitchy but works for now
    const allMouseActions = user.posts.flatMap((post, postIndex) =>
    post.mouseActions.map(({ event, x, y, prevX, prevY, time }) => ({ //turn into simple object so no shit recursion error
      event,
      x,
      y,
      prevX,
      prevY,
      time: time + (10000 * postIndex),
    }))
  );
    const plainObject = {
        name: user.name,
        allMouseActions: allMouseActions,
       postNumber: user.posts.length
      };

    return plainObject
    }
    catch(e){
        console.log('error: ', e)
    }
}
 
export default async function profilePage({ params }: { params: { id: string } }){
    const { id } = params;

    const user = await getUser(id);

return(
    <main className="flex flex-col w-screen h-screen items-center">
        <h1 className="text-4xl text-center mt-24 mb-4">{user.name}</h1>
          <ProfileSynth user = {user}/>
    </main>
)
}


//select: 'actions array'



//need better erro handndnndle