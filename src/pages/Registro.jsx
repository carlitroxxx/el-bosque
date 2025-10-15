import React, { useState } from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import { Link, useNavigate } from "react-router-dom";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
    telefono: "",
    region: "",
    comuna: ""
  });

  const [comunas, setComunas] = useState([]);
  const navigate = useNavigate();

  const regionesComunas = {
    rm: ["Santiago","Providencia","Las Condes","Ñuñoa","Maipú","La Florida","Puente Alto","San Bernardo","La Cisterna","El Bosque","La Granja","La Pintana","San Miguel","San Joaquín","Macul","Peñalolén","La Reina","Vitacura","Lo Barnechea","Huechuraba","Recoleta","Independencia","Conchalí","Quilicura","Renca","Cerro Navia","Lo Prado","Quinta Normal","Pudahuel","Estación Central","Cerrillos"],
    v: ["Valparaíso","Viña del Mar","Quilpué","Villa Alemana","Limache","Concón","Quintero","Puchuncaví","Casablanca","Juan Fernández","San Antonio","Cartagena","El Tabo","El Quisco","Algarrobo","Santo Domingo"],
    viii: ["Concepción","Talcahuano","Chiguayante","San Pedro de la Paz","Coronel","Lota","Penco","Tomé","Florida","Hualpén","Hualqui","Santa Juana"],
    x: ["Puerto Montt","Puerto Varas","Osorno","Ancud","Castro","Quellón","Calbuco","Frutillar","Llanquihue","Los Muermos","Maullín","Purranque","Río Negro","San Pablo","Fresia","Puerto Octay"],
    ii: ["Antofagasta","Calama","Tocopilla","Mejillones","Taltal","María Elena","San Pedro de Atacama","Sierra Gorda"],
    xv: ["Arica","Putre","Camarones"],
    i: ["Iquique","Alto Hospicio","Pozo Almonte","Pica","Huara","Camiña","Colchane"],
    iii: ["Copiapó","Caldera","Chañaral","Diego de Almagro","Tierra Amarilla","Vallenar","Freirina","Huasco","Alto del Carmen"],
    iv: ["La Serena","Coquimbo","Ovalle","Illapel","Los Vilos","Salamanca","Vicuña","Andacollo","Monte Patria","Punitaqui","Río Hurtado","Combarbalá","Mincha"],
    vi: ["Rancagua","Machalí","Graneros","Codegua","San Francisco de Mostazal","Rengo","San Fernando","Santa Cruz","Pichilemu","Navidad","Litueche","La Estrella","Marchihue","Paredones","Palmilla","Peralillo","Placilla","Pumanque","Chépica","Nancagua","Palmilla","Peralillo","Placilla"],
    vii: ["Curicó","Talca","Linares","Constitución","Cauquenes","Parral","San Javier","Molina","Teno","Río Claro","Sagrada Familia","Romeral","Rauco","Hualañé","Vichuquén","Chanco","Pelluhue","Empedrado","Colbún","Yerbas Buenas","Longaví","Retiro","Villa Alegre"],
    ix: ["Temuco","Padre Las Casas","Villarrica","Pucón","Angol","Victoria","Lautaro","Nueva Imperial","Carahue","Pitrufquén","Saavedra","Gorbea","Toltén","Loncoche","Cunco","Perquenco","Galvarino","Lumaco","Traiguén","Purén","Los Sauces","Renaico","Collipulli","Ercilla"],
    xiv: ["Valdivia","La Unión","Río Bueno","Paillaco","Los Lagos","Corral","Máfil","Mariquina","Panguipulli","Lanco","Futrono","Lago Ranco"],
    xi: ["Coyhaique","Aysén","Cisnes","Guaitecas","Chile Chico","Río Ibáñez","Cochrane","O'Higgins","Tortel"],
    xii: ["Punta Arenas","Puerto Natales","Porvenir","Primavera","Timaukel","San Gregorio","Río Verde","Laguna Blanca","Torres del Paine"]
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    if (id === "region") {
      setComunas(regionesComunas[value] || []);
      setFormData(prev => ({ ...prev, comuna: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.contraseña !== formData.confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuarios.some(u => u.correo === formData.correo)) {
      alert("Ya existe un usuario con ese correo");
      return;
    }

    const nuevo = {
      nombre: formData.nombreCompleto,
      correo: formData.correo,
      contrasena: formData.contraseña,
      telefono: formData.telefono,
      region: formData.region,
      comuna: formData.comuna,
      rol: "CLIENTE",
    };

    const updated = [...usuarios, nuevo];
    localStorage.setItem("usuarios", JSON.stringify(updated));

    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    navigate("/login");

    setFormData({
      nombreCompleto: "",
      correo: "",
      contraseña: "",
      confirmarContraseña: "",
      telefono: "",
      region: "",
      comuna: ""
    });
    setComunas([]);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="d-flex align-items-center justify-content-center py-5 flex-grow-1">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <div className="card shadow p-3">
                <div className="card-body p-2">
                  <h4 className="text-center mb-4">Registro de usuario</h4>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="nombreCompleto" className="form-label">NOMBRE COMPLETO</label>
                      <input type="text" className="form-control" id="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="correo" className="form-label">CORREO</label>
                      <input type="email" className="form-control" id="correo" value={formData.correo} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="contraseña" className="form-label">CONTRASEÑA</label>
                      <input type="password" className="form-control" id="contraseña" value={formData.contraseña} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="confirmarContraseña" className="form-label">CONFIRMAR CONTRASEÑA</label>
                      <input type="password" className="form-control" id="confirmarContraseña" value={formData.confirmarContraseña} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="telefono" className="form-label">TELÉFONO (opcional)</label>
                      <input type="tel" className="form-control" id="telefono" value={formData.telefono} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="region" className="form-label">REGIÓN</label>
                      <select className="form-select" id="region" value={formData.region} onChange={handleChange} required>
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

                    <div className="mb-4">
                      <label htmlFor="comuna" className="form-label">COMUNA</label>
                      <select className="form-select" id="comuna" value={formData.comuna} onChange={handleChange} required disabled={!formData.region}>
                        <option value="" disabled>
                          {formData.region ? "Seleccione una comuna" : "Primero seleccione una región"}
                        </option>
                        {comunas.map((comuna, index) => (
                          <option key={index} value={comuna}>{comuna}</option>
                        ))}
                      </select>
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary btn-lg">Registrarse</button>
                    </div>

                    <div className="text-center mt-3">
                      <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Registro;
