"use client";

export default function DeletePostPop({ isModalOpen, closeModal, handleDelete }) {


  //HANDLE SUBMIT HERE
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleDelete()
    closeModal()

    

  };

  const handleNo = (e) =>{
    e.preventDefault()
    closeModal()
  }


  return (
    <dialog
      id="deletePost"
      className="modal"
      autoFocus
      open={isModalOpen ? "open" : false}
    >
      <form
        method="dialog"
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-2 modal-box"
      >
        <h1 className="w-full text-center">Confirm Deletion</h1>
        <div className=" justify-evenly flex my-2">
        <button className="hover:text-green-500">YES</button>
        <button className="hover:text-red-500" onClick={handleNo}>NO</button>
        </div>
        
      </form>
    </dialog>
  );
}


//make button inactive after click