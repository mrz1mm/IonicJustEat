import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'example',
    loadComponent: () =>
      import('./pages/example/example.page').then((m) => m.ExamplePage),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/pages/home.page').then((m) => m.HomePage),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth/pages/auth.page').then((m) => m.AuthPage),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

/*
import { Routes } from '@angular/router';
import { HomePage } from './pages/home/HomePage';
import { AuthPage } from './auth/pages/AuthPage';

export const routes: Routes = [
  { path: 'auth', component: AuthPage },
  { path: 'home', component: HomePage },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
*/
