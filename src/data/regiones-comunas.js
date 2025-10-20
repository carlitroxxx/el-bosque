export const regionesComunas = {
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

export const regionesListado = [
  { code: "xv", name: "Arica y Parinacota" },
  { code: "i",  name: "Tarapacá" },
  { code: "ii", name: "Antofagasta" },
  { code: "iii",name: "Atacama" },
  { code: "iv", name: "Coquimbo" },
  { code: "v",  name: "Valparaíso" },
  { code: "rm", name: "Región Metropolitana" },
  { code: "vi", name: "O'Higgins" },
  { code: "vii",name: "Maule" },
  { code: "viii",name: "Biobío" },
  { code: "ix", name: "Araucanía" },
  { code: "xiv",name: "Los Ríos" },
  { code: "x",  name: "Los Lagos" },
  { code: "xi", name: "Aysén" },
  { code: "xii",name: "Magallanes" },
];


export const comunasPorRegion = (code) => regionesComunas[code] || [];