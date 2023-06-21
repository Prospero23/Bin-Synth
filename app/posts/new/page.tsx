import NewForm from '@/components/NewForm'
import Link from 'next/link';

export default function NewPost() {

  const newPost = {
    author: '',
    title: '',
    dateMade: '',
    description: ''
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
    <h1>NEW</h1>
    <NewForm post={newPost}/>
    <Link href='/posts'>Back to All Posts</Link>
    </div>
  );
}
