// App.js
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import Navbar from "./componentes/Navbar";
import Footer from "./componentes/Footer";

// ⬇️ Siembra admin al iniciar (solo si no hay usuarios)
function seedAdminIfEmpty() {
  try {
    const raw = localStorage.getItem("usuarios");
    const list = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(list) || list.length === 0) {
      const admin = {
        nombre: "admin",
        correo: "admin@ejemplo.cl",
        contrasena: "admin123", // ⚠️ Solo DEV
        telefono: "000000000",
        region: "Los Lagos",
        comuna: "Puerto Montt",
        rol: "ADMINISTRADOR",
      };
      localStorage.setItem("usuarios", JSON.stringify([admin]));
      // Opcional: también puedes iniciar sesión automática del admin:
      // localStorage.setItem("session", JSON.stringify({ correo: admin.correo, nombre: admin.nombre, rol: admin.rol, loggedIn: true }));
    }
  } catch (e) {
    const admin = {
      nombre: "admin",
      correo: "admin@ejemplo.cl",
      contrasena: "admin123",
      telefono: "000000000",
      region: "Los Lagos",
      comuna: "Puerto Montt",
      rol: "ADMINISTRADOR",
    };
    localStorage.setItem("usuarios", JSON.stringify([admin]));
  }
}

function App() {
  useEffect(() => {
    seedAdminIfEmpty();
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
