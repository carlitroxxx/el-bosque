
import React, { useEffect, useState } from "react";
import Sidebar from "../../componentes/SideBar";
import Tabla from "../../componentes/Tabla";
import ModalUsuario from "../../componentes/ModalUsuario";


export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [usuarioSesion, setUsuarioSesion] = useState(null);

  useEffect(() => {
    // cargar usuarios
    const stored = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (stored.length === 0) {
      const admin = {
        nombre: "admin",
        correo: "admin@ejemplo.cl",
        contrasena: "admin123",
        telefono: "000000000",
        region: "x",
        comuna: "Puerto Montt",
        rol: "ADMINISTRADOR",
        rut: "11.111.111-1",
      };
      localStorage.setItem("usuarios", JSON.stringify([admin]));
      setUsuarios([admin]);
    } else {
      setUsuarios(stored);
    }

    // cargar sesión
    const sesion = JSON.parse(localStorage.getItem("sesion") || "null");
    setUsuarioSesion(sesion);
  }, []);

  const guardarUsuario = (usuario) => {
    const updated = [...usuarios];

    const yaExisteOtro = updated.some(u => u.correo === usuario.correo && (!usuarioEditar || u.correo !== usuarioEditar.correo));
    if (yaExisteOtro) {
      alert("Ya existe un usuario con ese correo.");
      return;
    }

    if (usuarioEditar) {
      const anterior = updated.find(u => u.correo === usuarioEditar.correo);
      const rolFinal = usuario.rol || anterior?.rol || "CLIENTE";

      if (usuarioSesion && usuarioSesion.correo === usuarioEditar.correo) {
        alert("No puedes editar tu propio usuario desde esta vista.");
        setModalAbierto(false);
        setUsuarioEditar(null);
        return;
      }

      const nuevo = updated.map(u => u.correo === usuarioEditar.correo ? { ...u, ...usuario, rol: rolFinal } : u);
      setUsuarios(nuevo);
      localStorage.setItem("usuarios", JSON.stringify(nuevo));
      setModalAbierto(false);
      setUsuarioEditar(null);
    } else {
      const crear = [...updated, { ...usuario, rol: usuario.rol || "CLIENTE" }];
      setUsuarios(crear);
      localStorage.setItem("usuarios", JSON.stringify(crear));
      setModalAbierto(false);
    }
  };

  const eliminarUsuario = (correo) => {
    if (!correo) return;
    if (usuarioSesion && usuarioSesion.correo === correo) {
      alert("No puedes eliminar el usuario de la sesión actual.");
      return;
    }
    if (!window.confirm("¿Eliminar este usuario?")) return;

    const nuevo = usuarios.filter(u => u.correo !== correo);
    setUsuarios(nuevo);
    localStorage.setItem("usuarios", JSON.stringify(nuevo));
  };

  const editarUsuario = (usuario) => {
    if (usuarioSesion && usuarioSesion.correo === usuario.correo) {
      alert("No puedes editar el usuario de la sesión actual desde esta vista.");
      return;
    }
    setUsuarioEditar(usuario);
    setModalAbierto(true);
  };

  const columnas = [
    { header: "NOMBRE", field: "nombre" },
    { header: "CORREO", field: "correo" },
    { header: "RUT", field: "rut" },
    { header: "TELÉFONO", field: "telefono" },
    { header: "REGIÓN", field: "region" },
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
              onEliminar={(row) => eliminarUsuario(row?.correo)}
              acciones
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
}
