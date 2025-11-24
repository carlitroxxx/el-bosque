import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { to: "/dashboard", label: "📊 Dashboard" },
    { to: "/productos", label: "📦 Inventario" },
    { to: "/mensajes", label: "📬 Mensajes" },
    { to: "/usuarios", label: "👤 Usuarios" },
    { to: "/", label: "🏪 Vista Cliente" }
  ];

  return (
    <div className="col-2 border-end bg-white p-3">
      <h4>COMPANY</h4>
      <hr />
      {menu.map((item, i) =>
        item.separator ? (
          <hr key={i} />
        ) : (
          <p key={i}>
            <Link
              to={item.to}
              className={`btn btn-link text-start w-100 ${
                location.pathname === item.to ? "fw-bold text-dark" : ""
              }`}
            >
              {item.label}
            </Link>
          </p>
        )
      )}
    </div>
  );
};

export default Sidebar;
