import React, { useEffect, useMemo, useState } from "react";
import { runValido, limpiarRUN } from "../utils/validadores";
import { regionesComunas as regionesComunasData, comunasPorRegion, regionesListado } from "../data/regiones-comunas";

export default function UserForm({
  initialData = {},
  onSubmit,
  onCancel,
  submitLabel = "Guardar",
  showPassword = true,
  disableEmail = false,
  regionesComunas: regionesComunasProp
}) {
  

  const regionesComunas = regionesComunasProp || regionesComunasData;
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
      setComunas(comunasPorRegion(form.region));
     } else {
       setComunas([]);
     }
   }, [form.region, regionesComunas]);

  useEffect(() => {
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
            {regionesListado.map(({ code, name }) => (
              <option key={code} value={code}>{name}</option>
            ))}

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
