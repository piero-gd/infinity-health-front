import { Routes, Route, Navigate } from "react-router-dom";
import SimpleLayout from "../layouts/SimpleLayout";
import ExercisesHome from "../features/exercises/pages/ExercisesHome";
import CalculatorPage from "../features/calculator/pages/CalculatorPage";
import ExerciseDetailPage from "../features/exercises/pages/ExerciseDetailPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
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
import CheckoutConfirmationPage from "../features/ecommerce/checkout/pages/ConfirmationPage";
import ThankYouPage from "../features/ecommerce/thankyou/pages/ThankYouPage";
import { withErrorBoundary } from "../utils/withErrorBoundary";

// Aplicamos el HOC withErrorBoundary a los componentes de página
const ProtectedExerciseDetailPage = withErrorBoundary(ExerciseDetailPage);
const ProtectedAcademyPage = withErrorBoundary(AcademyPage);
const ProtectedCalculatorPage = withErrorBoundary(CalculatorPage);
const ProtectedExercisesHome = withErrorBoundary(ExercisesHome);

// Componentes de e-commerce con ErrorBoundary
const SafeCartPage = withErrorBoundary(CartPage);
const SafeCatalogPage = withErrorBoundary(CatalogPage);
const SafeDetailPage = withErrorBoundary(DetailPage);
const SafeThankYouPage = withErrorBoundary(ThankYouPage);

const SafeShipmentPage = withErrorBoundary(ShipmentPage);
const SafePaymentPage = withErrorBoundary(PaymentPage);
const SafeCheckoutConfirmationPage = withErrorBoundary(CheckoutConfirmationPage);
import ProfilePage from "../features/ecommerce/profle/pages/ProfilePage";

const AppRouter = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <Routes>
      {/* ===== RUTAS DE AUTENTICACIÓN (SIN LAYOUT) ===== */}
      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Registro */}
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

      {/* Recuperación de contraseña */}
      <Route path="/forgot-password" element={<ForgotPassPage />} />

      {/* Nueva contraseña */}
      <Route path="/new-password/:uid/:token" element={<NewPassPage />} />

      {/* ===== RUTAS PROTEGIDAS CON SIMPLE LAYOUT ===== */}
      <Route
        element={
          <ProtectedRoute requireAuth>
            <SimpleLayout onLogout={onLogout} />
          </ProtectedRoute>
        }
      >
        {/* Detalle de ejercicio */}
        <Route
          path="/exercises/:id"
          element={<ProtectedExerciseDetailPage />}
        />

        {/* Cursos de academia */}
        <Route path="/academy/course/:id" element={<ProtectedAcademyPage />} />
        
        {/* Calculadora */}
        <Route
          path="/calculator"
          element={
            <ProtectedRoute requireAuth>
              <ProtectedCalculatorPage />
            </ProtectedRoute>
          }
        />

        {/* Academia - redireccionamiento */}
        <Route
          path="/academy"
          element={
            <ProtectedRoute requireAuth>
              <Navigate to="/academy/course/1" replace />
            </ProtectedRoute>
          }
        />

        {/* Ejercicios - listado */}
        <Route
          path="/exercises"
          element={
            <ProtectedRoute requireAuth>
              <ProtectedExercisesHome />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ===== RUTAS DE E-COMMERCE (CON LAYOUT PROPIO) ===== */}
      <Route element={<EcommerceLayout onLogout={onLogout} />}>
        <Route path="/cart" element={<SafeCartPage />} />
        <Route path="/catalog" element={<SafeCatalogPage />} />
        <Route path="/product/:slug" element={<SafeDetailPage />} />
        <Route path="/checkout/shipping" element={<SafeShipmentPage />} />
        <Route path="/checkout/payment" element={<SafePaymentPage />} />
        <Route path="/checkout/confirmation" element={<SafeCheckoutConfirmationPage />} />
        <Route path="/thankyou" element={<SafeThankYouPage />} />

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
