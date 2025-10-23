import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';

describe('AuthContext con localStorage mock', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debería iniciar sin usuario logueado', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    expect(result.current.user).toBeNull();
    expect(result.current.logged).toBe(false);
  });

  it('debería registrar un usuario correctamente', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.register('test@correo.com', 'password123');
    });

    expect(localStorage.getItem('usuario')).toBe('test@correo.com');
    expect(localStorage.getItem('clave')).toBe('password123');
  });

  it('debería hacer login con credenciales válidas', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.register('test@correo.com', 'password123');
    });

    let loginSuccess;
    act(() => {
      loginSuccess = result.current.login('test@correo.com', 'password123');
    });

    expect(loginSuccess).toBe(true);
    expect(result.current.logged).toBe(true);
    expect(result.current.user).toBe('test@correo.com');
    expect(localStorage.getItem('logueado')).toBe('true');
  });

  it('debería fallar el login con credenciales incorrectas', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.register('test@correo.com', 'password123');
      result.current.login('test@correo.com', 'wrongpassword');
    });

    expect(result.current.logged).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('debería cerrar sesión correctamente', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.register('test@correo.com', 'password123');
      result.current.login('test@correo.com', 'password123');
    });

    expect(result.current.logged).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.logged).toBe(false);
    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('logueado')).toBeNull();
  });

  it('debería mantener el usuario registrado en localStorage después del logout', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.register('test@correo.com', 'password123');
      result.current.login('test@correo.com', 'password123');
      result.current.logout();
    });

    expect(localStorage.getItem('usuario')).toBe('test@correo.com');
    expect(localStorage.getItem('clave')).toBe('password123');
    expect(localStorage.getItem('logueado')).toBeNull();
  });
});