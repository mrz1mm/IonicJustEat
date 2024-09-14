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
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonIcon,
  IonText,
  IonButton,
  IonList,
  IonTextarea,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import {
  storefrontOutline,
  locationOutline,
  businessOutline,
  mailOutline,
  callOutline,
} from 'ionicons/icons';
import { Path } from 'src/app/library/utils/Path';
import { GeosearchService } from 'src/app/library/maps/services/geoSearch.service';
import { StoreService } from 'src/app/areas/store/services/store.service';
import { StoreRequest } from 'src/app/areas/store/interfaces/StoreRequest.interface';

@Component({
  selector: 'app-store-form',
  templateUrl: './storeForm.component.html',
  styleUrls: ['./storeForm.component.scss'],
  standalone: true,
  imports: [
    IonTextarea,
    IonList,
    IonButton,
    IonText,
    IonIcon,
    IonInput,
    IonItem,
    IonCol,
    IonRow,
    IonGrid,
    TranslateModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
})
export class StoreFormComponent implements OnInit {
  Path = Path;
  storeForm!: FormGroup;
  coverImgBase64: string | null = null;
  logoImgBase64: string | null = null;
  storeId: string | null = null;
  store = computed(() => this.storeSvc.store());
  latitude = computed(() => this.geoSearchSvc.latitude());
  longitude = computed(() => this.geoSearchSvc.longitude());

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private geoSearchSvc: GeosearchService,
    private storeSvc: StoreService
  ) {
    addIcons({
      storefrontOutline,
      locationOutline,
      businessOutline,
      mailOutline,
      callOutline,
    });
  }

  ngOnInit() {
    this.storeForm = this.fb.group({
      storeName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      cap: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
  }

  async addCoordinate(
    address: string,
    city: string,
    cap: string
  ): Promise<void> {
    this.storeForm.patchValue({ address });
    this.storeForm.patchValue({ city });
    this.storeForm.patchValue({ cap });
    const completeAddress = address + ' ' + city + ' ' + cap;
    await this.geoSearchSvc.search(completeAddress);
  }

  getHelperText(controlName: string): string {
    const control = this.storeForm.get(controlName);
    return control?.touched && control?.valid
      ? `StoreForm.${controlName.toUpperCase()}_VALID`
      : `StoreForm.${controlName.toUpperCase()}_HELPER`;
  }

  getErrorText(controlName: string): string | null {
    const control = this.storeForm.get(controlName);

    if (!control || !control.touched || !control.errors) {
      return null;
    }

    if (control.errors['required']) {
      return `StoreForm.${controlName.toUpperCase()}_REQUIRED`;
    }
    if (control.errors['email']) {
      return `StoreForm.${controlName.toUpperCase()}_FORMAT`;
    }
    if (control.errors['pattern']) {
      return `StoreForm.${controlName.toUpperCase()}_FORMAT`;
    }

    return null;
  }

  async addStore(): Promise<void> {
    if (this.storeForm.valid) {
      const address = this.storeForm.value.address;
      const city = this.storeForm.value.city;
      const cap = this.storeForm.value.cap;

      await this.addCoordinate(address, city, cap);

      const storeRequest: StoreRequest = {
        ...this.storeForm.value,
        Latitude: this.latitude(),
        Longitude: this.longitude(),
      };

      this.storeSvc.addStore(storeRequest);
      console.log(storeRequest);
    }
  }

  async updateStore(): Promise<void> {
    if (this.storeForm.valid && this.storeId) {
      if (this.storeForm.valid) {
        const address = this.storeForm.value.address;
        const city = this.storeForm.value.city;
        const cap = this.storeForm.value.cap;

        this.addCoordinate(address, city, cap);

        const storeRequest: StoreRequest = {
          ...this.storeForm.value,
          StoreId: this.storeId,
          Latitude: this.latitude(),
          Longitude: this.longitude(),
        };

        this.storeSvc.updateStore(this.storeId, storeRequest);
        console.log(storeRequest);
      }
    }
  }
}
