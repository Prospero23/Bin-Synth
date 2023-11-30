import { getUser } from "@/lib/server_actions/getUser";
import dynamic from "next/dynamic";
const ProfileSynth = dynamic(
  async () => await import("@/components/ProfileSynth"),
  {
    ssr: false, // This will only render the component on the client-side
  },
);
export default async function profilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const user = await getUser(id);
  if (user === undefined) {
    throw Error("User not found");
  }

  return (
    <main className="flex flex-col w-screen h-screen items-center">
      <h1 className="text-4xl text-center mt-24 mb-4">{user?.name}</h1>
      {user.postNumber !== undefined && <ProfileSynth user={user} />}
    </main>
  );
}

// select: 'actions array'

// need better erro handndnndle
