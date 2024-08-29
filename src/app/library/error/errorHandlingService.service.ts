import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../notification/notificationService.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor(private notificationSvc: NotificationService) {}

  handleError(error: HttpErrorResponse): void {
    if (error.status === 0) {
      this.notificationSvc.notify(
        'Errore di rete: impossibile raggiungere il server',
        'danger'
      );
    } else if (error.status >= 400 && error.status < 500) {
      if (error.status === 401) {
        this.notificationSvc.notify(
          'Credenziali non valide. Per favore riprova.',
          'danger'
        );
      } else if (error.status === 404) {
        this.notificationSvc.notify('Ops pagina non trovata.', 'danger');
      } else {
        this.notificationSvc.notify(
          `Errore ${error.status}: ${
            error.error.message || 'Richiesta non valida'
          }`,
          'danger'
        );
      }
    } else if (error.status >= 500) {
      // Errore del server
      this.notificationSvc.notify(
        `Errore del server (${error.status}): Si è verificato un problema sul server. Riprova più tardi.`,
        'danger'
      );
    } else {
      // Errore generico
      this.notificationSvc.notify(
        'Ops qualcosa è andato storto. Riprova più tardi.',
        'danger'
      );
    }
  }
}
