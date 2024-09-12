import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiscalDataRequest } from '../interfaces/FiscalDataRequest.interface';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { FiscalDataResponse } from '../interfaces/FiscalDataResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class FiscalDataService {
  private _fiscalData = signal<FiscalDataResponse | null>(null);
  private _allFiscalDatas = signal<FiscalDataResponse[]>([]);
  fiscalDataUrl: string = `${environment.apiUrl}/api/`; // ???

  constructor(private http: HttpClient, private router: Router) {}

  get fiscalData(): Signal<FiscalDataResponse | null> {
    return this._fiscalData.asReadonly();
  }

  get allFiscalDatas(): Signal<FiscalDataResponse[] | null> {
    return this._allFiscalDatas.asReadonly();
  }

  getAllFiscalDatas(): void {
    firstValueFrom(this.http.get<FiscalDataResponse[]>(this.fiscalDataUrl))
      .then((response) => {
        console.log('FiscalDatas retrieved');
        this._allFiscalDatas.set(response);
      })
      .catch((error) => {
        console.error('Error retrieving fiscalDatas', error);
      })
      .finally(() => {});
  }

  getFiscalDataById(id: string): void {
    firstValueFrom(
      this.http.get<FiscalDataResponse>(`${this.fiscalDataUrl}/${id}`)
    )
      .then((response) => {
        console.log('FiscalData retrieved');
        this._fiscalData.set(response);
      })
      .catch((error) => {
        console.error('Error retrieving fiscalData', error);
      })
      .finally(() => {});
  }

  addFiscalData(model: FiscalDataRequest): void {
    firstValueFrom(this.http.post(this.fiscalDataUrl, model))
      .then(() => {
        console.log('Store registered');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Error registering store', error);
      })
      .finally(() => {});
  }

  updateFiscalData(id: string, model: FiscalDataRequest): void {
    firstValueFrom(this.http.put(`${this.fiscalDataUrl}/${id}`, model))
      .then(() => {
        console.log('FiscalData updated');
      })
      .catch((error) => {
        console.error('Error updating fiscalData', error);
      })
      .finally(() => {});
  }

  deleteFiscalData(id: string): void {
    firstValueFrom(this.http.delete(`${this.fiscalDataUrl}/${id}`))
      .then(() => {
        console.log('FiscalData deleted');
      })
      .catch((error) => {
        console.error('Error deleting fiscalData', error);
      })
      .finally(() => {});
  }
}
