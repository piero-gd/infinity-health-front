import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SimpleLayout from "../layouts/SimpleLayout";
import ExercisesHome from "../features/exercises/pages/ExercisesHome";
import CalculatorPage from "../features/calculator/pages/CalculatorPage";
import ExerciseDetailPage from "../features/exercises/pages/ExerciseDetailPage";
import TestLayout from "../layouts/TestLayout";
import LoginPage from "../features/temporalLogin/pages/LoginPage";
import DetailPage from "../features/ecommerce/productDetail/pages/DetailPage";
import CatalogPage from "../features/ecommerce/catalog/pages/CatalogPage";
import CartPage from "../features/ecommerce/cart/pages/CartPage";

const AppRouter = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SimpleLayout onLogout={onLogout} />}>
          <Route path="/exercises" element={<ExercisesHome />} />
          <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<TestLayout onLogout={onLogout} />}>
          {/* Rutas de ecommerce */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:productId" element={<DetailPage />} />
          
          {/* Redirección temporal para pruebas */}
          <Route path="/" element={<Navigate to="/catalog" replace />} />
          
          {/* Redirección para cualquier otra ruta */}
          <Route path="*" element={<Navigate to="/catalog" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
