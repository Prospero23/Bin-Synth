import { getPost } from '@/lib//RESTFUL/Post';
import ShowCard from '@/components/ShowCard';
import Comment from '@/components/Comment';
import NewComment from '@/components/NewComment'


async function ShowPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await getPost(id);

  const comments = [
    { author: "HATER", body: "This is bad. I promise you." },
    { author: "HATER", body: "This is bad. I promise you." },
    { author: "HATER", body: "This is bad. I promise you." },
    { author: "HATER", body: "This is bad. I promise you." },
    { author: "HATER", body: "This is bad. I promise you." },
  ];


  return (
    <main className="flex flex-col items-center justify-center">
      <div className="relative h-screen flex flex-col items-center justify-center">
        <ShowCard post={post} />
        <div className="absolute bottom-0">
          <p className="mb-0">Scroll down for comments &#x2193;</p>
        </div>
      </div>
      {comments.map((c) => (
        <Comment comment={c} />
      ))}
      <NewComment id={id}/>

    </main>
  );
}

export default ShowPage;

//need to add super much error handling

//should make some component for a comment and then map over array of comments with it + add something to make a comment
//fix styling later on
