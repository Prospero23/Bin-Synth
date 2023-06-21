"use client";
import {redirect} from 'next/navigation'

export default function DeleteButton({id}) {

  async function handleClick(){
    console.log('DELETE')
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id})
      })
      const result = await res.json()
      console.log(result);
      //sends back to the index page with hard reload
    window.location.href = "/posts"

}

  return (
    <>
      <button onClick={handleClick} className='float-right'>Delete</button>
    </>
  );
}
