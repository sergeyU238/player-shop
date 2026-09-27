import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'order/:paymentId',
    loadComponent: () => import('./pages/order/order').then((m) => m.Order),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
