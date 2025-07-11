import { ToastContainer } from "react-toastify";
import AppRouter from "./routes/AppRouter";
function App() {
  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <>
      <AppRouter onLogout={handleLogout} />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
