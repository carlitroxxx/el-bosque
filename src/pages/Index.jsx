import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"; 
import { Link } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import letrero from "../assets/images/letrero_con_alimento_para_mascotas.png";
import carroLogo from "../assets/images/logo_carro.png";
import ProductoDestacado from "../componentes/ProductoDestacado";
import producto1 from "../assets/images/producto1.jpg";
import producto2 from "../assets/images/producto2.jpg";
import producto3 from "../assets/images/producto3.jpg";
import producto4 from "../assets/images/producto4.jpg";
import producto5 from "../assets/images/producto5.jpg";
import producto6 from "../assets/images/producto6.jpg";

const productosDestacados = [
  {
    id: 1,
    nombre: "Producto 1",
    descripcion: "Corta descripción",
    imagen: producto1,
  },
  {
    id: 2,
    nombre: "Producto 2",
    descripcion: "Corta descripción",
    imagen: producto2,
  },
  {
    id: 3,
    nombre: "Producto 3",
    descripcion: "Corta descripción",
    imagen: producto3,
  },
  {
    id: 4,
    nombre: "Producto 4",
    descripcion: "Corta descripción",
    imagen: producto4,
  },
  {
    id: 5,
    nombre: "Producto 5",
    descripcion: "Corta descripción",
    imagen: producto5,
  },
  {
    id: 6,
    nombre: "Producto 6",
    descripcion: "Corta descripción",
    imagen: producto6,
  },
];
function Index(){
    const settings = {
        dots: true,           
        infinite: true,
        speed: 250,
        slidesToShow: 3,       
        slidesToScroll: 1,     
        responsive: [
        {
            breakpoint: 992,   // tablets
            settings: { slidesToShow: 2 },
        },
        {
            breakpoint: 576,   // móviles
            settings: { slidesToShow: 1 },
        },
        ],
    };
    return(
        <div className="App d-flex flex-column min-vh-100">
            <Navbar />
            <div className="container my-5 bg-secondary-subtle rounded">
                <div className="row align-items-center">
                    <div className="col-md-6 d-flex flex-column justify-content-center py-4 px-5">
                        <h2 className="fw-bold">Bienvenido a Minimercado El Bosque</h2>
                        <p className="mb-3">
                        Explora nuestros productos y arma tu carrito de compras.
                        </p>

                        <Link
                        to="/productos"
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
            
            
            {/* card */}
            <div className="container my-5">
                <h3 className="mb-4">Productos Destacados</h3>

                <Slider {...settings}>
                    {productosDestacados.map((p) => (
                        <div key={p.id} className="px-2">
                            <ProductoDestacado
                            imagen={p.imagen}
                            nombre={p.nombre}
                            descripcion={p.descripcion}
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            <Footer />
        </div>
    );
}
export default Index;
