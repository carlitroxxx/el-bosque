import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { sesionActual, cerrarSesion, buscarUsuarioPorCorreo } from "../lib/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const ses = sesionActual();
  const conectado = !!ses?.logeado;

  let rol = null;
  if (conectado) {
    const u = buscarUsuarioPorCorreo(ses.correo);
    rol = u?.rol || null;
  }

  const salir = () => {
    cerrarSesion();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Minimercado El Bosque</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/catalogo">Catálogo</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blogs">Blogs</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>

            {rol === "admin" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/dashboard">Admin</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/usuarios">Usuarios</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
              </>
            )}
          </ul>


          <div className="d-flex">
            <Link to="/carrito" className="btn btn-outline-light me-3">
              <i className="bi bi-cart me-1"></i> Carrito
            </Link>
            {!conectado ? (
              <>
                <Link className="btn btn-outline-light me-2" to="/login">Iniciar sesión</Link>
                <Link className="btn btn-warning" to="/registro">Registrarse</Link>
              </>
            ) : (
              <>
                <span className="navbar-text text-white me-3">
                  Hola, <strong>{ses.nombre}</strong>
                </span>
                <button className="btn btn-outline-light" onClick={salir}>Salir</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
