import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { protectedRoutes } from "./routesConfig";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./components/Usuario/Login"; // Ruta pública
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./AuthContext";
import { SearchProvider } from "./components/shared/SearchContext"; // Importa el SearchProvider

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <Routes>
            <Route path="/" element={<Login />} />

            {/* Rutas protegidas */}
            {protectedRoutes.map(({ path, component }) => (
              <Route
                key={path}
                path={path}
                element={<ProtectedRoute>{component}</ProtectedRoute>}
              />
            ))}

            {/* Redirección para rutas no encontradas */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          <ToastContainer />
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
