import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";

const API = "http://localhost:3001/api";

export default function ProductoDetalle() {
  const { codigo } = useParams();
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [mainImg, setMainImg] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(`${API}/productos`);
        if (!res.ok) throw new Error("No se pudieron cargar los productos.");
        const data = await res.json();
        setProductos(data);
      } catch (err) {
        console.error(err);
        alert(err.message || "Error cargando producto.");
      } finally {
        setCargando(false);
      }
    };
    fetchProductos();
  }, []);

  const producto = useMemo(
    () => productos.find((p) => String(p.codigo) === String(codigo)),
    [codigo, productos]
  );

  const rutaImagen =
    producto && producto.imagen
      ? require(`../assets/images/${producto.imagen}`)
      : require(`../assets/images/logo_mercado.jpg`);

  const relacionados = useMemo(() => {
    if (!producto) return [];
    return productos
      .filter((p) => p.codigo !== producto.codigo)
      .slice(0, 4);
  }, [productos, producto]);

  function onCambiarCantidad(e) {
    const v = Number(e.target.value);
    setCantidad(Number.isFinite(v) && v > 0 ? v : 1);
  }

  const obtenerOCrearCarrito = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/carrito`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      let msg = "Error obteniendo/creando carrito.";
      try {
        const data = await res.json();
        if (data?.error) msg = data.error;
      } catch {}
      throw new Error(msg);
    }

    const data = await res.json();
    localStorage.setItem("carritoId", data.id);
    return data;
  };

  async function agregarAlCarrito() {
    if (!producto) return;

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");

    if (!usuario || !token) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      navigate("/login");
      return;
    }

    const cant = Math.max(1, Number(cantidad) || 1);

    if (typeof producto.stock === "number" && cant > producto.stock) {
      alert(`No hay stock suficiente. Stock disponible: ${producto.stock}.`);
      return;
    }

    try {
      let carritoId = localStorage.getItem("carritoId");

      if (!carritoId) {
        const carrito = await obtenerOCrearCarrito();
        carritoId = carrito.id;
      }

      const resItem = await fetch(
        `${API}/carrito/${carritoId}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productoId: producto.id,
            cantidad: cant,
          }),
        }
      );

      if (!resItem.ok) {
        let msg = "Error agregando producto al carrito.";
        try {
          const dataErr = await resItem.json();
          if (dataErr?.error) msg = dataErr.error;
        } catch {}
        throw new Error(msg);
      }

      alert("Producto añadido al carrito.");
    } catch (error) {
      console.error(error);
      alert(error.message || "No se pudo agregar el producto al carrito.");
    }
  }

  if (cargando) {
    return (
      <>
        <Navbar />
        <div className="container py-5">
          <p className="text-center">Cargando producto...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!producto) {
    return (
      <>
        <Navbar />
        <div className="container py-5">
          <div className="alert alert-warning">
            Producto no encontrado.
            <div className="mt-3">
              <Link to="/catalogo" className="btn btn-primary">
                Volver a productos
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
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
        </div>

        {relacionados.length > 0 && (
          <div className="mt-5">
            <h5>Productos relacionados</h5>
            <div className="row">
              {relacionados.map((p) => (
                <div key={p.codigo} className="col-md-3 col-6 mb-3">
                  <div
                    className="card h-100 shadow-sm"
                    role="button"
                    onClick={() => navigate(`/producto/${p.codigo}`)}
                  >
                    <img
                      src={
                        p && p.imagen
                          ? require(`../assets/images/${p.imagen}`)
                          : require(`../assets/images/logo_mercado.jpg`)
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
