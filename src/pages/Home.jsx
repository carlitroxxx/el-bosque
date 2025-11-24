import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import letrero from "../assets/images/letrero_con_alimento_para_mascotas.png";
import carroLogo from "../assets/images/logo_carro.png";
import ProductoDestacado from "../componentes/ProductoDestacado";

const API = "http://localhost:3001/api";

function Home() {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestacados = async () => {
      try {
        const res = await fetch(`${API}/productos`);
        if (!res.ok) throw new Error("No se pudieron cargar los productos.");
        const data = await res.json();
        setProductosDestacados(data.slice(0, 6));
      } catch (error) {
        console.error(error);
        setProductosDestacados([]);
      }
    };

    fetchDestacados();
  }, []);

  const obtenerOCrearCarrito = async (usuario, token) => {
    const res = await fetch(`${API}/carrito`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ usuarioId: usuario.id }),
    });

    if (!res.ok) {
      let msg = "Error obteniendo/creando carrito.";
      try {
        const data = await res.json();
        if (data?.error) msg = data.error;
      } catch {}
      throw new Error(msg);
    }

    const data = await res.json();
    localStorage.setItem("carritoId", data.id);
    return data;
  };

  const agregarAlCarrito = async (producto) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");

    if (!usuario || !token) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      navigate("/login");
      return;
    }

    try {
      let carritoId = localStorage.getItem("carritoId");

      if (!carritoId) {
        const carrito = await obtenerOCrearCarrito(usuario, token);
        carritoId = carrito.id;
      }

      const resItem = await fetch(
        `${API}/carrito/${carritoId}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productoId: producto.id, cantidad: 1 }),
        }
      );

      if (!resItem.ok) {
        let msg = "Error agregando producto al carrito.";
        try {
          const dataErr = await resItem.json();
          if (dataErr?.error) msg = dataErr.error;
        } catch {}
        throw new Error(msg);
      }

      alert(`${producto.nombre} agregado al carrito`);
    } catch (error) {
      console.error(error);
      alert(error.message || "No se pudo agregar el producto al carrito.");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 250,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
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
            No hay productos destacados disponibles.
          </p>
        ) : (
          <Slider {...settings}>
            {productosDestacados.map((p) => (
              <div key={p.codigo} className="px-2">
                <ProductoDestacado
                  producto={p}
                  nombre={p.nombre}
                  descripcion={p.descripcion}
                  onAgregar={agregarAlCarrito}
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
