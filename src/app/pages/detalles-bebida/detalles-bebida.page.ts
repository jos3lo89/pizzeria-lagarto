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
  IonText,
  IonProgressBar,
  IonSpinner,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BebidaApiPorId,
  // BebidaFirebase,
} from '../../productos/models/producto.models';
import { ToastService } from 'src/app/shared/services/toast.service';
// import { BebidaService } from '../../service/bebida.service';
// import { CarritoService } from '../../service/carrito.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { BebidaApiService } from 'src/app/shared/services/bebida-api.service';
import { CarritoApiService } from 'src/app/shared/services/carrito-api.service';

@Component({
  selector: 'app-detalles-bebida',
  templateUrl: './detalles-bebida.page.html',
  styleUrls: ['./detalles-bebida.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    IonProgressBar,
    IonText,
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
export default class DetallesBebidaPage implements OnInit {
  private _router = inject(Router);
  private _toast = inject(ToastService);
  private _activateRoute = inject(ActivatedRoute);
  // private _bebidaService = inject(BebidaService);
  // private _carritoService = inject(CarritoService);
  private _authService = inject(AuthService);
  private _bebidaApiService = inject(BebidaApiService);
  private _carritoApiService = inject(CarritoApiService);

  params = { id: '' };
  backUrl: string | null = null;
  bebida: BebidaApiPorId | null = null;
  agregandoAlCarrito = false;
  cantidad: number = 1;
  precioUnitario: number | null = null;
  precioTotal: number | null = this.precioUnitario;
  idUser: string | null = null;

  constructor() {
    this._activateRoute.queryParams.subscribe((param) => {
      if (param['id']) {
        this.params.id = param['id'];
        // this._bebidaService.obtnerBebidaPorId(param['id']).subscribe({
        //   next: (data) => {
        //     console.log(data);
        //     this.bebida = data;
        //     console.log(data.foto);

        //     this.precioUnitario = data.precio;
        //     this.calcularPrecioTotal();
        //   },
        //   error: (error) => {
        //     console.log(error);
        //   },
        // });

        this.backUrl = param['back'] ? param['back'] : null;
      }
    });

    this._authService.authState$.subscribe({
      next: (data) => {
        if (data) {
          // mpdifiqueee un error
          this.idUser = data.uid;
        }
      },
    });
  }

  async ngOnInit() {
    // await this.obetenerBebidaPorId(this.params.id);
  }

  async ionViewWillEnter() {
    await this.obetenerBebidaPorId(this.params.id);
  }

  async obetenerBebidaPorId(id: string) {
    this.bebida = await this._bebidaApiService.obtenerBebidaPorId(id);
    this.precioUnitario = this.bebida.precio;
    this.calcularPrecioTotal();
  }

  setRouter(route: string) {
    if (this.backUrl) {
      this._router.navigateByUrl(`/pages/${this.backUrl}`);
    } else {
      this._router.navigateByUrl(route);
    }
  }

  async agregarAlCarrito() {
    if (
      !this.bebida?.nombre ||
      !this.precioTotal ||
      !this.precioUnitario ||
      !this.idUser
    ) {
      this._toast.getToast(
        'Iniciar sesion para agregar al carrito',
        'middle',
        'warning'
      );

      return;
    }

    // console.log({
    //   nombre: this.bebida?.nombre,
    //   cantidad: this.cantidad,
    //   tamano: null,
    //   precioTotal: this.precioTotal,
    //   precioUnitario: this.precioUnitario,
    //   id: this.params.id,
    //   foto: this.bebida?.foto,
    //   idUser: this.idUser,
    // });

    try {
      this.agregandoAlCarrito = true;


      // const newProdcutoCart = await this._carritoService.agregarAlCarrito({
      //   idUser: this.idUser,
      //   precioTotal: this.precioTotal,
      //   precioUnitario: this.precioUnitario,
      //   cantidad: this.cantidad,
      //   foto: this.bebida.imagen_url,
      //   id: this.params.id,
      //   nombre: this.bebida.nombre,
      //   tamano: null,
      // });

      const newProdcutoCart = await this._carritoApiService.agregarAlCarrito({
        cantidad: this.cantidad,
        id_producto: this.params.id,
        id_user: this.idUser,
        imagen_url: this.bebida.imagen_url,
        nombre: this.bebida.nombre,
        precio_total: this.precioTotal,
        precio_unitario: this.precioUnitario,
      });

      if (!newProdcutoCart) {
        this._toast.getToast(
          'nuevo producto no agreggadopa',
          'middle',
          'warning'
        );
        this.agregandoAlCarrito = false;
        return;
      }
      this.agregandoAlCarrito = false;

      this._toast.getToast('Bebida agregado al carrito', 'middle', 'success');
    } catch (error) {
      this.agregandoAlCarrito = false;
      this._toast.getToast('Ocurrio un error al carrito', 'middle', 'danger');
      console.log(error);
    }
  }

  incrementarCantidad() {
    if (this.cantidad < 20) {
      this.cantidad++;
      this.calcularPrecioTotal();
    }
  }
  decrementarCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
      this.calcularPrecioTotal();
    }
  }
  calcularPrecioTotal() {
    if (this.precioUnitario !== null) {
      this.precioTotal = this.precioUnitario * this.cantidad;
    }
  }
}
