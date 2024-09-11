import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import {
  storefrontOutline,
  locationOutline,
  businessOutline,
  mailOutline,
  callOutline,
  pricetagOutline,
  imageOutline,
  logoBuffer,
  informationCircleOutline,
} from 'ionicons/icons';
import { Path } from 'src/app/library/utils/Path';
import { StoreService } from '../../../services/store.service';
import { Coordinate } from '../../../../../library/maps/interfaces/Coordinate.interface';
import { StoreRequest } from '../../../interfaces/StoreRequest.interface';
import { GeosearchService } from 'src/app/library/maps/services/geoSearch.service';
import { StoreResponse } from '../../../interfaces/StoreResponse.interface';

@Component({
  selector: 'app-store-form',
  templateUrl: './storeForm.component.html',
  styleUrls: ['./storeForm.component.scss'],
  standalone: true,
  imports: [
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
  private _store = signal<StoreRequest | null>(null);

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
      pricetagOutline,
      imageOutline,
      logoBuffer,
      informationCircleOutline,
    });
  }

  ngOnInit() {
    // inizializzazione del form
    this.storeForm = this.fb.group({
      storeName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      cap: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      storeTag: [''],
      coverImg: [''],
      logoImg: [''],
      description: [''],
    });

    // recupero dell'id dalla route
    this.route.paramMap.subscribe((params) => {
      this.storeId = params.get('id');
      if (this.storeId) {
        this.loadStoreData(this.storeId);
      }
    });

    // effect per aggiornare il form quando il signal cambia
    effect(() => {
      if (this._store()) {
        this.storeForm.patchValue({
          storeName: this._store()!.StoreName,
          address: this._store()!.Address,
          city: this._store()!.City,
          cap: this._store()!.CAP,
          phoneNumber: this._store()!.PhoneNumber,
          storeTag: this._store()!.StoreTag,
          coverImg: this._store()!.CoverImg,
          logoImg: this._store()!.LogoImg,
          description: this._store()!.Description,
        });
      }
    });
  }

  async loadStoreData(storeId: string): Promise<void> {
    try {
      const storeResponse: StoreResponse = await this.storeSvc.getStoreById(
        storeId
      );
      this._store.set(storeResponse);
    } catch (error) {
      console.error('Error loading category data', error);
    }
  }

  async addCoordinate(
    address: string,
    city: string,
    cap: string
  ): Promise<Coordinate> {
    this.storeForm.patchValue({ address });
    this.storeForm.patchValue({ city });
    this.storeForm.patchValue({ cap });
    const completeAddress = address + ' ' + city + ' ' + cap;
    const results = await this.geoSearchSvc.search(completeAddress);
    if (results.length > 0) {
      const result = results[0];
      this.storeForm.patchValue({
        Latitude: result.y,
        Longitude: result.x,
      });
      return { Latitude: result.y, Longitude: result.x };
    }
    return { Latitude: 0, Longitude: 0 };
  }

  onFileChange(event: any, controlName: string): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;

        if (controlName === 'coverImg') {
          this.coverImgBase64 = base64String;
        } else if (controlName === 'logoImg') {
          this.logoImgBase64 = base64String;
        }
      };

      reader.readAsDataURL(file);
    }
  }

  getHelperText(controlName: string): string {
    const control = this.storeForm.get(controlName);
    return control?.touched && control?.valid
      ? `LoginForm.${controlName.toUpperCase()}_VALID`
      : `LoginForm.${controlName.toUpperCase()}_HELPER`;
  }

  getErrorText(controlName: string): string | null {
    const control = this.storeForm.get(controlName);

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

  async addStore(): Promise<void> {
    if (this.storeForm.valid) {
      try {
        const address = this.storeForm.value.address;
        const city = this.storeForm.value.city;
        const cap = this.storeForm.value.cap;

        const coordinate = await this.addCoordinate(address, city, cap);

        const latitude = coordinate.Latitude.toString();
        const longitude = coordinate.Longitude.toString();

        const storeRequest: StoreRequest = {
          ...this.storeForm.value,
          Latitude: latitude,
          Longitude: longitude,
          CoverImg: this.coverImgBase64,
          LogoImg: this.logoImgBase64,
        };

        this.storeSvc.addStore(storeRequest);
        console.log(storeRequest);
      } catch (error) {
        console.error('Error adding store', error);
      }
    }
  }

  async updateStore(): Promise<void> {
    if (this.storeForm.valid && this.storeId) {
      try {
        const store: StoreRequest = this.storeForm.value;
        await this.storeSvc.updateStore(this.storeId, store);
        this._store.set(null);
      } catch (error) {
        console.error('Error updating store', error);
      }
    }
  }
}
