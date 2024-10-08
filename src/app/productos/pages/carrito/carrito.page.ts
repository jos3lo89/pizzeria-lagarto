import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonButton,
  IonSpinner,
  IonItem,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/auth/service/auth.service';
import { User } from '@angular/fire/auth';
import { ProductoCarritoFire } from '../../models/producto.models';
import { CarritoService } from '../../service/carrito.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PdfService } from 'src/app/shared/services/pdf.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonSpinner,
    IonButton,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export default class CarritoPage implements OnInit {
  private _authService = inject(AuthService);
  private _carritoService = inject(CarritoService);
  private _toast = inject(ToastService);
  private _pdfService = inject(PdfService);

  private _currentUser: User | null = null;
  productosCarrito: ProductoCarritoFire[] | null = null;
  precioTotalFinal: number | null = null;

  constructor() {}

  ngOnInit() {
    this._authService.authState$.subscribe({
      next: (data) => {
        this._currentUser = data;
        if (this._currentUser) {
          this.cargarProductosCarrito(this._currentUser.uid);
        }
      },
    });
  }

  ionViewWillEnter() {
    if (this._currentUser) {
      this.cargarProductosCarrito(this._currentUser.uid);
    }
  }

  cargarProductosCarrito(idUser: string) {
    this._carritoService.obtenerCarritoPorUsuario(idUser).subscribe({
      next: (data) => {
        this.productosCarrito = data;

        this.precioTotalFinal = this.productosCarrito.reduce(
          (acumulador, producto) => acumulador + producto.precioTotal,
          0
        );
      },
    });
  }

  async borrarProducto(id: string) {
    try {
      await this._carritoService.borrarDelCarrito(id);
      this._toast.getToast('Pizza borrada del carrito', 'top', 'success');

      if (this._currentUser) {
        this.cargarProductosCarrito(this._currentUser.uid);
      }
    } catch (error) {
      this._toast.getToast(
        'No se pudo borrar la pizza del carrito',
        'top',
        'danger'
      );
      console.log(error);
    }
  }

  comprar() {
    console.log({
      producto: this.productosCarrito,
      totalPagar: this.precioTotalFinal,
    });

    this._pdfService.generarBoleta({
      producto: this.productosCarrito,
      totalPagar: this.precioTotalFinal,
    });
  }
}
