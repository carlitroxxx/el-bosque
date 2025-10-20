import { correoPermitido, nombreContactoValido} from "./validadores";

export function obtenerUsuarios() {
  const raw = localStorage.getItem("usuarios");
  const data = raw ? JSON.parse(raw) : [];
  return Array.isArray(data) ? data : [];
}

export function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

export function buscarUsuarioPorCorreo(correo) {
  const email = String(correo || "").toLowerCase();
  return obtenerUsuarios().find(
    (u) => String(u.correo || "").toLowerCase() === email
  );
}

export function guardarSesion(usuario) {
  const sesion = {
    correo: usuario.correo,
    nombre: usuario.nombre,
    logeado: true,
  };
  localStorage.setItem("session", JSON.stringify(sesion));
  return sesion;
}

export function sesionActual() {
  const raw = localStorage.getItem("session");
  return raw ? JSON.parse(raw) : null;
}

export function cerrarSesion() {
  localStorage.removeItem("session");
}

export function registrarUsuario({
  correo,
  nombre,
  contrasena,
  telefono = "",
  region = "",
  comuna = "",
  rol = "cliente",
}) {
  if (buscarUsuarioPorCorreo(correo)) {
    throw new Error("Este correo ya está registrado.");
  }

  const nuevoUsuario = {
    correo,
    nombre,
    contrasena,
    telefono,
    region,
    comuna,
    rol,
  };

  const usuarios = obtenerUsuarios();
  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);
  return nuevoUsuario;
}

export function iniciarSesion({ correo, contrasena }) {
  const u = buscarUsuarioPorCorreo(correo);
  if (!u || u.contrasena !== contrasena) {
    throw new Error("Correo o contraseña incorrectos.");
  }
  return guardarSesion(u);
}
export function obtenerMensajesContacto() {
  const raw = localStorage.getItem("msjContacto");
  const data = raw ? JSON.parse(raw) : [];
  return Array.isArray(data) ? data : [];
}
export function guardarMensajeContacto(mensajes) {
  localStorage.setItem("msjContacto", JSON.stringify(mensajes));
}
export function mensajesContacto({ nombre, correo, contenido }) {
  // Validaciones básicas (si ya están importadas en este archivo)
  if (typeof nombreContactoValido === "function" && !nombreContactoValido(nombre)) {
    throw new Error("Nombre inválido.");
  }
  if (!correoPermitido(correo)) {
    throw new Error("Correo inválido. Permitidos: gmail.com, duoc.cl, profesor.duoc.cl");
  }
  // Leer todos, obtener ID del último y +1
  const mensajes = JSON.parse(localStorage.getItem("msjContacto")) || [];
  const ultimo = mensajes.length > 0 ? mensajes[mensajes.length - 1] : null;
  const lastId = Number(ultimo?.id) || 0;
  const nuevoId = lastId + 1;

  const mensaje = { id: nuevoId, nombre, correo, contenido };
  mensajes.push(mensaje);
  localStorage.setItem("msjContacto", JSON.stringify(mensajes));
  return mensaje;
}



