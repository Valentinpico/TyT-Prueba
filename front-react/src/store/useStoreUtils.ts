import { create } from "zustand";
import { ToastType } from "../types/types";

export type UtilsStoreType = {
  modal: boolean;
  showModal: (show: boolean) => void;
  toast: ToastType;
  setToast: (show: ToastType) => void;
};

export const useStoreUtils = create<UtilsStoreType>((set) => ({
  modal: false,
  showModal: (show) => {
    set({ modal: show });
  },
  toast: { message: "", type: "success", isVisible: false },
  setToast: (toast) => {
    set({ toast: toast });
  },
}));
