import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  helpOutline,
  homeOutline,
  logInOutline,
  personAddOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-auth-footer',
  templateUrl: './auth-footer.component.html',
  styleUrls: ['./auth-footer.component.scss'],
  standalone: true,
  imports: [IonTabBar, IonTabButton, IonIcon],
})
export class AuthFooterComponent implements OnInit {
  private _router = inject(Router);

  constructor() {
    addIcons({ logInOutline, personAddOutline, homeOutline });
  }

  ngOnInit() {}

  setRoute(route: string) {
    this._router.navigateByUrl(route);
  }

  navigationRoutes = [
    {
      path: '/pages/home',
      name: 'Inicio',
      icon: 'home-outline',
    },
    {
      path: '/auth/login',
      name: 'Iniciar sesión',
      icon: 'log-in-outline',
    },
    {
      path: '/auth/registro',
      name: 'Registrate',
      icon: 'person-add-outline',
    },
  ];
}
