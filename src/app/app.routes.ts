import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/home',
    pathMatch: 'full',
  },
  {
    path: 'pages',
    loadComponent: () => import('./layouts/mainLayout.component'),
    loadChildren: () => import('./pages/routes/pages.routes'),
  },
  {
    path: 'auth',
    loadComponent: () => import('./layouts/authLayout.component'),
    loadChildren: () => import('./auth/routes/auth.routes'),
  },

  {
    path: '**',
    redirectTo: 'pages/home',
    pathMatch: 'full',
  },
];
