import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import ProductoCard from "../componentes/ProductoCard";
import { useNavigate } from "react-router-dom";

const Catalogo = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [categorias, setCategorias] = useState([]);

  // Cargar productos desde el backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/productos");
        if (!res.ok) {
          throw new Error("Error cargando productos desde el servidor.");
        }
        const data = await res.json();
        setProductos(data);

        const categoriasUnicas = [
          "Todos",
          ...new Set(data.map((p) => p.categoria || "Sin categoría")),
        ];
        setCategorias(categoriasUnicas);
      } catch (error) {
        console.error(error);
        alert(error.message || "No se pudieron cargar los productos.");
      }
    };

    fetchProductos();
  }, []);

  // Obtener o crear carrito en el backend para el usuario actual
  const obtenerOCrearCarrito = async (usuarioId) => {
    const res = await fetch("http://localhost:3001/api/carrito", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuarioId }),
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

    if (!usuario || !usuario.id) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      navigate("/login");
      return;
    }

    try {
      let carritoId = localStorage.getItem("carritoId");

      if (!carritoId) {
        const carrito = await obtenerOCrearCarrito(usuario.id);
        carritoId = carrito.id;
      }

      const resItem = await fetch(
        `http://localhost:3001/api/carrito/${carritoId}/items`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
              className={`btn ${
                categoriaSeleccionada === cat ? "btn-dark" : "btn-outline-dark"
              } m-1`}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="row">
          {productosFiltrados.length === 0 ? (
            <p className="text-center">
              No hay productos disponibles en esta categoría.
            </p>
          ) : (
            productosFiltrados.map((p) => (
              <ProductoCard
                key={p.codigo}
                producto={p}
                onAgregar={agregarAlCarrito}
              />
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Catalogo;
