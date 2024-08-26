import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonGrid, IonCol, IonRow, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-download-app',
  templateUrl: './downloadApp.component.html',
  styleUrls: [
    '../../../../../app.component.scss',
    'downloadApp.component.scss',
  ],
  standalone: true,
  imports: [IonImg, IonRow, IonCol, IonGrid, TranslateModule],
})
export class DownloadAppComponent {
  constructor() {}
}
