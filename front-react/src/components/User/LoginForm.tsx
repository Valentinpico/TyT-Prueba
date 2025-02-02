import { loginType } from "../../types/types.user";
import { Dispatch, SetStateAction } from "react";
import { Input } from "../Inputs/Input";

type LoginFormProps = {
  LoginState: loginType;
  setLoginState: Dispatch<SetStateAction<loginType>>;
  showError: boolean;
};

export const LoginForm = ({
  LoginState,
  setLoginState,
  showError,
}: LoginFormProps) => {
  return (
    <>
      <Input
        label="Email o Username"
        name="emailOrUsername"
        value={LoginState.Username}
        type="text"
        onChange={(e) =>
          setLoginState({
            ...LoginState,
            Username: e.target.value,
            Email: e.target.value,
          })
        }
        placeholder="Username o email"
        validate={(value) => value.length > 0}
        showError={showError}
      />
      <Input
        label="Contraseña"
        name="password"
        value={LoginState.Password}
        type="password"
        onChange={(e) =>
          setLoginState({ ...LoginState, Password: e.target.value })
        }
        validate={(value) => value.length > 0}
        placeholder="Contraseña"
        showError={showError}
        maxLength={10}
        minLength={4}
      />
    </>
  );
};
