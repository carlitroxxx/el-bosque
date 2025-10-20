import { correoPermitido, validarRut, contrasenaValida } from '../src/utils/validadores';
import { guardarSesion } from '../src/utils/auth';

//test a funcion para validar correo @duoc.cl, @profesor.duoc.cl y @gmail.com
describe("validadores.js", function(){
  it("acepta dominios permitidos", function(){
    expect(correoPermitido('user@duoc.cl')).toBeTrue();
    expect(correoPermitido('User.123@profesor.duoc.cl')).toBeTrue();
    expect(correoPermitido('u_test+1@gmail.com')).toBeTrue();
  });
  it('rechaza dominios no permitidos y formatos inválidos', () => {
    expect(correoPermitido('x@hotmail.com')).toBeFalse();
    expect(correoPermitido('')).toBeFalse();
    expect(correoPermitido(null)).toBeFalse();
  });
})

//test a funcion para validar rut
describe('validarRut()', () => {
  it('acepta RUTs válidos con/ sin puntos y k/K', () => {
    expect(validarRut('12.345.678-5')).toBeTrue();
    expect(validarRut('12345678-5')).toBeTrue();
    expect(validarRut('9.876.543-k')).toBeTrue();
    expect(validarRut('9876543-K')).toBeTrue();
  });
  
  it('rechaza RUTs inválidos', () => {
    expect(validarRut('12.345.678-4')).toBeFalse();
    expect(validarRut('abc')).toBeFalse();
    expect(validarRut('')).toBeFalse();
  });
});

//test a funcion que verifica que la contraseña sea valida
describe('contrasenaValida()', () => {
  it('Contraseñas válidas (largo 4 a 10)', () => {
    expect(contrasenaValida('abc4')).toBeTrue();       
    expect(contrasenaValida('abcd5')).toBeTrue();       
    expect(contrasenaValida('abcdefgh10')).toBeTrue(); 
  });


  it('Fuera de rango', () => {
    expect(contrasenaValida('ab3')).toBeFalse();        
    expect(contrasenaValida('abcdefghi11')).toBeFalse();
    expect(contrasenaValida('')).toBeFalse();            
  });

  it('Tipos de datos no validos', () => {
    expect(contrasenaValida(null)).toBeFalse();
    expect(contrasenaValida(1234)).toBeFalse();
  });
});

// test a para ver si al iniciar sesion coinciden las credenciales

describe('guardarSesion()', () => {

  it('Guarda la sesión', () => {
    const usuario = { correo: 'user@duoc.cl', nombre: 'Carlos' };

    const result = guardarSesion(usuario);

    // Verifica retorno
    expect(result).toEqual({
      correo: 'user@duoc.cl',
      nombre: 'Carlos',
      logeado: true,
    });
  });
});
