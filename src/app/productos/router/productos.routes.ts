import { Routes } from '@angular/router';

export default [
  {
    path: 'detalles-producto',
    loadComponent: () =>
      import('../pages/detalles-producto/detalles-producto.page'),
  },
  {
    path: 'buscar-producto',
    loadComponent: () =>
      import('../pages/buscar-producto/buscar-producto.page'),
  },
  {
    path: 'carrito',
    loadComponent: () => import('../pages/carrito/carrito.page'),
  },
] as Routes;
