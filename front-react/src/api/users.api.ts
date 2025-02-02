import { responseApiType } from "../types/types";
import { loginType, UserDraftType } from "../types/types.user";

import { API_URL } from "../utils/constants.ts";
import { jwtDecode, JwtPayload as BaseJwtPayload } from "jwt-decode";

interface JwtPayload extends BaseJwtPayload {
  UserID: number;
}

export const createUserApi = async (user: UserDraftType) => {
  try {
    const response = await fetch(`${API_URL}/User`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: responseApiType = await response.json();
    return data;
  } catch {
    return { message: "Error en el servidor", success: false, data: null };
  }
};

export const loginUserApi = async (user: loginType) => {
  try {
    const response = await fetch(`${API_URL}/User/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: responseApiType = await response.json();
    return data;
  } catch {
    return { message: "Error en el servidor", success: false, data: null };
  }
};

export const getUserWithToDosApi = async (token: string) => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const id = decoded.UserID;

    if (!id) {
      return {
        message: "No se pudo obtener el id del token",
        success: false,
        data: null,
      };
    }
    const response = await fetch(`${API_URL}/ToDo/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data: responseApiType = await response.json();

    return data;
  } catch {
    return { message: "Error en el servidor", success: false, data: null };
  }
};
