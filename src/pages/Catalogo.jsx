import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import ProductoCard from "../componentes/ProductoCard";

const Catalogo = () => {
  const [productos, setProductos] = useState([]);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(stored);
    
    const categoriasUnicas = ["Todos", ...new Set(stored.map((p) => p.categoria))];
    setCategorias(categoriasUnicas);
  }, []);

  const agregarAlCarrito = (producto) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito`);
  };

  
  const productosFiltrados =
    !categoriaSeleccionada || categoriaSeleccionada === "Todos"
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container mt-4 flex-grow-1">
        <h3 className="text-center mb-4">PRODUCTOS</h3>
        <div className="text-center mb-5">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`btn ${categoriaSeleccionada === cat ? "btn-dark" : "btn-outline-dark"} m-1`}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="row">
          {productosFiltrados.length === 0 ? (
            <p className="text-center">No hay productos disponibles en esta categoría.</p>
          ) : (
            productos.map((p) => (
              <ProductoCard key={p.codigo} producto={p} onAgregar={agregarAlCarrito} />
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Catalogo;
