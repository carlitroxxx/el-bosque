import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../componentes/SideBar";

const API_URL = "http://localhost:3001/api/mensajes";
export default function MensajesContacto() {
  const [mensajes, setMensajes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (!user || user.rol !== "ADMINISTRADOR") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const cargarMensajes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Error al cargar mensajes desde el servidor.");
        }

        const data = await res.json();
        const lista = (Array.isArray(data) ? data : []).map((m) => ({
          id: Number(m?.id) || 0,
          nombre: String(m?.nombre || ""),
          correo: String(m?.correo || m?.email || ""),
          contenido: String(m?.contenido || m?.mensaje || ""),
        }));
        setMensajes(lista);
      } catch (err) {
        console.error(err);
        alert(err.message || "No se pudieron cargar los mensajes.");
      }
    };

    cargarMensajes();
  }, []);

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar este mensaje?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("No se pudo eliminar el mensaje.");
      }

      setMensajes((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message || "Error eliminando el mensaje.");
    }
  };

  const limpiarTodo = async () => {
    if (!window.confirm("¿Vaciar todos los mensajes?")) return;

    try {
      const token = localStorage.getItem("token");
      await Promise.all(
        mensajes.map((m) =>
          fetch(`${API_URL}/${m.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );
      setMensajes([]);
    } catch (err) {
      console.error(err);
      alert("No se pudieron eliminar todos los mensajes.");
    }
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
              <button
                className="btn btn-outline-danger"
                onClick={limpiarTodo}
                disabled={mensajes.length === 0}
              >
                Vaciar
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th style={{ width: "80px" }}>#</th>
                  <th style={{ minWidth: "180px" }}>Nombre</th>
                  <th style={{ minWidth: "220px" }}>Correo</th>
                  <th>Mensaje</th>
                  <th style={{ width: "120px" }}>Acciones</th>
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
                      <td style={{ whiteSpace: "pre-wrap" }}>
                        {m.contenido}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => eliminar(m.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
