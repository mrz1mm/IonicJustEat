import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, computed } from '@angular/core';
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
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import {
  pricetagOutline,
  imageOutline,
  informationCircleOutline,
} from 'ionicons/icons';
import { Path } from 'src/app/library/utils/Path';
import { ProductService } from '../../../services/product.service';
import { ProductRequest } from '../../../interfaces/ProductRequest.interface';
import { ProductTypeService } from '../../../services/productType.service';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './productForm.component.html',
  styleUrls: ['./productForm.component.scss'],
  standalone: true,
  imports: [
    IonTextarea,
    IonLabel,
    IonGrid,
    IonList,
    IonButton,
    IonIcon,
    IonInput,
    IonItem,
    IonCol,
    IonRow,
    IonSelect,
    IonSelectOption,
    TranslateModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
})
export class ProductFormComponent implements OnInit {
  Path = Path;
  productForm!: FormGroup;
  productId: string | null = null;
  productImgBase64: string | null = null;
  product = computed(() => this.productSvc.product());
  productTypes = computed(() => this.productTypeSvc.allProductTypes());

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productSvc: ProductService,
    private productTypeSvc: ProductTypeService,
    private storeSvc: StoreService
  ) {
    addIcons({ pricetagOutline, informationCircleOutline, imageOutline });
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      productTypeId: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      productPrice: ['', [Validators.required]],
      productDescription: [''],
      productImg: [''],
    });

    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
    });

    effect(() => {
      const product = this.product();
      if (product) {
        this.productForm.patchValue({
          productTypeId: product.ProductTypeId,
          ProductName: product.ProductName,
          productPrice: product.ProductPrice,
          productDescription: product.ProductDescription,
          productImg: product.ProductImg,
        });
      }
    });
  }

  getHelperText(controlName: string): string {
    const control = this.productForm.get(controlName);
    return control?.touched && control?.valid
      ? `LoginForm.${controlName.toUpperCase()}_VALID`
      : `LoginForm.${controlName.toUpperCase()}_HELPER`;
  }

  getErrorText(controlName: string): string | null {
    const control = this.productForm.get(controlName);

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

  loadProductTypes(): void {
    this.productTypeSvc.getAllProductTypes();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;

        this.productImgBase64 = base64String;
      };

      reader.readAsDataURL(file);
    }
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const storeId = this.storeSvc.getStoreIdByCurrentUser();
      const product: ProductRequest = {
        ...this.productForm.value,
        StoreId: storeId,
        ProductImg: this.productImgBase64,
      };

      this.productSvc.addProduct(product);
    }
  }

  updateProduct(): void {
    if (this.productForm.valid && this.productId) {
      const storeId = this.storeSvc.getStoreIdByCurrentUser();
      const product: ProductRequest = {
        ...this.productForm.value,
        StoreId: storeId,
        ProductImg: this.productImgBase64,
      };

      this.productSvc.addProduct(product);
    }
  }
}
