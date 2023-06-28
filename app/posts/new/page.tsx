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
    <div className='flex flex-col items-center justify-center h-screen'>
    <h1>NEW POST</h1>
    <NewForm post={newPost}/>
    </div>
  );
}


{/* <Link href='/posts' className='bg-gray-100 text-black btn hover:bg-sky-500'>Back to all Posts</Link> */}
