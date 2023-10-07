"use client";

import {toast} from 'react-toastify'
import { useState } from "react";
import DeletePostPop from '@/components/ShowPage/DeletePostPop'


export default function DeleteButton({id, authorId} : {id: string, authorId: string}) {
  const [isModalOpen, setIsModalOpen] = useState(false); //controls for popup

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deletionFunction = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`, { //api call to delete
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, authorId})
      })
      const result = await res.json()

      localStorage.setItem('result', JSON.stringify(result));

      //sends back to the index page with hard reload
    window.location.href = "/posts"
  }

  async function handleClick(){

    openModal();

}

  return (
    <>
      <button onClick={handleClick} className=' hover:text-red-500 hover:underline'>Delete</button>
    <DeletePostPop isModalOpen={isModalOpen} closeModal={closeModal} handleDelete={deletionFunction}/>
    </>
  );
}



//popup that confirms delete action