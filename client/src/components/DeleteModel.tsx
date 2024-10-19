import React from "react";

interface DeleteModelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModel: React.FC<DeleteModelProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;
  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 bg-black bg-opacity-60">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h3 className="text-2xl text-red-500 font-semibold">Confirm Delete</h3>
        <p>Are you sure you want to delete the task?</p>
        <div className="mt-4 float-end">
          <button
            className="text-gray-600 mr-2 hover:text-gray-800"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded-md  hover:bg-red-800"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
