// src/routes.jsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Nosotros from "./pages/Nosotros";
import Blogs from "./pages/Blogs";
import Detalle1 from "./pages/Detalle1";
import Detalle2 from "./pages/Detalle2";
import Contacto from "./pages/Contacto";
import ProductoDetalle from "./pages/ProductoDetalle";
import Login from "./pages/Login";
import Registro from "./pages/Registro";

import Dashboard from "./pages/vista-admin/Dashboard";
import Productos from "./pages/vista-admin/Productos";
import Usuarios from "./pages/vista-admin/Usuarios";
import MensajesContacto from "./pages/vista-admin/MensajesContacto";

import Carrito from "./pages/Carrito";
import ResultadoPago from "./pages/ResultadoPago";

/**
 * Lee el usuario actual desde localStorage.
 * Esperamos algo como:
 *   localStorage["usuario"] = JSON.stringify({ id, nombre, email, rol: "admin", ... })
 */
function getUsuarioActual() {
  try {
    const raw = localStorage.getItem("usuario");
    if (!raw) return null;
    const u = JSON.parse(raw);
    if (!u || typeof u !== "object") return null;
    return u;
  } catch {
    return null;
  }
}

/**
 * Componente de protección por rol.
 * - Si no hay usuario => redirige a /login
 * - Si el rol no está en la lista => redirige a /
 */
function RequiereRol({ roles, children }) {
  const location = useLocation();
  const usuario = getUsuarioActual();
  const logeado = !!usuario;

  if (!logeado) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const rolUsuario = usuario?.rol
    ? String(usuario.rol).toLowerCase()
    : null;

  const rolesNormalizados = (roles || []).map((r) =>
    String(r).toLowerCase()
  );

  if (!rolUsuario || !rolesNormalizados.includes(rolUsuario)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function Rutas() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/detalle1" element={<Detalle1 />} />
      <Route path="/detalle2" element={<Detalle2 />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/resultado-pago" element={<ResultadoPago />} />
      <Route path="/producto/:codigo" element={<ProductoDetalle />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* Rutas exclusivas de rol admin */}
      <Route
        path="/dashboard"
        element={
          <RequiereRol roles={["admin"]}>
            <Dashboard />
          </RequiereRol>
        }
      />
      <Route
        path="/productos"
        element={
          <RequiereRol roles={["admin"]}>
            <Productos />
          </RequiereRol>
        }
      />
      <Route
        path="/usuarios"
        element={
          <RequiereRol roles={["admin"]}>
            <Usuarios />
          </RequiereRol>
        }
      />
      <Route
        path="/mensajes"
        element={
          <RequiereRol roles={["admin"]}>
            <MensajesContacto />
          </RequiereRol>
        }
      />

      {/* Cualquier otra ruta → home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
