import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/home',
    pathMatch: 'full',
  },

  // *** pages
  {
    // canActivateChild: [authGuard()],
    path: 'pages',
    loadComponent: () => import('./layouts/mainLayout.component'),
    loadChildren: () => import('./pages/routes/pages.routes'),
  },
  // *** Auth
  {
    path: 'auth',
    loadComponent: () => import('./layouts/authLayout.component'),
    loadChildren: () => import('./auth/routes/auth.routes'),
  },
  // ***
  // {
  //   path: 'usuario',
  //   loadComponent: () => import('./layouts/mainLayout.component'),
  //   loadChildren: () => import('./usuario/routes/usuario.routes'),
  // },

  // not found routes
  {
    path: '**',
    redirectTo: 'pages/home',
    pathMatch: 'full',
  },




];
