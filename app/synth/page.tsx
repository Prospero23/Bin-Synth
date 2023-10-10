import Synth from "@/components/Synth";

interface NewPost {
  author: string;
  title: string;
  dateMade: string;
  description: string;
  image: string;
}

export default function SynthPage() {
  const newPost: NewPost = {
    author: "",
    title: "",
    dateMade: "",
    description: "",
    image: "",
  };

  return (
    <div className="h-screen">
      <Synth post={newPost} />
    </div>
  );
}
// probably make the synths classes after much better make
