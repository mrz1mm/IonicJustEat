import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./areas/home/pages/home.page').then((m) => m.HomePage),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./areas/auth/pages/auth.page').then((m) => m.AuthPage),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
