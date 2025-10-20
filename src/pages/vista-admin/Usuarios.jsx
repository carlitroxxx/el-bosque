import React, { useState, useEffect } from "react";
import Sidebar from "../../componentes/SideBar";
import Tabla from "../../componentes/Tabla";
import ModalUsuario from "../../componentes/ModalUsuario";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  // Sembrar un admin si no hay usuarios guardados
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (stored.length === 0) {
      const admin = {
        nombre: "admin",
        correo: "admin@ejemplo.cl",
        contrasena: "admin123", // demo
        telefono: "000000000",
        region: "Los Lagos",
        comuna: "Puerto Montt",
        rol: "ADMINISTRADOR",
      };
      const initial = [admin];
      localStorage.setItem("usuarios", JSON.stringify(initial));
      setUsuarios(initial);
    } else {
      setUsuarios(stored);
    }
  }, []);

  // Crear/Editar usuario usando el correo como identificador único
  const guardarUsuario = (usuario) => {
    let updated = [...usuarios];

    if (usuarioEditar) {
      const correoCambiado = usuario.correo !== usuarioEditar.correo;
      if (correoCambiado && updated.some((u) => u.correo === usuario.correo)) {
        alert("Ya existe un usuario con ese correo.");
        return;
      }
      // Si no trae rol (por seguridad), dejarlo como estaba o CLIENTE por defecto
      const rolFinal = usuario.rol || usuarios.find(u => u.correo === usuarioEditar.correo)?.rol || "CLIENTE";
      updated = updated.map((u) =>
        u.correo === usuarioEditar.correo ? { ...u, ...usuario, rol: rolFinal } : u
      );
    } else {
      if (updated.some((u) => u.correo === usuario.correo)) {
        alert("Ya existe un usuario con ese correo.");
        return;
      }
      // Asegurar rol CLIENTE por defecto
      updated.push({ ...usuario, rol: "CLIENTE" });
    }

    setUsuarios(updated);
    localStorage.setItem("usuarios", JSON.stringify(updated));
    setModalAbierto(false);
    setUsuarioEditar(null);
  };

  // Eliminar por correo
  const eliminarUsuario = (correo) => {
    const updated = usuarios.filter((u) => u.correo !== correo);
    setUsuarios(updated);
    localStorage.setItem("usuarios", JSON.stringify(updated));
  };

  const editarUsuario = (usuario) => {
    setUsuarioEditar(usuario);
    setModalAbierto(true);
  };

  const columnas = [
    { header: "NOMBRE COMPLETO", field: "nombre" },
    { header: "CORREO", field: "correo" },
    { header: "CONTRASEÑA", field: "contrasena" },
    { header: "TELEFONO", field: "telefono" },
    { header: "REGION", field: "region" },
    { header: "COMUNA", field: "comuna" },
    { header: "ROL", field: "rol" },
  ];

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row pt-5">
        <Sidebar />
        <div className="col-10">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Usuarios</h3>
              <button
                className="btn btn-dark"
                onClick={() => {
                  setUsuarioEditar(null);
                  setModalAbierto(true);
                }}
              >
                ➕ Nuevo Usuario
              </button>
            </div>

            <Tabla
              columns={columnas}
              data={usuarios}
              onEditar={editarUsuario}
              onEliminar={eliminarUsuario} // que pase row.correo
            />
          </div>
        </div>
      </div>

      <ModalUsuario
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onGuardar={guardarUsuario}
        usuarioEditar={usuarioEditar}
      />
    </div>
  );
};

export default Usuarios;
