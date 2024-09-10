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
      import('./areas/home/pages/userHome/userHome.page').then(
        (m) => m.HomePage
      ),
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
    path: 'forgotPassword',
    loadComponent: () =>
      import('./areas/auth/pages/forgotPassword/forgotPassword.page').then(
        (m) => m.ForgotPasswordPage
      ),
  },
  {
    path: 'confirmemail',
    loadComponent: () =>
      import('./areas/auth/pages/verifyEmail/verifyEmail.page').then(
        (m) => m.VerifyEmailPage
      ),
  },
  {
    path: 'aboutUs',
    loadComponent: () =>
      import('./areas/info/aboutUs/aboutUs.page').then((m) => m.AboutUsPage),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./areas/info/contact/contact.page').then((m) => m.ContactPage),
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./areas/info/faq/faq.page').then((m) => m.FaqPage),
  },
  {
    path: 'registerStore',
    loadComponent: () =>
      import('./areas/store/pages/registerStore/registerStore.page').then(
        (m) => m.RegisterStorePage
      ),
  },
];
