import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class RecaptchaService {
  key = environment.recaptcha;

  constructor() {}

  executeRecaptcha(): void {}
}
