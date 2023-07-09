"use client";

import {toast} from 'react-toastify'
import { useState } from "react";
import DeletePostPop from '@/components/DeletePostPop'


export default function DeleteButton({id, authorId}) {
  const [isModalOpen, setIsModalOpen] = useState(false); //controls for popup

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deletionFunction = async () => {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, { //api call to delete
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, authorId})
      })
      const result = await res.json()
      console.log(result);

      localStorage.setItem('result', JSON.stringify(result));

      //sends back to the index page with hard reload
    window.location.href = "/posts"
  }

  async function handleClick(){

    openModal();

}

  return (
    <>
      <button onClick={handleClick} className='float-right hover:text-red-500 hover:underline'>Delete</button>
    <DeletePostPop isModalOpen={isModalOpen} closeModal={closeModal} handleDelete={deletionFunction}/>
    </>
  );
}



//popup that confirms delete action