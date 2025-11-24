import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import logo from "../assets/images/logo_mercado.jpg";

const API_URL = "http://localhost:3001/api";

export default function Login() {
  const [form, setForm] = useState({ correo: "", contrasena: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();
  const loc = useLocation();
  const volverA = loc.state?.from?.pathname || "/";

  const onChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.correo,
          password: form.contrasena,
        }),
      });

      if (!res.ok) {
        throw new Error("Correo o contraseña incorrectos.");
      }

      const data = await res.json();
      const { token, usuario } = data;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (usuario) {
        localStorage.setItem("usuario", JSON.stringify(usuario));
      }

      const rol = (usuario?.rol || "").toUpperCase();

      if (rol === "ADMIN" || rol === "ADMINISTRADOR") {
        nav("/dashboard", { replace: true });
      } else {
        nav(volverA, { replace: true });
      }
    } catch (err) {
      setError(err.message || "No fue posible iniciar sesión.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="d-flex justify-content-center align-items-center bg-light flex-grow-1 py-5">
        <div className="card shadow" style={{ maxWidth: 420, width: "100%" }}>
          <div className="card-body p-4">

            <div className="text-center mb-3">
              <img
                src={logo}
                alt="Logo Minimercado El Bosque"
                style={{ maxWidth: 120 }}
                className="rounded-circle"
              />
              <h5 className="mt-2 mb-0">Minimercado El Bosque</h5>
            </div>

            <h4 className="text-center mb-3">Inicio de sesión</h4>

            {error && (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="correo" className="form-label fw-semibold small text-uppercase">
                  Correo
                </label>
                <input
                  type="email"
                  id="correo"
                  className="form-control"
                  value={form.correo}
                  onChange={onChange}
                  required
                  placeholder="tucorreo@dominio.cl"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="contrasena" className="form-label fw-semibold small text-uppercase">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="contrasena"
                  className="form-control"
                  value={form.contrasena}
                  onChange={onChange}
                  required
                  placeholder="********"
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Iniciar sesión
                </button>
              </div>
            </form>

            <div className="text-center mt-3">
              <small>
                ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
              </small>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
