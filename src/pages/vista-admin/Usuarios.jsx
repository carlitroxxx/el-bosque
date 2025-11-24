import React, { useState, useEffect } from "react";
import Sidebar from "../../componentes/SideBar";
import Tabla from "../../componentes/Tabla";
import ModalUsuario from "../../componentes/ModalUsuario";

const API_URL = "http://localhost:3001/api/usuarios"; // ajusta el puerto si es otro

// Convierte usuario que viene del backend -> forma usada en el front
const fromApiUser = (u) => ({
  id: u.id,
  nombre: u.nombre,
  correo: u.email,        // mapeo email -> correo
  contrasena: "",         // no traemos la password real; dejamos vacío
  telefono: u.telefono || "",
  region: u.region || "",
  comuna: u.comuna || "",
  rol: u.rol || "CLIENTE",
});

// Convierte usuario del formulario front -> payload para el backend
const toApiUser = (u) => ({
  nombre: u.nombre,
  email: u.correo,            // mapeo correo -> email
  password: u.contrasena,     // mapeo contrasena -> password
  telefono: u.telefono,
  region: u.region,
  comuna: u.comuna,
  rol: u.rol,
});

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  // Cargar usuarios desde el backend y, si no hay, crear admin
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error al obtener usuarios");
        const data = await res.json();

        if (data.length === 0) {
          // Crear admin inicial en el backend
          const adminFront = {
            nombre: "admin",
            correo: "admin@ejemplo.cl",
            contrasena: "admin123",
            telefono: "000000000",
            region: "Los Lagos",
            comuna: "Puerto Montt",
            rol: "ADMINISTRADOR",
          };

          const resAdmin = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toApiUser(adminFront)),
          });

          if (!resAdmin.ok) throw new Error("Error creando admin inicial");

          const adminCreado = await resAdmin.json();
          setUsuarios([fromApiUser(adminCreado)]);
        } else {
          setUsuarios(data.map(fromApiUser));
        }
      } catch (error) {
        console.error(error);
        alert("Error cargando usuarios desde el servidor");
      }
    };

    cargarUsuarios();
  }, []);

  // Crear / Editar usuario
  const guardarUsuario = async (usuarioForm) => {
    try {
      if (usuarioEditar) {
        // EDITAR
        const id = usuarioEditar.id;
        const payload = toApiUser({
          ...usuarioForm,
          rol: usuarioEditar.rol, // mantener el rol previo (o permitir cambiarlo si tu form lo hace)
        });

        const res = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.status === 409) {
          alert("Ya existe un usuario con ese email/correo.");
          return;
        }

        if (!res.ok) {
          alert("Error actualizando usuario");
          return;
        }

        const actualizado = fromApiUser(await res.json());

        setUsuarios((prev) =>
          prev.map((u) => (u.id === id ? actualizado : u))
        );
      } else {
        // NUEVO
        const payload = toApiUser({
          ...usuarioForm,
          rol: "CLIENTE",
        });

        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.status === 409) {
          alert("Ya existe un usuario con ese email/correo.");
          return;
        }

        if (!res.ok) {
          alert("Error creando usuario");
          return;
        }

        const creado = fromApiUser(await res.json());
        setUsuarios((prev) => [...prev, creado]);
      }

      setModalAbierto(false);
      setUsuarioEditar(null);
    } catch (error) {
      console.error(error);
      alert("Error guardando usuario");
    }
  };

  // Eliminar usando correo (para no tocar Tabla) -> buscamos su id y llamamos al backend
  const eliminarUsuario = async (dato) => {
  console.log("dato recibido en eliminarUsuario:", dato);

  let usuario = null;

  // Si Tabla manda solo un string (correo o id)
  if (typeof dato === "string" || typeof dato === "number") {
    usuario =
      usuarios.find((u) => u.correo === dato) ||
      usuarios.find((u) => String(u.id) === String(dato));
  }

  // Si Tabla manda el objeto fila completo
  if (typeof dato === "object" && dato !== null) {
    usuario =
      usuarios.find((u) => u.id === dato.id) ||
      usuarios.find((u) => u.correo === dato.correo);
  }

  if (!usuario) {
    alert("No se encontró el usuario a eliminar");
    return;
  }

  if (!window.confirm(`¿Eliminar usuario ${usuario.nombre}?`)) return;

  try {
    const res = await fetch(`${API_URL}/${usuario.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Error eliminando usuario");
      return;
    }

    setUsuarios((prev) => prev.filter((u) => u.id !== usuario.id));
  } catch (error) {
    console.error(error);
    alert("Error eliminando usuario");
  }
};


  const editarUsuario = (usuario) => {
    setUsuarioEditar(usuario);
    setModalAbierto(true);
  };

  const columnas = [
    { header: "NOMBRE COMPLETO", field: "nombre" },
    { header: "CORREO", field: "correo" },
    { header: "CONTRASEÑA", field: "contrasena" }, // ahora quedará vacío o ******** si quieres
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
              onEliminar={eliminarUsuario} // sigue recibiendo row.correo desde Tabla
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
