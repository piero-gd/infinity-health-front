import { Routes, Route, Navigate } from "react-router-dom";
import SimpleLayout from "../layouts/SimpleLayout";
import ExercisesHome from "../features/exercises/pages/ExercisesHome";
import CalculatorPage from "../features/calculator/pages/CalculatorPage";
import ExerciseDetailPage from "../features/exercises/pages/ExerciseDetailPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage"; 
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import AcademyPage from "../features/academy/pages/AcademyPage";
import VerificationPage from "../features/auth/pages/VerificationPage";
import ConfirmationPage from "../features/auth/pages/ConfirmationPage";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import ForgotPassPage from "../features/auth/pages/ForgotPassPage";
import NewPassPage from "../features/auth/pages/NewPassPage";
import EcommerceLayout from "../layouts/EcommerceLayout";
import DetailPage from "../features/ecommerce/productDetail/pages/DetailPage";
import CatalogPage from "../features/ecommerce/catalog/pages/CatalogPage";
import CartPage from "../features/ecommerce/cart/pages/CartPage";
import ShipmentPage from "../features/ecommerce/checkout/pages/ShipmentPage";
import PaymentPage from "../features/ecommerce/checkout/pages/PaymentPage";
import ThankYouPage from "../features/ecommerce/checkout/pages/ThankYouPage";
import SimulatedPaymentPage from "../features/ecommerce/checkout/pages/SimulatedPaymentPage";
import PaymentResultPage from "../features/ecommerce/checkout/pages/PaymentResultPage";
import { withErrorBoundary } from "../utils/withErrorBoundary";

// Aplicamos el HOC withErrorBoundary a los componentes de página
const ProtectedExercisesHome = withErrorBoundary(ExercisesHome);
const ProtectedExerciseDetailPage = withErrorBoundary(ExerciseDetailPage);
const ProtectedAcademyPage = withErrorBoundary(AcademyPage);
const ProtectedCalculatorPage = withErrorBoundary(CalculatorPage);
const ProtectedDashboardPage = withErrorBoundary(DashboardPage);

// Componentes de e-commerce con ErrorBoundary
const SafeCartPage = withErrorBoundary(CartPage);
const SafeCatalogPage = withErrorBoundary(CatalogPage);
const SafeDetailPage = withErrorBoundary(DetailPage);
const SafeThankYouPage = withErrorBoundary(ThankYouPage);

const SafeShipmentPage = withErrorBoundary(ShipmentPage);
const SafePaymentPage = withErrorBoundary(PaymentPage);
const SafeSimulatedPaymentPage = withErrorBoundary(SimulatedPaymentPage);
const SafePaymentResultPage = withErrorBoundary(PaymentResultPage);
import ProfilePage from "../features/ecommerce/profle/pages/ProfilePage";

const AppRouter = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <Routes>
      {/* ===== RUTAS DE AUTENTICACIÓN (SIN LAYOUT) ===== */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Confirmación de correo (después del registro) */}
      <Route
        path="/mail-confirmation"
        element={
          <ProtectedRoute allowedFrom="/register" requireAuth={false}>
            <VerificationPage />
          </ProtectedRoute>
        }
      />

      {/* Confirmación de registro (desde el enlace de correo) */}
      <Route path="/register-confirmation" element={<ConfirmationPage />} />

      {/* Rutas de contraseña */}
      <Route path="/forgot-password" element={<ForgotPassPage />} />
      <Route path="/new-password/:uid/:token" element={<NewPassPage />} />

      {/* ===== RUTAS PROTEGIDAS CON SIMPLE LAYOUT ===== */}
      <Route element={
        <ProtectedRoute requireAuth><SimpleLayout onLogout={onLogout} /></ProtectedRoute>
      }>
        
        <Route path="/academy/course/:id" element={<ProtectedAcademyPage />} />
        { /* Redirigir a curso 1 por defecto */ }
        <Route path="/academy" element={<Navigate to="/academy/course/1" replace />} />
        <Route path="/calculator" element={<ProtectedCalculatorPage />} />
        <Route path="/exercises" element={<ProtectedExercisesHome />} />
        <Route path="/exercises/:id" element={<ProtectedExerciseDetailPage />} />
        <Route path="/dashboard" element={<ProtectedDashboardPage />} />

      </Route>

      {/* ===== RUTAS DE E-COMMERCE (CON LAYOUT PROPIO) ===== */}
      <Route element={<EcommerceLayout onLogout={onLogout} />}>
        <Route path="/cart" element={<SafeCartPage />} />
        <Route path="/catalog" element={<SafeCatalogPage />} />
        <Route path="/product/:slug" element={<SafeDetailPage />} />
        <Route path="/checkout/shipping" element={<SafeShipmentPage />} />
        <Route path="/checkout/payment" element={<SafePaymentPage />} />
        <Route path="/checkout/simulated-payment" element={<SafeSimulatedPaymentPage />} />
        <Route path="/checkout/payment-result" element={<SafePaymentResultPage />} />
        <Route path="/checkout/thankyou" element={<SafeThankYouPage />} />

        {/* Perfil de usuario PROTECTED */}
        <Route path="/profile" element={
          <ProtectedRoute requireAuth>
            <ProfilePage />
          </ProtectedRoute>
        } />
      </Route>

      {/* ===== REDIRECCIONES ===== */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>


       
  );
};

export default AppRouter;
