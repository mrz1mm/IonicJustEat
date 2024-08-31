import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonFooter, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  logoFacebook,
  logoInstagram,
  logoTwitter,
  logoYoutube,
} from 'ionicons/icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [IonIcon, IonFooter, RouterModule],
})
export class FooterComponent {
  constructor() {
    addIcons({
      'logo-facebook': logoFacebook,
      'logo-instagram': logoInstagram,
      'logo-twitter': logoTwitter,
      'logo-youtube': logoYoutube,
    });
  }
}
