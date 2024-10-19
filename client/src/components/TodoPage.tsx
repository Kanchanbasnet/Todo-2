import axios from "axios";
import { useEffect, useState } from "react";
import { Todo } from "../types/TodoTypes";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import DeleteModel from "./DeleteModel";
import AddTaskItem from "./AddTaskItem";
import AddEditModal from "./AddEditModal";

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTodo, setDeleteTodo] = useState<Todo | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/tasks?email=${email}`
      );
      console.log("Response:::", response.data);
      setTodos(response.data.tasks);
    } catch (error) {
      console.error("Failed to fetch the todo list:::", error);
    }
  };

  const handleEdit = async (todo: Todo) => {
    setEditTodo(todo);
    setIsEditModalOpen(true);
    console.info("Edit Todo::", todo);
  };

  const confirmDelete = (todo: Todo) => {
    setIsDeleteModalOpen(true);
    setDeleteTodo(todo);
  };

  const handleDelete = async () => {
    try {
      if (deleteTodo) {
        await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/tasks`, {
          data: {
            email: email as string,
            taskId: deleteTodo.id,
          },
        });
        toast.success("Todo deleted successfully.");
        getTodos();
      }
    } catch (error) {
      toast.error("Failed to delete Todo. Please Try again Later.");
      console.error("Failed to delete Todo:::", error);
    }
    setIsDeleteModalOpen(false);
  };

  const handleCancel = ()=>{
    setIsEditModalOpen(false)
    setEditTodo(null)
  }

  const handleEditTask = async (data: any) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/tasks/update`,
        {
          email: email as string,
          taskId: editTodo?.id,
          title: data.title,
        }
      );
      console.info("Response::", response);
      toast.success("Task updated successfully.");
      setEditTodo(null);
      setIsEditModalOpen(false);
      getTodos();
    } catch (error) {
      console.error(`Failed to update task. Please try again later.`, error);
      toast.error("Failed to update task. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md">

        <AddTaskItem />

        {todos.length > 0 ? (
          <ul className="space-y-4 w-full mt-4">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="p-3 border rounded-lg border-gray-300 flex justify-between items-center"
              >
                <span className="font-medium">{todo.title}</span>
                <div className="flex gap-3">
                  <Pencil
                    className="cursor-pointer text-green-400 hover:text-green-600"
                    size={20}
                    onClick={() => handleEdit(todo)}
                  />
                  <Trash2
                    className="cursor-pointer text-red-600 hover:text-red-800"
                    size={20}
                    onClick={() => confirmDelete(todo)}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Todos Found.</p>
        )}
      </div>

      <DeleteModel
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />

      <AddEditModal
      key={editTodo?.id }
        isOpen={isEditModalOpen}
        isEditing={true}
        onClose={handleCancel}
        onSubmit={handleEditTask}
        initialData={editTodo ? { title: editTodo.title } : { title: "" }}
      />
    </div>
  );
};

export default TodoPage;
