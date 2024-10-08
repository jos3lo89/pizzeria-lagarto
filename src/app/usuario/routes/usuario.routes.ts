import { Routes } from '@angular/router';

export default [
  {
    path: 'perfil',
    loadComponent: () => import('../pages/perfil/perfil.page'),
  },
] as Routes;
