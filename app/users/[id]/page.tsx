import ProfileSynth from "@/components/ProfileSynth";
import { getUser } from "@/lib/server_actions/getUser";

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
