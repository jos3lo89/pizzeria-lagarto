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
    loadComponent: () => import('../../usuario/pages/perfil/perfil.page'),
  },
  {
    path: 'buscar-producto',
    loadComponent: () =>
      import('../../productos/pages/buscar-producto/buscar-producto.page'),
  },
  {
    path: 'lista-pizzas',
    loadComponent: () =>
      import('../../productos/pages/lista-pizzas/lista-pizzas.page'),
  },
  {
    path: 'lista-bebidas',
    loadComponent: () =>
      import('../../productos/pages/lista-bebidas/lista-bebidas.page'),
  },
  {
    canActivate: [roleGuard()],
    path: 'agregar-pizza',
    loadComponent: () =>
      import('../../productos/pages/agregar-pizza/agregar-pizza.page'),
  },
  {
    path: 'detalles',
    loadComponent: () =>
      import('../../productos/pages/detalles-producto/detalles-producto.page'),
  },
  {
    canActivate: [authGuard()],
    path: 'carrito',
    loadComponent: () => import('../../productos/pages/carrito/carrito.page'),
  },
  {
    canActivate: [authGuard()],

    path: 'agregar-bebida',
    loadComponent: () =>
      import('../../productos/pages/agregar-bebida/agregar-bebida.page'),
  },
  {
    path: 'detalles-bebida',
    loadComponent: () =>
      import('../../productos/pages/detalles-bebida/detalles-bebida.page'),
  },
] as Routes;
