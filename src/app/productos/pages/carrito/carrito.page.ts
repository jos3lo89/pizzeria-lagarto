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
import { ProductoListApi } from '../../models/producto.models';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PdfService } from 'src/app/shared/services/pdf.service';
import { CarritoApiService } from 'src/app/shared/services/carrito-api.service';

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
  private _toast = inject(ToastService);
  private _pdfService = inject(PdfService);
  private _carritoApiService = inject(CarritoApiService);

  private _currentUser: User | null = null;
  productosCarrito: ProductoListApi[] | null = null;
  precioTotalFinal: number | null = null;
  borrando = false;

  constructor() {}

  async ngOnInit() {}

  async ionViewWillEnter() {
    this._authService.authState$.subscribe({
      next: (data) => {
        this._currentUser = data;
        if (this._currentUser) {
          this._carritoApiService
            .obtenerCarritoPorIdUser(this._currentUser.uid)
            .then((res) => {
              this.productosCarrito = res.data;
              this.calcularPrecioTotal();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
    });
  }

  calcularPrecioTotal() {
    if (this.productosCarrito) {
      this.precioTotalFinal = this.productosCarrito.reduce(
        (acumulador, producto) => acumulador + producto.precio_total,
        0
      );
    }
  }

  async borrarProducto(id: string) {
    try {
      this.borrando = true;
      await this._carritoApiService.borrarProducto(id);
      this._toast.getToast('Producto borrado del carrito', 'top', 'success');

      if (this._currentUser) {
        const res = await this._carritoApiService.obtenerCarritoPorIdUser(
          this._currentUser.uid
        );
        this.productosCarrito = res.data;
        this.calcularPrecioTotal();
      }

      this.borrando = false;
    } catch (error) {
      this._toast.getToast(
        'No se pudo borrar el producto del carrito',
        'top',
        'danger'
      );
      this.borrando = false;
      console.log(error);
    }
  }

  comprar() {
    console.log({
      producto: this.productosCarrito,
      totalPagar: this.precioTotalFinal,
    });

    if (!this.productosCarrito || !this.precioTotalFinal) return;

    this._pdfService.generarBoleta({
      producto: this.productosCarrito,
      totalPagar: this.precioTotalFinal,
    });
  }
}
