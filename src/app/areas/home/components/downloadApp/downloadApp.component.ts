import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-download-app',
  templateUrl: './downloadApp.component.html',
  standalone: true,
  imports: [TranslateModule],
})
export class DownloadAppComponent {
  constructor() {}
}
