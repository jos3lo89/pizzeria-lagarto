import { Component, inject, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  IonToolbar,
  IonAvatar,
  IonText,
  IonButton,
} from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
// import { CarritoService } from 'src/app/productos/service/carrito.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  standalone: true,
  imports: [IonButton, IonText, IonAvatar, IonToolbar],
})
export class MainHeaderComponent implements OnInit {
  private _router = inject(Router);
  // private _carritoService = inject(CarritoService);
  private _authService = inject(AuthService);

  user: User | null = null;
  cantidadCarrito: number | null = null;

  constructor() {}

  ngOnInit() {
    // this._authService.authState$.subscribe({
    //   next: (data) => {
    //     // console.log(data);
    //     this.user = data;
    //     if (this.user) {
    //       this.obtenCantCarrito(this.user.uid);
    //     }
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });
  }

  setRouter(route: string) {
    this._router.navigateByUrl(route);
  }

  // obtenCantCarrito(id: string) {
  //   this._carritoService.cantidadCarrito(id).subscribe({
  //     next: (cantidad) => {
  //       this.cantidadCarrito = cantidad;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }
}
