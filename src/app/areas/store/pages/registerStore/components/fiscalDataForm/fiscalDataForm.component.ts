import { Component } from '@angular/core';

@Component({
  selector: 'app-fiscal-data-form',
  templateUrl: './fiscalDataForm.component.html',
  styleUrls: ['./fiscalDataForm.component.scss'],
  standalone: true,
  imports: [],
})
export class FiscalDataFormComponent {
  Path = Path;
  fiscalDataForm!: FormGroup;
  fiscalDataId: string | null = null;
  fiscalData = computed(() => this.fiscalDataSvc.fiscalData());

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private fiscalDataSvc: FiscalDataService
  ) {
    addIcons({ medal });
  }

  ngOnInit() {
    this.fiscalDataForm = this.fb.group({
      fiscalDataName: ['', [Validators.required]],
    });

    this.route.paramMap.subscribe((params) => {
      this.fiscalDataId = params.get('id');
    });

    effect(() => {
      const fiscalData = this.fiscalData();
      if (fiscalData) {
        this.fiscalDataForm.patchValue({
          fiscalDataName: fiscalData.FiscalDataName,
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
      const fiscalData: FiscalDataRequest = this.fiscalDataForm.value;
      this.fiscalDataSvc.addFiscalData(fiscalData);
    }
  }

  updateFiscalData(): void {
    if (this.fiscalDataForm.valid && this.fiscalDataId) {
      const fiscalData: FiscalDataRequest = this.fiscalDataForm.value;
      this.fiscalDataSvc.updateFiscalData(this.fiscalDataId, fiscalData);
    }
  }
}
