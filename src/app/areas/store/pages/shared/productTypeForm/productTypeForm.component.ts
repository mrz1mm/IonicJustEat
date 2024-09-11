import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonIcon,
  IonButton,
  IonList,
  IonGrid,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { medal } from 'ionicons/icons';
import { Path } from 'src/app/library/utils/Path';
import { ProductTypeRequest } from '../../../interfaces/ProductTypeRequest.interface';
import { ProductTypeService } from '../../../services/productType.service';

@Component({
  selector: 'app-product-type-form',
  templateUrl: './productTypeForm.component.html',
  styleUrls: ['./productTypeForm.component.scss'],
  standalone: true,
  imports: [
    IonGrid,
    IonList,
    IonButton,
    IonIcon,
    IonInput,
    IonItem,
    IonCol,
    IonRow,
    TranslateModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
})
export class ProductTypeFormComponent implements OnInit {
  Path = Path;
  productTypeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productTypeSvc: ProductTypeService
  ) {
    addIcons({
      medal,
    });
  }

  ngOnInit() {
    this.productTypeForm = this.fb.group({
      productTypeName: ['', [Validators.required]],
    });
  }

  getHelperText(controlName: string): string {
    const control = this.productTypeForm.get(controlName);
    return control?.touched && control?.valid
      ? `LoginForm.${controlName.toUpperCase()}_VALID`
      : `LoginForm.${controlName.toUpperCase()}_HELPER`;
  }

  getErrorText(controlName: string): string | null {
    const control = this.productTypeForm.get(controlName);

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

  async addProductType(): Promise<void> {
    if (this.productTypeForm.valid) {
      const productType: ProductTypeRequest = this.productTypeForm.value;
      this.productTypeSvc.addProductType(productType);
    }
  }
}
