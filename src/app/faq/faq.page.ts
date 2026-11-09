import { Component } from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

import { FAQ_ITEMS } from './faq.data';

@Component({
  selector: 'app-faq',
  templateUrl: 'faq.page.html',
  styleUrls: ['faq.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonLabel,
  ],
})
export class FaqPage {
  readonly items = FAQ_ITEMS;
}
