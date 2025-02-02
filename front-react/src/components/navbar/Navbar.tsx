import { useStoreUser } from "../../store/useStoreUser";

export const Navbar = () => {
  const token = useStoreUser((state) => state.token);
  const setToken = useStoreUser((state) => state.setToken);
  const user = useStoreUser((state) => state.user);
  const haveToken = token !== "";

  const handleCerrarSesion = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-white text-lg font-semibold hover:cursor-pointer">
          TO-DO APP
        </span>

        <div className="flex items-center space-x-4">
          {haveToken ? (
            <>
              <a
                href="#"
                className="text-gray-300 hover:text-white hover:underline"
              >
                Inicio
              </a>

              <span className="text-gray-300">Bienvenido, {user.Username}</span>

              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={handleCerrarSesion}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <div className="text-white uppercase font-bold text-2xl">
                LOGIN
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
