import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Rutas from "./routes";
import { obtenerUsuarios, guardarUsuarios } from "./lib/auth";

export default function App() {
  useEffect(() => {
    const usuarios = obtenerUsuarios();
    if (usuarios.length === 0) {
      usuarios.push({
        correo: "admin@ejemplo.cl",
        nombre: "Administrador",
        contrasena: "admin123",
        telefono: "",
        region: "",
        comuna: "",
        rol: "admin",
      });
      guardarUsuarios(usuarios);
    }
  }, []);

  return (
    <BrowserRouter>
      <Rutas />
    </BrowserRouter>
  );
}
