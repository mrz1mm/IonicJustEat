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
import { Path } from 'src/app/library/utils/Path';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [IonIcon, IonFooter, RouterModule],
})
export class FooterComponent {
  Env = environment;
  Path = Path;
  constructor() {
    addIcons({
      'logo-facebook': logoFacebook,
      'logo-instagram': logoInstagram,
      'logo-twitter': logoTwitter,
      'logo-youtube': logoYoutube,
    });
  }
}
