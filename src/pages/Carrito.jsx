import React, { useState, useEffect } from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";

// Agrupa por id y suma cantidad (sin tocar otros campos)
const normalizarCarrito = (items = []) => {
  const map = new Map();
  for (const it of items) {
    const key = it.id;
    const cant = Number(it.cantidad) || 1;
    if (map.has(key)) {
      const prev = map.get(key);
      map.set(key, { ...prev, ...it, cantidad: (Number(prev.cantidad) || 1) + cant });
    } else {
      map.set(key, { ...it, cantidad: cant });
    }
  }
  return Array.from(map.values());
};

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem("carrito")) || [];
    const normalizado = normalizarCarrito(guardado);
    setCarrito(normalizado);
    localStorage.setItem("carrito", JSON.stringify(normalizado));
  }, []);

  const setYGuardar = (items) => {
    const normalizado = normalizarCarrito(items);
    setCarrito(normalizado);
    localStorage.setItem("carrito", JSON.stringify(normalizado));
  };

  const eliminarDelCarrito = (id) => {
    setYGuardar(carrito.filter((p) => p.id !== id));
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    const nuevo = carrito.map((p) =>
      p.id === id ? { ...p, cantidad: nuevaCantidad } : p
    );
    setYGuardar(nuevo);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => {
      return total + (producto.precio * (producto.cantidad || 1));
    }, 0);
  };

  const vaciarCarrito = () => {
    setYGuardar([]);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container mt-5 mb-5 flex-grow-1">
        <div className="row">
          {/* Lista de productos */}
          <div className="col-md-8">
            <h3 className="fw-bold mb-4 text-center">Lista de productos</h3>

            <div className="row row-cols-1 row-cols-md-3 g-4">
              {carrito.map((producto) => (
                <div key={producto.id} className="col">
                  <div className="card h-100 shadow-sm text-center">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="card-img-top"
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        backgroundColor: "#f8f9fa",
                      }}
                    />
                    <div className="card-body">
                      <h6 className="fw-bold">{producto.nombre}</h6>
                      <p className="text-muted mb-1">{producto.categoria}</p>
                      <p className="fw-bold text-success">
                        ${Number(producto.precio).toLocaleString("es-CL")}
                      </p>
                      <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => eliminarDelCarrito(producto.id)}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carrito de compras */}
          <div className="col-md-4">
            <h3 className="fw-bold mb-4 text-center">Carrito de Compras</h3>
            <div className="card shadow-sm">
              <div className="card-body">
                {carrito.length === 0 ? (
                  <p className="text-center text-muted">Tu carrito está vacío</p>
                ) : (
                  <>
                    <table className="table align-middle">
                      <thead>
                        <tr>
                          <th>Producto</th>
                          <th>Cant.</th>
                          <th>Subtotal</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {carrito.map((producto) => (
                          <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <button
                                  className="btn btn-outline-secondary btn-sm"
                                  onClick={() =>
                                    actualizarCantidad(
                                      producto.id,
                                      (producto.cantidad || 1) - 1
                                    )
                                  }
                                  disabled={(producto.cantidad || 1) <= 1}
                                >
                                  -
                                </button>
                                <span className="mx-2 fw-bold">
                                  {producto.cantidad || 1}
                                </span>
                                <button
                                  className="btn btn-outline-secondary btn-sm"
                                  onClick={() =>
                                    actualizarCantidad(
                                      producto.id,
                                      (producto.cantidad || 1) + 1
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td>
                              $
                              {(
                                producto.precio * (producto.cantidad || 1)
                              ).toLocaleString()}
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => eliminarDelCarrito(producto.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="fw-bold">
                        Total: ${calcularTotal().toLocaleString()}
                      </h5>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={vaciarCarrito}
                      >
                        Vaciar carrito
                      </button>
                      <button className="btn btn-success">Comprar ahora</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Carrito;
