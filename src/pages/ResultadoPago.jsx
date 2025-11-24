import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";

const ResultadoPago = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orden, exito } = location.state || {}; 

  useEffect(() => {
    if (!orden) {
      navigate("/");
    }
  }, [orden, navigate]);

  if (!orden) return null;

  const numeroOrden = orden.id;

  const esExitoso = exito === true;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="card shadow-sm">
              <div className="card-body p-5">

                {esExitoso ? (
                  <>
                    <h1 className="text-success display-1">✓</h1>
                    <h2 className="mb-3">¡Gracias por tu compra!</h2>
                    <p className="text-muted">
                      Tu pedido ha sido confirmado y se está preparando para el envío.
                    </p>

                    <p className="fw-bold fs-5">N° de orden: #{numeroOrden}</p>
                  </>
                ) : (
                  <>
                    <h1 className="text-danger display-1">✗</h1>
                    <h2 className="mb-3">¡Hubo un problema con tu pago!</h2>
                    <p className="text-muted fs-5">
                      No pudimos procesar tu pago. Por favor, revisa los datos e inténtalo nuevamente.
                    </p>
                  </>
                )}

                <hr className="my-4" />

                <div className="text-start mb-4">
                  <h5 className="mb-3">
                    {esExitoso ? "Resumen del Pedido" : "Resumen del Intento de Compra"}
                  </h5>
                  <ul className="list-group">
                    {orden.productos.map((item) => (
                      <li
                        key={item.id || item.productoId}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span>
                          {item.nombre}{" "}
                          <span className="text-muted">x{item.cantidad || 1}</span>
                        </span>
                        <span>
                          ${(item.precio * (item.cantidad || 1)).toLocaleString("es-CL")}
                        </span>
                      </li>
                    ))}

                    <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                      <span>Total</span>
                      <span>${orden.total.toLocaleString("es-CL")}</span>
                    </li>
                  </ul>
                </div>

                <div className="text-start">
                  <h5 className="mb-3">Información de Despacho</h5>
                  <p className="mb-1">
                    <strong>Nombre:</strong> {orden.datosEnvio.nombre}
                  </p>
                  <p className="mb-1">
                    <strong>Dirección:</strong> {orden.datosEnvio.direccion}
                  </p>
                  <p className="mb-1">
                    <strong>Comuna:</strong> {orden.datosEnvio.comuna}
                  </p>
                  <p className="mb-1">
                    <strong>Región:</strong> {orden.datosEnvio.region}
                  </p>
                  <p className="mb-1">
                    <strong>Email:</strong> {orden.datosEnvio.email}
                  </p>
                  {orden.datosEnvio.telefono && (
                    <p className="mb-1">
                      <strong>Teléfono:</strong> {orden.datosEnvio.telefono}
                    </p>
                  )}
                </div>

                <hr className="my-4" />

                {esExitoso ? (
                  <Link to="/" className="btn btn-primary btn-lg">
                    Volver al Inicio
                  </Link>
                ) : (
                  <Link to="/carrito" className="btn btn-primary btn-lg px-4">
                    Volver al Carrito y Reintentar
                  </Link>
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

export default ResultadoPago;
