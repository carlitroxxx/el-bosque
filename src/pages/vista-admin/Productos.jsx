import React, { useState, useEffect } from "react";
import Sidebar from "../../componentes/SideBar";
import ModalProducto from "../../componentes/ModalProducto";
import Tabla from "../../componentes/Tabla";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(stored);
  }, []);

  const guardarProducto = (producto) => {
    let updated;
    if (productoEditar) {
      // Editar producto existente
      updated = productos.map((p) =>
        p.id === productoEditar.id ? { ...p, ...producto } : p
      );
    } else {
      // Agregar nuevo producto
      updated = [...productos, { id: productos.length + 1, ...producto }];
    }
    setProductos(updated);
    localStorage.setItem("productos", JSON.stringify(updated));
    setModalAbierto(false);
    setProductoEditar(null);
  };

  const eliminarProducto = (id) => {
    const updated = productos.filter((p) => p.id !== id);
    setProductos(updated);
    localStorage.setItem("productos", JSON.stringify(updated));
  };

  const columnas = [
    { header: "CODIGO", field: "codigo" },
    { header: "NOMBRE", field: "nombre" },
    { header: "DESCRIPCIÓN", field: "descripcion" },
    { header: "PRECIO", field: "precio" },
    { header: "STOCK", field: "stock" },
    { header: "STOCK CRITICO", field: "stockCritico" },
    { header: "CATEGORÍA", field: "categoria" },
  ];

  const editarProducto = (producto) => {
    setProductoEditar(producto);
    setModalAbierto(true);
  };

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row pt-5">
        <Sidebar />
        <div className="col-10">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Productos</h3>
              <button
                className="btn btn-dark"
                onClick={() => {
                  setProductoEditar(null);
                  setModalAbierto(true);
                }}
              >
                ➕ Nuevo Producto
              </button>
            </div>

            <Tabla
              columns={columnas}
              data={productos}
              onEditar={editarProducto}
              onEliminar={eliminarProducto}
            />
          </div>
        </div>
      </div>

      <ModalProducto
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onGuardar={guardarProducto}
        productoEditar={productoEditar}
      />
    </div>
  );
};

export default Productos;
