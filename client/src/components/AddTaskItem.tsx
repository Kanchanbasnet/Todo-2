import { useState } from "react";
import AddEditModal from "./AddEditModal";
import axios from "axios";
import { toast } from "react-toastify";

const AddTaskItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleAddTask = async (data: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/tasks`,
        {
          email: localStorage.getItem("userEmail"),
          title: data.title,
        }
      );
      console.log("response::", response);
      toast.success("Task added successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error::", error);
    }
  };
  return (
    <div>
      <button
        className="bg-blue-950 text-white p-3 border rounded-lg"
        type="button"
        onClick={handleOpenModal}
      >
        Add Tasks
      </button>
      <AddEditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isEditing={false}
        onSubmit={handleAddTask}
      />
    </div>
  );
};

export default AddTaskItem;
