import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import letrero from "../assets/images/letrero_con_alimento_para_mascotas.png";
import carroLogo from "../assets/images/logo_carro.png";
import ProductoDestacado from "../componentes/ProductoDestacado";

function Home() {
  const [productosDestacados, setProductosDestacados] = useState([]);

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    setProductosDestacados(productosGuardados.slice(0, 6));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 250,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="App d-flex flex-column min-vh-100">
      <Navbar />

      {/* Sección bienvenida */}
      <div className="container my-5 bg-secondary-subtle rounded">
        <div className="row align-items-center">
          <div className="col-md-6 d-flex flex-column justify-content-center py-4 px-5">
            <h2 className="fw-bold">Bienvenido a Minimercado El Bosque</h2>
            <p className="mb-3">
              Explora nuestros productos y arma tu carrito de compras.
            </p>

            <Link
              to="/catalogo"
              className="btn btn-outline-dark mt-2 d-inline-flex align-items-center"
            >
              <img
                src={carroLogo}
                style={{ maxWidth: "20px" }}
                className="me-2"
                alt="Carrito de compras"
              />
              Ver productos
            </Link>
          </div>
          <div className="col-md-6 d-flex justify-content-center py-4">
            <img
              src={letrero}
              className="img-fluid p-3 bg-secondary-subtle rounded"
              style={{ maxWidth: "450px" }}
              alt="Letrero con alimento para mascotas"
            />
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h3 className="mb-4">Productos Destacados</h3>

        {productosDestacados.length === 0 ? (
          <p className="text-center text-muted">
            No hay productos destacados guardados aún.
          </p>
        ) : (
          <Slider {...settings}>
            {productosDestacados.map((p) => (
              <div key={p.codigo} className="px-2">
                <ProductoDestacado
                  producto={p}
                  nombre={p.nombre}
                  descripcion={p.descripcion}
                />
              </div>
            ))}
          </Slider>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
