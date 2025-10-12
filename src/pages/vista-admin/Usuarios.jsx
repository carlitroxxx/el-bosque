import React, { useState, useEffect } from "react";
import Sidebar from "../../componentes/SideBar";
import Tabla from "../../componentes/Tabla";
import ModalUsuario from "../../componentes/ModalUsuario";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(stored);
  }, []);

  const guardarUsuario = (usuario) => {
    let updated;
    if (usuarioEditar) {
      // Editar usuario existente
      updated = usuarios.map((u) =>
        u.id === usuarioEditar.id ? { ...u, ...usuario } : u
      );
    } else {
      // Agregar nuevo usuario
      updated = [...usuarios, { id: usuarios.length + 1, ...usuario }];
    }
    setUsuarios(updated);
    localStorage.setItem("usuarios", JSON.stringify(updated));
    setModalAbierto(false);
    setUsuarioEditar(null);
  };

  const eliminarUsuario = (id) => {
    const updated = usuarios.filter((u) => u.id !== id);
    setUsuarios(updated);
    localStorage.setItem("usuarios", JSON.stringify(updated));
  };

  const editarUsuario = (usuario) => {
    setUsuarioEditar(usuario);
    setModalAbierto(true);
  };

  const columnas = [
    { header: "#", field: "id" },
    { header: "NOMBRE COMPLETO", field: "nombre" },
    { header: "CORREO", field: "correo" },
    { header: "CONTRASEÑA", field: "contrasena" },
    { header: "TELEFONO", field: "telefono" },
    { header: "REGION", field: "region" },
    { header: "COMUNA", field: "comuna" },
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
              onEliminar={eliminarUsuario}
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
