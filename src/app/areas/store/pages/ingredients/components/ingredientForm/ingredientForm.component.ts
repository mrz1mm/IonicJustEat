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
import { pricetagOutline } from 'ionicons/icons';
import { IngredientRequest } from 'src/app/areas/store/interfaces/IngredientRequest.interface';
import { IngredientService } from 'src/app/areas/store/services/ingredient.service';
import { StoreService } from 'src/app/areas/store/services/store.service';
import { Path } from 'src/app/library/utils/Path';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredientForm.component.html',
  styleUrls: ['./ingredientForm.component.scss'],
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
export class IngredientFormComponent implements OnInit {
  Path = Path;
  ingredientForm!: FormGroup;
  ingredientId: string | null = null;
  ingredient = computed(() => this.ingredientSvc.ingredient());

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ingredientSvc: IngredientService,
    private storeSvc: StoreService
  ) {
    addIcons({ pricetagOutline });
  }

  ngOnInit() {
    this.ingredientForm = this.fb.group({
      ingredientName: ['', [Validators.required]],
      ingredientPrice: ['', [Validators.required]],
    });

    this.route.paramMap.subscribe((params) => {
      this.ingredientId = params.get('id');
    });

    effect(() => {
      const ingredient = this.ingredient();
      if (ingredient) {
        this.ingredientForm.patchValue({
          IngredientName: ingredient.ingredientName,
          ingredientPrice: ingredient.ingredientPrice,
        });
      }
    });
  }

  getHelperText(controlName: string): string {
    const control = this.ingredientForm.get(controlName);
    return control?.touched && control?.valid
      ? `LoginForm.${controlName.toUpperCase()}_VALID`
      : `LoginForm.${controlName.toUpperCase()}_HELPER`;
  }

  getErrorText(controlName: string): string | null {
    const control = this.ingredientForm.get(controlName);

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

  addIngredient(): void {
    if (this.ingredientForm.valid) {
      const storeId = this.storeSvc.getStoreIdByCurrentUser();
      const ingredient: IngredientRequest = {
        ...this.ingredientForm.value,
        StoreId: storeId,
      };

      this.ingredientSvc.addIngredient(ingredient);
    }
  }

  updateIngredient(): void {
    if (this.ingredientForm.valid && this.ingredientId) {
      const storeId = this.storeSvc.getStoreIdByCurrentUser();
      const ingredient: IngredientRequest = {
        ...this.ingredientForm.value,
        StoreId: storeId,
      };

      this.ingredientSvc.addIngredient(ingredient);
    }
  }
}
