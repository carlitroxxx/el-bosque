import { correoPermitido } from "../utils/validadores";

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
  const sesion = localStorage.getItem("session");
  return sesion ? JSON.parse(sesion) : null;
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
  const invalido = correoPermitido(correo);
  if(!invalido){
    throw new Error("El dominio debe ser: @gmail.com - @duoc.cl - @profesores.duoc.cl");
  }
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
  const invalido = correoPermitido(correo);
  if(correo == "admin@ejemplo.cl" && contrasena == u.contrasena){
    return guardarSesion(u);
  }
  if(!invalido){
    //excluir admin: admin@ejemplo.cl
    throw new Error("El dominio debe ser: @gmail.com - @duoc.cl - @profesores.duoc.cl");
  }
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
export function mensajesContacto({nombre, correo, contenido}){
  const invalido = correoPermitido(correo);
  if(!invalido){
    throw new Error("El dominio debe ser: @gmail.com - @duocuc.cl - @profesores.duocuc.cl");
  }
  const mensaje = {
    nombre,
    correo,
    contenido
  };
  const mensajes = obtenerMensajesContacto();
    mensajes.push(mensaje);
    guardarMensajeContacto(mensajes);
    return mensaje;

}


