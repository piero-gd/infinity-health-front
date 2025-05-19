import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SimpleLayout from "../layouts/SimpleLayout";
import AppLayout from "../layouts/AppLayout";
import RoutinesHome from "../features/routines/pages/RoutinesHome";
import RoutinePlayerPage from "../features/routines/pages/RoutinePlayerPage";
import { RoutinesProvider } from "../features/routines/context/RoutinesContext";
import CalculatorService from "../features/calculator/pages/CalculatorService";
const AppRouter = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <RoutinesProvider>
      <BrowserRouter>
        <Routes>
          
          {/* Landing (solo navbar) */}
          {/* <Route element={<SimpleLayout onLogout={onLogout} />}>
            <Route path="/" element={<RoutinesHome />} />
          </Route> */}

          {/* Resto de app (navbar + sidebar) */}
          {/* <Route element={<AppLayout onLogout={onLogout} />}>
            <Route
              path="/routines/:index"
              element={<RoutinePlayerPage onLogout={onLogout} />}
            />
          </Route> */}

          {/*PRUEBAS JEMIMA
{/* Landing (solo navbar) */}
          <Route element={<SimpleLayout onLogout={onLogout} />}>
            <Route path="/" element={<CalculatorService />} />
          </Route>

          {/* Redirigir cualquier otra ruta */}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </RoutinesProvider>
  );
};

export default AppRouter;
