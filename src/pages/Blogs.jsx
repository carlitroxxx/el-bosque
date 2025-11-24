import React from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import frutasverduras from "../assets/images/frutas_verduras_frescas.jpg"
import alimentosmascotas from "../assets/images/alimentos_mascotas.jpg"

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      titulo: "Nuevas frutas y verduras frescas cada semana",
      descripcion: "Ahora en Minimercado El Bosque contamos con proveedores locales que traen frutas y verduras frescas todos los lunes y jueves, directamente desde ferias de Puerto Montt.",
      imagen: frutasverduras,
      enlace: "/detalle1"
    },
    {
      id: 2,
      titulo: "Lanzamiento de la nueva sección de alimentos para mascotas",
      descripcion: "Inauguramos nuestro espacio dedicado a mascotas: alimentos premium, snacks y accesorios para perros y gatos, todo en un solo lugar.",
      imagen: alimentosmascotas,
      enlace: "/detalle2"
    }
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container mt-5 mb-5 flex-grow-1">
        <h2 className="text-center fw-bold mb-4">NOTICIAS IMPORTANTES</h2>

        {blogs.map((blog) => (
          <div key={blog.id} className="row justify-content-center mb-4">
            <div className="col-md-10 p-4 rounded shadow-sm bg-secondary-subtle">
              <div className="row align-items-center">

                <div className="col-md-6">
                  <h4 className="fw-bold">{blog.titulo}</h4>
                  <p className="text-muted">{blog.descripcion}</p>
                  <a href={blog.enlace} className="btn btn-outline-dark">VER</a>
                </div>

                <div className="col-md-6 d-flex justify-content-center">
                  <img 
                    src={blog.imagen} 
                    alt={blog.titulo} 
                    className="img-fluid rounded shadow-sm"
                    style={{ maxWidth: "300px", maxHeight: "200px", objectFit: "cover" }} 
                  />
                </div>

              </div>
            </div>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default Blogs;
