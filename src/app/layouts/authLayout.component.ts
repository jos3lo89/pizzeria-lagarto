import { Component } from '@angular/core';
import {
  IonRouterOutlet,
  IonHeader,
  IonFooter,
  IonContent,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { AuthFooterComponent } from '../auth/components/auth-footer/auth-footer.component';

@Component({
  standalone: true,
  imports: [
    IonRouterOutlet,
    IonContent,
    IonFooter,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    AuthFooterComponent,
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button>atras</ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-router-outlet></ion-router-outlet>
    </ion-content>

    <ion-footer>
      <app-auth-footer></app-auth-footer>
    </ion-footer>
  `,
  styles: ``,
})
export default class AuthLayout {}
