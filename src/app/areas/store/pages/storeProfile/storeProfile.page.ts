import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { FooterComponent } from '../../../../layout/footer/footer.component';
import { StoreProfileFormComponent } from './components/storeProfileForm/storeProfileForm.component';

@Component({
  selector: 'app-store-profile',
  templateUrl: './storeProfile.page.html',
  standalone: true,
  imports: [IonContent, FooterComponent, StoreProfileFormComponent],
})
export class StoreProfilePage {
  constructor() {}
}
