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
  IonSpinner,
  IonSelect,
  IonSelectOption,
  IonProgressBar,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
// import { ProductoFire } from '../../productos/models/producto.models';
// import { ProductosService } from '../../service/productos.service';
import { ToastService } from 'src/app/shared/services/toast.service';
// import { CarritoService } from '../../service/carrito.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { PizzaApiService } from 'src/app/shared/services/pizza-api.service';
import { CarritoApiService } from 'src/app/shared/services/carrito-api.service';
import {
  newProductosApi,
  PizzasApi,
} from 'src/app/productos/models/producto.models';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.page.html',
  styleUrls: ['./detalles-producto.page.scss'],
  standalone: true,
  imports: [
    IonProgressBar,
    IonSpinner,
    IonText,
    IonButton,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSelect,
    IonSelectOption,
  ],
})
export default class DetallesProductoPage implements OnInit {
  private _activateRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  // private _productoService = inject(ProductosService);
  private _toast = inject(ToastService);
  // private _carritoService = inject(CarritoService);
  private _authService = inject(AuthService);
  private _pizzaApiService = inject(PizzaApiService);
  private _carritoApiService = inject(CarritoApiService);

  params = { id: '' };
  // pizza: ProductoFire | null = null;
  pizza: newProductosApi | null = null;
  tamanoPizza = '';
  precioUnitario: number | null = null;
  precioTotal: number | null = this.precioUnitario;
  cantidad: number = 1;
  agregandoAlCarrito = false;
  idUser: string | null = null;
  backUrl: string | null = null;

  constructor() {
    this._activateRoute.queryParams.subscribe((param) => {
      if (param['id']) {
        this.params.id = param['id'];

        // this._productoService.obtenerPizzaPorId(param['id']).subscribe({
        //   next: (data) => {
        //     this.pizza = data;
        //     this.tamanoPizza = 'grande';
        //     this.precioUnitario = data.tamanosPrecios.grande;
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

  ngOnInit() {
    // await this.obtenerPizzaPorId(this.params.id);
  }

  async ionViewWillEnter() {
    await this.obtenerPizzaPorId(this.params.id);
  }

  async obtenerPizzaPorId(id: string) {
    const data = await this._pizzaApiService.obtenerPizzaPorId(id);
    this.pizza = {
      ...data,
      precioDescuento: data.familiar - data.familiar * data.descuento,
    };
    this.tamanoPizza = 'grande';
    this.precioUnitario = this.pizza.precioDescuento;
    this.calcularPrecioTotal();
  }

  setRouter(route: string) {
    if (this.backUrl) {
      this._router.navigateByUrl(`/pages/${this.backUrl}`);
    } else {
      this._router.navigateByUrl(route);
    }
  }

  onTamanoChange(event: any) {
    this.tamanoPizza = event.detail.value;

    if (this.tamanoPizza === 'familiar' && this.pizza) {
      this.precioUnitario = this.pizza.familiar;
    }
    if (this.tamanoPizza === 'mediano' && this.pizza) {
      this.precioUnitario = this.pizza.mediana;
    }
    if (this.tamanoPizza === 'personal' && this.pizza) {
      this.precioUnitario = this.pizza.personal;
    }

    this.calcularPrecioTotal();
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

  async agregarAlCarrito() {
    if (this.tamanoPizza === '') {
      this._toast.getToast('Elegi un tamaño', 'middle', 'warning');
      return;
    }

    if (
      !this.pizza?.nombre ||
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

    try {
      this.agregandoAlCarrito = true;
      // await this._carritoService.agregarAlCarrito({
      //   nombre: this.pizza?.nombre,
      //   cantidad: this.cantidad,
      //   tamano: this.tamanoPizza,
      //   precioTotal: this.precioTotal,
      //   precioUnitario: this.precioUnitario,
      //   id: this.params.id,
      //   foto: this.pizza.imagen_url,
      //   idUser: this.idUser,
      // });

      ////
      await this._carritoApiService.agregarAlCarrito({
        cantidad: this.cantidad,
        id_producto: this.params.id,
        id_user: this.idUser,
        imagen_url: this.pizza.imagen_url,
        nombre: this.pizza?.nombre,
        precio_total: this.precioTotal,
        precio_unitario: this.precioUnitario,
      });

      this._toast.getToast('Pizza agregado al carrito', 'middle', 'success');
      this.agregandoAlCarrito = false;
    } catch (error) {
      this.agregandoAlCarrito = false;
      this._toast.getToast('Ocurrio un error al carrito', 'middle', 'danger');
      console.log(error);
    }
  }
}
