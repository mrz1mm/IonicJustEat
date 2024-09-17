import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { StoreFormComponent } from './components/storeForm/storeForm.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';

@Component({
  selector: 'app-store-management',
  templateUrl: './storeManagement.page.html',
  standalone: true,
  imports: [IonContent, StoreFormComponent, FooterComponent],
})
export class StoreManagementPage {
  constructor() {}
}
