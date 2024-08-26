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
    path: 'auth/login',
    loadComponent: () =>
      import('./areas/auth/pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./areas/auth/pages/register/register.page').then(
        (m) => m.RegisterPage
      ),
  },
  {
    path: 'auth/forgotPassword',
    loadComponent: () =>
      import('./areas/auth/pages/forgotPassword/forgotPassword.page').then(
        (m) => m.ForgotPasswordPage
      ),
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./areas/faq/pages/faq.page').then((m) => m.FaqPage),
  },
];
