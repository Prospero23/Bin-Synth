import dynamic from "next/dynamic";
const Synth = dynamic(async () => await import("@/components/Synth"), {
  ssr: false, // This will only render the component on the client-side
});
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
      <Synth post={newPost} />
    </div>
  );
}
