"use client";

interface DeletePostPopProp {
  isModalOpen: boolean;
  closeModal: () => void;
  handleDelete: () => Promise<void>;
}

export default function DeletePostPop({
  isModalOpen,
  closeModal,
  handleDelete,
}: DeletePostPopProp) {
  // HANDLE SUBMIT HERE
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleDelete();
    closeModal();
  };

  const handleNo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <dialog id="deletePost" className="modal" autoFocus open={isModalOpen}>
      <form
        method="dialog"
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-2 modal-box"
      >
        <h1 className="w-full text-center">Confirm Deletion</h1>
        <div className=" justify-evenly flex my-2">
          <button className="hover:text-green-500">YES</button>
          <button className="hover:text-red-500" onClick={handleNo}>
            NO
          </button>
        </div>
      </form>
    </dialog>
  );
}

// make button inactive after click
