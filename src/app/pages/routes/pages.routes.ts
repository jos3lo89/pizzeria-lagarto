import { Routes } from '@angular/router';

export default [
  {
    path: 'home',
    loadComponent: () => import('../home/home.page'),
  },
  {
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
    path: 'carrito',
    loadComponent: () => import('../../productos/pages/carrito/carrito.page'),
  },
] as Routes;
