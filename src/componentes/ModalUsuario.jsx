import React, { useState, useEffect } from "react";

const ModalUsuario = ({ isOpen, onClose, onGuardar, usuarioEditar }) => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    telefono: "",
    region: "",
    comuna: "",
    rol: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [comunas, setComunas] = useState([]);

  // Datos de regiones y comunas de Chile
  const regionesYComunas = {
    "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
    "Metropolitana": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
    "O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
    "Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
    "Ñuble": ["Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
    "Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualpén", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Lebu", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
    "Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
    "Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
    "Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
    "Aysén": ["Coihaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
    "Magallanes": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
  };

  // Cargar datos cuando se abre el modal
  useEffect(() => {
    if (usuarioEditar) {
      setForm({
        nombre: usuarioEditar.nombre,
        correo: usuarioEditar.correo,
        contrasena: "", // nunca traemos password del backend
        telefono: usuarioEditar.telefono || "",
        region: usuarioEditar.region || "",
        comuna: usuarioEditar.comuna || "",
        rol: usuarioEditar.rol || "CLIENTE",
      });
      
      // Cargar comunas si ya hay una región seleccionada
      if (usuarioEditar.region && regionesYComunas[usuarioEditar.region]) {
        setComunas(regionesYComunas[usuarioEditar.region]);
      }
    } else {
      // Nuevo usuario
      setForm({
        nombre: "",
        correo: "",
        contrasena: "",
        telefono: "",
        region: "",
        comuna: "",
        rol: "CLIENTE",
      });
      setComunas([]);
    }
    setErrorMsg("");
  }, [usuarioEditar, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "region") {
      // Cuando cambia la región, actualizar las comunas y resetear la comuna seleccionada
      const nuevasComunas = regionesYComunas[value] || [];
      setComunas(nuevasComunas);
      setForm({
        ...form,
        region: value,
        comuna: "" // Resetear comuna cuando cambia la región
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validar = () => {
    const trim = (v) => (typeof v === "string" ? v.trim() : v);

    if (!trim(form.nombre)) throw new Error("El nombre es obligatorio.");
    if (trim(form.nombre).length < 3) throw new Error("El nombre debe tener al menos 3 caracteres.");

    if (!trim(form.correo)) throw new Error("El correo es obligatorio.");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trim(form.correo))) throw new Error("El formato del correo no es válido.");

    if (!usuarioEditar && !trim(form.contrasena)) {
      throw new Error("La contraseña es obligatoria para nuevos usuarios.");
    }
    if (trim(form.contrasena) && trim(form.contrasena).length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres.");
    }

    if (trim(form.telefono) && !/^\+?[\d\s-]+$/.test(trim(form.telefono))) {
      throw new Error("El formato del teléfono no es válido.");
    }

    if (form.region && !form.comuna) {
      throw new Error("Debe seleccionar una comuna para la región elegida.");
    }

    return {
      nombre: trim(form.nombre),
      correo: trim(form.correo),
      contrasena: trim(form.contrasena),
      telefono: trim(form.telefono),
      region: form.region,
      comuna: form.comuna,
      rol: form.rol,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      const usuarioValidado = validar();
      await onGuardar(usuarioValidado);
      
      // Si todo salió bien, limpiamos y cerramos
      setForm({
        nombre: "",
        correo: "",
        contrasena: "",
        telefono: "",
        region: "",
        comuna: "",
        rol: "CLIENTE",
      });
      setComunas([]);
      onClose();
    } catch (err) {
      setErrorMsg(err?.message || "Error guardando el usuario.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {usuarioEditar ? "Editar Usuario" : "Nuevo Usuario"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {errorMsg && (
              <div className="alert alert-danger mb-3" role="alert" id="errorUsuario">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3 row-cols-1 row-cols-md-2">
                <div className="col">
                  <label className="form-label">Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    minLength={3}
                  />
                  <div className="form-text">Mínimo 3 caracteres.</div>
                </div>

                <div className="col">
                  <label className="form-label">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    name="correo"
                    value={form.correo}
                    onChange={handleChange}
                    required
                  />
                  <div className="form-text">Formato: ejemplo@dominio.com</div>
                </div>

                <div className="col">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    name="contrasena"
                    value={form.contrasena}
                    onChange={handleChange}
                    placeholder={usuarioEditar ? "Dejar en blanco para no cambiar" : ""}
                    required={!usuarioEditar}
                    minLength={6}
                  />
                  <div className="form-text">
                    {usuarioEditar 
                      ? "Dejar en blanco para mantener la contraseña actual" 
                      : "Mínimo 6 caracteres"}
                  </div>
                </div>

                <div className="col">
                  <label className="form-label">Teléfono</label>
                  <input
                    type="text"
                    className="form-control"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                  />
                  <div className="form-text">Ej: +56 9 1234 5678</div>
                </div>

                <div className="col">
                  <label className="form-label">Región</label>
                  <select
                    className="form-select"
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                  >
                    <option value="">-- Seleccione una región --</option>
                    {Object.keys(regionesYComunas).map(region => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col">
                  <label className="form-label">Comuna</label>
                  <select
                    className="form-select"
                    name="comuna"
                    value={form.comuna}
                    onChange={handleChange}
                    disabled={!form.region}
                  >
                    <option value="">
                      {form.region ? "-- Seleccione una comuna --" : "-- Primero seleccione una región --"}
                    </option>
                    {comunas.map(comuna => (
                      <option key={comuna} value={comuna}>
                        {comuna}
                      </option>
                    ))}
                  </select>
                </div>

                {usuarioEditar && (
                  <div className="col">
                    <label className="form-label">Rol</label>
                    <select
                      className="form-select"
                      name="rol"
                      value={form.rol}
                      onChange={handleChange}
                      required
                    >
                      <option value="CLIENTE">CLIENTE</option>
                      <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                      <option value="PROFESIONAL">PROFESIONAL</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="submit" className="btn btn-primary">
                  {usuarioEditar ? "Actualizar" : "Registrar"}
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUsuario;