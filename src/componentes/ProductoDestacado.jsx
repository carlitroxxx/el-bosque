import React from "react";

const ProductoDestacado = ({ imagen, nombre, descripcion }) => {
  return (
    <div className="card text-center rounded-3 border-0 shadow-sm">
      <img
        src={imagen}
        className="card-img-top rounded-top"
        alt={nombre}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{nombre}</h5>
        <p className="card-text text-muted small">{descripcion}</p>
        <button className="btn btn-sm btn-outline-primary">Agregar</button>
      </div>
    </div>
  );
};

export default ProductoDestacado;
