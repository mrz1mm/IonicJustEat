import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { AccountPreferencesComponent } from './components/accountPreferences/accountPreferences.component';
import { OrdersDeliveryComponent } from './components/ordersDelivery/ordersDelivery.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { SupportAssistanceComponent } from './components/supportAssistance/supportAssistance.component';
import { RestaurantsOffersComponent } from './components/restaurantsOffers/restaurantsOffers.component';
import { FaqHeroComponent } from './components/faqHero/faqHero.component';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  standalone: true,
  imports: [
    IonContent,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    AccountPreferencesComponent,
    OrdersDeliveryComponent,
    PaymentsComponent,
    SupportAssistanceComponent,
    RestaurantsOffersComponent,
    FaqHeroComponent,
  ],
})
export class FaqPage {
  constructor() {}
}
