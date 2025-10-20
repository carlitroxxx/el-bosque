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

import { sesionActual, buscarUsuarioPorCorreo } from "./utils/auth";
import Carrito from "./pages/Carrito";
import ResultadoPago from "./pages/ResultadoPago";

function RequiereRol({ roles, children }) {
  const ses = sesionActual();
  const location = useLocation();

  if (!ses?.logeado) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const usuario = buscarUsuarioPorCorreo(ses.correo);
  const rolUsuario = usuario?.rol;
  if (!rolUsuario || !roles.includes(rolUsuario)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function Rutas() {
  return (
    <Routes>
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

      {/*Rutas exclusivas de rol admin*/}
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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
