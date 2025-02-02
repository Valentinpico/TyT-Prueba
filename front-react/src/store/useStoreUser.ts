import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { UserDTO } from "../types/types.user";

export type UtilsStoreUser = {
  token: string;
  setToken: (token: string) => void;
  user: UserDTO;
  setUser: (user: UserDTO) => void;
};

export const useStoreUser = create<UtilsStoreUser>()(
  devtools((set) => ({
    token: "",
    setToken: (token) => set({ token }),
    user: {
      UserID: 0,
      Username: "",
      Email: "",
    },
    setUser: (user) => set({ user }),
  }))
);
