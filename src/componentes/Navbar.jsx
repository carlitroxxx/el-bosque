import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo_mercado.jpg";

function Navbar() {
  const navigate = useNavigate();
  let session = null;
  try {
    session = JSON.parse(localStorage.getItem("session"));
  } catch {}

  const loggedIn = !!session?.loggedIn;
  const nombre = session?.nombre;
  const rol = session?.rol;

  const handleLogout = () => {
    localStorage.removeItem("session");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo Tienda" width="40" height="40" className="d-inline-block align-text-top me-2" />
          Minimercado El Bosque
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/catalogo">Productos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blogs">Blogs</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>

            {/* Link a vistas admin si está logueado como ADMINISTRADOR */}
            {loggedIn && rol === "ADMINISTRADOR" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/productos">Productos (Admin)</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/usuarios">Usuarios (Admin)</Link></li>
              </>
            )}
          </ul>
        </div>

        <div className="d-flex ms-auto align-items-center gap-2">
          {loggedIn ? (
            <>
              <span className="text-white-50 me-2">
                Hola, <strong>{nombre}</strong> {rol === "ADMINISTRADOR" ? "(Admin)" : ""}
              </span>
              <button onClick={handleLogout} className="btn btn-outline-light">Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light me-2">Iniciar sesión</Link>
              <Link to="/registro" className="btn btn-warning">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
