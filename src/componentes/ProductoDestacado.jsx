import React from "react";

const ProductoDestacado = ({ producto, nombre, descripcion }) => {
  const rutaImagen = producto.imagen
    ? require(`../assets/images/${producto.imagen}`)
    : require(`../assets/images/logo_mercado.jpg`);
  return (
    <div className="card text-center rounded-3 border-0 shadow-sm">
      <img
        src={rutaImagen}
        className="card-img-top rounded-top"
        alt={nombre}
        style={{ height: "180px", objectFit: "cover" }}
        onError={(e) => {
            e.target.src = "../assets/images/logo_mercado.jpg"; 
          }}      
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
