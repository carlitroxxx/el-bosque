
import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../componentes/SideBar";

function leerMensajes() {
  try {
    const raw = localStorage.getItem("msjContacto");
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function guardarMensajes(lista) {
  localStorage.setItem("msjContacto", JSON.stringify(lista));
}

export default function MensajesContacto() {
  const [mensajes, setMensajes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const lista = leerMensajes().map((m) => ({
      id: Number(m?.id) || 0,
      nombre: String(m?.nombre || ""),
      correo: String(m?.correo || ""),
      contenido: String(m?.contenido || ""),
    }));
    setMensajes(lista);
  }, []);

  const setYGuardar = (lista) => {
    setMensajes(lista);
    guardarMensajes(lista);
  };

  const eliminar = (id) => {
    if (!window.confirm("¿Eliminar este mensaje?")) return;
    const nuevo = mensajes.filter((m) => m.id !== id);
    setYGuardar(nuevo);
  };

  const limpiarTodo = () => {
    if (!window.confirm("¿Vaciar todos los mensajes?")) return;
    setYGuardar([]);
  };

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return mensajes;
    return mensajes.filter((m) =>
      [m.nombre, m.correo, m.contenido].some((v) =>
        String(v).toLowerCase().includes(q)
      )
    );
  }, [busqueda, mensajes]);

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row pt-5">
          <Sidebar />

        {/* Contenido */}
        <main className="col-md-9 col-lg-10 p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="m-0">📬 Mensajes de Contacto</h3>
            <div className="d-flex gap-2">
              <input
                type="search"
                className="form-control"
                placeholder="Buscar por nombre, correo o texto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button className="btn btn-outline-danger" onClick={limpiarTodo} disabled={mensajes.length === 0}>
                Vaciar
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th style={{width: "80px"}}>#</th>
                  <th style={{minWidth: "180px"}}>Nombre</th>
                  <th style={{minWidth: "220px"}}>Correo</th>
                  <th>Mensaje</th>
                  <th style={{width: "120px"}}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted py-4">
                      No hay mensajes para mostrar.
                    </td>
                  </tr>
                ) : (
                  filtrados.map((m) => (
                    <tr key={m.id}>
                      <td>{m.id}</td>
                      <td>{m.nombre}</td>
                      <td>{m.correo}</td>
                      <td style={{whiteSpace: "pre-wrap"}}>{m.contenido}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(m.id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {mensajes.length === 0 && (
            <p className="text-muted mt-2">
              Los mensajes se leen de <code>localStorage["msjContacto"]</code>. Esta vista no usa fechas y respeta los IDs guardados.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
