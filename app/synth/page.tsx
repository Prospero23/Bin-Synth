import Synth from "@/components/Synth";

export default function SynthPage() {
  const newPost = {
    author: "",
    title: "",
    dateMade: "",
    description: "",
    picture: "",
  };

  return (
    <div className="h-screen">
      {/* @ts-expect-error */}
      <Synth post={newPost} />
    </div>
  );
}
