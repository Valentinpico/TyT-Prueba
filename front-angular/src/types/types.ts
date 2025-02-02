export type UserAuth = {
  Username: String;
  Email: String;
  Password: String;
};

export type UserDTO = {
  UserID: number;
  Username: String;
  Email: String;
  ToDoDTO: ToDoDto[];
};

export type ToDoDto = {
  TodoID: number;
  Title: String;
  Completed: boolean;
  UserID: number;
};

export type ToDoDraft = Omit<ToDoDto, 'TodoID'>;
