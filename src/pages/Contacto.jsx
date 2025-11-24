import React, { useState } from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import logo from "../assets/images/logo_mercado.jpg";

const API_URL = "http://localhost:3001/api/mensajes";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contenido: "",
  });
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.correo,
          contenido: formData.contenido,
        }),
      });

      if (!res.ok) {
        let msg = "No fue posible enviar el mensaje.";
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
        } catch {}
        throw new Error(msg);
      }

      alert("Mensaje enviado correctamente");

      setFormData({
        nombre: "",
        correo: "",
        contenido: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.message || "Error al enviar el mensaje.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container my-5 flex-grow-1">
        <div className="text-center mb-3">
          <div
            className="border d-inline-block"
            style={{ width: "120px", height: "120px", backgroundColor: "#f8f9fa" }}
          >
            <img
              src={logo}
              alt="Logo Tienda"
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          </div>
        </div>

        <h2 className="text-center fw-bold mb-4">Minimercado El Bosque</h2>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header text-center fw-bold bg-light">
                FORMULARIO DE CONTACTOS
              </div>
              <div className="card-body bg-light">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label fw-semibold">
                      Nombre Completo
                    </label>
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

                  <div className="mb-3">
                    <label htmlFor="correo" className="form-label fw-semibold">
                      Correo
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      placeholder="ejemplo@correo.com"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="contenido" className="form-label fw-semibold">
                      Contenido
                    </label>
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

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-outline-dark px-4"
                      disabled={enviando}
                    >
                      {enviando ? "ENVIANDO..." : "ENVIAR MENSAJE"}
                    </button>
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
