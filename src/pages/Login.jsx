import React, { useState } from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo_mercado.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    correo: "",
    contraseña: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulación de login - aquí puedes integrar con tu backend
    console.log("Datos de login:", formData);
    
    // Guardar en localStorage para simular sesión
    localStorage.setItem("usuario", JSON.stringify({
      correo: formData.correo,
      loggedIn: true
    }));
    
    alert("Inicio de sesión exitoso");
    navigate("/"); // Redirigir al home después del login
    
    // Limpiar formulario
    setFormData({
      correo: "",
      contraseña: ""
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="d-flex justify-content-center bg-light py-5 flex-grow-1">
        <div className="card shadow" style={{ maxWidth: "400px", width: "100%" }}>
          <div className="card-body p-4">

            {/* Logo / Nombre empresa */}
            <div className="text-center mb-3">
              <img 
                src={logo} 
                alt="Logo" 
                style={{ maxWidth: "130px" }} 
              />
              <h5 className="mt-2">Minimercado El Bosque</h5>
            </div>

            <h4 className="text-center mb-4">Inicio de sesión</h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">CORREO</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="correo" 
                  value={formData.correo}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="mb-4">
                <label htmlFor="contraseña" className="form-label">CONTRASEÑA</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="contraseña" 
                  value={formData.contraseña}
                  onChange={handleChange}
                  required 
                />
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