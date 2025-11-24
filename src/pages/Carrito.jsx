import React, { useState, useEffect } from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import { regiones } from "../datos/regiones-comunas";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
  const navigate = useNavigate();

  const [carritoId, setCarritoId] = useState(null);
  const [carrito, setCarrito] = useState([]); // items normalizados para el front
  const [cargando, setCargando] = useState(true);

  const [datosEnvio, setDatosEnvio] = useState({
    nombre: "",
    email: "",
    telefono: "",
    region: "",
    comuna: "",
    direccion: "",
  });
  const [comunas, setComunas] = useState([]);

  // Normalizar respuesta de backend a formato para el front
  const normalizarCarritoDesdeAPI = (data) => {
    const items = data.CarritoItems || [];
    const normalizado = items.map((item) => ({
      itemId: item.id,
      productoId: item.productoId,
      codigo: item.Producto?.codigo ?? "",
      nombre: item.Producto?.nombre ?? "",
      categoria: item.Producto?.categoria ?? "",
      imagen: item.Producto?.imagen ?? "",
      precio: item.precioUnitario,
      cantidad: item.cantidad,
      stock: item.Producto?.stock,
    }));
    setCarrito(normalizado);
  };

  // Cargar carrito desde backend
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario || !usuario.id) {
      alert("Debes iniciar sesión para ver tu carrito.");
      navigate("/login");
      return;
    }

    const fetchCarrito = async () => {
      setCargando(true);
      try {
        // POST /api/carrito para obtener o crear carrito activo
        const res = await fetch("http://localhost:3001/api/carrito", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuarioId: usuario.id }),
        });

        if (!res.ok) {
          let msg = "Error obteniendo carrito.";
          try {
            const data = await res.json();
            if (data?.error) msg = data.error;
          } catch {}
          throw new Error(msg);
        }

        const data = await res.json();
        setCarritoId(data.id);
        localStorage.setItem("carritoId", data.id);
        normalizarCarritoDesdeAPI(data);
      } catch (error) {
        console.error(error);
        alert(error.message || "No se pudo cargar el carrito.");
      } finally {
        setCargando(false);
      }
    };

    fetchCarrito();
  }, [navigate]);

  const calcularTotal = () => {
    return carrito.reduce(
      (total, producto) =>
        total + producto.precio * (producto.cantidad || 1),
      0
    );
  };

  const eliminarDelCarrito = async (codigo) => {
    if (!carritoId) return;
    const item = carrito.find((p) => p.codigo === codigo);
    if (!item) return;

    try {
      const res = await fetch(
        `http://localhost:3001/api/carrito/${carritoId}/items/${item.itemId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        let msg = "Error eliminando producto del carrito.";
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
        } catch {}
        throw new Error(msg);
      }

      const data = await res.json(); // { carrito: carritoActualizado, total }
      if (data.carrito) {
        normalizarCarritoDesdeAPI(data.carrito);
      } else {
        // fallback: sacar el item localmente
        setCarrito((prev) =>
          prev.filter((p) => p.itemId !== item.itemId)
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "No se pudo eliminar el producto.");
    }
  };

  const actualizarCantidad = async (codigo, nuevaCantidad) => {
    if (!carritoId || nuevaCantidad < 1) return;
    const item = carrito.find((p) => p.codigo === codigo);
    if (!item) return;

    // Validar stock
    if (
      typeof item.stock === "number" &&
      nuevaCantidad > item.stock
    ) {
      alert(`No puedes agregar más. Stock disponible: ${item.stock}.`);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3001/api/carrito/${carritoId}/items/${item.itemId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cantidad: nuevaCantidad }),
        }
      );

      if (!res.ok) {
        let msg = "Error actualizando cantidad.";
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
        } catch {}
        throw new Error(msg);
      }

      const data = await res.json(); // { carrito: carritoActualizado, total }
      if (data.carrito) {
        normalizarCarritoDesdeAPI(data.carrito);
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "No se pudo actualizar la cantidad.");
    }
  };

  const vaciarCarrito = async () => {
    if (!carritoId) return;
    try {
      // No tienes endpoint para vaciar, así que eliminamos ítem por ítem
      await Promise.all(
        carrito.map((item) =>
          fetch(
            `http://localhost:3001/api/carrito/${carritoId}/items/${item.itemId}`,
            { method: "DELETE" }
          )
        )
      );
      setCarrito([]);
    } catch (error) {
      console.error(error);
      alert("No se pudo vaciar el carrito por completo.");
    }
  };

  const handleDatosEnvioChange = (e) => {
    setDatosEnvio({ ...datosEnvio, [e.target.name]: e.target.value });
  };

  const handleRegionChange = (e) => {
    const nombreRegion = e.target.value;
    setDatosEnvio({ ...datosEnvio, region: nombreRegion, comuna: "" });
    const regionEncontrada = regiones.find((r) => r.nombre === nombreRegion);
    setComunas(regionEncontrada ? regionEncontrada.comunas : []);
  };

  const finalizarCompra = async (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    for (const key in datosEnvio) {
      if (datosEnvio[key] === "") {
        alert(`Por favor, complete el campo: ${key}`);
        return;
      }
    }

    const ordenData = {
      productos: carrito,
      total: calcularTotal(),
      datosEnvio: datosEnvio,
    };

    // Simulación de error de pago
    if (datosEnvio.nombre.toLowerCase().includes("error")) {
      console.log("Simulando pago fallido...");
      navigate("/resultado-pago", {
        state: { orden: ordenData, exito: false },
      });
      return;
    }

    console.log("Procesando pago exitoso...");

    // Guardar orden en localStorage (a falta de endpoint /api/ordenes)
    const ordenesGuardadas =
      JSON.parse(localStorage.getItem("ordenes")) || [];
    const nuevaOrden = {
      ...ordenData,
      id: Date.now(),
      fecha: new Date().toISOString(),
    };
    ordenesGuardadas.push(nuevaOrden);
    localStorage.setItem("ordenes", JSON.stringify(ordenesGuardadas));

    // Vaciar carrito en backend y front
    await vaciarCarrito();

    navigate("/resultado-pago", {
      state: { orden: nuevaOrden, exito: true },
    });

    setDatosEnvio({
      nombre: "",
      email: "",
      telefono: "",
      region: "",
      comuna: "",
      direccion: "",
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container mt-5 mb-5 flex-grow-1">
        <div className="row">
          {/* Lista de productos en el carrito */}
          <div className="col-md-8">
            <h3 className="fw-bold mb-4 text-center">Lista de productos</h3>

            {cargando ? (
              <p className="text-center">Cargando carrito...</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {carrito.map((producto) => {
                  const rutaImagen = producto.imagen
                    ? require(`../assets/images/${producto.imagen}`)
                    : require(`../assets/images/logo_mercado.jpg`);

                  return (
                    <div key={producto.itemId} className="col">
                      <div className="card h-100 shadow-sm text-center">
                        <img
                          src={rutaImagen}
                          alt={producto.nombre}
                          className="card-img-top"
                          onError={(e) => {
                            e.target.src = "../assets/images/logo_mercado.jpg";
                          }}
                          style={{
                            height: "200px",
                            objectFit: "cover",
                            backgroundColor: "#f8f9fa",
                          }}
                        />
                        <div className="card-body">
                          <h6 className="fw-bold">{producto.nombre}</h6>
                          <p className="text-muted mb-1">
                            {producto.categoria}
                          </p>
                          <p className="fw-bold text-success">
                            $
                            {Number(producto.precio).toLocaleString("es-CL")}
                          </p>
                          <button
                            className="btn btn-outline-dark btn-sm"
                            onClick={() =>
                              eliminarDelCarrito(producto.codigo)
                            }
                          >
                            Quitar
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Resumen de carrito y cantidades */}
          <div className="col-md-4">
            <h3 className="fw-bold mb-4 text-center">Carrito de Compras</h3>
            <div className="card shadow-sm">
              <div className="card-body">
                {carrito.length === 0 ? (
                  <p className="text-center text-muted">
                    Tu carrito está vacío
                  </p>
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
                          <tr key={producto.itemId}>
                            <td>{producto.nombre}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <button
                                  className="btn btn-outline-secondary btn-sm"
                                  onClick={() =>
                                    actualizarCantidad(
                                      producto.codigo,
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
                                      producto.codigo,
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
                              ).toLocaleString("es-CL")}
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  eliminarDelCarrito(producto.codigo)
                                }
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
                        Total: $
                        {calcularTotal().toLocaleString("es-CL")}
                      </h5>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={vaciarCarrito}
                      >
                        Vaciar carrito
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <hr className="my-5" />

        {carrito.length > 0 && (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h3 className="fw-bold mb-4">Dirección de Despacho</h3>
              <form onSubmit={finalizarCompra} noValidate>
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="nombre" className="form-label">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={datosEnvio.nombre}
                      onChange={handleDatosEnvioChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={datosEnvio.email}
                      onChange={handleDatosEnvioChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="telefono" className="form-label">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="telefono"
                      name="telefono"
                      value={datosEnvio.telefono}
                      onChange={handleDatosEnvioChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="region" className="form-label">
                      Región
                    </label>
                    <select
                      className="form-select"
                      id="region"
                      name="region"
                      value={datosEnvio.region}
                      onChange={handleRegionChange}
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {regiones.map((r) => (
                        <option key={r.nombre} value={r.nombre}>
                          {r.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="comuna" className="form-label">
                      Comuna
                    </label>
                    <select
                      className="form-select"
                      id="comuna"
                      name="comuna"
                      value={datosEnvio.comuna}
                      onChange={handleDatosEnvioChange}
                      required
                      disabled={!datosEnvio.region}
                    >
                      <option value="">Seleccionar...</option>
                      {comunas.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="direccion" className="form-label">
                      Dirección
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="direccion"
                      name="direccion"
                      value={datosEnvio.direccion}
                      onChange={handleDatosEnvioChange}
                      required
                      placeholder="Calle, Número, Depto/Casa"
                    />
                  </div>
                </div>
                <hr className="my-4" />
                <button
                  className="w-100 btn btn-success btn-lg"
                  type="submit"
                >
                  Finalizar Compra
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Carrito;
