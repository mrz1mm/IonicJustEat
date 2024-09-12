import { Component, computed, effect, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { medal } from 'ionicons/icons';
import { FiscalDataRequest } from 'src/app/areas/store/interfaces/FiscalDataRequest.interface';
import { FiscalDataService } from 'src/app/areas/store/services/fiscalData.service';
import { Path } from 'src/app/library/utils/Path';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { StoreService } from 'src/app/areas/store/services/store.service';

@Component({
  selector: 'app-fiscal-data-form',
  templateUrl: './fiscalDataForm.component.html',
  styleUrls: ['./fiscalDataForm.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonInput,
    IonItem,
    IonCol,
    IonRow,
    IonGrid,
    TranslateModule,
    ReactiveFormsModule,
  ],
})
export class FiscalDataFormComponent implements OnInit {
  Path = Path;
  fiscalDataForm!: FormGroup;
  fiscalDataId: string | null = null;
  fiscalData = computed(() => this.fiscalDataSvc.fiscalData());

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private fiscalDataSvc: FiscalDataService,
    private storeSvc: StoreService
  ) {
    addIcons({ medal });
  }

  ngOnInit() {
    this.fiscalDataForm = this.fb.group({
      companyName: ['', [Validators.required]],
      vatNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      cap: ['', [Validators.required]],
      iban: ['', [Validators.required]],
      uniqueCode: ['', [Validators.required]],
    });

    this.route.paramMap.subscribe((params) => {
      this.fiscalDataId = params.get('id');
    });

    effect(() => {
      const fiscalData = this.fiscalData();
      if (fiscalData) {
        this.fiscalDataForm.patchValue({
          companyName: fiscalData.CompanyName,
          vatNumber: fiscalData.VATNumber,
          address: fiscalData.Address,
          city: fiscalData.City,
          cap: fiscalData.CAP,
          iban: fiscalData.IBAN,
          uniqueCode: fiscalData.UniqueCode,
        });
      }
    });
  }

  getHelperText(controlName: string): string {
    const control = this.fiscalDataForm.get(controlName);
    return control?.touched && control?.valid
      ? `LoginForm.${controlName.toUpperCase()}_VALID`
      : `LoginForm.${controlName.toUpperCase()}_HELPER`;
  }

  getErrorText(controlName: string): string | null {
    const control = this.fiscalDataForm.get(controlName);

    if (!control || !control.touched || !control.errors) {
      return null;
    }

    if (control.errors['required']) {
      return `LoginForm.${controlName.toUpperCase()}_REQUIRED`;
    }
    if (control.errors['email']) {
      return `LoginForm.${controlName.toUpperCase()}_FORMAT`;
    }
    if (control.errors['pattern']) {
      return `LoginForm.${controlName.toUpperCase()}_FORMAT`;
    }

    return null;
  }

  addFiscalData(): void {
    if (this.fiscalDataForm.valid) {
      const storeId = this.storeSvc.getStoreIdByCurrentUser();
      const fiscalData: FiscalDataRequest = {
        ...this.fiscalDataForm.value,
        storeId: storeId,
      };

      this.fiscalDataSvc.addFiscalData(fiscalData);
    }
  }

  updateFiscalData(): void {
    if (this.fiscalDataForm.valid && this.fiscalDataId) {
      const storeId = this.storeSvc.getStoreIdByCurrentUser();
      const fiscalData: FiscalDataRequest = {
        ...this.fiscalDataForm.value,
        storeId: storeId,
      };

      this.fiscalDataSvc.updateFiscalData(this.fiscalDataId, fiscalData);
    }
  }
}
