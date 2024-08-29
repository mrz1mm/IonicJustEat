import { Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom, Observable } from 'rxjs';
import { PersistentService } from 'src/app/library/persistentService/PersistentService.service';
import { Store } from 'src/app/library/persistentService/Store';
import { environment } from 'src/environments/environment.prod';
import { ILoggedUser } from '../interfaces/ILoggedUser';
import { IUserClaims } from '../interfaces/IUserClaims';
import { LoginRequest } from '../interfaces/LoginRequest';
import { LoginResponse } from '../interfaces/LoginResponse';
import { RefreshRequest } from '../interfaces/Refreshequest';
import { RefreshResponse } from '../interfaces/RefreshResponse';
import { RegisterRequest } from '../interfaces/RegisterRequest';
import { NotificationService } from 'src/app/library/notification/notificationService.service';
import { ErrorHandlingService } from 'src/app/library/error/errorHandlingService.service';
import { PasswordRecoveryRequest } from '../interfaces/PasswordRecoveryRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userData = this.persistentSvc.PSignal<ILoggedUser | null>(
    Store.AUTH,
    null
  );

  loginUrl: string = `${environment.apiUrl}/api/Auth/login`;
  registerUserUrl: string = `${environment.apiUrl}/api/Auth/registeruser`;
  registerCompanyUrl: string = `${environment.apiUrl}/api/Auth/registercompany`;
  refreshUrl: string = `${environment.apiUrl}/api/Auth/refreshtoken`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private persistentSvc: PersistentService,
    private jwtHelper: JwtHelperService,
    private notificationSvc: NotificationService,
    private errorHandlingSvc: ErrorHandlingService
  ) {}

  login(login: LoginRequest): void {
    firstValueFrom(this.http.post<LoginResponse>(this.loginUrl, login))
      .then((resp) => {
        if (!resp) throw new Error();
        this.setUserData(resp);
        this.router.navigate(['/']);
        this.notificationSvc.notify('NOTIFY.LOGIN.SUCCESS', 'success');
      })
      .catch((error) => {
        console.error('Error logging in', error);
        if (error.status === 401)
          this.notificationSvc.notify('NOTIFY.LOGIN.ERROR.401', 'danger');
        else
          this.notificationSvc.notify('NOTIFY.LOGIN.ERROR.GENERIC', 'danger');
      })
      .finally(() => {});
  }

  logout(): void {
    this._userData.set(null);
    this.router.navigate(['/login']);
    this.notificationSvc.notify('Logout effettuato con successo', 'success');
  }

  refreshToken(
    refreshToken: RefreshRequest
  ): Observable<RefreshResponse | undefined> {
    return this.http.post<RefreshResponse>(`${this.refreshUrl}`, {
      refreshToken,
    });
  }

  get userData(): Signal<ILoggedUser | null> {
    return this._userData.asReadonly();
  }

  setUserData(login: LoginResponse): void {
    let claims: IUserClaims = this.getClaims(login.accessToken);

    if (!claims) throw new Error('No Claims');

    const user: ILoggedUser = {
      accessToken: login.accessToken,
      refreshToken: login.refreshToken,
      userId: claims.userId,
      displayName: claims.displayName,
    };

    this._userData.set(user);
  }

  get userRole(): string {
    if (!this._userData()) return '';

    let accessToken = this._userData()?.accessToken;
    let claims: IUserClaims = this.getClaims(accessToken || '');
    return claims.role;
  }

  private getClaims(accessToken: string): IUserClaims {
    let claims = this.jwtHelper.decodeToken(accessToken);
    if (!claims) throw new Error('No Claims');

    const decodedToken: IUserClaims = {
      userId: claims.nameid,
      displayName: claims.unique_name,
      role: claims.role,
      jti: claims.jti,
    };

    return decodedToken;
  }

  register(model: RegisterRequest): void {
    firstValueFrom(this.http.post(`${this.registerUserUrl}`, model))
      .then(() => {
        this.notificationSvc.notify('NOTIFY.REGISTER.SUCCESS', 'success');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error registering', error);
        this.notificationSvc.notify('NOTIFY.REGISTER.ERROR', 'danger');
      })
      .finally(() => {});
  }

  passwordRecovery(model: PasswordRecoveryRequest): void {
    firstValueFrom(this.http.post(`${this.registerUserUrl}`, model))
      .then(() => {
        this.notificationSvc.notify(
          'NOTIFY.PASSWORD_RECOVERY.SUCCESS',
          'success'
        );
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error registering', error);
        this.notificationSvc.notify('NOTIFY.PASSWORD_RECOVERY.ERROR', 'danger');
      })
      .finally(() => {});
  }
}
