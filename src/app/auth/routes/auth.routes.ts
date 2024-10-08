import { Routes } from '@angular/router';

export default [
  {
    path: 'login',
    loadComponent: () => import('../pages/login/login.page'),
  },
  {
    path: 'registro',
    loadComponent: () => import('../pages/registro/registro.page'),
  },
] as Routes;
