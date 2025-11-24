import React from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import { Link } from "react-router-dom";
import alimentosMascotas from "../assets/images/alimentos_mascotas.jpg";

const DetalleBlog2 = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-md-8">

            <h2 className="fw-bold mb-3">
              Porque tus mascotas también son parte de la familia
            </h2>

            <p className="text-muted">
              En respuesta a las necesidades de nuestros clientes, inauguramos oficialmente la nueva sección dedicada a
              mascotas en Minimercado El Bosque.
              Aquí encontrarás alimentos balanceados de marcas reconocidas, snacks saludables, arena para gatos y
              próximamente juguetes y accesorios.
              Sabemos lo importante que son las mascotas en cada hogar, y queremos ser tu aliado para que tengan una vida
              feliz y saludable.
            </p>

            <p className="text-muted">
              ¡Ven a conocernos y aprovecha las promociones de lanzamiento durante todo este mes!
            </p>

            <div className="text-center my-4">
              <img 
                src={alimentosMascotas}
                className="img-fluid rounded shadow"
                alt="Detalle Blog 2"
                style={{ maxWidth: "500px" }}
              />
            </div>

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

export default DetalleBlog2;
