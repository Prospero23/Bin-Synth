import ShowSynth from "@/components/ShowPage/ShowSynth";
import { getAuthSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

async function getUser(id:string){
    try{

    await dbConnect();
    const user = await User.findById(id).populate({path: 'posts', select: 'actions array'})

    return user
    }
    catch(e){
        console.log('error: ', e)
    }
}
 
export default async function profilePage({ params }: { params: { id: string } }){
    const { id } = params;
    const array = [3]

    //const user = await getUser(id);

return(
    <main className="flex flex-col w-screen h-screen items-center">
        <h1 className="text-4xl text-center mt-24 mb-4">Name of Person Here</h1>
        <ShowSynth actionsArray={array}/>
    </main>
)
}