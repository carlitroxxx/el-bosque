import React, { useState } from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo_mercado.jpg";

const Login = () => {
  const [formData, setFormData] = useState({ correo: "", contraseña: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const user = usuarios.find(
      u => u.correo === formData.correo && u.contrasena === formData.contraseña
    );

    if (!user) {
      alert("Correo o contraseña incorrectos");
      return;
    }

    // Guardar sesión
    const session = {
      correo: user.correo,
      nombre: user.nombre,
      rol: user.rol, // "ADMINISTRADOR" o "CLIENTE"
      loggedIn: true,
    };
    localStorage.setItem("session", JSON.stringify(session));

    alert("Inicio de sesión exitoso");
    navigate("/");
    setFormData({ correo: "", contraseña: "" });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="d-flex justify-content-center bg-light py-5 flex-grow-1">
        <div className="card shadow" style={{ maxWidth: "400px", width: "100%" }}>
          <div className="card-body p-4">
            <div className="text-center mb-3">
              <img src={logo} alt="Logo" style={{ maxWidth: "130px" }} />
              <h5 className="mt-2">Minimercado El Bosque</h5>
            </div>

            <h4 className="text-center mb-4">Inicio de sesión</h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">CORREO</label>
                <input type="email" className="form-control" id="correo" value={formData.correo} onChange={handleChange} required />
              </div>

              <div className="mb-4">
                <label htmlFor="contraseña" className="form-label">CONTRASEÑA</label>
                <input type="password" className="form-control" id="contraseña" value={formData.contraseña} onChange={handleChange} required />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">Iniciar sesión</button>
              </div>
            </form>

            <div className="text-center mt-3">
              <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
