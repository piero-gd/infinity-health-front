import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SimpleLayout from "../layouts/SimpleLayout";
import ExercisesHome from "../features/exercises/pages/ExercisesHome";
import CalculatorService from "../features/calculator/pages/CalculatorService";

const AppRouter = ({ onLogout }: { onLogout: () => void }) => {
  return (
      <BrowserRouter>
        <Routes>
          
          {/* Landing (solo navbar) */}
          <Route element={<SimpleLayout onLogout={onLogout} />}>
            <Route path="/" element={<ExercisesHome />} />
          </Route>

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
  );
};

export default AppRouter;
