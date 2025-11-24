import React, { useState, useEffect } from "react";

const ModalProducto = ({ isOpen, onClose, onGuardar, productoEditar }) => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [stockCritico, setStockCritico] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (productoEditar) {
      setCodigo(productoEditar.codigo || "");
      setNombre(productoEditar.nombre || "");
      setDescripcion(productoEditar.descripcion || "");
      setPrecio(
        productoEditar.precio !== undefined && productoEditar.precio !== null
          ? String(productoEditar.precio)
          : ""
      );
      setStock(
        productoEditar.stock !== undefined && productoEditar.stock !== null
          ? String(productoEditar.stock)
          : ""
      );
      setStockCritico(
        productoEditar.stockCritico !== undefined && productoEditar.stockCritico !== null
          ? String(productoEditar.stockCritico)
          : ""
      );
      setCategoria(productoEditar.categoria || "");
      setImagen(productoEditar.imagen || "");
      setErrorMsg("");
    } else {
      setCodigo("");
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");
      setStockCritico("");
      setCategoria("");
      setImagen("");
      setErrorMsg("");
    }
  }, [productoEditar, isOpen]);

  const validar = () => {
    const trim = (v) => (typeof v === "string" ? v.trim() : v);

    if (!trim(codigo)) throw new Error("El código es obligatorio.");
    if (trim(codigo).length < 3) throw new Error("El código debe tener al menos 3 caracteres.");

    if (!trim(nombre)) throw new Error("El nombre es obligatorio.");
    if (trim(nombre).length > 100) throw new Error("El nombre no puede superar 100 caracteres.");

    if (trim(descripcion) && trim(descripcion).length > 500)
      throw new Error("La descripción no puede superar 500 caracteres.");

    if (trim(precio) === "" || precio === null) throw new Error("El precio es obligatorio.");
    const precioNum = Number(precio);
    if (!Number.isFinite(precioNum)) throw new Error("El precio debe ser un número.");
    if (!Number.isInteger(precioNum)) throw new Error("El precio debe ser un número entero.");
    if (precioNum < 0) throw new Error("El precio no puede ser negativo.");

    if (trim(stock) === "" || stock === null) throw new Error("El stock es obligatorio.");
    const stockNum = Number(stock);
    if (!Number.isFinite(stockNum)) throw new Error("El stock debe ser un número.");
    if (!Number.isInteger(stockNum)) throw new Error("El stock debe ser un número entero.");
    if (stockNum < 0) throw new Error("El stock no puede ser negativo.");

    let stockCritNum = null;
    if (trim(stockCritico) !== "") {
      stockCritNum = Number(stockCritico);
      if (!Number.isFinite(stockCritNum)) throw new Error("El stock crítico debe ser un número.");
      if (!Number.isInteger(stockCritNum)) throw new Error("El stock crítico debe ser entero.");
      if (stockCritNum < 0) throw new Error("El stock crítico no puede ser negativo.");
    }

    if (!trim(categoria)) throw new Error("Debes seleccionar una categoría.");

    return {
      codigo: trim(codigo),
      nombre: trim(nombre),
      descripcion: trim(descripcion),
      precio: precioNum,
      stock: stockNum,
      stockCritico: stockCritNum,
      categoria: trim(categoria),
      imagen: imagen || "", 
    };
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      const producto = validar();
      // Esperamos a que el padre guarde en el backend
      await onGuardar(producto);

      // Si todo salió bien, limpiamos y cerramos
      setCodigo("");
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");
      setStockCritico("");
      setCategoria("");
      setImagen("");
      onClose();
    } catch (err) {
      // Si el backend devolvió un error, lo mostramos aquí
      setErrorMsg(err?.message || "Error guardando el producto.");
    }
  };


  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagen(file.name);
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {productoEditar ? "Editar Producto" : "Nuevo Producto"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {errorMsg && (
              <div className="alert alert-danger mb-3" role="alert" id="errorProducto">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3 row-cols-1 row-cols-md-2">
                <div className="col">
                  <label className="form-label">Código</label>
                  <input
                    type="text"
                    className="form-control"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    required
                    minLength={3}
                    disabled={!!productoEditar}
                  />
                  <div className="form-text">Mínimo 3 caracteres.</div>
                </div>

                <div className="col">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    maxLength={100}
                  />
                  <div className="form-text">Máximo 100 caracteres.</div>
                </div>

                <div className="col">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                    min={0}
                    step="1"
                    inputMode="numeric"
                    onKeyDown={(e) => {
                      if (e.key === "." || e.key === ",") e.preventDefault();
                    }}
                    onPaste={(e) => {
                      const pasted = (e.clipboardData.getData("text") || "").replace(/[.,]/g, "");
                      if (pasted !== e.clipboardData.getData("text")) {
                        e.preventDefault();
                        setPrecio(pasted);
                      }
                    }}
                  />
                  <div className="form-text">Mínimo 0. Solo números enteros (sin decimales).</div>
                </div>

                <div className="col">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                    min={0}
                    step="1"
                    inputMode="numeric"
                  />
                  <div className="form-text">Mínimo 0. Solo enteros.</div>
                </div>

                <div className="col">
                  <label className="form-label">Stock crítico (opcional)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={stockCritico}
                    onChange={(e) => setStockCritico(e.target.value)}
                    min={0}
                    step="1"
                    inputMode="numeric"
                  />
                  <div className="form-text">Mínimo 0. Solo enteros.</div>
                </div>

                <div className="col">
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

                <div className="col-12">
                  <label className="form-label">Descripción (opcional)</label>
                  <textarea
                    className="form-control"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    maxLength={500}
                    rows={3}
                  ></textarea>
                  <div className="form-text">Máximo 500 caracteres.</div>
                </div>

                <div className="col-12">
                  <label className="form-label">Imagen del producto (opcional)</label>
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
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="submit" className="btn btn-primary">
                  {productoEditar ? "Actualizar" : "Registrar"}
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                  Cancelar
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
