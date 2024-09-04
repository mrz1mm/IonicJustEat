import { Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom, Observable } from 'rxjs';
import { PersistentService } from 'src/app/library/persistentService/PersistentService.service';
import { Store } from 'src/app/library/persistentService/Store.enum';
import { environment } from 'src/environments/environment';
import { ILoggedUser } from '../interfaces/ILoggedUser.interface';
import { IUserClaims } from '../interfaces/IUserClaims.interface';
import { LoginRequest } from '../interfaces/LoginRequest.interface';
import { LoginResponse } from '../interfaces/LoginResponse.interface';
import { RefreshRequest } from '../interfaces/Refreshequest.interface';
import { RefreshResponse } from '../interfaces/RefreshResponse.interface';
import { RegisterRequest } from '../interfaces/RegisterRequest.interface';
import { ConfirmEmailRequest } from '../interfaces/ConfirmEmailRequest.interface';
import { PasswordRecoveryRequest } from '../interfaces/PasswordRecoveryRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userData = this.persistentSvc.PSignal<ILoggedUser | null>(
    Store.AUTH,
    null
  );

  loginUrl: string = `${environment.apiUrl}/api/Auth/login`;
  registerUrl: string = `${environment.apiUrl}/api/Auth/register`;
  refreshUrl: string = `${environment.apiUrl}/api/Auth/refreshtoken`;
  confirmEmailUrl: string = `${environment.apiUrl}/api/Auth/confirmEmail`;

  private _isEmailConfirmed = signal<boolean | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private persistentSvc: PersistentService,
    private jwtHelper: JwtHelperService
  ) {}

  login(login: LoginRequest): void {
    firstValueFrom(this.http.post<LoginResponse>(this.loginUrl, login))
      .then((resp) => {
        if (!resp) throw new Error();
        this.setUserData(resp);
        this.router.navigate(['/']);
        console.log('Login successful');
      })
      .catch((error) => {
        console.error('Error logging in', error);
      })
      .finally(() => {});
  }

  logout(): void {
    this._userData.set(null);
    this.router.navigate(['/login']);
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
    firstValueFrom(this.http.post(`${this.registerUrl}`, model))
      .then(() => {
        console.log('Registration successful');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error registering', error);
      })
      .finally(() => {});
  }

  passwordRecovery(model: PasswordRecoveryRequest): void {
    firstValueFrom(this.http.post(`${this.registerUrl}`, model))
      .then(() => {
        console.log('Password recovery email sent');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error registering', error);
      })
      .finally(() => {});
  }

  confirmEmail(model: ConfirmEmailRequest): void {
    firstValueFrom(this.http.put(`${this.confirmEmailUrl}`, model))
      .then(() => {
        console.log('Email confirmed');
        this._isEmailConfirmed.set(true);
      })
      .catch((error) => {
        console.error('Error confirming email', error);
        this._isEmailConfirmed.set(false);
      })
      .finally(() => {});
  }

  get isEmailConfirmed(): Signal<boolean | null> {
    return this._isEmailConfirmed.asReadonly();
  }
}
