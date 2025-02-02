import { TodoForm } from "./components/Todo/TodoForm";
import { ModalDefault } from "./components/Modal/Modal";
import { TodoList } from "./components/Todo/TodoList";
import { Navbar } from "./components/navbar/Navbar";
import { Toast } from "./components/toast/toast";
import { useStoreUtils } from "./store/useStoreUtils";
import { FormUser } from "./components/User/FormUser";
import { useEffect } from "react";
import { useStoreUser } from "./store/useStoreUser";
import { PieChart } from "./components/Chart/PieChart";

function App() {
  const token = useStoreUser((state) => state.token);
  const setToken = useStoreUser((state) => state.setToken);
  const toast = useStoreUtils((state) => state.toast);
  const setToast = useStoreUtils((state) => state.setToast);

  const haveToken = token !== "";

  useEffect(() => {
    const tokenItem = localStorage.getItem("token");
    if (tokenItem) {
      setToken(tokenItem);
    }
  }, []);
  return (
    <>
      <Navbar />

      {!haveToken ? (
        <div className="flex justify-center h-screen items-center ">
          <FormUser />
        </div>
      ) : (
        <div className="mt-20 mx-auto  w-11/12 flex flex-col-reverse xl:flex-row sm:w-10/12 md:w-10/12 xl:w-10/12 lg:w-10/12 justify-center items-center gap-4 ">
          <div className="bg-slate-100 p-4 rounded-md w-full lg:w-1/2 ">
            <TodoList />
          </div>

          <div className="bg-slate-100 p-4 rounded-md w-full lg:w-1/2">
            <PieChart />
          </div>
        </div>
      )}
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        duration={3000}
        onClose={() =>
          setToast({ message: "", type: "success", isVisible: false })
        }
      />
      <ModalDefault>
        <TodoForm />
      </ModalDefault>
    </>
  );
}

export default App;
