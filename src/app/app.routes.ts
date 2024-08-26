import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./areas/home/pages/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./areas/auth/pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./areas/auth/pages/register/register.page').then(
        (m) => m.RegisterPage
      ),
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./areas/faq/pages/faq.page').then((m) => m.FaqPage),
  },
];
