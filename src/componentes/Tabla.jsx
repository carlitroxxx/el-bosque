import React from "react";

const Tabla = ({ columns, data, onEditar, onEliminar }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{col.header}</th>
          ))}
          <th>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + 1} className="text-center">
              No hay registros
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={row.correo || i}>
              {columns.map((col, j) => (
                <td key={j}>{row[col.field]}</td>
              ))}
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => onEditar && onEditar(row)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onEliminar && onEliminar(row)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Tabla;