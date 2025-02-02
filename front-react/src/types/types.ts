export type TodoType = {
  TodoID: number;
  Title: string;
  Completed: boolean;
  CreatedAt: string;
};

export type TodoDraft = Omit<TodoType, "TodoID">;

export type TypeToastType = "success" | "error" | "info" | "warning";

export type ToastType = {
  isVisible: boolean;
  message: string;
  type: TypeToastType;
  duration?: number;
  onClose?: () => void;
};

export type responseApiType = {
  data: any;
  message: string;
  success: boolean;
  notoken?: boolean;
};
