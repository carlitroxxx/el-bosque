import React, { useState } from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import logo from "../assets/images/logo_mercado.jpg";
import { mensajesContacto } from "../utils/auth";

const Contacto = () => {
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contenido: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    try{
      //funcion para guardar
      mensajesContacto(formData)
      alert("Mensaje enviado correctamente");
      setFormData({
        nombre: "",
        correo: "",
        contenido: ""
      });
    }catch(err){
      setError(err.message || "No fue posible enviar el mensaje, intentalo más tarde...")
    }
    
    
    
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container my-5 flex-grow-1">
        {/* Imagen superior */}
        <div className="text-center mb-3">
          <div className="border d-inline-block" style={{width: "120px", height: "120px", backgroundColor: "#f8f9fa"}}>
            <img 
              src={logo} 
              alt="Logo Tienda"
              style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}} 
            />
          </div>
        </div>

        {/* Nombre empresa */}
        <h2 className="text-center fw-bold mb-4">Minimercado El Bosque</h2>

        {/* Formulario */}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header text-center fw-bold bg-light">
                FORMULARIO DE CONTACTOS
              </div>
              <div className="card-body bg-light">
                {error && (
                  <div className="alert alert-danger py-2" role="alert">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  {/* Nombre completo */}
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label fw-semibold">Nombre Completo</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Escribe tu nombre completo" 
                      required
                    />
                  </div>

                  {/* Correo */}
                  <div className="mb-3">
                    <label htmlFor="correo" className="form-label fw-semibold">Correo</label>
                    <input 
                      className="form-control" 
                      id="correo" 
                      value={formData.correo}
                      onChange={handleChange}
                      placeholder="ejemplo@correo.com" 
                      required
                    />
                  </div>

                  {/* Contenido */}
                  <div className="mb-3">
                    <label htmlFor="contenido" className="form-label fw-semibold">Contenido</label>
                    <textarea 
                      className="form-control" 
                      id="contenido" 
                      rows="4"
                      value={formData.contenido}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje" 
                      required
                    />
                  </div>

                  {/* Botón */}
                  <div className="text-center">
                    <button type="submit" className="btn btn-outline-dark px-4">ENVIAR MENSAJE</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contacto;