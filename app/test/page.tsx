import Synth from "@/components/Synth";

export default function Test() {
  const newPost = {
    author: "",
    title: "",
    dateMade: "",
    description: "",
    picture: "",
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {/* @ts-expect-error */}
      <Synth post={newPost} />
    </div>
  );
}
