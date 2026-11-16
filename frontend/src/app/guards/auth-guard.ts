// auth.guard.ts
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth/auth';
import { Api } from '../services/api';

export const authGuard: CanActivateFn = async (route, state) => {

  const authService= inject(Auth);

  const isLogged = authService.isTokenValid();
  if(isLogged){
    window.location.href = "/home"
    return false;
  }  

  return true;

};
