import { useEffect, useState } from "react";
import { Input } from "../Inputs/Input";
import { TodoDraft } from "../../types/types";
import { useTodoStore } from "../../store/useTodoStore";
import { useStoreUtils } from "../../store/useStoreUtils";
import { addTodoApi, updateTodoApi } from "../../api/toDo.api";
import { useStoreUser } from "../../store/useStoreUser";

const initialTodoState: TodoDraft = {
  Title: "",
  Completed: false,
  CreatedAt: "",
};

export const TodoForm = () => {
  const setToken = useStoreUser((state) => state.setToken);
  const userId = useStoreUser((state) => state.user.UserID);

  //Estados globales de la aplicacion
  const showModal = useStoreUtils((state) => state.showModal);
  const setToast = useStoreUtils((state) => state.setToast);

  const updateTodo = useTodoStore((state) => state.updateTodo);
  const addtodo = useTodoStore((state) => state.addTodo);
  const todoSelected = useTodoStore((state) => state.todoSelected);
  const setTodoSelected = useTodoStore((state) => state.setTodoSelected);
  //Stados de la aplicacion
  const [todo, setTodo] = useState<TodoDraft>(initialTodoState);
  const [error, setError] = useState(false);

  const handleClick = async () => {
    const isValid = validateInputs();
    if (!isValid) {
      setToast({
        message: "El título no puede estar vacío.",
        type: "error",
        isVisible: true,
        duration: 3000,
      });
      setError(true);
      return;
    }

    const res =
      todoSelected === null
        ? await addTodoApi({ todo, userId })
        : await updateTodoApi({ todo, id: todoSelected.TodoID });

    if (!res.success) {
      setToast({
        message: res.message,
        type: "error",
        isVisible: true,
        duration: 3000,
      });

      if (res.notoken) {
        localStorage.removeItem("token");
        setToken("");
        showModal(false);
        setTodoSelected(null);
        setTodo(initialTodoState);
        return;
      }

      return;
    }
    if (todoSelected === null) {
      const formatTodo = {
        ...todo,
        Completed: res.data.completed,
        TodoID: res.data.todoID,
        CreatedAt: res.data.createdAt,
        Title: res.data.title,
      };
      addtodo(formatTodo);
    } else {
      updateTodo({ ...todo, TodoID: todoSelected.TodoID });
    }

    setTodo(initialTodoState);
    setTodoSelected(null);

    showModal(false);
    setToast({
      message: todoSelected ? "To-Do actualizado" : "To-Do añadido",
      type: "success",
      isVisible: true,
      duration: 3000,
    });
  };

  const validateInputs = () => {
    const validTitle = todo.Title.length > 0;
    return validTitle;
  };

  useEffect(() => {
    if (todoSelected) {
      setTodo({
        Title: todoSelected.Title,
        Completed: todoSelected.Completed,
        CreatedAt: todoSelected.CreatedAt,
      });
    }
  }, [todoSelected]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-blue-500 uppercase text-center">
        {todoSelected ? "Editar To-Do" : "Añadir To-Do"}
      </h2>
      <div className="mb-4">
        <Input
          name="todo"
          label="Título:"
          value={todo.Title}
          type="text"
          placeholder="Introduza un titulo "
          onChange={(e) => setTodo({ ...todo, Title: e.target.value })}
          validate={(value) => value.length > 0}
          errorMessage="El título no puede estar vacío."
          showError={error}
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition w-full "
          type="button"
          onClick={() => showModal(false)}
        >
          Cancelar
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition w-full"
          type="button"
          onClick={handleClick}
        >
          {todoSelected ? "Actualizar" : "Añadir"}
        </button>
      </div>
    </>
  );
};
