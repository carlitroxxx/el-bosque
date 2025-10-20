import React from "react";
import UserForm from "./UserForm";

const ModalUsuario = ({ isOpen, onClose, onGuardar, usuarioEditar }) => {
  if (!isOpen) return null;

  const handleSubmit = (formData) => {
    onGuardar?.(formData);
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {usuarioEditar ? "Editar Usuario" : "Nuevo Usuario"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <UserForm
              initialData={usuarioEditar || {}}
              onSubmit={handleSubmit}
              onCancel={onClose}
              submitLabel={usuarioEditar ? "Actualizar" : "Registrar"}
              disableEmail={!!usuarioEditar}
              showPassword={!usuarioEditar}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUsuario;