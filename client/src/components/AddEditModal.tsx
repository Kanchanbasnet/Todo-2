import React from "react";
import {
  addTaskSchema,
  updateTaskSchema,
} from "../schemas/addEditTaskSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddEditModalProps {
  isOpen: boolean;
  isEditing: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  initialData?: {title: string };
}

const AddEditModal: React.FC<AddEditModalProps> = ({
  isOpen,
  isEditing = false,
  onClose,
  onSubmit,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: "onSubmit",
    resolver: zodResolver(isEditing ? updateTaskSchema : addTaskSchema),
    defaultValues: initialData,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-xl font-bold mb-6">
            {isEditing ? "Update Task" : "Add Task"}
          </h1>

          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title")}
              placeholder="Enter task title"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message?.toString()}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-950 text-white px-4 py-2 rounded-md"
            >
              {isEditing ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditModal;
