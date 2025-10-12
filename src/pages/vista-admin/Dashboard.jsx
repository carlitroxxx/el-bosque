import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const opciones = [
    { titulo: "📊 Dashboard", ruta: "/dashboard" },
    { titulo: "📦 Productos", ruta: "/productos" },
    { titulo: "📑 Reporte", ruta: "#" },
    { titulo: "👥 Empleados", ruta: "#" },
    { titulo: "👤 Usuarios", ruta: "/usuarios" },
    { titulo: "⚙️ Ajustes", ruta: "#" },
    { titulo: "❓ Help", ruta: "#" },
    { titulo: "👤 Mi Cuenta", ruta: "#" },
  ];

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <h2 className="text-center mb-4">Panel de Administración</h2>

        <div className="row row-cols-1 row-cols-md-3 g-4 text-center">
          {opciones.map((op, index) => (
            <div className="col" key={index}>
              <div
                className="card card-option shadow p-3"
                onClick={() => navigate(op.ruta)}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                <h4>{op.titulo}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
