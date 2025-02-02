import { responseApiType, TodoDraft, TodoType } from "../types/types";

import { API_URL } from "../utils/constants.ts";

export const addTodoApi = async ({
  todo,
  userId,
}: {
  todo: TodoDraft;
  userId: number;
}) => {
  const todoWithUserId = { ...todo, UserID: userId };

  const token = localStorage.getItem("token");

  if (token === "") {
    return {
      message: "No hay token",
      success: false,
      data: null,
      notoken: true,
    };
  }

  console.log({ userId });
  try {
    const response = await fetch(`${API_URL}/ToDo`, {
      method: "POST",
      body: JSON.stringify(todoWithUserId),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data: responseApiType = await response.json();
    return data;
  } catch {
    return { message: "Error en el servidor", success: false, data: null };
  }
};

export const updateTodoApi = async ({
  todo,
  id,
}: {
  todo: TodoDraft;
  id: TodoType["TodoID"];
}) => {
  const token = localStorage.getItem("token");

  if (token === "") {
    return {
      message: "No hay token",
      success: false,
      data: null,
      notoken: true,
    };
  }

  const todoWithId = { ...todo, TodoID: id };

  try {
    const response = await fetch(`${API_URL}/ToDo`, {
      method: "PUT",
      body: JSON.stringify(todoWithId),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data: responseApiType = await response.json();

    return data;
  } catch {
    return { message: "Error en el servidor", success: false, data: null };
  }
};

export const deleteTodoApi = async ({ id }: { id: TodoType["TodoID"] }) => {
  const token = localStorage.getItem("token");

  if (token === "") {
    return {
      message: "No hay token",
      success: false,
      data: null,
      notoken: true,
    };
  }
  try {
    const response = await fetch(`${API_URL}/ToDo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: responseApiType = await response.json();
    return data;
  } catch {
    return { message: "Error en el servidor", success: false, data: null };
  }
};
