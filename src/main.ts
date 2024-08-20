import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
  withComponentInputBinding,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from './environments/environment.prod';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { AuthInterceptor } from './app/pages/auth/interceptors/AuthInterceptor.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { TranslateModules } from './assets/i18n/library/TranslateModule';

if (environment.production) enableProdMode();

bootstrapApplication(AppComponent, {
  providers: [
    { provide: JWT_OPTIONS, useValue: {} },
    JwtHelperService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    // -- preimpostato -- provideRouter(routes, withPreloading(PreloadAllModules)),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    importProvidersFrom(TranslateModules),
  ],
});
