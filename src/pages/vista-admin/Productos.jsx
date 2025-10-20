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
    const normalizado = {
      ...producto,
      precio: Number(producto.precio),
      stock: Number(producto.stock),
      stockCritico:
        producto.stockCritico === null || producto.stockCritico === "" || producto.stockCritico === undefined
          ? null
          : Number(producto.stockCritico),
    };
    let updated;
    if (productoEditar) {
      updated = productos.map((p) => (p.codigo === productoEditar.codigo ? { ...p, ...normalizado } : p));
    } else {
      if (productos.some(p => String(p.codigo) === String(normalizado.codigo))) { alert("Ya existe un producto con ese código."); return; }
      updated = [...productos, { ...normalizado }];
    }
    setProductos(updated);
    localStorage.setItem("productos", JSON.stringify(updated));
    setModalAbierto(false);
    setProductoEditar(null);
    if (
      normalizado.stockCritico !== null &&
      Number.isFinite(normalizado.stockCritico) &&
      normalizado.stock <= normalizado.stockCritico
    ) {
      alert("El stock actual es menor o igual al stock crítico.");
    }
  };

  const eliminarProducto = (row) => {
    const updated = productos.filter((p) => p.codigo !== row.codigo);
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
