import { useState } from "react";
import { loginType, UserDraftType } from "../../types/types.user";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useStoreUtils } from "../../store/useStoreUtils";
import { createUserApi, loginUserApi } from "../../api/users.api";
import { useStoreUser } from "../../store/useStoreUser";
const initialUserState: UserDraftType = {
  Email: "",
  Username: "",
  Password: "",
  password2: "",
};
const initialLoginState: loginType = {
  Email: "",
  Username: "",
  Password: "",
};
export const FormUser = () => {
  const setToast = useStoreUtils((state) => state.setToast);
  const setToken = useStoreUser((state) => state.setToken);

  const [user, setUser] = useState<UserDraftType>(initialUserState);
  const [LoginState, setLoginState] = useState<loginType>(initialLoginState);
  const [showError, setShowError] = useState(false);

  const [register, setRegister] = useState(false);

  const handleRegisterMode = () => {
    setRegister(!register);
    setShowError(false);
    setUser(initialUserState);
    setLoginState(initialLoginState);
  };

  const handleSubmmit = () => {
    if (!register) {
      loginSubmit();
      return;
    }
    registerSubmit();
  };

  const loginSubmit = async () => {
    if (
      LoginState.Email === "" ||
      LoginState.Password === "" ||
      LoginState.Username === ""
    ) {
      setToast({
        message: "Los campos son obligatorios",
        type: "error",
        isVisible: true,
      });
      setShowError(true);
      return;
    }

    const res = await loginUserApi(LoginState);

    setToast({
      message: res.message,
      type: res.success ? "success" : "error",
      isVisible: true,
    });

    if (res.success) {
      localStorage.setItem("token", res.data);
      setToken(res.data);
      return;
    }

    setShowError(false);
  };
  const registerSubmit = async () => {
    if (
      user.Email === "" ||
      user.Password === "" ||
      user.Username === "" ||
      user.password2 === "" ||
      user.Password !== user.password2
    ) {
      setToast({
        message: "Los campos son obligatorios",
        type: "error",
        isVisible: true,
      });
      setShowError(true);
      return;
    }
    const res = await createUserApi(user);
    setToast({
      message: res.message,
      type: res.success ? "success" : "error",
      isVisible: true,
    });

    if (res.success) {
      setUser(initialUserState);
      setRegister(false);
    }

    setShowError(false);
  };

  return (
    <div className="my-4 m-auto text-lg bg-slate-100 p-4 rounded-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-2/5">
      <h1 className="text-2xl uppercase font-black text-blue-700 text-center my-2">
        {register ? "Registro de usuario" : "Inicio de sesion"}
      </h1>
      <div className="flex flex-col ">
        {!register ? (
          <LoginForm
            LoginState={LoginState}
            setLoginState={setLoginState}
            showError={showError}
          />
        ) : (
          <RegisterForm user={user} setUser={setUser} showError={showError} />
        )}
        <button
          onClick={handleSubmmit}
          className="text-center bg-blue-500 text-white uppercase rounded w-full my-2 p-1  hover:bg-blue-700 transition-all "
        >
          {register ? "Registrar" : "Iniciar sesión"}
        </button>

        <div className="flex justify-center text-sm text-gray-500 mt-3">
          <span>
            {register ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
          </span>
          <button
            onClick={handleRegisterMode}
            className="text-blue-500 ml-1 hover:underline"
          >
            {register ? "Iniciar sesión" : "Registrarse"}
          </button>
        </div>
      </div>
    </div>
  );
};
