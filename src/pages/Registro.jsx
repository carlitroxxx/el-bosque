import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import logo from "../assets/images/logo_mercado.jpg";
import { registrarUsuario, guardarSesion } from "../lib/auth";

import { runValido, limpiarRUN } from "../utils/validadores";

export default function Registro() {
  const [f, setF] = useState({
    correo: "",
    nombre: "",
    contrasena: "",
    confirmar: "",
    telefono: "",
    region: "",
    comuna: "",
    rut: "",
  });
  const [error, setError] = useState("");
  const [comunas, setComunas] = useState([]);
  const nav = useNavigate();

  const regionesComunas = {
    rm: [
      "Santiago","Providencia","Las Condes","Ñuñoa","Maipú","La Florida","Puente Alto",
      "San Bernardo","La Cisterna","El Bosque","La Granja","La Pintana","San Miguel",
      "San Joaquín","Macul","Peñalolén","La Reina","Vitacura","Lo Barnechea","Huechuraba",
      "Recoleta","Independencia","Conchalí","Quilicura","Renca","Cerro Navia","Lo Prado",
      "Quinta Normal","Pudahuel","Estación Central","Cerrillos"
    ],
    v: [
      "Valparaíso","Viña del Mar","Quilpué","Villa Alemana","Limache","Concón",
      "Quintero","Puchuncaví","Casablanca","Juan Fernández","San Antonio",
      "Cartagena","El Tabo","El Quisco","Algarrobo","Santo Domingo"
    ],
    viii: [
      "Concepción","Talcahuano","Chiguayante","San Pedro de la Paz","Coronel",
      "Lota","Penco","Tomé","Florida","Hualpén","Hualqui","Santa Juana"
    ],
    x: [
      "Puerto Montt","Puerto Varas","Osorno","Ancud","Castro","Quellón",
      "Calbuco","Frutillar","Llanquihue","Los Muermos","Maullín","Purranque",
      "Río Negro","San Pablo","Fresia","Puerto Octay"
    ],
    ii: [
      "Antofagasta","Calama","Tocopilla","Mejillones","Taltal","María Elena",
      "San Pedro de Atacama","Sierra Gorda"
    ],
    xv: ["Arica","Putre","Camarones"],
    i: ["Iquique","Alto Hospicio","Pozo Almonte","Pica","Huara","Camiña","Colchane"],
    iii: [
      "Copiapó","Caldera","Chañaral","Diego de Almagro","Tierra Amarilla","Vallenar",
      "Freirina","Huasco","Alto del Carmen"
    ],
    iv: [
      "La Serena","Coquimbo","Ovalle","Illapel","Los Vilos","Salamanca","Vicuña",
      "Andacollo","Monte Patria","Punitaqui","Río Hurtado","Combarbalá","Mincha"
    ],
    vi: [
      "Rancagua","Machalí","Graneros","Codegua","San Francisco de Mostazal","Rengo",
      "San Fernando","Santa Cruz","Pichilemu","Navidad","Litueche","La Estrella",
      "Marchihue","Paredones","Palmilla","Peralillo","Placilla","Pumanque","Chépica",
      "Nancagua"
    ],
    vii: [
      "Curicó","Talca","Linares","Constitución","Cauquenes","Parral","San Javier",
      "Molina","Teno","Río Claro","Sagrada Familia","Romeral","Rauco","Hualañé",
      "Vichuquén","Chanco","Pelluhue","Empedrado","Colbún","Yerbas Buenas","Longaví",
      "Retiro","Villa Alegre"
    ],
    ix: [
      "Temuco","Padre Las Casas","Villarrica","Pucón","Angol","Victoria","Lautaro",
      "Nueva Imperial","Carahue","Pitrufquén","Saavedra","Gorbea","Toltén","Loncoche",
      "Cunco","Perquenco","Galvarino","Lumaco","Traiguén","Purén","Los Sauces",
      "Renaico","Collipulli","Ercilla"
    ],
    xiv: [
      "Valdivia","La Unión","Río Bueno","Paillaco","Los Lagos","Corral","Máfil",
      "Mariquina","Panguipulli","Lanco","Futrono","Lago Ranco"
    ],
    xi: [
      "Coyhaique","Aysén","Cisnes","Guaitecas","Chile Chico","Río Ibáñez",
      "Cochrane","O'Higgins","Tortel"
    ],
    xii: [
      "Punta Arenas","Puerto Natales","Porvenir","Primavera","Timaukel","San Gregorio",
      "Río Verde","Laguna Blanca","Torres del Paine"
    ],
  };

  const onChange = (e) => {
    const { id, value } = e.target;

    if (id === "rut") {
      const limpio = limpiarRUN(value);
      setF({ ...f, rut: limpio });
      return;
    }

    setF({ ...f, [id]: value });

    if (id === "region") {
      setComunas(regionesComunas[value] || []);
      setF((prev) => ({ ...prev, comuna: "" }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (f.contrasena !== f.confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!runValido(f.rut)) {
      setError("El RUT ingresado no es válido. Verifica el dígito verificador.");
      return;
    }

    try {
      const u = registrarUsuario({
        correo: f.correo,
        nombre: f.nombre,
        contrasena: f.contrasena,
        telefono: f.telefono,
        region: f.region,
        comuna: f.comuna,
        rut: f.rut,
      });
      guardarSesion(u); // autologin
      nav("/", { replace: true });
    } catch (err) {
      setError(err.message || "No fue posible registrar al usuario.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="d-flex justify-content-center align-items-center bg-light flex-grow-1 py-5">
        <div className="card shadow" style={{ maxWidth: 520, width: "100%" }}>
          <div className="card-body p-4">

            <div className="text-center mb-3">
              <img
                src={logo}
                alt="Logo Minimercado El Bosque"
                style={{ maxWidth: 100 }}
                className="rounded-circle"
              />
              <h6 className="mt-2 mb-0 text-muted">Minimercado El Bosque</h6>
            </div>

            <h4 className="text-center mb-3">Crear cuenta</h4>

            {error && (
              <div className="alert alert-danger py-2 mb-3" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} noValidate>
              <div className="row g-2">
                <div className="col-md-6">
                  <label htmlFor="correo" className="form-label fw-semibold small text-uppercase">Correo</label>
                  <input
                    id="correo"
                    type="email"
                    className="form-control form-control-sm"
                    value={f.correo}
                    onChange={onChange}
                    required
                    placeholder="tucorreo@dominio.cl"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label fw-semibold small text-uppercase">Nombre</label>
                  <input
                    id="nombre"
                    className="form-control form-control-sm"
                    value={f.nombre}
                    onChange={onChange}
                    required
                    placeholder="Nombre y apellido"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="rut" className="form-label fw-semibold small text-uppercase">RUT</label>
                  <input
                    id="rut"
                    className="form-control form-control-sm"
                    value={f.rut}
                    onChange={onChange}
                    required
                    placeholder="12345678K"
                    inputMode="text"
                    autoComplete="off"
                  />
                  <div className="form-text">
                    Ingresa tu RUT sin puntos y sin guion.
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="telefono" className="form-label fw-semibold small text-uppercase">Teléfono</label>
                  <input
                    id="telefono"
                    className="form-control form-control-sm"
                    value={f.telefono}
                    onChange={onChange}
                    placeholder="+56 9 ..."
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="contrasena" className="form-label fw-semibold small text-uppercase">Contraseña</label>
                  <input
                    id="contrasena"
                    type="password"
                    className="form-control form-control-sm"
                    value={f.contrasena}
                    onChange={onChange}
                    required
                    placeholder="********"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="confirmar" className="form-label fw-semibold small text-uppercase">Confirmar</label>
                  <input
                    id="confirmar"
                    type="password"
                    className="form-control form-control-sm"
                    value={f.confirmar}
                    onChange={onChange}
                    required
                    placeholder="********"
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="region" className="form-label fw-semibold small text-uppercase">Región</label>
                  <select
                    id="region"
                    className="form-select form-select-sm"
                    value={f.region}
                    onChange={onChange}
                    required
                  >
                    <option value="" disabled>Seleccione una región</option>
                    <option value="xv">Arica y Parinacota</option>
                    <option value="i">Tarapacá</option>
                    <option value="ii">Antofagasta</option>
                    <option value="iii">Atacama</option>
                    <option value="iv">Coquimbo</option>
                    <option value="v">Valparaíso</option>
                    <option value="rm">Región Metropolitana</option>
                    <option value="vi">O'Higgins</option>
                    <option value="vii">Maule</option>
                    <option value="viii">Biobío</option>
                    <option value="ix">Araucanía</option>
                    <option value="xiv">Los Ríos</option>
                    <option value="x">Los Lagos</option>
                    <option value="xi">Aysén</option>
                    <option value="xii">Magallanes</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="comuna" className="form-label fw-semibold small text-uppercase">Comuna</label>
                  <select
                    id="comuna"
                    className="form-select form-select-sm"
                    value={f.comuna}
                    onChange={onChange}
                    required
                    disabled={!f.region}
                  >
                    <option value="" disabled>
                      {f.region ? "Seleccione una comuna" : "Primero seleccione una región"}
                    </option>
                    {comunas.map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="d-grid mt-3">
                <button type="submit" className="btn btn-success">Crear cuenta</button>
              </div>
            </form>

            <div className="text-center mt-3">
              <small>
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
              </small>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
