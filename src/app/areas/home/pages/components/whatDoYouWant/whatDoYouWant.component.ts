import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-what-do-you-want',
  templateUrl: './whatDoYouWant.component.html',
  standalone: true,
  imports: [TranslateModule],
})
export class WhatDoYouWantComponent {
  constructor() {}
}
