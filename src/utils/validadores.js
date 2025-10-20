export function correoPermitido(correo) {
  if (typeof correo !== "string") return false;
  const c = correo.trim();
  if (c.length === 0 || c.length > 100) return false;
  return /^[A-Za-z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(c);
}

export function contrasenaValida(pass) {
  if (typeof pass !== "string") return false;
  const l = pass.trim().length;
  return l >= 4 && l <= 10;
}

export function nombreContactoValido(nombre) {
  if (typeof nombre !== "string") return false;
  const n = nombre.trim();
  return n.length > 0 && n.length <= 100;
}

export function comentarioValido(txt) {
  if (typeof txt !== "string") return false;
  const t = txt.trim();
  return t.length > 0 && t.length <= 500;
}

export function limpiarRUN(run) {
  return String(run || "").replace(/[^0-9kK]/g, "").toUpperCase();
}

export function runValido(run) {
  const r = limpiarRUN(run);
  if (r.length < 7 || r.length > 9) return false;

  const cuerpo = r.slice(0, -1);
  const dv = r.slice(-1);
  if (!/^\d+$/.test(cuerpo)) return false;

  let suma = 0, mul = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const resto = 11 - (suma % 11);
  const dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);

  return dv === dvEsperado;
}
