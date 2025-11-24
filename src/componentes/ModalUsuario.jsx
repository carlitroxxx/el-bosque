import React, { useState, useEffect } from "react";

const ModalUsuario = ({ isOpen, onClose, onGuardar, usuarioEditar }) => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    telefono: "",
    region: "",
    comuna: "",
    rol: "",
  });

  // Cargar datos cuando se abre el modal
  useEffect(() => {
    if (usuarioEditar) {
      setForm({
        nombre: usuarioEditar.nombre,
        correo: usuarioEditar.correo,
        contrasena: "", // nunca traemos password del backend
        telefono: usuarioEditar.telefono || "",
        region: usuarioEditar.region || "",
        comuna: usuarioEditar.comuna || "",
        rol: usuarioEditar.rol || "CLIENTE",
      });
    } else {
      // Nuevo usuario
      setForm({
        nombre: "",
        correo: "",
        contrasena: "",
        telefono: "",
        region: "",
        comuna: "",
        rol: "CLIENTE",
      });
    }
  }, [usuarioEditar, isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardar = () => {
    if (!form.nombre || !form.correo) {
      alert("Nombre y correo son obligatorios");
      return;
    }

    onGuardar(form); // se enviará al backend desde Usuarios.jsx
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h3>{usuarioEditar ? "Editar Usuario" : "Nuevo Usuario"}</h3>

        <div className="form-group">
          <label>Nombre Completo</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Correo</label>
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="contrasena"
            value={form.contrasena}
            onChange={handleChange}
            placeholder={usuarioEditar ? "Dejar en blanco para no cambiar" : ""}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Región</label>
          <input
            type="text"
            name="region"
            value={form.region}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Comuna</label>
          <input
            type="text"
            name="comuna"
            value={form.comuna}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {usuarioEditar && (
          <div className="form-group">
            <label>Rol</label>
            <select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              className="form-control"
            >
              <option value="CLIENTE">CLIENTE</option>
              <option value="ADMINISTRADOR">ADMINISTRADOR</option>
              <option value="PROFESIONAL">PROFESIONAL</option>
            </select>
          </div>
        )}

        <div className="modal-botones">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-dark" onClick={guardar}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUsuario;
