import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import { regiones } from "../datos/regiones-comunas";
import { useNavigate } from 'react-router-dom';

const normalizarCarrito = (items = []) => {
  const map = new Map();
  for (const it of items) {
    const key = it.codigo;
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


function leerProductos() {
  try {
    const raw = localStorage.getItem("productos");
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

const Carrito = () => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const productos = useMemo(() => leerProductos(), []);

  const [datosEnvio, setDatosEnvio] = useState({
    nombre: "",
    email: "",
    telefono: "",
    region: "",
    comuna: "",
    direccion: "",
  });
  const [comunas, setComunas] = useState([]);
  

  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem("carrito")) || [];
    const normalizado = normalizarCarrito(guardado);
    setCarrito(normalizado);
    if(normalizado.length > 0) {
      localStorage.setItem("carrito", JSON.stringify(normalizado));
    }
  }, []);

  const setYGuardar = (items) => {
    const normalizado = normalizarCarrito(items);
    setCarrito(normalizado);
    localStorage.setItem("carrito", JSON.stringify(normalizado));
  };

  const eliminarDelCarrito = (codigo) => {
    setYGuardar(carrito.filter((p) => p.codigo !== codigo));
  };

  const actualizarCantidad = (codigo, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    const productoOriginal = productos.find(p => String(p.id) === String(id));
    if (productoOriginal && typeof productoOriginal.stock === 'number' && nuevaCantidad > productoOriginal.stock) {
        alert(`No puedes agregar más. Stock disponible: ${productoOriginal.stock}.`);
        return;
    }
    const nuevo = carrito.map((p) =>
      p.codigo === codigo ? { ...p, cantidad: nuevaCantidad } : p
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

  const handleDatosEnvioChange = (e) => {
    setDatosEnvio({ ...datosEnvio, [e.target.name]: e.target.value });
  };

  const handleRegionChange = (e) => {
    const nombreRegion = e.target.value;
    setDatosEnvio({ ...datosEnvio, region: nombreRegion, comuna: "" });
    const regionEncontrada = regiones.find(r => r.nombre === nombreRegion);
    setComunas(regionEncontrada ? regionEncontrada.comunas : []);
  };

  const finalizarCompra = (e) => {
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

    
    if (datosEnvio.nombre.toLowerCase().includes("error")) {
      console.log("Simulando pago fallido...");
      navigate('/pagofallido', { state: { orden: ordenData } });
      return;
    }
    
  
    console.log("Procesando pago exitoso...");
    
  
    const ordenesGuardadas = JSON.parse(localStorage.getItem("ordenes")) || [];
    const nuevaOrden = {
        ...ordenData,
        id: Date.now(), 
        fecha: new Date().toISOString(), 
    };
    ordenesGuardadas.push(nuevaOrden);
    localStorage.setItem("ordenes", JSON.stringify(ordenesGuardadas));
   

    navigate('/confirmacioncompra', { state: { orden: nuevaOrden } });
    
  
    vaciarCarrito();
    setDatosEnvio({ nombre: "", email: "", telefono: "", region: "", comuna: "", direccion: "" });
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
                <div key={producto.codigo} className="col">
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
                        onClick={() => eliminarDelCarrito(producto.codigo)}
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
                          <tr key={producto.codigo}>
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
                                  disabled={(producto.cantidad || 1) >= (productos.find(p => p.id === producto.id)?.stock || Infinity)}
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
                                onClick={() => eliminarDelCarrito(producto.codigo)}
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
                        <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                        <input type="text" className="form-control" id="nombre" name="nombre" value={datosEnvio.nombre} onChange={handleDatosEnvioChange} required />
                        </div>
                        <div className="col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={datosEnvio.email} onChange={handleDatosEnvioChange} required />
                        </div>
                        <div className="col-12">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input type="tel" className="form-control" id="telefono" name="telefono" value={datosEnvio.telefono} onChange={handleDatosEnvioChange} required />
                        </div>
                        <div className="col-12">
                        <label htmlFor="region" className="form-label">Región</label>
                        <select className="form-select" id="region" name="region" value={datosEnvio.region} onChange={handleRegionChange} required>
                            <option value="">Seleccionar...</option>
                            {regiones.map(r => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
                        </select>
                        </div>
                        <div className="col-12">
                        <label htmlFor="comuna" className="form-label">Comuna</label>
                        <select className="form-select" id="comuna" name="comuna" value={datosEnvio.comuna} onChange={handleDatosEnvioChange} required disabled={!datosEnvio.region}>
                            <option value="">Seleccionar...</option>
                            {comunas.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        </div>
                        <div className="col-12">
                        <label htmlFor="direccion" className="form-label">Dirección</label>
                        <input type="text" className="form-control" id="direccion" name="direccion" value={datosEnvio.direccion} onChange={handleDatosEnvioChange} required placeholder="Calle, Número, Depto/Casa" />
                        </div>
                    </div>
                    <hr className="my-4" />
                    <button className="w-100 btn btn-success btn-lg" type="submit">Finalizar Compra</button>
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
