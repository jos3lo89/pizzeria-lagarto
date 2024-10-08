import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonToolbar,
  IonAvatar,
  IonText,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  standalone: true,
  imports: [IonButton, IonText, IonAvatar, IonToolbar],
})
export class MainHeaderComponent implements OnInit {
  private _router = inject(Router);

  constructor() {}

  ngOnInit() {}

  setRouter(route: string) {
    this._router.navigateByUrl(route);
  }
}
