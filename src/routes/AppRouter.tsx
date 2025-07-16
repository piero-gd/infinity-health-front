import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SimpleLayout from "../layouts/SimpleLayout";
import ExercisesHome from "../features/exercises/pages/ExercisesHome";
import CalculatorPage from "../features/calculator/pages/CalculatorPage";
import ExerciseDetailPage from "../features/exercises/pages/ExerciseDetailPage";
//import TestLayout from "../layouts/TestLayout";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryFallback } from "../components/ErrorBoundaryFallback";
import AcademyPage from "../features/academy/pages/AcademyPage";
import VerificationPage from "../features/auth/pages/VerificationPage";
import ConfirmationPage from "../features/auth/pages/ConfirmationPage";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import ForgotPassPage from "../features/auth/pages/ForgotPassPage";
import NewPassPage from "../features/auth/pages/NewPassPage";

const AppRouter = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={
          <ProtectedRoute requireAuth>
            <SimpleLayout onLogout={onLogout} />
          </ProtectedRoute>
        }>
        {/*   <Route
            path="/exercises"
            element={
              <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                <ExercisesHome />
              </ErrorBoundary>
            }
          />  */}
          <Route
            path="/exercises/:id"
            element={
              <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                <ExerciseDetailPage />
              </ErrorBoundary>
            }
          />
      {/*     <Route
            path="/calculator"
            element={
              <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                <CalculatorPage />
              </ErrorBoundary>
            }
          />
 */}
        {/*   <Route
            path="/academy"
            element={
              <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                <Navigate to="/academy/course/1" replace />
              </ErrorBoundary>
            }
          /> */}
          <Route
            path="/academy/course/:id"
            element={
              <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                <AcademyPage />
              </ErrorBoundary>
            }
          />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Mail confirmation page (after registration) */}
        <Route 
          path="/mail-confirmation" 
          element={
            <ProtectedRoute 
              allowedFrom="/register"
              requireAuth={false}
            >
              <VerificationPage />
            </ProtectedRoute>
          } 
        />

<Route 
          path="/calculator"
          element={
            <ProtectedRoute 
              allowedFrom="/login"
              requireAuth={true}
            >
              <CalculatorPage />
            </ProtectedRoute>
          } 
          />

          <Route 
          path="/academy"
          element={
            <ProtectedRoute 
              allowedFrom="/login"
              requireAuth={true}
            >
              <CalculatorPage />
            </ProtectedRoute>
          } 
          />

          <Route 
          path="/exercises"
          element={
            <ProtectedRoute 
              allowedFrom="/login"
              requireAuth={true}
            >
              <ExercisesHome />
            </ProtectedRoute>
          } 
          />


        
        {/* Email confirmation link (from email) */}
        <Route 
          path="/register-confirmation" 
          element={
            <ConfirmationPage />
          } 
        />

        {/* Forgot Password */}
        <Route 
          path="/forgot-password" 
          element={
            <ForgotPassPage />
          } 
        />

        {/* New Password */}
        <Route 
          path="/new-password/:token?" 
          element={
            <NewPassPage />
          } 
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
