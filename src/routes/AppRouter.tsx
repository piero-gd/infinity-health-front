import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SimpleLayout from "../layouts/SimpleLayout";
import ExercisesHome from "../features/exercises/pages/ExercisesHome";
import CalculatorPage from "../features/calculator/pages/CalculatorPage";
import ExerciseDetailPage from "../features/exercises/pages/ExerciseDetailPage";
import LoginPage from "../features/temporalLogin/pages/LoginPage";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryFallback } from "../components/ErrorBoundaryFallback";
import AcademyPage from "../features/academy/pages/AcademyPage";
import TestLayout from "../layouts/TestLayout";
import EcommerceLayout from "../layouts/EcommerceLayout";

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
          <Route
            path="/academy"
            element={
              <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                <Navigate to="/academy/course/1" replace />
              </ErrorBoundary>
            }
          />
          <Route
            path="/academy/course/:id"
            element={
              <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                <AcademyPage />
              </ErrorBoundary>
            }
          />
        </Route>

        <Route element={<EcommerceLayout onLogout={onLogout} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
