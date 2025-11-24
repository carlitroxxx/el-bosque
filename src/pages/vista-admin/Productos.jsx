import React, { useState, useEffect } from "react";
import Sidebar from "../../componentes/SideBar";
import ModalProducto from "../../componentes/ModalProducto";
import Tabla from "../../componentes/Tabla";

const API_URL = "http://localhost:3001/api/productos";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const [cargando, setCargando] = useState(false);

  // Cargar productos desde el backend al iniciar
  useEffect(() => {
    const fetchProductos = async () => {
      setCargando(true);
      try {
        const res = await fetch("http://localhost:3001/api/productos");
        if (!res.ok) {
          throw new Error("Error obteniendo productos desde el servidor.");
        }
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error(error);
        alert(error.message || "No se pudieron cargar los productos.");
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  // Crear / actualizar producto en el backend
  const guardarProducto = async (producto) => {
    // producto ya viene validado desde el modal, pero normalizamos por si acaso
    const normalizado = {
      ...producto,
      precio: Number(producto.precio),
      stock: Number(producto.stock),
      stockCritico:
        producto.stockCritico === null ||
        producto.stockCritico === "" ||
        producto.stockCritico === undefined
          ? null
          : Number(producto.stockCritico),
    };

    try {
      let res;

      if (productoEditar) {
        // UPDATE
        res = await fetch(
          `${API_URL}/${encodeURIComponent(productoEditar.codigo)}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(normalizado),
          }
        );
      } else {
        // CREATE
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(normalizado),
        });
      }

      if (!res.ok) {
        let errorMsg = "Error guardando producto.";
        try {
          const data = await res.json();
          if (data?.error) errorMsg = data.error;
        } catch (e) {
          // ignore
        }
        throw new Error(errorMsg);
      }

      const saved = await res.json();

      setProductos((prev) => {
        if (productoEditar) {
          // reemplaza el producto editado
          return prev.map((p) =>
            String(p.codigo) === String(saved.codigo) ? saved : p
          );
        } else {
          // agrega el nuevo
          return [...prev, saved];
        }
      });

      setModalAbierto(false);
      setProductoEditar(null);

      // Alerta si stock <= stock crítico
      if (
        saved.stockCritico !== null &&
        saved.stockCritico !== undefined &&
        Number.isFinite(Number(saved.stockCritico)) &&
        Number(saved.stock) <= Number(saved.stockCritico)
      ) {
        alert("El stock actual es menor o igual al stock crítico.");
      }
    } catch (error) {
      console.error(error);
      // IMPORTANTE: lanzamos el error para que el modal lo muestre
      throw error;
    }
  };

  const solicitarEliminar = (row) => {
    setProductoAEliminar(row);
    setShowConfirm(true);
  };

  const cancelarEliminar = () => {
    setProductoAEliminar(null);
    setShowConfirm(false);
  };

  const confirmarEliminar = async () => {
    if (!productoAEliminar) return;

    try {
      const res = await fetch(
        `${API_URL}/${encodeURIComponent(productoAEliminar.codigo)}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        let errorMsg = "Error eliminando producto.";
        try {
          const data = await res.json();
          if (data?.error) errorMsg = data.error;
        } catch (e) {
          // ignore
        }
        throw new Error(errorMsg);
      }

      setProductos((prev) =>
        prev.filter(
          (p) => String(p.codigo) !== String(productoAEliminar.codigo)
        )
      );
    } catch (error) {
      console.error(error);
      alert(error.message || "No se pudo eliminar el producto.");
    } finally {
      setProductoAEliminar(null);
      setShowConfirm(false);
    }
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

            {cargando ? (
              <p>Cargando productos...</p>
            ) : (
              <Tabla
                columns={columnas}
                data={productos}
                onEditar={editarProducto}
                onEliminar={solicitarEliminar}
              />
            )}
          </div>
        </div>
      </div>

      <ModalProducto
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onGuardar={guardarProducto}
        productoEditar={productoEditar}
      />

      {showConfirm && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 2000 }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-3 shadow p-4"
            style={{ width: 420, maxWidth: "92%" }}
          >
            <h5 className="mb-2">Confirmar eliminación</h5>
            <p className="mb-4">
              ¿Seguro que quieres eliminar el producto{" "}
              <strong>{productoAEliminar?.nombre}</strong> (código{" "}
              <code>{productoAEliminar?.codigo}</code>)? Esta acción no se
              puede deshacer.
            </p>
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-light" onClick={cancelarEliminar}>
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={confirmarEliminar}>
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;
