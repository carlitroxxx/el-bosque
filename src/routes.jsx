// src/routes.jsx
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/vista-admin/Dashboard";
import Productos from "./pages/vista-admin/Productos";
import Usuarios from "./pages/vista-admin/Usuarios";
import Catalogo from "./pages/Catalogo";
import Nosotros from "./pages/Nosotros";
import Blogs from "./pages/Blogs";
import Detalle1 from "./pages/Detalle1";
import Detalle2 from "./pages/Detalle2";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import React, { useEffect } from "react";

function getSession() {
  try { return JSON.parse(localStorage.getItem("session")); }
  catch { return null; }
}

function RequireAdmin({ children }) {
  const session = getSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!session?.loggedIn) {
      navigate("/login", { replace: true, state: { from: location } });
      return;
    }
    if (session.rol !== "ADMINISTRADOR") {
      window.alert("Tu usuario no tiene acceso a esta página.");
      navigate("/", { replace: true });
    }
  }, [session, navigate, location]);

  if (!session?.loggedIn || session.rol !== "ADMINISTRADOR") return null;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/detalle1" element={<Detalle1 />} />
      <Route path="/detalle2" element={<Detalle2 />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* Admin con popup si no tiene permisos */}
      <Route
        path="/dashboard"
        element={
          <RequireAdmin>
            <Dashboard />
          </RequireAdmin>
        }
      />
      <Route
        path="/productos"
        element={
          <RequireAdmin>
            <Productos />
          </RequireAdmin>
        }
      />
      <Route
        path="/usuarios"
        element={
          <RequireAdmin>
            <Usuarios />
          </RequireAdmin>
        }
      />
    </Routes>
  );
}
