import React, { useState, useEffect } from "react";

const ModalProducto = ({ isOpen, onClose, onGuardar, productoEditar }) => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [stockCritico, setStockCritico] = useState("");
  const [categoria, setCategoria] = useState("");

  // Precargar los campos si estamos editando
  useEffect(() => {
    if (productoEditar) {
      setCodigo(productoEditar.codigo || "");
      setNombre(productoEditar.nombre || "");
      setDescripcion(productoEditar.descripcion || "");
      setPrecio(productoEditar.precio || "");
      setStock(productoEditar.stock || "");
      setStockCritico(productoEditar.stockCritico || "");
      setCategoria(productoEditar.categoria || "");
    } else {
      // Limpiar campos al abrir para crear
      setCodigo("");
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");
      setStockCritico("");
      setCategoria("");
    }
  }, [productoEditar, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const producto = {
      codigo,
      nombre,
      descripcion,
      precio,
      stock,
      stockCritico,
      categoria,
    };

    onGuardar(producto);

    // Limpiar campos y cerrar modal
    setCodigo("");
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setStock("");
    setStockCritico("");
    setCategoria("");

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal fade show d-block`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {productoEditar ? "Editar Producto" : "Nuevo Producto"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
              <label className="form-label">Código</label>
              <input
                type="text"
                className="form-control"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
                disabled={!!productoEditar}
              />
            </div>

              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Stock Actual</label>
                <input
                  type="number"
                  className="form-control"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Stock Crítico</label>
                <input
                  type="number"
                  className="form-control"
                  value={stockCritico}
                  onChange={(e) => setStockCritico(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Categoría</label>
                <select
                  className="form-select"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                >
                  <option value="">--Seleccione una categoría--</option>
                  <option value="Abarrotes">Abarrotes</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Cervezas">Cervezas</option>
                  <option value="Fiambres">Fiambres</option>
                  <option value="Licores">Licores</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  {productoEditar ? "Actualizar" : "Registrar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProducto;
