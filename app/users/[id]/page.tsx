import ShowSynth from "@/components/ShowSynth";

export default function profilePage({ params }: { params: { id: string } }){
    const { id } = params;

    const array = [3]

    
    //fetch the profile that has the id and then append all of the user actions together into one long segment that can be played

return(
    <main>
        <h1 className="text-4xl">RARARA</h1>
        <ShowSynth actionsArray={array}/>
    </main>
)
}