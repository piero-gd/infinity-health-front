import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./features/auth/stores/useAuthStore";
import { BrowserRouter } from "react-router-dom";

function App() {
  const logout = useAuthStore(state => state.logout);
  
  const handleLogout = () => {
    console.log("Logout");
    logout();
    // La navegación a /login se maneja dentro de los componentes que usan onLogout
  };

  return (
    <BrowserRouter>
      <AppRouter onLogout={handleLogout} />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
