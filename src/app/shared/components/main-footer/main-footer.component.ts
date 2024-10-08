import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { person, search, albumsOutline, homeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss'],
  standalone: true,
  imports: [IonIcon, IonTabButton, IonTabBar],
})
export class MainFooterComponent implements OnInit {
  private _router = inject(Router);

  constructor() {
    addIcons({ homeOutline, albumsOutline, search, person });
  }

  ngOnInit() {}

  setRouter(route: string) {
    this._router.navigateByUrl(route);
  }

  mainNavigationRoutes = [
    {
      path: '/pages/home',
      name: 'Inicio',
      icon: 'home-outline',
    },
    // {
    //   path: '/recetas/categorias',
    //   name: 'Catergorias',
    //   icon: 'albums-outline',
    // },
    {
      path: '/pages/buscar-producto',
      name: 'Buscar',
      icon: 'search',
    },
    {
      path: '/pages/perfil',
      name: 'Mi Perfil',
      icon: 'person',
    },
  ];
}
