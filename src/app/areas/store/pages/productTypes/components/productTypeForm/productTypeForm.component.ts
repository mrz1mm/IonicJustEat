import { CommonModule } from '@angular/common';
import { Component, computed, effect, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
import { ProductTypeRequest } from 'src/app/areas/store/interfaces/ProductTypeRequest.interface';
import { ProductTypeService } from 'src/app/areas/store/services/productType.service';
import { Path } from 'src/app/library/utils/Path';

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
  productTypeId: string | null = null;
  productType = computed(() => this.productTypeSvc.productType());

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productTypeSvc: ProductTypeService
  ) {
    addIcons({ medal });
  }

  ngOnInit() {
    this.productTypeForm = this.fb.group({
      productTypeName: ['', [Validators.required]],
    });

    this.route.paramMap.subscribe((params) => {
      this.productTypeId = params.get('id');
    });

    effect(() => {
      const productType = this.productType();
      if (productType) {
        this.productTypeForm.patchValue({
          productTypeName: productType.ProductTypeName,
        });
      }
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

  addProductType(): void {
    if (this.productTypeForm.valid) {
      const productType: ProductTypeRequest = this.productTypeForm.value;
      this.productTypeSvc.addProductType(productType);
    }
  }

  updateProductType(): void {
    if (this.productTypeForm.valid && this.productTypeId) {
      const productType: ProductTypeRequest = this.productTypeForm.value;
      this.productTypeSvc.updateProductType(this.productTypeId, productType);
    }
  }
}
