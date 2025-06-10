import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SimpleLayout from "../layouts/SimpleLayout";
import ExercisesHome from "../features/exercises/pages/ExercisesHome";
import CalculatorPage from "../features/calculator/pages/CalculatorPage";
import ExerciseDetailPage from "../features/exercises/pages/ExerciseDetailPage";
import TestLayout from "../layouts/TestLayout";
import LoginPage from "../features/temporalLogin/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";

const AppRouter = ({ onLogout }: { onLogout: () => void }) => {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<SimpleLayout onLogout={onLogout} />}>
            <Route path="/exercises" element={<ExercisesHome />} />
            <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
          </Route>

        {/* cambio temporal
         <Route path="*" element={<Navigate to="/exercises" replace />} />
         */}
          <Route element={<SimpleLayout onLogout={onLogout}/>}>
            <Route path="/dashboard" element={<DashboardPage />} />
          {/*   <Route path="*" element={<Navigate to="/dashboard" replace />} /> */}
          </Route>

        </Routes>
      </BrowserRouter>
  );
};

export default AppRouter;
