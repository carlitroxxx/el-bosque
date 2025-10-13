import React, { useState, useEffect } from "react";

const ModalProducto = ({ isOpen, onClose, onGuardar, productoEditar }) => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [stockCritico, setStockCritico] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState(""); // 🆕 nuevo campo para imagen

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
      setImagen(productoEditar.imagen || ""); // 🆕 precargar imagen
    } else {
      // Limpiar campos al abrir para crear
      setCodigo("");
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");
      setStockCritico("");
      setCategoria("");
      setImagen("");
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
      imagen, // 🆕 guardar solo el nombre del archivo
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
    setImagen("");

    onClose();
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file.name); // 🆕 solo guarda el nombre del archivo
    }
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
              {/* Código */}
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

              {/* Nombre */}
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

              {/* Descripción */}
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Precio */}
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

              {/* Stock actual */}
              <div className="mb-3">
                <label className="form-label">Stock Actual</label>
                <input
                  type="number"
                  className="form-control"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              {/* Stock crítico */}
              <div className="mb-3">
                <label className="form-label">Stock Crítico</label>
                <input
                  type="number"
                  className="form-control"
                  value={stockCritico}
                  onChange={(e) => setStockCritico(e.target.value)}
                />
              </div>

              {/* Categoría */}
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

              {/* 🆕 Imagen */}
              <div className="mb-3">
                <label className="form-label">Imagen del producto</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleImagenChange}
                />
                {imagen && (
                  <small className="text-muted d-block mt-1">
                    Nombre guardado: <strong>{imagen}</strong>
                  </small>
                )}
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
