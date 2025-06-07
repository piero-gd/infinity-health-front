import { ToastContainer } from "react-toastify";
import AppRouter from "./routes/AppRouter";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryFallback } from "./components/ErrorBoundaryFallback";

function App() {
  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <>
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
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
      </ErrorBoundary>
    </>
  );
}

export default App;
