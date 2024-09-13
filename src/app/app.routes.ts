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
    path: 'cookiesPolicy',
    loadComponent: () =>
      import('./areas/info/cookiesPolicy/cookiesPolicy.page').then(
        (m) => m.CookiesPolicyPage
      ),
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
    path: 'privacy',
    loadComponent: () =>
      import('./areas/info/privacy/privacy.page').then((m) => m.PrivacyPage),
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./areas/info/terms/terms.page').then((m) => m.TermsPage),
  },
  {
    path: 'ingredients',
    loadComponent: () =>
      import('./areas/store/pages/ingredients/ingredients.page').then(
        (m) => m.IngredientsPage
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./areas/store/pages/products/products.page').then(
        (m) => m.ProductsPage
      ),
  },
  {
    path: 'productTypes',
    loadComponent: () =>
      import('./areas/store/pages/productTypes/productTypes.page').then(
        (m) => m.ProductTypesPage
      ),
  },
  {
    path: 'store',
    loadComponent: () =>
      import('./areas/store/pages/store/store.page').then((m) => m.StorePage),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./areas/admin/pages/categories/categories.page').then(
        (m) => m.CategoriesPage
      ),
  },
  {
    path: 'companyHome',
    loadComponent: () =>
      import('./areas/home/pages/companyHome/companyHome.page').then(
        (m) => m.CompanyHomePage
      ),
  },
];
