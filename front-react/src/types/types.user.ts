export type UserType = {
  UserID: number;
  Username: string;
  Email: string;
  Password: string;
};

export type UserDraftType = Omit<UserType, "UserID"> & { password2: string };

export type loginType = {
  Username: string;
  Email: string;
  Password: string;
};

export type UserDTO = Omit<UserType, "Password">;
