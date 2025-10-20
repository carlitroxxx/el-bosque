import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";

function leerProductos() {
  try {
    const raw = localStorage.getItem("productos");
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function leerCarrito() {
  try {
    const raw = localStorage.getItem("carrito");
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function guardarCarrito(items) {
  localStorage.setItem("carrito", JSON.stringify(items));
}

export default function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState(1);
  const [mainImg, setMainImg] = useState(null);

  const productos = useMemo(() => leerProductos(), []);
  const producto = useMemo(
    () => productos.find(p => String(p.id) === String(id)),
    [id, productos]
  );

  const rutaImagen = producto && producto.imagen
    ? require(`../assets/images/${producto.imagen}`)
    : require(`../assets/images/producto1.jpg`);

  if (!producto) {
    return (
      <>
        <Navbar />
        <div className="container py-5">
          <div className="alert alert-warning">
            Producto no encontrado.
            <div className="mt-3">
              <Link to="/productos" className="btn btn-primary">
                Volver a productos
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const relacionados = productos
    .filter(p => p.id !== producto.id)
    .slice(0, 4);

  function onCambiarCantidad(e) {
    const v = Number(e.target.value);
    setCantidad(Number.isFinite(v) && v > 0 ? v : 1);
  }

  function agregarAlCarrito() {
    const cant = Math.max(1, Number(cantidad) || 1);
    const carrito = leerCarrito();

    if (typeof producto.stock === "number" && cant > producto.stock) {
      alert(`No hay stock suficiente. Stock disponible: ${producto.stock}.`);
      return;
    }

    const idx = carrito.findIndex(it => String(it.id) === String(producto.id));
    if (idx >= 0) {
      const posible = carrito[idx].cantidad + cant;
      if (typeof producto.stock === "number" && posible > producto.stock) {
        alert(`No puedes superar el stock (${producto.stock}).`);
        return;
      }
      carrito[idx].cantidad = posible;
    } else {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre || "Producto",
        precio: Number(producto.precio) || 0,
        cantidad: cant,
        imagen: (producto.imagen && producto.imagen) || mainImg || "",
      });
    }
    guardarCarrito(carrito);
    alert("Producto añadido al carrito.");
    // navigate("/carrito");
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/catalogo">Productos</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Detalle Producto
            </li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Imagen */}
          <div className="col-md-6">
            <img
              src={rutaImagen}
              className="img-fluid border rounded-3"
              alt={producto.nombre || "Producto"}
            />
          </div>

          {/* ======= CARD DERECHA CON BORDE ======= */}
          <div className="col-md-6">
            <div className="card border rounded-3 shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title">{producto.nombre || "Nombre de producto"}</h3>
                <h4 className="text-primary mb-3">
                  ${Number(producto.precio).toLocaleString("es-CL")}
                </h4>

                <p className="mb-4 text-secondary">
                  {producto.descripcion || "Descripción no disponible para este producto."}
                </p>

                {/* ======= CANTIDAD COMO INPUT-GROUP (solo visual) ======= */}
                <div className="mb-3">
                  <label htmlFor="cantidad" className="form-label">Cantidad</label>
                  <div className="input-group" style={{ maxWidth: 260 }}>
                    <span className="input-group-text">
                      <i className="bi bi-basket"></i>
                    </span>
                    <input
                      type="number"
                      id="cantidad"
                      className="form-control text-center"
                      value={cantidad}
                      min={1}
                      onChange={onCambiarCantidad}
                    />
                  </div>
                  {typeof producto.stock === "number" && (
                    <small className="text-muted d-block mt-1">
                      Stock disponible: {producto.stock}
                    </small>
                  )}
                </div>

                {/* ======= BOTÓN MEJORADO "AÑADIR AL CARRITO" ======= */}
                <button
                  className="btn btn-primary btn-lg w-100 shadow-sm rounded-3 d-flex align-items-center justify-content-center gap-2"
                  onClick={agregarAlCarrito}
                >
                  <i className="bi bi-cart-plus"></i>
                  <span>Añadir al carrito</span>
                </button>
              </div>
            </div>
          </div>
          {/* ====================================== */}
        </div>

        {relacionados.length > 0 && (
          <div className="mt-5">
            <h5>Productos relacionados</h5>
            <div className="row">
              {relacionados.map((p) => (
                <div key={p.id} className="col-md-3 col-6 mb-3">
                  <div
                    className="card h-100 shadow-sm"
                    role="button"
                    onClick={() => navigate(`/producto/${p.id}`)}
                  >
                    <img
                      src={
                        (p.imagenes && p.imagenes[0]) ||
                        p.imagen ||
                        p.urlImagen ||
                        "/images/img/producto1.jpg"
                      }
                      className="card-img-top"
                      alt={p.nombre || "Producto"}
                      style={{ objectFit: "cover", height: 160 }}
                    />
                    <div className="card-body">
                      <h6 className="card-title mb-1 text-truncate">
                        {p.nombre || "Producto"}
                      </h6>
                      <span className="text-primary fw-semibold">
                        {typeof p.precio === "number"
                          ? `$${p.precio.toLocaleString("es-CL")}`
                          : "$0"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
