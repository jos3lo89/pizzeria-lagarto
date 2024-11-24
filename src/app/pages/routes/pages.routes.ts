import { Routes } from '@angular/router';
import { authGuard, roleGuard } from 'src/app/auth/guards/auth.guard';

export default [
  {
    path: 'home',
    loadComponent: () => import('../home/home.page'),
  },
  {
    canActivate: [authGuard()],
    path: 'perfil',
    loadComponent: () => import('../perfil/perfil.page'),
  },
  {
    path: 'buscar-producto',
    loadComponent: () => import('../buscar-producto/buscar-producto.page'),
  },
  {
    path: 'lista-pizzas',
    loadComponent: () => import('../lista-pizzas/lista-pizzas.page'),
  },
  {
    path: 'lista-bebidas',
    loadComponent: () => import('../lista-bebidas/lista-bebidas.page'),
  },
  {
    canActivate: [roleGuard()],
    path: 'agregar-pizza',
    loadComponent: () => import('../agregar-pizza/agregar-pizza.page'),
  },
  {
    path: 'detalles',
    loadComponent: () => import('../detalles-producto/detalles-producto.page'),
  },
  {
    canActivate: [authGuard()],
    path: 'carrito',
    loadComponent: () => import('../carrito/carrito.page'),
  },
  {
    canActivate: [authGuard()],

    path: 'agregar-bebida',
    loadComponent: () => import('../agregar-bebida/agregar-bebida.page'),
  },
  {
    path: 'detalles-bebida',
    loadComponent: () => import('../detalles-bebida/detalles-bebida.page'),
  },
] as Routes;
