import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { IonContent } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonContent, TranslateModule, RouterModule],
})
export class AppComponent {
  constructor() {
    register();
    addIcons({
      'close-circle-outline': closeCircleOutline,
    });
  }
}
