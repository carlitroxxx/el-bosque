import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo_mercado.jpg";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Logo Tienda"
            width="40"
            height="40"
            className="d-inline-block align-text-top me-2"
          />
          Minimercado El Bosque
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/catalogo">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Blogs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Contacto</Link>
            </li>
          </ul>
        </div>

        <div className="d-flex ms-auto">
          <Link to="/login" className="btn btn-outline-light me-2">Iniciar sesión</Link>
          <Link to="/registro" className="btn btn-warning">Registrarse</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
