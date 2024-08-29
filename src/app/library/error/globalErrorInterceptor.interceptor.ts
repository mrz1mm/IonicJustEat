import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from './errorHandlingService.service';

export const GlobalErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandlingSvc = inject(ErrorHandlingService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      errorHandlingSvc.handleError(error);
      return throwError(() => new Error(error.message));
    })
  );
};
