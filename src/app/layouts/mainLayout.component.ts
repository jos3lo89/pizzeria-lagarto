import { Component } from '@angular/core';
import {
  IonRouterOutlet,
  IonHeader,
  IonFooter,
  IonContent,
} from '@ionic/angular/standalone';
import { MainHeaderComponent } from '../shared/components/main-header/main-header.component';
import { MainFooterComponent } from '../shared/components/main-footer/main-footer.component';

@Component({
  standalone: true,
  imports: [
    IonRouterOutlet,
    IonHeader,
    IonFooter,
    IonContent,
    MainHeaderComponent,
    MainFooterComponent,
  ],
  template: `
    <ion-header>
      <app-main-header></app-main-header>
    </ion-header>

    <ion-content>
      <ion-router-outlet></ion-router-outlet>
    </ion-content>

    <ion-footer>
      <app-main-footer></app-main-footer>
    </ion-footer>
  `,
  styles: ``,
})
export default class MainLayout {}
