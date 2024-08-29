import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';

@Component({
  selector: 'app-country-selector',
  templateUrl: './countrySelector.component.html',
  standalone: true,
  imports: [TranslateModule, HeaderComponent, FooterComponent],
})
export class CountrySelectorComponent {
  constructor() {}
}
