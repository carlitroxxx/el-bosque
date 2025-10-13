import React from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import { Link } from "react-router-dom";
import frutasVerduras from "../assets/images/frutas_verduras_frescas.jpg";

const DetalleBlog1 = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {/* Título */}
            <h2 className="fw-bold mb-3">Frescura y calidad en cada compra: nuestro compromiso con la comunidad</h2>

            {/* Descripción */}
            <p className="text-muted">
              En Minimercado El Bosque sabemos que la alimentación saludable comienza con productos frescos y de calidad.
              Por eso, hemos reforzado nuestra alianza con agricultores locales de la zona de Puerto Montt y alrededores.
              Cada semana, los lunes y jueves, recibimos frutas y verduras directamente desde el campo, garantizando precios
              accesibles y productos que llegan a tu mesa con todo su sabor y nutrientes.
            </p>
            <p className="text-muted">
              Nuestro compromiso es apoyar a los productores de la región y entregar a la comunidad de Bosquemar una
              alternativa cercana, fresca y confiable para sus compras diarias.
            </p>

            {/* Imagen debajo del texto */}
            <div className="text-center my-4">
              <img 
                src={frutasVerduras} 
                className="img-fluid rounded shadow" 
                alt="Detalle Blog 1"
                style={{ 
                  maxWidth: "500px", 
                  height: "auto" 
                }} 
              />
            </div>

            {/* Botón para volver */}
            <Link to="/blogs" className="btn btn-outline-secondary">
              Volver a Blogs
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DetalleBlog1;