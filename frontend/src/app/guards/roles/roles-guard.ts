import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../../services/auth/auth';
import { Api } from '../../services/api';

export const rolesGuard: CanActivateFn = async (route, state) => {
  const authService: any = inject(Auth);
  const apiService: any = inject(Api)
  const token = localStorage.getItem("token");

  // --- Validar token ---
  if (!authService.isTokenValid()) {
    window.location.href = '/login?msg=1';
    return false;
  }

  // --- Obtener usuario ---
  const user = await apiService.getUserMe(token);

  const role_type = user.data.role.type;
  const expectedRoles = route.data['roles'] as string[];

  // --- Validar si el rol tiene acceso ---
  if (expectedRoles.includes(role_type)) {
    return true;
  }

  // --- No autorizado ---
  window.location.href = '/unauthorized';
  return false;
};
