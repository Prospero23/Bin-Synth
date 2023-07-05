import DeleteButton from "@/components/DeleteButton";
import Link from "next/link";
import ShowSynth from "@/components/ShowSynth";

export default async function ShowCard({ post, session }) {
  //check to see if session user is the owner of post

  const isAuthor = post.author._id === session?.user.id;

  return (
    <div className="flex-col justify-center">
      <h1 className="text-center text-5xl mb-4 mt">{post.title}</h1>
      <h2 className="text-center mb-2 text-sm">By: {post.author.name}</h2>
      {isAuthor && (
        <div className="mt-2">
          <Link
            href={{
              pathname: "/posts/edit",
              query: { post: post._id },
            }}
            className="hover:underline hover:text-sky-500"
          >
            Edit
          </Link>
          <DeleteButton id={post._id} authorId={post.author._id} />
        </div>
      )}
      <ShowSynth actionsArray={post.mouseActions} />
      <div className="text-center my-2">
        <Link
          href="/posts"
          className="bg-gray-100 text-black btn hover:bg-sky-500"
        >
          All Posts
        </Link>
      </div>
    </div>
  );
}

// <div className="flex-col justify-center">
// <h1 className="text-center text-5xl mb-4 mt" >{post.title}</h1>

// {/* link to author should go to profile */}
// <h2 className="text-center mb-2 text-sm">By: {post.author.name}</h2>
// {isAuthor && (
//   <div className="mt-2">
//     <Link
//       href={{
//         pathname: "/posts/edit",
//         query: { post: post._id },
//       }}
//       className="hover:underline hover:text-sky-500"
//     >
//       Edit
//     </Link>
//     <DeleteButton id={post._id} authorId={post.author._id}/>
//   </div>
// )}
// <div className="text-center my-2">
//  <Link href="/posts" className="bg-gray-100 text-black btn hover:bg-sky-500">
//   All Posts
//</Link>
//</div>; */}
// </div>
