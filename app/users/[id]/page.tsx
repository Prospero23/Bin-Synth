import ProfileSynth from "@/components/ProfileSynth";
import { getAuthSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Post from "@/models/Post";


const MAX_RETRIES = 10



type MouseAction = {
  event: object;
  x: number;
  y: number; 
  prevX: number;
  prevY: number;
  time: number;
}

//FIXIXIXIX THIS TODO
type Post = {
  name: string;
  mouseActions: Array<MouseAction>
}

//@ts-ignore
async function getUser(id:string, retries = 0){
    try{

    await dbConnect();
    const user = await User.findById(id).populate({path: 'posts', select: 'mouseActions'})

    //glitchy but works for now
    const allMouseActions = user.posts.flatMap((post:Post, postIndex:number) =>
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
    catch (error) {
      //RETRY
      if (retries < MAX_RETRIES) {
        //console.log(`Retrying... (${retries + 1})`);
        return await getUser(id, retries + 1);
      } else {
        console.error(`Failed to fetch after ${MAX_RETRIES} attempts.`);
        return []; // Or you can decide what to return in case of persistent failure
      }
    }
}
 
export default async function profilePage({ params }: { params: { id: string } }){
    const { id } = params;


    const user = await getUser(id);

return(
    <main className="flex flex-col w-screen h-screen items-center">
        <h1 className="text-4xl text-center mt-24 mb-4">{user?.name}</h1>
          <ProfileSynth user = {user}/>
    </main>
)
}


//select: 'actions array'



//need better erro handndnndle