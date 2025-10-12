import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import ProductoCard from "../componentes/ProductoCard";

const Catalogo = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(stored);
  }, []);

  const agregarAlCarrito = (producto) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito`);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container mt-4 flex-grow-1">
        <h3 className="text-center mb-4">PRODUCTOS</h3>
        <div className="row">
          {productos.length === 0 ? (
            <p className="text-center">No hay productos disponibles</p>
          ) : (
            productos.map((p) => (
              <ProductoCard key={p.id} producto={p} onAgregar={agregarAlCarrito} />
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Catalogo;
