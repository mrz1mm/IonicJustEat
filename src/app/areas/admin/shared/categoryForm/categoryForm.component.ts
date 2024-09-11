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
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { medal } from 'ionicons/icons';
import { Path } from 'src/app/library/utils/Path';
import { CategoryService } from '../../service/category.service';
import { CategoryRequest } from '../../interfaces/CategoryRequest.interface';

@Component({
  selector: 'app-category-form',
  templateUrl: './categoryForm.component.html',
  styleUrls: ['./categoryForm.component.scss'],
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
export class CategoryFormComponent implements OnInit {
  Path = Path;
  categoryForm!: FormGroup;
  categoryId: string | null = null;
  category = computed(() => this.categorySvc.category());

  constructor(
    private fb: FormBuilder,
    private categorySvc: CategoryService,
    private route: ActivatedRoute
  ) {
    addIcons({ medal });
  }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      categoryName: ['', [Validators.required]],
    });

    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');
    });

    effect(() => {
      const category = this.category();
      if (category) {
        this.categoryForm.patchValue({
          categoryName: category.CategoryName,
        });
      }
    });
  }

  getHelperText(controlName: string): string {
    const control = this.categoryForm.get(controlName);
    return control?.touched && control?.valid
      ? `LoginForm.${controlName.toUpperCase()}_VALID`
      : `LoginForm.${controlName.toUpperCase()}_HELPER`;
  }

  getErrorText(controlName: string): string | null {
    const control = this.categoryForm.get(controlName);

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

  addCategory(): void {
    if (this.categoryForm.valid) {
      const category: CategoryRequest = this.categoryForm.value;
      await this.categorySvc.addCategory(category);
    }
  }

  updateCategory(): void {
    if (this.categoryForm.valid && this.categoryId) {
      const category: CategoryRequest = this.categoryForm.value;
      this.categorySvc.updateCategory(this.categoryId, category);
    }
  }
}
