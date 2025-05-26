import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SimpleLayout from "../layouts/SimpleLayout";
import ExercisesHome from "../features/exercises/pages/ExercisesHome";
import CalculatorService from "../features/calculator/pages/CalculatorService";
import ExerciseDetailPage from "../features/exercises/pages/ExerciseDetailPage";

const AppRouter = ({ onLogout }: { onLogout: () => void }) => {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<SimpleLayout onLogout={onLogout} />}>
            <Route path="/exercises" element={<ExercisesHome />} />
            <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
            <Route path="/calculator" element={<CalculatorService />} />
          </Route>

          <Route path="*" element={<Navigate to="/exercises" replace />} />
        </Routes>
      </BrowserRouter>
  );
};

export default AppRouter;
