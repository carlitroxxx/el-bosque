import jwtDecode from "jwt-decode";

const API = "http://localhost:3001/api";

/* GUARDAR TOKEN */
export function guardarToken(token) {
  localStorage.setItem("token", token);
}

export function obtenerToken() {
  return localStorage.getItem("token");
}

export function eliminarToken() {
  localStorage.removeItem("token");
}

/* DECODIFICAR USUARIO */
export function obtenerUsuario() {
  const token = obtenerToken();
  if (!token) return null;

  try {
    return jwtDecode(token); 
  } catch {
    return null;
  }
}

/* LOGIN */
export async function login(correo, contrasena) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: correo, password: contrasena })
  });

  if (!res.ok) throw new Error("Credenciales incorrectas");
  const data = await res.json();

  guardarToken(data.token);
  return data.usuario;
}

/* REGISTRO */
export async function registro(datos) {
  const res = await fetch(`${API}/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  });

  if (!res.ok) throw new Error("Error al registrarse");
  const data = await res.json();

  guardarToken(data.token);
  return data.usuario;
}
