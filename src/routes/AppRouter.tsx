import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SimpleLayout from "../layouts/SimpleLayout";
import ExercisesHome from "../features/exercises/pages/ExercisesHome";
import CalculatorPage from "../features/calculator/pages/CalculatorPage";
import ExerciseDetailPage from "../features/exercises/pages/ExerciseDetailPage";
import TestLayout from "../layouts/TestLayout";
import LoginPage from "../features/temporalLogin/pages/LoginPage";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryFallback } from "../components/ErrorBoundaryFallback";

const AppRouter = ({ onLogout }: { onLogout: () => void }) => {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<SimpleLayout onLogout={onLogout} />}>
            <Route
              path="/exercises"
              element={
                <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                  <ExercisesHome />
                </ErrorBoundary>
              }
            />
            <Route
              path="/exercises/:id"
              element={
                <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                  <ExerciseDetailPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/calculator"
              element={
                <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                  <CalculatorPage />
                </ErrorBoundary>
              }
            />
          </Route>

        {/* cambio temporal
         <Route path="*" element={<Navigate to="/exercises" replace />} />
         */}
          <Route element={<TestLayout onLogout={onLogout}/>}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Route>

        </Routes>
      </BrowserRouter>
  );
};

export default AppRouter;
