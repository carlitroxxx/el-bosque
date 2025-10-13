import React from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import letreromascotas from "../assets/images/letrero_con_alimento_para_mascotas.png"

const Nosotros = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container my-5 flex-grow-1">
        {/* Sección Empresa */}
        <h2 className="text-center fw-bold mb-4">Sobre Nosotros</h2>
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <p className="text-muted fs-5">
              Somos <strong>Minimercado El Bosque</strong>, una tienda de barrio que ofrece una gran variedad de productos
              para tu día a día.
              Desde pan fresco, abarrotes y frutas, hasta bebidas, licores, congelados y alimentos para mascotas,
              trabajamos para brindarte calidad y comodidad en un solo lugar.
            </p>
          </div>
        </div>

        {/* Imagen decorativa */}
        <div className="text-center my-4">
          <img 
            src= {letreromascotas} 
            style={{ maxWidth: "40%" }} 
            className="img-fluid rounded shadow" 
            alt="Imagen de la empresa" 
          />
        </div>

        {/* Sección Desarrolladores */}
        <h3 className="text-center fw-bold mt-5 mb-4">Nuestro Equipo</h3>
        <div className="row justify-content-center g-4">
          {/* Desarrollador 1 */}
          <div className="col-md-5">
            <div className="card text-center shadow h-100">
              <div className="card-body">
                <h5 className="card-title">Carlos Moil</h5>
                <p className="card-text text-muted">
                  Desarrollador Backend. Responsable de la lógica de negocio, manejo de datos y conexión con el sistema.
                </p>
              </div>
            </div>
          </div>

          {/* Desarrollador 2 */}
          <div className="col-md-5">
            <div className="card text-center shadow h-100">
              <div className="card-body">
                <h5 className="card-title">Martín Baza</h5>
                <p className="card-text text-muted">
                  Desarrollador Frontend. Apasionado por el diseño web y la experiencia de usuario, encargado de la interfaz
                  y la maquetación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Nosotros;