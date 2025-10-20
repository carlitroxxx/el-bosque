import React, { useEffect, useMemo, useState } from "react";
import { runValido, limpiarRUN } from "../utils/validadores";

export default function UserForm({
  initialData = {},
  onSubmit,
  onCancel,
  submitLabel = "Guardar",
  showPassword = true,
  disableEmail = false,
  regionesComunas: regionesComunasProp
}) {
  const defaultRegionesComunas = useMemo(() => ({
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
    ]
  }), []);

  const regionesComunas = regionesComunasProp || defaultRegionesComunas;

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    rut: "",
    telefono: "",
    region: "",
    comuna: "",
    contrasena: "",
    rol: "CLIENTE",
    ...initialData
  });

  const [comunas, setComunas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (form.region) {
      setComunas(regionesComunas[form.region] || []);
    } else {
      setComunas([]);
    }
  }, [form.region, regionesComunas]);

  useEffect(() => {
    // If initial region/comuna provided, ensure comunas list is set
    if (initialData?.region) {
      setComunas(regionesComunas[initialData.region] || []);
    }
  }, [initialData, regionesComunas]);

  const onChange = (e) => {
    const { id, value } = e.target;
    if (id === "rut") {
      setForm((f) => ({ ...f, rut: limpiarRUN(value) }));
      return;
    }
    if (id === "region") {
      setForm((f) => ({ ...f, region: value, comuna: "" }));
      return;
    }
    setForm((f) => ({ ...f, [id]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    setError("");

    if (!runValido(form.rut)) {
      setError("El RUT ingresado no es válido.");
      return;
    }
    if (showPassword && !form.contrasena) {
      setError("La contraseña es obligatoria.");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} noValidate>
      {error && <div className="alert alert-danger py-2">{error}</div>}

      <div className="row g-2">
        <div className="col-md-6">
          <label htmlFor="nombre" className="form-label fw-semibold small text-uppercase">Nombre</label>
          <input id="nombre" className="form-control form-control-sm"
            value={form.nombre || ""} onChange={onChange} required placeholder="Nombre y apellido" />
        </div>

        <div className="col-md-6">
          <label htmlFor="correo" className="form-label fw-semibold small text-uppercase">Correo</label>
          <input id="correo" type="email" className="form-control form-control-sm"
            value={form.correo || ""} onChange={onChange} required placeholder="tucorreo@dominio.cl"
            disabled={disableEmail} />
        </div>

        <div className="col-md-6">
          <label htmlFor="rut" className="form-label fw-semibold small text-uppercase">RUT</label>
          <input id="rut" className="form-control form-control-sm"
            value={form.rut || ""} onChange={onChange} required placeholder="12.345.678-K" />
          <div className="form-text">Ingresa tu RUT sin puntos (guion opcional).</div>
        </div>

        <div className="col-md-6">
          <label htmlFor="telefono" className="form-label fw-semibold small text-uppercase">Teléfono</label>
          <input id="telefono" className="form-control form-control-sm"
            value={form.telefono || ""} onChange={onChange} placeholder="+56 9 ..." />
        </div>

        <div className="col-md-4">
          <label htmlFor="region" className="form-label fw-semibold small text-uppercase">Región</label>
          <select id="region" className="form-select form-select-sm"
            value={form.region || ""} onChange={onChange} required>
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
          <select id="comuna" className="form-select form-select-sm"
            value={form.comuna || ""} onChange={onChange} required disabled={!form.region}>
            <option value="" disabled>{form.region ? "Seleccione una comuna" : "Primero seleccione una región"}</option>
            {comunas.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="rol" className="form-label fw-semibold small text-uppercase">Rol</label>
          <select id="rol" className="form-select form-select-sm" value={form.rol || "CLIENTE"} onChange={onChange}>
            <option value="CLIENTE">Cliente</option>
            <option value="ADMINISTRADOR">Administrador</option>
          </select>
        </div>

        {showPassword && (
          <div className="col-md-6">
            <label htmlFor="contrasena" className="form-label fw-semibold small text-uppercase">Contraseña</label>
            <input id="contrasena" type="password" className="form-control form-control-sm"
              value={form.contrasena || ""} onChange={onChange} required placeholder="********" />
          </div>
        )}
      </div>

      <div className="d-flex gap-2 mt-3 justify-content-end">
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-success">{submitLabel}</button>
      </div>
    </form>
  );
}
