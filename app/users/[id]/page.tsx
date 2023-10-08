import ProfileSynth from "@/components/ProfileSynth";
import { getUser } from "@/lib/server_actions/getPost";

export default async function profilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const user = await getUser(id);

  return (
    <main className="flex flex-col w-screen h-screen items-center">
      <h1 className="text-4xl text-center mt-24 mb-4">{user?.name}</h1>
      <ProfileSynth user={user} />
    </main>
  );
}

// select: 'actions array'

// need better erro handndnndle
