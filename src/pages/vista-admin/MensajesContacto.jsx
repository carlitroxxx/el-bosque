import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../componentes/SideBar";
import Tabla from "../../componentes/Tabla";

export default function MensajesContacto() {
  const [mensajes, setMensajes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Cargar mensajes desde localStorage como en el resto de vistas
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("msjContacto")) || [];
    let lista = Array.isArray(stored) ? stored : [];

    // Normalizar: quitar fecha y asegurar id incremental
    let maxId = lista.reduce((mx, m) => Number.isFinite(Number(m?.id)) ? Math.max(mx, Number(m.id)) : mx, 0);
    lista = lista.map((m) => {
      const base = { ...m };
      if ("fecha" in base) delete base.fecha;
      if (!Number.isFinite(Number(base.id))) {
        maxId += 1;
        base.id = maxId;
      }
      return base;
    });

    // Persistir normalización y secuencia
    localStorage.setItem("msjContacto", JSON.stringify(lista));
    localStorage.setItem("msjContacto_seq", String(maxId || 0));

    setMensajes(lista);
  }, []);

  const persistir = (lista) => {
    localStorage.setItem("msjContacto", JSON.stringify(lista));
    setMensajes(lista);
  };

  const eliminarUno = (row) => {
    const id = Number(row?.id);
    const nueva = mensajes.filter((m) => Number(m?.id) !== id);
    persistir(nueva);
  };

  const eliminarTodos = () => {
    if (window.confirm("¿Seguro que deseas borrar TODOS los mensajes? Esta acción no se puede deshacer.")) {
      persistir([]);
      localStorage.setItem("msjContacto_seq", "0");
    }
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "NOMBRE", accessor: "nombre" },
    { header: "CORREO", accessor: "correo" },
    { header: "MENSAJE", accessor: "contenido" },
  ];

  const dataFiltrada = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return mensajes;
    return mensajes.filter((m) => {
      const t = `${m?.id ?? ""} ${m?.nombre ?? ""} ${m?.correo ?? ""} ${m?.contenido ?? ""}`.toLowerCase();
      return t.includes(q);
    });
  }, [busqueda, mensajes]);

  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-12 col-md-3 col-lg-2 bg-light min-vh-100 py-3">
          <Sidebar />
        </aside>
        <main className="col-12 col-md-9 col-lg-10 py-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="mb-0">📬 Mensajes de Contacto</h2>
            <button className="btn btn-outline-danger" onClick={eliminarTodos}>
              Vaciar bandeja
            </button>
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por id, nombre, correo o texto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <Tabla
                columns={columns}
                data={dataFiltrada}
                onEliminar={eliminarUno}
                onEditar={null}
              />
            </div>
          </div>

          {mensajes.length === 0 && (
            <p className="text-muted mt-3">
              No hay mensajes guardados todavía. Se cargan directamente desde <code>localStorage["msjContacto"]</code>,
              igual que el resto de vistas.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}