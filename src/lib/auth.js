
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
