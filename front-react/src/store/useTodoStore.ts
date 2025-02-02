import { create } from "zustand";
import { TodoDraft, TodoType } from "../types/types";

export type TodoStoreType = {
  todos: TodoType[];
  setTodos: (todos: TodoType[]) => void;
  todoSelected: TodoType | null;
  setTodoSelected: (todo: TodoType | null) => void;
  addTodo: (todo: TodoDraft) => void;
  toggleTodo: (id: TodoType["TodoID"]) => void;
  deleteTodo: (id: TodoType["TodoID"]) => void;
  updateTodo: (todo: TodoType) => void;
};

export const useTodoStore = create<TodoStoreType>((set) => ({
  todos: [],
  setTodos: (todos) => {
    set(() => ({
      todos: todos,
    }));
  },
  todoSelected: null,
  setTodoSelected: (todo) => {
    set(() => ({
      todoSelected: todo,
    }));
  },
  addTodo: (todo) => {
    set((state) => ({
      todos: [
        {
          TodoID: 0,
          ...todo,
        },
        ...state.todos,
      ],
    }));
  },

  toggleTodo: (id) => {
    set((state) => {
      const todotoggle = state.todos.map((todo) =>
        todo.TodoID === id ? { ...todo, Completed: !todo.Completed } : todo
      );
      return {
        todos: todotoggle.sort((a, b) =>
          a.Completed === b.Completed ? 0 : a.Completed ? 1 : -1
        ),
      };
    });
  },

  deleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.TodoID !== id),
    }));
  },

  updateTodo: (todo) => {
    set((state) => ({
      todos: state.todos.map((t) => (t.TodoID === todo.TodoID ? todo : t)),
    }));
  },
}));
