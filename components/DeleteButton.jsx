"use client";

import {toast} from 'react-toastify'

export default function DeleteButton({id, authorId}) {

  async function handleClick(){
    console.log('DELETE')
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, authorId})
      })
      const result = await res.json()
      console.log(result);

      //delete toast
      toast('Post Deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

      //sends back to the index page with hard reload
    window.location.href = "/posts"

}

  return (
    <>
      <button onClick={handleClick} className='float-right hover:text-red-500 hover:underline'>Delete</button>
    </>
  );
}
