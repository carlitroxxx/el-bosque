import React from "react";
import logo from "../assets/images/logo_mercado.jpg";
function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center" href="index.html">
                    <img src={logo} alt="Logo Tienda" width="40" height="40" className="d-inline-block align-text-top me-2"/>
                    Minimercado El Bosque
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link active" aria-current="page" href="index.html">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="productos.html">Productos</a></li>
                    <li className="nav-item"><a className="nav-link" href="nosotros.html">Nosotros</a></li>
                    <li className="nav-item"><a className="nav-link" href="blogs.html">Blogs</a></li>
                    <li className="nav-item"><a className="nav-link" href="contacto.html">Contacto</a></li>
                </ul>
            </div>
            <div className="d-flex ms-auto">
                <a href="login.html" className="btn btn-outline-light me-2">Iniciar sesión</a>
                <a href="registro.html" className="btn btn-warning">Registrarse</a>
            </div>

        </div>
    </nav>
    );
};
export default Navbar;
