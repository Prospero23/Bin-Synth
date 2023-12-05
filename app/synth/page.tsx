import dynamic from "next/dynamic";
const Synth = dynamic(async () => await import("@/components/Synth"), {
  ssr: false, // This will only render the component on the client-side
});
interface NewPost {
  author: string;
  title: string;
  dateMade: string;
  description: string;
  picture: string;
}

export default function SynthPage() {
  const newPost: NewPost = {
    author: "",
    title: "",
    dateMade: "",
    description: "",
    picture: "",
  };

  return (
    <div className="h-screen overflow-hidden">
      <Synth post={newPost} />
    </div>
  );
}
// probably make the synths classes after much better make
