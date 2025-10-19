import React, { useState } from "react";

const ModalUsuario = ({ isOpen, onClose, onGuardar }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena1, setContrasena1] = useState("");
  const [contrasena2, setContrasena2] = useState("");
  const [telefono, setTelefono] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contrasena1 !== contrasena2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const nuevoUsuario = {
      nombre,
      correo,
      contrasena: contrasena1,
      telefono,
      region,
      comuna,
      rol:"CLIENTE"
    };

    onGuardar(nuevoUsuario);

    // Limpiar campos
    setNombre("");
    setCorreo("");
    setContrasena1("");
    setContrasena2("");
    setTelefono("");
    setRegion("");
    setComuna("");

    onClose();
  };

  if (!isOpen) return null; // No renderiza nada si no está abierto

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Nuevo Usuario</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={contrasena1}
                  onChange={(e) => setContrasena1(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirmar Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={contrasena2}
                  onChange={(e) => setContrasena2(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono (opcional)</label>
                <input
                  type="tel"
                  className="form-control"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Región</label>
                <select
                  className="form-select"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  required
                >
                  <option value="">Seleccione una región</option>
                  <option value="rm">Región Metropolitana</option>
                  <option value="v">Valparaíso</option>
                  <option value="viii">Biobío</option>
                  <option value="x">Los Lagos</option>
                  <option value="ii">Antofagasta</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="form-label">Comuna</label>
                <select
                  className="form-select"
                  value={comuna}
                  onChange={(e) => setComuna(e.target.value)}
                  required
                >
                  <option value="">--Seleccione una comuna--</option>
                  <option value="Puerto Montt">Puerto Montt</option>
                </select>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUsuario;
