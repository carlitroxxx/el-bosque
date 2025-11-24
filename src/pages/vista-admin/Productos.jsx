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

  const token = localStorage.getItem("token");

  // Cargar productos desde backend
  useEffect(() => {
    const fetchProductos = async () => {
      setCargando(true);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error obteniendo productos");

        const data = await res.json();
        setProductos(data);
      } catch (err) {
        console.error(err);
        alert(err.message || "No se pudo cargar la lista de productos.");
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  // Crear o actualizar producto
  const guardarProducto = async (producto) => {
    const normalizado = {
      ...producto,
      precio: Number(producto.precio),
      stock: Number(producto.stock),
      stockCritico:
        producto.stockCritico === "" ||
        producto.stockCritico === null ||
        producto.stockCritico === undefined
          ? null
          : Number(producto.stockCritico),
    };

    try {
      let res;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      };

      if (productoEditar) {
        // EDITAR
        res = await fetch(
          `${API_URL}/${encodeURIComponent(productoEditar.codigo)}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify(normalizado),
          }
        );
      } else {
        // CREAR
        res = await fetch(API_URL, {
          method: "POST",
          headers,
          body: JSON.stringify(normalizado),
        });
      }

      if (!res.ok) {
        let msg = "Error guardando producto.";
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
        } catch {}
        throw new Error(msg);
      }

      const saved = await res.json();

      setProductos((prev) => {
        if (productoEditar) {
          return prev.map((p) =>
            String(p.codigo) === String(saved.codigo) ? saved : p
          );
        } else {
          return [...prev, saved];
        }
      });

      setModalAbierto(false);
      setProductoEditar(null);

      if (
        saved.stockCritico !== null &&
        Number(saved.stock) <= Number(saved.stockCritico)
      ) {
        alert("Advertencia: stock actual está por debajo del stock crítico.");
      }
    } catch (err) {
      console.error(err);
      throw err; 
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        let msg = "No se pudo eliminar el producto";
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
        } catch {}
        throw new Error(msg);
      }

      setProductos((prev) =>
        prev.filter(
          (p) => String(p.codigo) !== String(productoAEliminar.codigo)
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.message || "Error eliminando producto.");
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
        >
          <div
            className="bg-white rounded-3 shadow p-4"
            style={{ width: 420, maxWidth: "92%" }}
          >
            <h5 className="mb-2">Confirmar eliminación</h5>
            <p className="mb-4">
              ¿Seguro que quieres eliminar el producto{" "}
              <strong>{productoAEliminar?.nombre}</strong> (código{" "}
              <code>{productoAEliminar?.codigo}</code>)?
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
