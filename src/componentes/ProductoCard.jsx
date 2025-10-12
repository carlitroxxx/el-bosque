import React from "react";
import { Link } from "react-router-dom";

const ProductoCard = ({ producto, onAgregar }) => {
  return (
    <div className="col-md-3 mb-4">
      <div className="card rounded-2 h-100">
        <img src={producto.imagen || "images/default.png"} className="card-img-top" alt={producto.nombre} />
        <div className="card-body text-center">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text">${producto.precio}</p>
          <button className="btn btn-primary w-100 mb-2" onClick={() => onAgregar && onAgregar(producto)}>
            Agregar
          </button>
          <Link to={`/detalle_producto/${producto.id}`} className="btn btn-outline-secondary w-100">
            Ver Detalle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;
